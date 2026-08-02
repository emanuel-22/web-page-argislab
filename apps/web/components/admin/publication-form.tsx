'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@repo/ui/components/button';
import { CategoryTopicSelect } from '@/components/admin/category-topic-select';
import { PUBLICATION_TYPES, type ApiCategory, type ApiPublication, type PublicationInput } from '@/lib/admin-api';

const EMPTY_FORM = {
  title: '',
  categoryId: null as number | null,
  topicIds: [] as number[],
  authors: '',
  venue: '',
  type: PUBLICATION_TYPES[0] as (typeof PUBLICATION_TYPES)[number],
  year: '',
  href: '',
};

function toFormState(publication: ApiPublication | null) {
  if (!publication) return EMPTY_FORM;
  return {
    title: publication.title,
    categoryId: publication.categoryId,
    topicIds: publication.topics.map((t) => t.id),
    authors: publication.authors,
    venue: publication.venue,
    type: publication.type,
    year: publication.year ?? '',
    href: publication.href,
  };
}

const inputClass =
  'rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function PublicationForm({
  editingPublication,
  categories,
  onSubmit,
  onCancel,
}: {
  editingPublication: ApiPublication | null;
  categories: ApiCategory[];
  onSubmit: (input: PublicationInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(() => toFormState(editingPublication));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(editingPublication?.id ?? 'new');

  if ((editingPublication?.id ?? 'new') !== formKey) {
    setFormKey(editingPublication?.id ?? 'new');
    setForm(toFormState(editingPublication));
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.categoryId || !form.authors.trim() || !form.venue.trim() || !form.href.trim()) {
      setError('Título, categoría, autores, venue y link son obligatorios.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        categoryId: form.categoryId,
        topicIds: form.topicIds,
        authors: form.authors.trim(),
        venue: form.venue.trim(),
        type: form.type,
        year: form.year.trim() || undefined,
        href: form.href.trim(),
      });
      if (!editingPublication) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar la publicación');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <h2 className="font-bold">
        {editingPublication ? `Editar: ${editingPublication.title}` : 'Agregar publicación'}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
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

        <CategoryTopicSelect
          categories={categories}
          categoryId={form.categoryId}
          topicIds={form.topicIds}
          onCategoryChange={(categoryId) => setForm({ ...form, categoryId, topicIds: [] })}
          onTopicIdsChange={(topicIds) => setForm({ ...form, topicIds })}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm font-medium">
            Tipo *
          </label>
          <select
            id="type"
            className={inputClass}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as (typeof PUBLICATION_TYPES)[number] })}
          >
            {PUBLICATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="year" className="text-sm font-medium">
            Año
          </label>
          <input id="year" className={inputClass} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="authors" className="text-sm font-medium">
            Autores *
          </label>
          <input
            id="authors"
            className={inputClass}
            placeholder="Apellido, Nombre; Apellido, Nombre"
            value={form.authors}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="venue" className="text-sm font-medium">
            Venue / editorial *
          </label>
          <input
            id="venue"
            className={inputClass}
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="href" className="text-sm font-medium">
            Link *
          </label>
          <input
            id="href"
            className={inputClass}
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
            required
          />
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : editingPublication ? 'Guardar cambios' : 'Agregar publicación'}
        </Button>
        {editingPublication ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
