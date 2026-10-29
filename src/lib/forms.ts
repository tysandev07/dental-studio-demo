import { z } from "zod";

export const timeSlots = [
  { value: "manana", label: "Mañana (9 a 12 h)" },
  { value: "mediodia", label: "Mediodía (12 a 15 h)" },
  { value: "tarde", label: "Tarde (15 a 20 h)" },
] as const;

const phoneDigits = (v: string) => v.replace(/\D/g, "");

export function todayISO(now: Date = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const nameField = z
  .string()
  .trim()
  .min(3, "Ingresá tu nombre y apellido.")
  .max(80, "Máximo 80 caracteres.");

const phoneField = z
  .string()
  .trim()
  .min(1, "Ingresá un teléfono de contacto.")
  .refine((v) => /^[+\d\s()-]+$/.test(v), "Usá solo números, espacios, + o guiones.")
  .refine((v) => {
    const n = phoneDigits(v).length;
    return n >= 8 && n <= 15;
  }, "El teléfono debe tener entre 8 y 15 dígitos.");

const optionalEmail = z
  .string()
  .trim()
  .max(120, "Máximo 120 caracteres.")
  .refine((v) => v === "" || z.string().email().safeParse(v).success, "Ingresá un email válido.");

export function makeAppointmentSchema(now: Date = new Date()) {
  const today = todayISO(now);
  return z.object({
    name: nameField,
    phone: phoneField,
    email: optionalEmail,
    treatment: z.string().min(1, "Elegí un tratamiento de interés."),
    date: z
      .string()
      .min(1, "Elegí una fecha preferida.")
      .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), "Fecha inválida.")
      .refine((v) => v >= today, "La fecha no puede ser anterior a hoy.")
      .refine((v) => new Date(`${v}T12:00:00`).getDay() !== 0, "Los domingos la clínica está cerrada."),
    time: z.string().min(1, "Elegí un horario preferido."),
    message: z.string().trim().max(600, "Máximo 600 caracteres."),
  });
}

export type AppointmentValues = z.infer<ReturnType<typeof makeAppointmentSchema>>;

export const contactSchema = z.object({
  name: nameField,
  email: z.string().trim().min(1, "Ingresá tu email.").email("Ingresá un email válido."),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[+\d\s()-]+$/.test(v), "Usá solo números, espacios, + o guiones.")
    .refine((v) => {
      if (v === "") return true;
      const n = phoneDigits(v).length;
      return n >= 8 && n <= 15;
    }, "El teléfono debe tener entre 8 y 15 dígitos."),
  subject: z.string().trim().min(3, "Contanos el motivo de tu consulta.").max(100, "Máximo 100 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(1000, "Máximo 1000 caracteres."),
});

export type ContactValues = z.infer<typeof contactSchema>;
