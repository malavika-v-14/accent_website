import { requireAdmin } from "@/lib/admin/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <div className="admin-shell"><a className="skip-link" href="#admin-content">Skip to content</a><AdminNav name={admin.name} /><main id="admin-content" className="admin-main">{children}</main></div>;
}
