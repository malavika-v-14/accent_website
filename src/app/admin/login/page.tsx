import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin/auth";
import { LoginForm } from "@/components/admin/Forms";
import AccentMark from "@/components/AccentMark";

export default async function LoginPage({ searchParams }: { searchParams: { changed?: string } }) {
  if (await getAdmin()) redirect("/admin");
  return <main className="admin-login"><div className="admin-login-card"><Link href="/" className="accent-logo"><AccentMark />accent</Link><p className="admin-kicker">THE ACCENT WORKSPACE</p><h1>Welcome back.</h1><p className="admin-muted">Sign in to manage your events, services and conversations.</p>{searchParams.changed && <p className="admin-notice" role="status">Password updated. Sign in with your new password.</p>}<LoginForm /><p className="admin-login-note">Access is limited to the Accent team.<br />For account access, contact your site administrator.</p><Link className="admin-text-link" href="/">← Back to the website</Link></div></main>;
}
