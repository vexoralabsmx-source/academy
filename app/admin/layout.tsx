import { AdminSidebar } from "@/components/layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
