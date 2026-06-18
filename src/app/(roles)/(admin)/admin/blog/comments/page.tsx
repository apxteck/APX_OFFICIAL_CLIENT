import React, { Suspense } from 'react';
import { api } from '@/lib/axios';
import { CommentsManager } from './_components/CommentsManager';
import BlogLoading from '../loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog Comments | APXTeck Admin",
  description: "Manage and moderate blog comments.",
};

async function CommentsDataFetcher() {
  let initialComments: any[] = [];
  try {
    const res = await api.getAllCommentsAdmin(1, 1000); 
    if (res.success) {
      initialComments = res.data?.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch comments", error);
  }

  return <CommentsManager initialComments={initialComments} />;
}

export default function BlogCommentsAdminPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <CommentsDataFetcher />
    </Suspense>
  );
}
