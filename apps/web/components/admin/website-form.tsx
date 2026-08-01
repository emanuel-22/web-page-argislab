'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@repo/ui/components/button';
import { CategoryTopicSelect } from '@/components/admin/category-topic-select';
import type { ApiCategory, ApiWebsite, WebsiteInput } from '@/lib/admin-api';

const EMPTY_FORM = {
  title: '',
  categoryId: null as number | null,
  topicIds: [] as number[],
  href: '',
  description: '',
  thumbnailUrl: '',
};

function toFormState(website: ApiWebsite | null) {
  if (!website) return EMPTY_FORM;
  return {
    title: website.title,
    categoryId: website.categoryId,
    topicIds: website.topics.map((t) => t.id),
    href: website.href,
    description: website.description ?? '',
    thumbnailUrl: website.thumbnailUrl ?? '',
  };
}

const inputClass =
  'rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function WebsiteForm({
  editingWebsite,
  categories,
  onSubmit,
  onCancel,
}: {
  editingWebsite: ApiWebsite | null;
  categories: ApiCategory[];
  onSubmit: (input: WebsiteInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(() => toFormState(editingWebsite));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(editingWebsite?.id ?? 'new');

  if ((editingWebsite?.id ?? 'new') !== formKey) {
    setFormKey(editingWebsite?.id ?? 'new');
    setForm(toFormState(editingWebsite));
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.categoryId || !form.href.trim()) {
      setError('Título, categoría y link son obligatorios.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        categoryId: form.categoryId,
        topicIds: form.topicIds,
        href: form.href.trim(),
        description: form.description.trim() || undefined,
        thumbnailUrl: form.thumbnailUrl.trim() || undefined,
      });
      if (!editingWebsite) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar la página web');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <h2 className="font-bold">{editingWebsite ? `Editar: ${editingWebsite.title}` : 'Agregar página web recomendada'}</h2>

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

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="thumbnailUrl" className="text-sm font-medium">
            URL de la vista previa (imagen)
          </label>
          <input
            id="thumbnailUrl"
            className={inputClass}
            placeholder="Dejalo vacío para tomarla automáticamente del link"
            value={form.thumbnailUrl}
            onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
          />
          {!editingWebsite ? (
            <p className="text-xs text-muted-foreground">
              Si lo dejás vacío, al crear la página intentamos sacar la imagen automáticamente del link de arriba.
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          rows={3}
          className={inputClass}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Guardando…' : editingWebsite ? 'Guardar cambios' : 'Agregar página web'}
        </Button>
        {editingWebsite ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
