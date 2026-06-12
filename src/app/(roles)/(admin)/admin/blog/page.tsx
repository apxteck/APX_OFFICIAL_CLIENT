import React from "react";
import { Metadata } from "next";
import { BlogManager } from "./_components/BlogManager";

export const metadata: Metadata = {
  title: "Blog Management | APXTeck Admin",
  description: "Manage articles, AI drafts, categories, and publications.",
};

export default function BlogManagementPage() {
  return <BlogManager />;
}
