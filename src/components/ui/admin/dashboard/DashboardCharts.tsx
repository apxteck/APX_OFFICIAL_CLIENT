'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts';

const tooltipStyle = {
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
  backgroundColor: 'rgba(17, 17, 17, 0.85)',
  backdropFilter: 'blur(12px)',
  color: '#fff',
  padding: '12px 16px',
  fontWeight: 'bold',
};

const ChartContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100/80 dark:border-white/10 flex flex-col h-[400px] transition-all hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-500/30 group">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-extrabold text-gray-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors">
        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
      </div>
    </div>
    <div className="flex-1 w-full relative">{children}</div>
  </div>
);

export default function DashboardCharts({ data }: { data?: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse flex gap-6 h-[400px] w-full bg-gray-100/50 dark:bg-white/5 rounded-[2rem]" />
    );
  }

  // Use real data or fallback to empty arrays
  const revenueTrend = data?.revenueTrend || [];
  const requestsByStatus = data?.requestsByStatus || [];
  const requestsOverTime = data?.requestsOverTime || [];
  const leadFunnel = data?.leadFunnel || [];
  const enquirySources = data?.enquirySources || [];
  const blogPerformance = data?.blogPerformance || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 1. Monthly Revenue Trend (Line Chart) */}
      <ChartContainer title="Monthly Revenue Trend">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`₹${value}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#colorRevenue)"
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#6366f1' }}
              activeDot={{ r: 8, strokeWidth: 0, fill: '#6366f1' }}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={1} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* 2. Service Requests by Status (Donut Chart) */}
      <ChartContainer title="Service Requests by Status">
        <ResponsiveContainer width="100%" height="100%">
          {requestsByStatus.length > 0 ? (
            <PieChart>
              <Pie
                data={requestsByStatus}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
                cornerRadius={6}
              >
                {requestsByStatus.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#fff' }} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}
              />
            </PieChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 font-medium">
              No requests yet
            </div>
          )}
        </ResponsiveContainer>
      </ChartContainer>

      {/* 3. New Requests Over Time (Bar Chart) */}
      <ChartContainer title="New Requests (Last 7 Days)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={requestsOverTime} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              dx={-10}
            />
            <Tooltip cursor={{ fill: '#374151', opacity: 0.05 }} contentStyle={tooltipStyle} />
            <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* 4. Lead Conversion Funnel */}
      <ChartContainer title="Lead Conversion Funnel">
        <ResponsiveContainer width="100%" height="100%">
          {leadFunnel.some((item: any) => item.value > 0) ? (
            <FunnelChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Funnel dataKey="value" data={leadFunnel} isAnimationActive>
                <LabelList
                  position="right"
                  fill="#6B7280"
                  stroke="none"
                  dataKey="stage"
                  style={{ fontWeight: 600, fontSize: 13 }}
                />
                {leadFunnel.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 font-medium">
              No leads yet
            </div>
          )}
        </ResponsiveContainer>
      </ChartContainer>

      {/* 5. Enquiry Sources (Pie Chart) */}
      <ChartContainer title="Enquiry Sources">
        <ResponsiveContainer width="100%" height="100%">
          {enquirySources.length > 0 ? (
            <PieChart>
              <Pie
                data={enquirySources}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={2}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {enquirySources.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 font-medium">
              No enquiries yet
            </div>
          )}
        </ResponsiveContainer>
      </ChartContainer>

      {/* 6. Blog Post Performance (Bar Chart) */}
      <div className="lg:col-span-1">
        <ChartContainer title="Top Blog Post Performance">
          <ResponsiveContainer width="100%" height="100%">
            {blogPerformance.length > 0 ? (
              <BarChart data={blogPerformance} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.15}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                  dy={15}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                  dx={-10}
                />
                <Tooltip cursor={{ fill: '#374151', opacity: 0.05 }} contentStyle={tooltipStyle} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}
                />
                <Bar dataKey="likes" fill="#ec4899" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="comments" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 font-medium">
                No blog posts yet
              </div>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
