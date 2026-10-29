import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldControlCls =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-navy shadow-none transition-colors placeholder:text-muted-foreground/70 hover:border-navy/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/15 md:text-sm";

export function FormField({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold text-navy">
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">Opcional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
