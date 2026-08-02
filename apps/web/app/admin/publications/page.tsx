'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminNav } from '@/components/admin/admin-nav';
import { PublicationForm } from '@/components/admin/publication-form';
import {
  createPublication,
  deletePublication,
  listCategories,
  listPublications,
  logout,
  updatePublication,
  type ApiCategory,
  type ApiPublication,
  type PublicationInput,
} from '@/lib/admin-api';

function PublicationsAdmin() {
  const router = useRouter();
  const [publications, setPublications] = useState<ApiPublication[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingPublication, setEditingPublication] = useState<ApiPublication | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [publicationsData, categoriesData] = await Promise.all([listPublications(), listCategories()]);
      setPublications(publicationsData);
      setCategories(categoriesData);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'No se pudieron cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCreateOrUpdate(input: PublicationInput) {
    if (editingPublication) {
      await updatePublication(editingPublication.id, input);
      setEditingPublication(null);
    } else {
      await createPublication(input);
    }
    await refresh();
  }

  async function handleDelete(publication: ApiPublication) {
    if (!confirm(`¿Borrar "${publication.title}"?`)) return;
    await deletePublication(publication.id);
    if (editingPublication?.id === publication.id) setEditingPublication(null);
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
        <h1 className="text-3xl font-black tracking-tight">Publicaciones académicas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se muestran en la página pública de Contenidos → Publicaciones académicas.
        </p>
      </div>

      <div className="mt-8">
        <PublicationForm
          editingPublication={editingPublication}
          categories={categories}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingPublication(null)}
        />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <h2 className="font-bold">Publicaciones cargadas ({publications.length})</h2>

        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : null}
        {loadError ? <p className="text-sm text-destructive">{loadError}</p> : null}

        {!loading && !loadError && publications.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay publicaciones cargadas.</p>
        ) : null}

        {publications.map((publication) => (
          <div key={publication.id} className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{publication.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {publication.type}
                {publication.year ? ` · ${publication.year}` : ''} · {publication.venue}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingPublication(publication)}>
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(publication)}>
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function AdminPublicationsPage() {
  return (
    <AdminGuard>
      <PublicationsAdmin />
    </AdminGuard>
  );
}
