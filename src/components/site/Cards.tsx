import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote } from "lucide-react";
import type { Treatment } from "@/data/treatments";
import { cn } from "@/lib/utils";

export function TreatmentCard({ treatment, className }: { treatment: Treatment; className?: string }) {
  return (
    <Link
      to="/tratamientos"
      hash={treatment.slug}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.name}
          loading="lazy"
          width={1200}
          height={912}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl text-navy">{treatment.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{treatment.short}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Ver tratamiento
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function TeamCard({
  member,
}: {
  member: { name: string; role: string; bio?: string; focus?: string[]; image: string };
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-3xl bg-sand">
        <img
          src={member.image}
          alt={`Retrato de ${member.name}`}
          loading="lazy"
          width={800}
          height={1008}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
          Perfil demostrativo
        </span>
      </div>
      <h3 className="mt-6 text-2xl text-navy">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
      {member.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>}
      {member.focus && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {member.focus.map((f) => (
            <li key={f} className="rounded-full bg-mist px-3 py-1 text-xs text-navy">
              {f}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function TestimonialCard({ quote, author, detail }: { quote: string; author: string; detail: string }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft">
      <Quote className="h-7 w-7 text-primary/40" aria-hidden />
      <blockquote className="mt-5 flex-1 font-display text-2xl leading-snug text-navy">“{quote}”</blockquote>
      <figcaption className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-semibold text-navy">{author}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </figcaption>
    </figure>
  );
}

export function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-sans text-base font-semibold text-navy">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
