import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { clinic, navItems } from "@/config/clinic";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-border bg-background/90 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-background",
      )}
    >
      <div className="hidden border-b border-border bg-mist lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-muted-foreground">
          <span>{clinic.hours[0].days} · {clinic.hours[0].time} — {clinic.hours[1].days} · {clinic.hours[1].time}</span>
          <div className="flex items-center gap-6">
            <span>{clinic.address.full}</span>
            <a href={clinic.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-primary">
              <Phone className="h-3 w-3" /> {clinic.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[status=active]:text-navy after:absolute after:bottom-0.5 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-4 data-[status=active]:after:w-5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/turnos">Reservar turno</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background xl:hidden"
      >
        <nav aria-label="Móvil" className="container-page animate-fade-up py-8">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.to} className="border-b border-border">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex items-center justify-between py-4 font-display text-3xl text-muted-foreground transition-colors hover:text-navy data-[status=active]:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild size="lg">
              <Link to="/turnos">Reservar turno</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={clinic.phoneHref}>
                <Phone /> {clinic.phone}
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
