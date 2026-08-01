'use client';

import type { ApiCategory } from '@/lib/admin-api';

const selectClass =
  'rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function CategoryTopicSelect({
  categories,
  categoryId,
  topicIds,
  onCategoryChange,
  onTopicIdsChange,
}: {
  categories: ApiCategory[];
  categoryId: number | null;
  topicIds: number[];
  onCategoryChange: (categoryId: number) => void;
  onTopicIdsChange: (topicIds: number[]) => void;
}) {
  const category = categories.find((c) => c.id === categoryId) ?? null;

  function toggleTopic(topicId: number) {
    onTopicIdsChange(topicIds.includes(topicId) ? topicIds.filter((id) => id !== topicId) : [...topicIds, topicId]);
  }

  return (
    <div className="flex flex-col gap-4 sm:col-span-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="categoryId" className="text-sm font-medium">
          Categoría *
        </label>
        <select
          id="categoryId"
          className={selectClass}
          value={categoryId ?? ''}
          onChange={(e) => onCategoryChange(Number(e.target.value))}
          required
        >
          <option value="" disabled>
            Seleccioná una categoría
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Temas (opcional)</span>
        {category && category.topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {category.topics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  topicIds.includes(topic.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {category ? 'Esta categoría todavía no tiene temas.' : 'Elegí una categoría para ver sus temas.'}
          </p>
        )}
      </div>
    </div>
  );
}
