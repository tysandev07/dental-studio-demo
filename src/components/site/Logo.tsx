import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-9 w-9", className)}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <path
        d="M13 11c-2.6 0-4.5 2.2-4.2 5.4.3 3.4 1.6 5.6 2.3 9.1.5 2.6 1.1 4.5 2.4 4.5 1.6 0 1.9-3.2 2.6-5.6.4-1.4 1.2-2.4 3.9-2.4s3.5 1 3.9 2.4c.7 2.4 1 5.6 2.6 5.6 1.3 0 1.9-1.9 2.4-4.5.7-3.5 2-5.7 2.3-9.1.3-3.2-1.6-5.4-4.2-5.4-2.3 0-3.7 1.4-7 1.4s-4.7-1.4-7-1.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M27.5 6.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      to="/"
      aria-label="NOVA Dental Studio — Inicio"
      className={cn(
        "group inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        tone === "dark" ? "text-navy" : "text-navy-foreground",
        className,
      )}
    >
      <LogoMark className="transition-transform duration-500 group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.65rem] font-semibold tracking-[0.18em]">NOVA</span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em]",
            tone === "dark" ? "text-muted-foreground" : "text-navy-muted",
          )}
        >
          Dental Studio
        </span>
      </span>
    </Link>
  );
}
