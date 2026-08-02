'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminNav } from '@/components/admin/admin-nav';
import { EventForm } from '@/components/admin/event-form';
import {
  createEvent,
  deleteEvent,
  listCategories,
  listEvents,
  logout,
  updateEvent,
  type ApiCategory,
  type ApiEvent,
  type EventInput,
} from '@/lib/admin-api';

function EventsAdmin() {
  const router = useRouter();
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<ApiEvent | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [eventsData, categoriesData] = await Promise.all([listEvents(), listCategories()]);
      setEvents(eventsData);
      setCategories(categoriesData);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'No se pudieron cargar los eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCreateOrUpdate(input: EventInput) {
    if (editingEvent) {
      await updateEvent(editingEvent.id, input);
      setEditingEvent(null);
    } else {
      await createEvent(input);
    }
    await refresh();
  }

  async function handleDelete(event: ApiEvent) {
    if (!confirm(`¿Borrar "${event.title}"?`)) return;
    await deleteEvent(event.id);
    if (editingEvent?.id === event.id) setEditingEvent(null);
    await refresh();
  }

  async function handleLogout() {
    await logout();
    router.push('/admin/login');
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <AdminNav />
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-black tracking-tight">Eventos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se muestran en la página pública de Comunidad → Eventos.
        </p>
      </div>

      <div className="mt-8">
        <EventForm
          editingEvent={editingEvent}
          categories={categories}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingEvent(null)}
        />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <h2 className="font-bold">Eventos cargados ({events.length})</h2>

        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : null}
        {loadError ? <p className="text-sm text-destructive">{loadError}</p> : null}

        {!loading && !loadError && events.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay eventos cargados.</p>
        ) : null}

        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{event.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {new Date(event.startsAt).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })} ·{' '}
                {event.organizer}
                {event.topics.length > 0 ? ` · ${event.topics.map((t) => t.name).join(', ')}` : ''}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingEvent(event)}>
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(event)}>
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function AdminEventsPage() {
  return (
    <AdminGuard>
      <EventsAdmin />
    </AdminGuard>
  );
}
