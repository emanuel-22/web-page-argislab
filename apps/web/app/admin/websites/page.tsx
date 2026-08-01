'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminNav } from '@/components/admin/admin-nav';
import { WebsiteForm } from '@/components/admin/website-form';
import {
  createWebsite,
  deleteWebsite,
  listCategories,
  listWebsites,
  logout,
  updateWebsite,
  type ApiCategory,
  type ApiWebsite,
  type WebsiteInput,
} from '@/lib/admin-api';

function WebsitesAdmin() {
  const router = useRouter();
  const [websites, setWebsites] = useState<ApiWebsite[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<ApiWebsite | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [websitesData, categoriesData] = await Promise.all([listWebsites(), listCategories()]);
      setWebsites(websitesData);
      setCategories(categoriesData);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'No se pudieron cargar las páginas web');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCreateOrUpdate(input: WebsiteInput) {
    if (editingWebsite) {
      await updateWebsite(editingWebsite.id, input);
      setEditingWebsite(null);
    } else {
      await createWebsite(input);
    }
    await refresh();
  }

  async function handleDelete(website: ApiWebsite) {
    if (!confirm(`¿Borrar "${website.title}"?`)) return;
    await deleteWebsite(website.id);
    if (editingWebsite?.id === website.id) setEditingWebsite(null);
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
        <h1 className="text-3xl font-black tracking-tight">Páginas web recomendadas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se muestran en la página pública de Recursos → Páginas web recomendadas.
        </p>
      </div>

      <div className="mt-8">
        <WebsiteForm
          editingWebsite={editingWebsite}
          categories={categories}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingWebsite(null)}
        />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <h2 className="font-bold">Páginas web cargadas ({websites.length})</h2>

        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : null}
        {loadError ? <p className="text-sm text-destructive">{loadError}</p> : null}

        {!loading && !loadError && websites.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay páginas web cargadas.</p>
        ) : null}

        {websites.map((website) => (
          <div key={website.id} className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{website.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {website.category.name}
                {website.topics.length > 0 ? ` · ${website.topics.map((t) => t.name).join(', ')}` : ''}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingWebsite(website)}>
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(website)}>
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function AdminWebsitesPage() {
  return (
    <AdminGuard>
      <WebsitesAdmin />
    </AdminGuard>
  );
}
