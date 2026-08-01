import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'luchosalazar.com' },
      { protocol: 'https', hostname: 'http2.mlstatic.com'},
      { protocol: 'https', hostname: 'media.licdn.com'},
      { protocol: 'https', hostname: 'www.yumpu.com'},
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com'},
      { protocol: 'https', hostname: 'blog.nicopaez.com'},
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com'},   
      { protocol: 'https', hostname: 'imgv2-2-f.scribdassets.com'}, 
      { protocol: 'https', hostname: 'images.cdn1.buscalibre.com'},   
      { protocol: 'https', hostname: 'website-assets.studocu.com'},
      { protocol: 'https', hostname: 'www.penguinlibros.com'},
      { protocol: 'https', hostname: 'contentv2.tap-commerce.com'},
      { protocol: 'https', hostname: '**.static.prezi.com'},

    ],
  },
  async rewrites() {
    return [
      { source: '/sobre', destination: '/about' },
      { source: '/actividades', destination: '/activities' },
      { source: '/comunidad', destination: '/community' },
      { source: '/contenidos', destination: '/featured_contents' },
      { source: '/recursos', destination: '/useful_resources' },
      { source: '/recursos/lecturas-recomendadas', destination: '/useful_resources/lecturas-recomendadas' },
      { source: '/recursos/materiales-de-charlas', destination: '/useful_resources/materiales-de-charlas' },
    ];
  },
};

export default nextConfig;
