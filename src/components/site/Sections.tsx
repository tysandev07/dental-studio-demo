import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { whatsappLink } from "@/config/clinic";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div
        className={cn(
          "container-page grid items-center gap-12 py-16 lg:py-24",
          image && "lg:grid-cols-[1.05fr_1fr]",
        )}
      >
        <div className="animate-fade-up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-5xl text-navy text-balance-pretty md:text-6xl lg:text-7xl">{title}</h1>
          {description && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="absolute -bottom-6 -left-6 hidden h-2/3 w-2/3 rounded-3xl bg-sand lg:block" aria-hidden />
            <img
              src={image}
              alt={imageAlt}
              width={1400}
              height={1000}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn(align === "left" && "max-w-2xl")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-4 text-4xl text-navy text-balance-pretty md:text-5xl">{title}</h2>
        {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function CtaBanner({
  title = "Tu próxima sonrisa empieza con una conversación",
  description = "Contanos qué necesitás y el equipo de recepción te contacta para coordinar día y horario.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-16 text-navy-foreground md:px-16 md:py-20">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-navy-border"
          />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-navy-border"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-navy-muted">Turnos</p>
              <h2 className="mt-4 max-w-2xl text-4xl text-balance-pretty md:text-5xl">{title}</h2>
              <p className="mt-5 max-w-xl text-navy-muted">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild size="lg" variant="light">
                <Link to="/turnos">Solicitar turno</Link>
              </Button>
              <Button asChild size="lg" variant="whatsapp">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DemoNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "rounded-xl border border-sand bg-sand/50 px-4 py-3 text-xs leading-relaxed text-sand-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
