export type MediumPost = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  excerpt: string;
  thumbnailUrl?: string;
};

// Cargá acá a mano los artículos de Medium que quieras mostrar en /contenidos.
// Ejemplo:
// {
//   id: '1',
//   title: 'Título del artículo',
//   link: 'https://medium.com/@emabarboza/...',
//   publishedAt: '2025-01-15T12:00:00.000Z',
//   excerpt: 'Primeras líneas del artículo...',
//   thumbnailUrl: 'https://.../portada.jpg',
// }
export const MEDIUM_POSTS: MediumPost[] = [];
