import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { ScrollReveal } from '@/components/scroll-reveal';

export const metadata: Metadata = {
  title: 'Argis Lab',
  description: 'Argis Lab',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="es" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ScrollReveal />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
