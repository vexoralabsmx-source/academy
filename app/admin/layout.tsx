import { requireAdmin } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/layout";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full">{children}</div>
    </div>
  );
}
