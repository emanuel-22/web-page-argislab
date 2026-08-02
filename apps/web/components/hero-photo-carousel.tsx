'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Photo = {
  src: string;
  alt: string;
};

const PHOTOS: Photo[] = [
  { src: '/charla1.png', alt: 'Emanuel Barboza dando una charla' },
  { src: '/charla2.jpg', alt: 'Emanuel Barboza dando una charla en una universidad' },
];

const INTERVAL_MS = 5000;

export function HeroPhotoCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % PHOTOS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-4xl border bg-card shadow-xl">
      {PHOTOS.map((photo, index) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        {PHOTOS.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Mostrar foto ${index + 1}`}
            aria-current={index === active}
            className={`h-2 rounded-full transition-all ${
              index === active ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
