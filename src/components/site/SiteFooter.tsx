import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { WhatsAppIcon, socialIconMap } from "./Icons";
import { clinic, navItems, whatsappLink } from "@/config/clinic";
import { treatments } from "@/data/treatments";

const linkCls =
  "text-sm text-navy-muted transition-colors hover:text-navy-foreground focus-visible:outline-none focus-visible:underline";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-page grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-muted">{clinic.description}</p>
          <ul className="mt-6 flex gap-3" aria-label="Redes sociales">
            {clinic.social.map((s) => {
              const Icon = socialIconMap[s.name as keyof typeof socialIconMap];
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-border text-navy-muted transition-colors hover:border-navy-foreground hover:text-navy-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <FooterCol title="Navegación" className="lg:col-span-2">
          {navItems.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className={linkCls}>
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/turnos" className={linkCls}>
              Solicitar turno
            </Link>
          </li>
        </FooterCol>

        <FooterCol title="Tratamientos" className="lg:col-span-2">
          {treatments.map((t) => (
            <li key={t.slug}>
              <Link to="/tratamientos" hash={t.slug} className={linkCls}>
                {t.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contacto" className="lg:col-span-3">
          <li className="flex gap-3 text-sm text-navy-muted">
            <Phone className="mt-0.5 h-4 w-4 shrink-0" />
            <a href={clinic.phoneHref} className={linkCls}>
              {clinic.phone}
            </a>
          </li>
          <li className="flex gap-3 text-sm text-navy-muted">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            <a href={`mailto:${clinic.email}`} className={linkCls}>
              {clinic.email}
            </a>
          </li>
          <li className="flex gap-3 text-sm text-navy-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <Link to="/consultorio" className={linkCls}>
              {clinic.address.full}
            </Link>
          </li>
          <li className="flex gap-3 text-sm text-navy-muted">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="space-y-1">
              {clinic.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.time}
                </span>
              ))}
            </span>
          </li>
        </FooterCol>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-navy-foreground">Turnos</h2>
          <p className="mt-5 font-display text-2xl leading-snug">¿Hace cuánto no hacés un control?</p>
          <p className="mt-3 text-sm text-navy-muted">Escribinos y coordinamos tu primera consulta.</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="light">
              <Link to="/turnos">Solicitar turno</Link>
            </Button>
            <Button asChild variant="whatsapp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-border">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-navy-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {clinic.name}. Sitio de demostración — datos ficticios.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/privacidad" className="hover:text-navy-foreground">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" className="hover:text-navy-foreground">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link to="/aviso-legal" className="hover:text-navy-foreground">
                Aviso legal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-navy-foreground">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
