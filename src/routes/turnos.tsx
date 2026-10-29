import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, CheckCircle2, ChevronDown, Clock, Info, Phone, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DemoNotice } from "@/components/site/Sections";
import { FormField, fieldControlCls } from "@/components/site/FormField";
import { WhatsAppIcon } from "@/components/site/Icons";
import { HoursList } from "@/components/site/ClinicInfo";
import { clinic, whatsappLink } from "@/config/clinic";
import { treatments, findTreatment } from "@/data/treatments";
import { makeAppointmentSchema, timeSlots, todayISO, type AppointmentValues } from "@/lib/forms";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ tratamiento: z.string().optional() });

export const Route = createFileRoute("/turnos")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: pageMeta(
      "Solicitar turno",
      "Completá el formulario o escribinos por WhatsApp para solicitar un turno en NOVA Dental Studio.",
    ),
  }),
  component: AppointmentPage,
});

const otherOption = { value: "consulta-general", label: "No estoy seguro / primera consulta" };

function buildWhatsappMessage(v: AppointmentValues) {
  const t = findTreatment(v.treatment)?.name ?? otherOption.label;
  const slot = timeSlots.find((s) => s.value === v.time)?.label ?? v.time;
  const [y, m, d] = v.date.split("-");
  return [
    `Hola ${clinic.name}, quisiera solicitar un turno.`,
    `Nombre: ${v.name}`,
    `Teléfono: ${v.phone}`,
    v.email ? `Email: ${v.email}` : null,
    `Tratamiento: ${t}`,
    `Fecha preferida: ${d}/${m}/${y}`,
    `Horario preferido: ${slot}`,
    v.message ? `Mensaje: ${v.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function AppointmentPage() {
  const { tratamiento } = Route.useSearch();
  const [submitted, setSubmitted] = useState<AppointmentValues | null>(null);
  const schema = useMemo(() => makeAppointmentSchema(), []);
  const minDate = useMemo(() => todayISO(), []);

  const initialTreatment =
    tratamiento && (findTreatment(tratamiento) || tratamiento === otherOption.value) ? tratamiento : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      treatment: initialTreatment,
      date: "",
      time: "",
      message: "",
    },
  });

  const onSubmit = (values: AppointmentValues) => {
    setSubmitted(values);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const aria = (name: keyof AppointmentValues) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section className="bg-mist">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Solicitar turno</p>
          <h1 className="mt-5 text-5xl text-navy md:text-6xl">Coordinemos tu próxima visita</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Dejanos tus datos y preferencias. Recepción se comunicará para confirmar día y horario según la
            disponibilidad.
          </p>

          <div className="mt-10 space-y-4">
            <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Pedir turno por WhatsApp
              </a>
            </Button>
            <a
              href={clinic.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" /> O llamanos al {clinic.phone}
            </a>
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-background p-7 shadow-soft">
            <h2 className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-navy">
              <Clock className="h-4 w-4 text-primary" /> Horarios de atención
            </h2>
            <HoursList className="mt-3" />
          </div>

          <DemoNotice className="mt-6">
            <Info className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
            Este formulario es una solicitud de contacto. No reserva ni confirma turnos: el turno queda
            confirmado solo cuando la clínica te responde.
          </DemoNotice>
        </div>

        <Reveal>
          {submitted ? (
            <SubmittedCard
              values={submitted}
              onReset={() => {
                setSubmitted(null);
                reset();
              }}
            />
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-[2rem] border border-border bg-background p-6 shadow-card sm:p-10"
              aria-label="Formulario de solicitud de turno"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField id="name" label="Nombre y apellido" error={errors.name?.message} className="sm:col-span-2">
                  <input id="name" autoComplete="name" className={fieldControlCls} placeholder="Ej.: Laura Gómez" {...aria("name")} {...register("name")} />
                </FormField>

                <FormField id="phone" label="Teléfono" error={errors.phone?.message}>
                  <input id="phone" type="tel" autoComplete="tel" inputMode="tel" className={fieldControlCls} placeholder="11 1234-5678" {...aria("phone")} {...register("phone")} />
                </FormField>

                <FormField id="email" label="Email" optional error={errors.email?.message}>
                  <input id="email" type="email" autoComplete="email" className={fieldControlCls} placeholder="tu@email.com" {...aria("email")} {...register("email")} />
                </FormField>

                <FormField id="treatment" label="Tratamiento de interés" error={errors.treatment?.message} className="sm:col-span-2">
                  <div className="relative">
                  <select id="treatment" className={cn(fieldControlCls, "cursor-pointer appearance-none pr-10")} {...aria("treatment")} {...register("treatment")}>
                    <option value="">Seleccioná una opción</option>
                    {treatments.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                    <option value={otherOption.value}>{otherOption.label}</option>
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </FormField>

                <FormField id="date" label="Fecha preferida" error={errors.date?.message} hint="De lunes a sábado.">
                  <input id="date" type="date" min={minDate} className={cn(fieldControlCls, "cursor-pointer")} {...aria("date")} {...register("date")} />
                </FormField>

                <fieldset className="flex flex-col gap-2" aria-describedby={errors.time ? "time-error" : undefined}>
                  <legend className="mb-2 text-sm font-semibold text-navy">Horario preferido</legend>
                  <div className="grid gap-2">
                    {timeSlots.map((s) => (
                      <label
                        key={s.value}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-input px-4 py-2.5 text-sm text-navy transition-colors hover:border-navy/30 has-[:checked]:border-primary has-[:checked]:bg-accent has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15"
                      >
                        <input type="radio" value={s.value} className="accent-primary" {...register("time")} />
                        {s.label}
                      </label>
                    ))}
                  </div>
                  {errors.time && (
                    <p id="time-error" role="alert" className="text-xs font-medium text-destructive">
                      {errors.time.message}
                    </p>
                  )}
                </fieldset>

                <FormField id="message" label="Mensaje" optional error={errors.message?.message} className="sm:col-span-2">
                  <textarea id="message" rows={4} className={cn(fieldControlCls, "h-auto py-3")} placeholder="Contanos brevemente el motivo de tu consulta" {...aria("message")} {...register("message")} />
                </FormField>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs text-muted-foreground">
                  Al enviar aceptás nuestra{" "}
                  <Link to="/privacidad" className="underline underline-offset-2 hover:text-navy">
                    política de privacidad
                  </Link>
                  .
                </p>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  <CalendarDays /> Enviar solicitud
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function SubmittedCard({ values, onReset }: { values: AppointmentValues; onReset: () => void }) {
  const t = findTreatment(values.treatment)?.name ?? otherOption.label;
  const slot = timeSlots.find((s) => s.value === values.time)?.label;
  const [y, m, d] = values.date.split("-");
  return (
    <div role="status" className="animate-fade-up rounded-[2rem] border border-border bg-background p-8 shadow-card sm:p-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="h-7 w-7" />
      </span>
      <h2 className="mt-6 text-4xl text-navy">Tu solicitud está lista</h2>
      <p className="mt-4 text-muted-foreground">
        Gracias, {values.name.split(" ")[0]}. Esta es una <strong className="text-navy">solicitud de contacto</strong>,
        no un turno confirmado. Como este sitio de demostración no está conectado a un sistema de turnos, tus
        datos no fueron enviados: para que la clínica los reciba, enviá la solicitud por WhatsApp.
      </p>

      <dl className="mt-8 grid gap-4 rounded-2xl bg-mist p-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Tratamiento</dt>
          <dd className="mt-1 font-semibold text-navy">{t}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Preferencia</dt>
          <dd className="mt-1 font-semibold text-navy">
            {d}/{m}/{y} · {slot}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Teléfono</dt>
          <dd className="mt-1 font-semibold text-navy">{values.phone}</dd>
        </div>
        {values.email && (
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</dt>
            <dd className="mt-1 font-semibold text-navy">{values.email}</dd>
          </div>
        )}
      </dl>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="whatsapp" size="lg">
          <a href={whatsappLink(buildWhatsappMessage(values))} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Enviar por WhatsApp
          </a>
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onReset}>
          <RotateCcw /> Nueva solicitud
        </Button>
      </div>
    </div>
  );
}
