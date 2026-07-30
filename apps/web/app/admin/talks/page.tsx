'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminNav } from '@/components/admin/admin-nav';
import { TalkForm } from '@/components/admin/talk-form';
import { createTalk, deleteTalk, listTalks, logout, updateTalk, type ApiTalk, type TalkInput } from '@/lib/admin-api';

function TalksAdmin() {
  const router = useRouter();
  const [talks, setTalks] = useState<ApiTalk[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingTalk, setEditingTalk] = useState<ApiTalk | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listTalks();
      setTalks(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'No se pudieron cargar las charlas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCreateOrUpdate(input: TalkInput) {
    if (editingTalk) {
      await updateTalk(editingTalk.id, input);
      setEditingTalk(null);
    } else {
      await createTalk(input);
    }
    await refresh();
  }

  async function handleDelete(talk: ApiTalk) {
    if (!confirm(`¿Borrar "${talk.title}"?`)) return;
    await deleteTalk(talk.id);
    if (editingTalk?.id === talk.id) setEditingTalk(null);
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
        <h1 className="text-3xl font-black tracking-tight">Materiales de charlas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se muestran en la página pública de Recursos → Materiales de charlas.
        </p>
      </div>

      <div className="mt-8">
        <TalkForm editingTalk={editingTalk} onSubmit={handleCreateOrUpdate} onCancel={() => setEditingTalk(null)} />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <h2 className="font-bold">Charlas cargadas ({talks.length})</h2>

        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : null}
        {loadError ? <p className="text-sm text-destructive">{loadError}</p> : null}

        {!loading && !loadError && talks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay charlas cargadas.</p>
        ) : null}

        {talks.map((talk) => (
          <div key={talk.id} className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{talk.title}</p>
              <p className="truncate text-sm text-muted-foreground">{talk.area}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingTalk(talk)}>
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(talk)}>
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function AdminTalksPage() {
  return (
    <AdminGuard>
      <TalksAdmin />
    </AdminGuard>
  );
}
