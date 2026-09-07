import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Las portadas de libros ahora son locales (apps/web/public/covers/).
    // Estos hosts quedan para imágenes que siguen siendo remotas:
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' }, // miniaturas de YouTube
      { protocol: 'https', hostname: '**.static.prezi.com' }, // previews de Prezi (charlas)
      { protocol: 'https', hostname: 'media.licdn.com' }, // 1 portada pendiente de bajar a mano
    ],
  },
  async rewrites() {
    return [
      { source: '/sobre', destination: '/about' },
      { source: '/actividades', destination: '/activities' },
      { source: '/actividades/charlas-anteriores', destination: '/activities/charlas-anteriores' },
      { source: '/comunidad', destination: '/community' },
      { source: '/comunidad/eventos', destination: '/community/eventos' },
      { source: '/contenidos', destination: '/featured_contents' },
      { source: '/contenidos/libros-recomendados', destination: '/featured_contents/libros-recomendados' },
      { source: '/recursos', destination: '/useful_resources' },
      { source: '/recursos/materiales-de-charlas', destination: '/useful_resources/materiales-de-charlas' },
      { source: '/recursos/paginas-web-recomendadas', destination: '/useful_resources/paginas-web-recomendadas' },
    ];
  },
};

export default nextConfig;
