const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src/app/(roles)/(admin)');

const routes = [
  { path: 'users/[id]', title: 'User Profile', desc: 'View and edit full user details and documents.', icon: 'Users' },
  { path: 'roles', title: 'Role Management', desc: 'Manage system roles and set default module permissions.', icon: 'Shield' },
  { path: 'permissions', title: 'Module Permissions', desc: 'Configure per-user module access overrides.', icon: 'Key' },
  { path: 'requests', title: 'Service Requests', desc: 'Manage incoming service requests, assignments, and statuses.', icon: 'ClipboardList' },
  { path: 'requests/[id]', title: 'Request Details', desc: 'View request form data, files, and status controls.', icon: 'ClipboardList' },
  { path: 'payments', title: 'Payments & Invoices', desc: 'Manage invoices and track payment statuses.', icon: 'CreditCard' },
  { path: 'blog', title: 'Blog Posts', desc: 'Manage published articles and drafts.', icon: 'FileText' },
  { path: 'blog/new', title: 'Create Post', desc: 'Rich text editor to author a new blog post.', icon: 'PenTool' },
  { path: 'blog/[id]/edit', title: 'Edit Post', desc: 'Update existing blog post content.', icon: 'Edit3' },
  { path: 'blog/comments', title: 'Blog Comments', desc: 'Moderation queue for user comments.', icon: 'MessageSquare' },
  { path: 'blog/categories', title: 'Categories', desc: 'Manage blog categorization.', icon: 'FolderTree' },
  { path: 'leads', title: 'Leads & CRM', desc: 'Sales pipeline tracking and lead management.', icon: 'TrendingUp' },
  { path: 'leads/[id]', title: 'Lead Details', desc: 'Detailed lead info and follow-up timeline.', icon: 'UserCircle' },
  { path: 'enquiries', title: 'Enquiries', desc: 'Inbound enquiry manager from contact forms.', icon: 'HelpCircle' },
  { path: 'tasks', title: 'Task Board', desc: 'Manage internal task assignments and progress.', icon: 'CheckSquare' },
  { path: 'reimbursements', title: 'Reimbursements', desc: 'Review and approve employee reimbursement applications.', icon: 'Receipt' },
  { path: 'ads', title: 'Advertisements', desc: 'Ad slots and active campaign management.', icon: 'Monitor' },
  { path: 'ads/pricing', title: 'Ad Pricing', desc: 'Configure slot pricing and packages.', icon: 'DollarSign' },
  { path: 'content/faqs', title: 'FAQs', desc: 'Manage Frequently Asked Questions.', icon: 'HelpCircle' },
  { path: 'content/banners', title: 'Hero Banners', desc: 'Homepage hero banner management.', icon: 'Image' },
  { path: 'content/portfolio', title: 'Portfolio', desc: 'Case study and portfolio item manager.', icon: 'Briefcase' },
  { path: 'content/testimonials', title: 'Testimonials', desc: 'Client feedback and testimonial manager.', icon: 'MessageCircle' },
  { path: 'settings', title: 'Site Settings', desc: 'Global platform configuration and parameters.', icon: 'Settings' },
  { path: 'notifications', title: 'Notifications', desc: 'In-app notification center for admins.', icon: 'Bell' },
];

const generateTemplate = (title, desc, icon) => `"use client";

import React from "react";
import { ${icon}, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <${icon} size={24} />
            </div>
            ${title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2">
            ${desc}
          </p>
        </div>
      </div>

      {/* Empty State / Construction Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full min-h-[500px] bg-white dark:bg-[#111111] border border-dashed border-gray-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0px_4px_20px_rgba(0,0,0,0.02)]"
      >
        <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-white/5">
          <AlertCircle className="text-gray-400 dark:text-gray-500" size={32} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Module Under Construction</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          The <strong>${title}</strong> frontend routing is active, but the backend APIs and data tables have not been connected yet. 
        </p>
        <button className="mt-6 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors border border-gray-200 dark:border-white/10">
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
`;

routes.forEach(route => {
  const fullPath = path.join(rootDir, route.path);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  
  const filePath = path.join(fullPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateTemplate(route.title, route.desc, route.icon));
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Skipped existing: ${filePath}`);
  }
});
