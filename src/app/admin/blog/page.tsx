"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { BlogEditor } from "@/components/admin/blog-editor";

const AdminBlogPage = () => {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-[var(--dark-blue)]">
        <AdminSidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <BlogEditor />
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminBlogPage;
