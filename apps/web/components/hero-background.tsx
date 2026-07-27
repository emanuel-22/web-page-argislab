export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -top-56 -right-56 h-112 w-md rounded-full bg-primary/15 blur-[140px]" />
      <div className="absolute -bottom-44 -left-44 h-112 w-md rounded-full bg-accent/30 blur-[130px]" />
    </div>
  );
}
