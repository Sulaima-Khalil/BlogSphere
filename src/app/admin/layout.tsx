import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="p-4 sm:p-6 md:ml-64 md:p-8">{children}</div>
    </div>
  );
}
