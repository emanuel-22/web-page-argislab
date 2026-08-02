'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@repo/ui/components/button';
import { CategoryTopicSelect } from '@/components/admin/category-topic-select';
import { EVENT_AUDIENCES, EVENT_MODALITIES, type ApiCategory, type ApiEvent, type EventInput } from '@/lib/admin-api';

function toDatetimeLocal(iso: string | null) {
  if (!iso) return '';
  return iso.slice(0, 16);
}

const EMPTY_FORM = {
  title: '',
  categoryId: null as number | null,
  topicIds: [] as number[],
  organizer: '',
  startsAt: '',
  endsAt: '',
  modality: 'Presencial' as (typeof EVENT_MODALITIES)[number],
  location: '',
  audience: [] as (typeof EVENT_AUDIENCES)[number][],
  href: '',
  description: '',
  thumbnailUrl: '',
};

function toFormState(event: ApiEvent | null) {
  if (!event) return EMPTY_FORM;
  return {
    title: event.title,
    categoryId: event.categoryId,
    topicIds: event.topics.map((t) => t.id),
    organizer: event.organizer,
    startsAt: toDatetimeLocal(event.startsAt),
    endsAt: toDatetimeLocal(event.endsAt),
    modality: event.modality,
    location: event.location ?? '',
    audience: event.audience,
    href: event.href,
    description: event.description ?? '',
    thumbnailUrl: event.thumbnailUrl ?? '',
  };
}

const inputClass =
  'rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function EventForm({
  editingEvent,
  categories,
  onSubmit,
  onCancel,
}: {
  editingEvent: ApiEvent | null;
  categories: ApiCategory[];
  onSubmit: (input: EventInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(() => toFormState(editingEvent));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(editingEvent?.id ?? 'new');

  if ((editingEvent?.id ?? 'new') !== formKey) {
    setFormKey(editingEvent?.id ?? 'new');
    setForm(toFormState(editingEvent));
    setError(null);
  }

  function toggleAudience(value: (typeof EVENT_AUDIENCES)[number]) {
    setForm({
      ...form,
      audience: form.audience.includes(value) ? form.audience.filter((a) => a !== value) : [...form.audience, value],
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.categoryId || !form.organizer.trim() || !form.startsAt || !form.href.trim()) {
      setError('Título, categoría, organizador, fecha de inicio y link son obligatorios.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        categoryId: form.categoryId,
        topicIds: form.topicIds,
        organizer: form.organizer.trim(),
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : undefined,
        modality: form.modality,
        location: form.location.trim() || undefined,
        audience: form.audience,
        href: form.href.trim(),
        description: form.description.trim() || undefined,
        thumbnailUrl: form.thumbnailUrl.trim() || undefined,
      });
      if (!editingEvent) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el evento');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <h2 className="font-bold">{editingEvent ? `Editar: ${editingEvent.title}` : 'Agregar evento'}</h2>

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
          <label htmlFor="organizer" className="text-sm font-medium">
            Organiza *
          </label>
          <input
            id="organizer"
            className={inputClass}
            value={form.organizer}
            onChange={(e) => setForm({ ...form, organizer: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="startsAt" className="text-sm font-medium">
            Inicio *
          </label>
          <input
            id="startsAt"
            type="datetime-local"
            className={inputClass}
            value={form.startsAt}
            onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="endsAt" className="text-sm font-medium">
            Fin (opcional)
          </label>
          <input
            id="endsAt"
            type="datetime-local"
            className={inputClass}
            value={form.endsAt}
            onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="modality" className="text-sm font-medium">
            Modalidad
          </label>
          <select
            id="modality"
            className={inputClass}
            value={form.modality}
            onChange={(e) => setForm({ ...form, modality: e.target.value as (typeof EVENT_MODALITIES)[number] })}
          >
            {EVENT_MODALITIES.map((modality) => (
              <option key={modality} value={modality}>
                {modality}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="location" className="text-sm font-medium">
            {form.modality === 'Presencial' ? 'Lugar' : 'Plataforma (ej. Zoom, YouTube)'}
          </label>
          <input
            id="location"
            className={inputClass}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
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
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-medium">Público</span>
          <div className="flex flex-wrap gap-2">
            {EVENT_AUDIENCES.map((audience) => (
              <button
                key={audience}
                type="button"
                onClick={() => toggleAudience(audience)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  form.audience.includes(audience)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {audience}
              </button>
            ))}
          </div>
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
          {saving ? 'Guardando…' : editingEvent ? 'Guardar cambios' : 'Agregar evento'}
        </Button>
        {editingEvent ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
