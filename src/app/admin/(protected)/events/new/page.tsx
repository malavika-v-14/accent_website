import { requireAdmin } from "@/lib/admin/auth";
import { EventForm } from "@/components/admin/Forms";

export default async function NewEventPage() {
  await requireAdmin();
  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">EVENTS</p>
          <h1>Create event</h1>
          <p>Save as a draft to review it before it goes live, or publish it right away.</p>
        </div>
      </header>
      <EventForm />
    </>
  );
}