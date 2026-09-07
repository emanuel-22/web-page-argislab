export type YoutubeVideo = {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  thumbnailUrl: string;
};

// Cargá acá a mano los videos de YouTube que quieras mostrar en /contenidos.
// Ejemplo:
// {
//   id: 'VIDEO_ID',
//   title: 'Título del video',
//   link: 'https://www.youtube.com/watch?v=VIDEO_ID',
//   publishedAt: '2025-01-15T12:00:00.000Z',
//   thumbnailUrl: 'https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg',
// }
export const YOUTUBE_VIDEOS: YoutubeVideo[] = [];
