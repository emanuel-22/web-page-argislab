import { Button } from '@repo/ui/components/button';
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from '@/components/brand-icons';
import { CommunityChannelsCarousel } from '@/components/community-channels-carousel';

const MAIN_WHATSAPP = 'https://chat.whatsapp.com/GrFpQi2xCam4EBBG7UzYdl';

const SOCIALS = [
  {
    label: 'Comunidad de WhatsApp',
    handle: 'Grupo principal',
    href: MAIN_WHATSAPP,
    icon: WhatsappIcon,
    brand: 'group-hover:text-[#25D366]',
  },
  {
    label: 'Instagram',
    handle: '@argis_lab',
    href: 'https://www.instagram.com/argis_lab/',
    icon: InstagramIcon,
    brand: 'group-hover:text-[#E1306C]',
  },
  {
    label: 'LinkedIn',
    handle: '/company/argis-lab',
    href: 'https://www.linkedin.com/company/argis-lab/',
    icon: LinkedinIcon,
    brand: 'group-hover:text-[#0A66C2]',
  },
];

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Comunidad</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Una comunidad para compartir oportunidades, aprender juntos y conversar sobre tecnología, agilidad e
          inteligencia artificial.
        </p>
        <Button size="lg" className="font-normal" asChild>
          <a href={MAIN_WHATSAPP} target="_blank" rel="noopener noreferrer">
            Unirme a la comunidad de WhatsApp
          </a>
        </Button>
      </header>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {SOCIALS.map(({ label, handle, href, icon: Icon, brand }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-background">
              <Icon className={`h-6 w-6 text-foreground transition-colors ${brand}`} />
            </span>
            <span className="flex flex-col">
              <span className="font-bold">{label}</span>
              <span className="text-sm text-muted-foreground">{handle}</span>
            </span>
          </a>
        ))}
      </div>

      <section className="mt-16">
        <CommunityChannelsCarousel />
      </section>
    </main>
  );
}
