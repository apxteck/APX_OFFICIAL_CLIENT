"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, User } from 'lucide-react';
import { ServiceRequestDetails } from '../../types';

interface RequestOverviewProps {
  request: ServiceRequestDetails;
}

export function RequestOverview({ request }: RequestOverviewProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Overview Info */}
      <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
        <h3 className="font-bold text-gray-900 dark:text-white">Overview</h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Created Date</p>
              <p className="text-gray-900 dark:text-white font-medium">{new Date(request.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">Priority</p>
              <p className="text-gray-900 dark:text-white font-medium capitalize">{request.priority.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Assigned Team */}
      <motion.div variants={item} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-500" />
          Assigned To
        </h3>
        {request.assignedTo ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold">
              {request.assignedTo.fullName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{request.assignedTo.fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Project Manager</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Pending Assignment</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
