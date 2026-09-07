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
      { source: '/comunidad', destination: '/community' },
      { source: '/comunidad/eventos', destination: '/community/eventos' },
      { source: '/recursos', destination: '/resources' },
      { source: '/recursos/libros-recomendados', destination: '/resources/libros-recomendados' },
      { source: '/recursos/materiales-de-charlas', destination: '/resources/materiales-de-charlas' },
      { source: '/recursos/paginas-web-recomendadas', destination: '/resources/paginas-web-recomendadas' },
    ];
  },
  async redirects() {
    return [
      // "Explorar" pasó a llamarse "Recursos" y se unificó bajo /recursos.
      { source: '/contenidos', destination: '/recursos', permanent: true },
      { source: '/contenidos/libros-recomendados', destination: '/recursos/libros-recomendados', permanent: true },
      // "Charlas anteriores" se integró en /actividades como línea de tiempo.
      { source: '/actividades/charlas-anteriores', destination: '/actividades', permanent: true },
      // Las rutas internas en inglés existen por los rewrites: redirigimos a la
      // URL canónica en español para evitar contenido duplicado.
      { source: '/about', destination: '/sobre', permanent: true },
      { source: '/activities', destination: '/actividades', permanent: true },
      { source: '/community', destination: '/comunidad', permanent: true },
      { source: '/community/eventos', destination: '/comunidad/eventos', permanent: true },
      { source: '/resources', destination: '/recursos', permanent: true },
      { source: '/resources/libros-recomendados', destination: '/recursos/libros-recomendados', permanent: true },
      { source: '/resources/materiales-de-charlas', destination: '/recursos/materiales-de-charlas', permanent: true },
      { source: '/resources/paginas-web-recomendadas', destination: '/recursos/paginas-web-recomendadas', permanent: true },
    ];
  },
};

export default nextConfig;
