'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { me } from '@/lib/admin-api';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'ok'>('checking');

  useEffect(() => {
    let active = true;
    me()
      .then(() => {
        if (active) setStatus('ok');
      })
      .catch(() => {
        router.replace('/admin/login');
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (status === 'checking') {
    return <p className="mx-auto max-w-6xl px-6 py-20 text-sm text-muted-foreground">Verificando sesión…</p>;
  }

  return <>{children}</>;
}
