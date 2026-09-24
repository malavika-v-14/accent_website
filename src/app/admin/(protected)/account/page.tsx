import { requireAdmin } from "@/lib/admin/auth";
import { PasswordForm } from "@/components/admin/Forms";

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">ACCOUNT</p>
          <h1>Account</h1>
          <p>Manage your workspace sign-in details.</p>
        </div>
      </header>
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>Profile</h2></div>
          <dl className="admin-detail-list">
            <div><dt>Name</dt><dd>{admin.name}</dd></div>
            <div><dt>Email</dt><dd>{admin.email}</dd></div>
          </dl>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>Change password</h2></div>
          <PasswordForm />
        </section>
      </div>
    </>
  );
}