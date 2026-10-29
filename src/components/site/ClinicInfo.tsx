import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic, directionsLink, mapEmbedUrl } from "@/config/clinic";
import { cn } from "@/lib/utils";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-mist shadow-soft", className)}>
      <iframe
        title={`Mapa de demostración — ${clinic.address.full}`}
        src={mapEmbedUrl()}
        loading="lazy"
        className="h-full min-h-[320px] w-full grayscale-[35%]"
      />
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-soft">
        Ubicación de demostración
      </span>
    </div>
  );
}

export function DirectionsButton({ variant = "default" as const }: { variant?: "default" | "outline" | "navy" }) {
  return (
    <Button asChild variant={variant}>
      <a href={directionsLink()} target="_blank" rel="noopener noreferrer">
        <Navigation /> Cómo llegar
      </a>
    </Button>
  );
}

export function HoursList({ className }: { className?: string }) {
  return (
    <dl className={cn("divide-y divide-border", className)}>
      {clinic.hours.map((h) => (
        <div key={h.days} className="flex items-center justify-between gap-4 py-3 text-sm">
          <dt className="text-muted-foreground">{h.days}</dt>
          <dd className={cn("font-semibold", h.time === "Cerrado" ? "text-muted-foreground" : "text-navy")}>
            {h.time}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ContactList({ className }: { className?: string }) {
  const items = [
    { icon: Phone, label: "Teléfono", value: clinic.phone, href: clinic.phoneHref },
    { icon: Mail, label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
    { icon: MapPin, label: "Dirección", value: clinic.address.full, href: directionsLink() },
  ];
  return (
    <ul className={cn("space-y-5", className)}>
      {items.map(({ icon: Icon, label, value, href }) => (
        <li key={label} className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="mt-1 block text-base font-medium text-navy transition-colors hover:text-primary"
            >
              {value}
            </a>
          </div>
        </li>
      ))}
      <li className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
          <Clock className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Horarios</p>
          <HoursList className="mt-1" />
        </div>
      </li>
    </ul>
  );
}
