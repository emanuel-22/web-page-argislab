'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  from?: 'left' | 'right' | 'bottom';
  delay?: number;
  className?: string;
};

export function Reveal({ children, from = 'bottom', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Re-run every time the element enters or leaves the viewport
        // (scrolling up and down replays the animation).
        setShown(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden =
    from === 'left'
      ? '-translate-x-16 opacity-0'
      : from === 'right'
        ? 'translate-x-16 opacity-0'
        : 'translate-y-10 opacity-0';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-x-0 translate-y-0 opacity-100' : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}
