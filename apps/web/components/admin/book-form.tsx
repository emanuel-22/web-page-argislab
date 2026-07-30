'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@repo/ui/components/button';
import { CATEGORIES } from '@/data/books';
import type { ApiBook, BookInput } from '@/lib/admin-api';

const EMPTY_FORM = {
  title: '',
  category: CATEGORIES[0]!.name,
  author: '',
  blurb: '',
  href: '',
  coverUrl: '',
  topics: '',
};

function toFormState(book: ApiBook | null) {
  if (!book) return EMPTY_FORM;
  return {
    title: book.title,
    category: book.category,
    author: book.author ?? '',
    blurb: book.blurb ?? '',
    href: book.href ?? '',
    coverUrl: book.coverUrl ?? '',
    topics: book.topics.join(', '),
  };
}

const inputClass =
  'rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function BookForm({
  editingBook,
  onSubmit,
  onCancel,
}: {
  editingBook: ApiBook | null;
  onSubmit: (input: BookInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(() => toFormState(editingBook));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(editingBook?.id ?? 'new');

  if ((editingBook?.id ?? 'new') !== formKey) {
    setFormKey(editingBook?.id ?? 'new');
    setForm(toFormState(editingBook));
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const topics = form.topics
      .split(',')
      .map((topic) => topic.trim())
      .filter(Boolean);

    if (!form.title.trim() || topics.length === 0) {
      setError('Título y al menos un tema son obligatorios.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        category: form.category,
        author: form.author.trim() || undefined,
        blurb: form.blurb.trim() || undefined,
        href: form.href.trim() || undefined,
        coverUrl: form.coverUrl.trim() || undefined,
        topics,
      });
      if (!editingBook) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el libro');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <h2 className="font-bold">{editingBook ? `Editar: ${editingBook.title}` : 'Agregar lectura recomendada'}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium">
            Título *
          </label>
          <input
            id="title"
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className="text-sm font-medium">
            Autor
          </label>
          <input
            id="author"
            className={inputClass}
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-medium">
            Categoría *
          </label>
          <select
            id="category"
            className={inputClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="topics" className="text-sm font-medium">
            Temas * (separados por coma)
          </label>
          <input
            id="topics"
            className={inputClass}
            placeholder="Programación, Diseño y arquitectura"
            value={form.topics}
            onChange={(e) => setForm({ ...form, topics: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="href" className="text-sm font-medium">
            Link (buscar el libro)
          </label>
          <input
            id="href"
            className={inputClass}
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="coverUrl" className="text-sm font-medium">
            URL de la portada
          </label>
          <input
            id="coverUrl"
            className={inputClass}
            value={form.coverUrl}
            onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="blurb" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="blurb"
          rows={3}
          className={inputClass}
          value={form.blurb}
          onChange={(e) => setForm({ ...form, blurb: e.target.value })}
        />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : editingBook ? 'Guardar cambios' : 'Agregar libro'}
        </Button>
        {editingBook ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
