import React, { useRef } from 'react';
import { CompanyVaultDocument } from '@/services/admin/companyVault.service';
import { motion } from 'framer-motion';
import { X, Save, Archive, Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  formLogic: any;
}

export default function CompanyVaultFormModal({ onClose, formLogic }: Props) {
  const { editingDocument, isSubmitting, handleSubmit } = formLogic;
  const isEditing = !!editingDocument;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await handleSubmit(e);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-[#111111] rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10"
      >
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-indigo-600 dark:text-white">
              <Archive size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Document' : 'Upload Document'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isEditing
                  ? 'Update vault document details'
                  : 'Securely upload a new document to the vault'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Document Key / Identifier *
              </label>
              <input
                required
                type="text"
                name="key"
                defaultValue={editingDocument?.key}
                placeholder="e.g. INCORPORATION_CERT_2023"
                className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all uppercase"
              />
              <p className="text-xs text-gray-500">Must be a unique identifier.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editingDocument?.description || ''}
                rows={3}
                placeholder="Brief description of the document..."
                className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                File Upload {isEditing ? '(Optional to replace)' : '*'}
              </label>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1A1A1A] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Click to browse or drag and drop
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {isEditing ? 'Leave blank to keep existing file' : 'PDF, DOCX, Images up to 10MB'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="document"
                  className="hidden"
                  onChange={(e) => {
                    const fileName = e.target.files?.[0]?.name;
                    if (fileName) {
                      toast.success(`Selected file: ${fileName}`, { id: 'file-selected' });
                    }
                  }}
                />
              </div>
              {isEditing && editingDocument?.fileName && (
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                  Current file: {editingDocument.fileName}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 min-h-[44px] rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? 'Save Changes' : 'Upload Document'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
