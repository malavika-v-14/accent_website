import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/auth";
import { DeleteEvent, EventForm } from "@/components/admin/Forms";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) notFound();
  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">EVENTS</p>
          <h1>Edit event</h1>
          <p>Update the details below.</p>
        </div>
      </header>
      <EventForm
        event={{
          id: event.id,
          title: event.title,
          category: event.category,
          date: event.date.toISOString().slice(0, 10),
          location: event.location,
          description: event.description,
          isActive: event.isActive,
        }}
      />
      <div className="admin-stack">
        <DeleteEvent id={event.id} title={event.title} />
      </div>
    </>
  );
}