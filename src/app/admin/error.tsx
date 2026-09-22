"use client";
export default function AdminError({ reset }: { reset: () => void }) {
  return <main className="admin-login"><div className="admin-login-card"><p className="admin-kicker">ACCENT WORKSPACE</p><h1>Unable to load this page.</h1><p className="admin-muted">Please try again. If this continues, ask your site administrator to check the database connection and admin setup.</p><button className="admin-button" onClick={reset}>Try again</button><a className="admin-text-link" href="/">Back to the website</a></div></main>;
}
