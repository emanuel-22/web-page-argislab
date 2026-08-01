'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@repo/ui/components/button';
import type { ApiTalk, TalkInput } from '@/lib/admin-api';

const EMPTY_FORM = {
  title: '',
  area: '',
  href: '',
  description: '',
  thumbnailUrl: '',
};

function toFormState(talk: ApiTalk | null) {
  if (!talk) return EMPTY_FORM;
  return {
    title: talk.title,
    area: talk.area,
    href: talk.href,
    description: talk.description ?? '',
    thumbnailUrl: talk.thumbnailUrl ?? '',
  };
}

const inputClass =
  'rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function TalkForm({
  editingTalk,
  onSubmit,
  onCancel,
}: {
  editingTalk: ApiTalk | null;
  onSubmit: (input: TalkInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(() => toFormState(editingTalk));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(editingTalk?.id ?? 'new');

  if ((editingTalk?.id ?? 'new') !== formKey) {
    setFormKey(editingTalk?.id ?? 'new');
    setForm(toFormState(editingTalk));
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.area.trim() || !form.href.trim()) {
      setError('Título, área y link son obligatorios.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        area: form.area.trim(),
        href: form.href.trim(),
        description: form.description.trim() || undefined,
        thumbnailUrl: form.thumbnailUrl.trim() || undefined,
      });
      if (!editingTalk) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar la charla');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <h2 className="font-bold">{editingTalk ? `Editar: ${editingTalk.title}` : 'Agregar material de charla'}</h2>

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
          <label htmlFor="area" className="text-sm font-medium">
            Área *
          </label>
          <input
            id="area"
            className={inputClass}
            placeholder="Agilidad y gestión"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="href" className="text-sm font-medium">
            Link (Prezi, Drive, etc.) *
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
          {!editingTalk ? (
            <p className="text-xs text-muted-foreground">
              Si lo dejás vacío, al crear la charla intentamos sacar la imagen automáticamente del link de arriba.
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
          {saving ? 'Guardando…' : editingTalk ? 'Guardar cambios' : 'Agregar charla'}
        </Button>
        {editingTalk ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
