import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/auth";
import { serviceKeys } from "@/lib/service-defaults";
import { ServiceForm } from "@/components/admin/Forms";

export default async function ServicesPage() {
  await requireAdmin();
  const rows = await prisma.serviceContent.findMany();
  const services = serviceKeys.map((service) => {
    const row = rows.find((r) => r.id === service.id);
    return row
      ? { id: service.id, audience: service.audience, title: row.title, tag: row.tag, text: row.description, details: row.details }
      : { id: service.id, audience: service.audience, title: service.title, tag: service.tag, text: service.text, details: service.details };
  });
  const colleges = services.filter((s) => s.audience === "colleges");
  const companies = services.filter((s) => s.audience === "companies");

  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">SERVICES</p>
          <h1>Services</h1>
          <p>Edit the service descriptions shown on the public website.</p>
        </div>
      </header>
      <div className="admin-stack">
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>For colleges</h2></div>
          <div className="admin-service-list">
            {colleges.map((service) => (
              <details key={service.id} className="admin-service-item">
                <summary>{service.title}</summary>
                <ServiceForm service={service} />
              </details>
            ))}
          </div>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>For companies</h2></div>
          <div className="admin-service-list">
            {companies.map((service) => (
              <details key={service.id} className="admin-service-item">
                <summary>{service.title}</summary>
                <ServiceForm service={service} />
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}