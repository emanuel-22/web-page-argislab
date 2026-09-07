export type InstagramPost = {
  id: string;
  permalink: string;
  mediaUrl: string;
  caption?: string;
  likeCount?: number;
  commentsCount?: number;
  timestamp: string;
};

export type InstagramProfile = {
  username: string;
  profilePictureUrl?: string;
  followersCount?: number;
  mediaCount?: number;
};

// Cargá acá a mano las publicaciones que quieras mostrar en /contenidos.
// Ejemplo:
// {
//   id: '1',
//   permalink: 'https://www.instagram.com/p/XXXXXXXXX/',
//   mediaUrl: 'https://.../imagen.jpg',
//   caption: 'Texto de la publicación',
//   timestamp: '2025-01-15T12:00:00.000Z',
// }
export const INSTAGRAM_POSTS: InstagramPost[] = [];

export const INSTAGRAM_PROFILE: InstagramProfile | null = null;
