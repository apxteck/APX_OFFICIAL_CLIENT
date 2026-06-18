import React from 'react';
import { motion } from 'framer-motion';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function SettingsHeader() {
  return (
    <motion.div variants={item}>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your employee profile, security, and preferences.</p>
    </motion.div>
  );
}
