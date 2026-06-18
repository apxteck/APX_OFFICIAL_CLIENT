'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { paymentsService } from '@/services/admin/payments.service';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function PaymentAnalyticsPage() {
  const {
    data: paymentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentsService.getPayments(),
  });

  const payments = paymentsData?.payments || [];

  const { statusData, revenueOverTime, totalRevenue, pendingRevenue } = useMemo(() => {
    if (!payments.length)
      return { statusData: [], revenueOverTime: [], totalRevenue: 0, pendingRevenue: 0 };

    let paid = 0,
      pending = 0,
      sent = 0,
      failed = 0;
    let totalRev = 0;
    let pendRev = 0;

    const revMap: Record<string, number> = {};

    payments.forEach((p) => {
      // Status Counts
      if (p.status === 'PAID') paid++;
      else if (p.status === 'PENDING') pending++;
      else if (p.status === 'SENT') sent++;
      else if (p.status === 'FAILED') failed++;

      // Revenue
      if (p.status === 'PAID') {
        totalRev += Number(p.amountPaid) || Number(p.negotiatedAmount);
        const dateKey = format(new Date(p.paidAt || p.createdAt), 'MMM dd');
        revMap[dateKey] =
          (revMap[dateKey] || 0) + (Number(p.amountPaid) || Number(p.negotiatedAmount));
      } else if (p.status === 'PENDING' || p.status === 'SENT') {
        pendRev += Number(p.negotiatedAmount);
      }
    });

    const statusData = [
      { name: 'Paid', value: paid },
      { name: 'Sent', value: sent },
      { name: 'Pending', value: pending },
      { name: 'Failed', value: failed },
    ].filter((s) => s.value > 0);

    const revenueOverTime = Object.keys(revMap)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => ({
        date,
        revenue: revMap[date],
      }));

    return { statusData, revenueOverTime, totalRevenue: totalRev, pendingRevenue: pendRev };
  }, [payments]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  if (isLoading) {
    return <div className="p-6 text-gray-400">Loading analytics...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load analytics data.</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 text-white pb-safe">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-indigo-500 w-8 h-8" />
          <h1 className="text-2xl font-bold">Payment Analytics</h1>
        </div>
        <p className="text-gray-400">
          Insights and metrics about your invoice payments and revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <DollarSign className="w-5 h-5 text-green-500" />
            <h3 className="font-medium">Total Revenue (Paid)</h3>
          </div>
          <div className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</div>
        </div>

        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <Activity className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Pending Revenue</h3>
          </div>
          <div className="text-3xl font-bold text-white">{formatCurrency(pendingRevenue)}</div>
        </div>

        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className="font-medium">Total Invoices</h3>
          </div>
          <div className="text-3xl font-bold text-white">{payments.length}</div>
        </div>

        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium">Unpaid Invoices</h3>
          </div>
          <div className="text-3xl font-bold text-white">
            {payments.filter((p) => p.status !== 'PAID').length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Over Time (Paid)</h3>
          <div className="h-80">
            {revenueOverTime.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => '₹' + value}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#10b981' }}
                    formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Not enough data
              </div>
            )}
          </div>
        </div>

        {/* Status Chart */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Invoice Status Distribution</h3>
          <div className="h-80">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={'cell-' + index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#9ca3af' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Not enough data
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
