import React from 'react';
import { FileText, Image as ImageIcon, Eye, Share2, Download, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { CompanyVaultDocument } from '@/services/admin/companyVault.service';

interface CompanyVaultCardProps {
  doc: CompanyVaultDocument;
  onEdit: (doc: CompanyVaultDocument) => void;
  onDelete: (id: number) => void;
}

export function CompanyVaultCard({ doc, onEdit, onDelete }: CompanyVaultCardProps) {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <ImageIcon size={20} className="text-blue-500" />;
    if (mimeType.includes('pdf')) return <FileText size={20} className="text-red-500" />;
    return <FileText size={20} className="text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
      <div className="flex justify-between items-start mb-4 w-full">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#222222] flex items-center justify-center shrink-0">
            {getFileIcon(doc.fileType)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white truncate" title={doc.fileName}>
              {doc.fileName}
            </h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono tracking-wider truncate">
              {doc.key}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 flex-1 mb-4">
        {doc.description && <p className="line-clamp-2 text-sm">{doc.description}</p>}
        <div className="flex justify-between pt-2 mt-2 border-t border-gray-50 dark:border-white/5">
          <span className="text-xs">{formatFileSize(doc.fileSize)}</span>
          <span className="text-xs">{new Date(doc.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <a
          href={doc.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <Eye size={16} />
          View
        </a>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              navigator.clipboard.writeText(doc.fileUrl);
              toast.success('Link copied to clipboard');
            }}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
            title="Share / Copy Link"
          >
            <Share2 size={16} />
          </button>
          <a
            href={doc.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
            title="Download"
          >
            <Download size={16} />
          </a>
          <button
            onClick={() => onEdit(doc)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors"
            title="Edit Details"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(doc.id)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
