'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminNav } from '@/components/admin/admin-nav';
import { BookForm } from '@/components/admin/book-form';
import { createBook, deleteBook, listBooks, logout, updateBook, type ApiBook, type BookInput } from '@/lib/admin-api';

function BooksAdmin() {
  const router = useRouter();
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<ApiBook | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listBooks();
      setBooks(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'No se pudieron cargar los libros');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCreateOrUpdate(input: BookInput) {
    if (editingBook) {
      await updateBook(editingBook.id, input);
      setEditingBook(null);
    } else {
      await createBook(input);
    }
    await refresh();
  }

  async function handleDelete(book: ApiBook) {
    if (!confirm(`¿Borrar "${book.title}"?`)) return;
    await deleteBook(book.id);
    if (editingBook?.id === book.id) setEditingBook(null);
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
        <h1 className="text-3xl font-black tracking-tight">Lecturas recomendadas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se muestran en la página pública de Recursos → Lecturas recomendadas.
        </p>
      </div>

      <div className="mt-8">
        <BookForm editingBook={editingBook} onSubmit={handleCreateOrUpdate} onCancel={() => setEditingBook(null)} />
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <h2 className="font-bold">Libros cargados ({books.length})</h2>

        {loading ? <p className="text-sm text-muted-foreground">Cargando…</p> : null}
        {loadError ? <p className="text-sm text-destructive">{loadError}</p> : null}

        {!loading && !loadError && books.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay libros cargados.</p>
        ) : null}

        {books.map((book) => (
          <div key={book.id} className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{book.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {book.category} · {book.topics.join(', ')}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditingBook(book)}>
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(book)}>
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function AdminBooksPage() {
  return (
    <AdminGuard>
      <BooksAdmin />
    </AdminGuard>
  );
}
