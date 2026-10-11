import { z } from "zod";
import { clinic, serviceNames } from "./clinic";

export function clinicToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: clinic.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z.string().trim().regex(/^(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z.email("Please enter a valid email address.").max(254),
  service: z.string().refine(v => (serviceNames as readonly string[]).includes(v), "Please select a service."),
  date: z.string().refine(validDate, "Please select a valid date.").refine(v => v >= clinicToday(), "Please choose today or a future date.").refine(v => !validDate(v) || new Date(`${v}T12:00:00Z`).getUTCDay() !== 0, "The studio is closed on Sundays."),
  time: z.string().refine(v => clinic.appointmentTimes.includes(v), "Please select a preferred time."),
  message: z.string().trim().max(1500, "Please keep your message under 1,500 characters."),
  consent: z.boolean().refine(Boolean, "Please confirm your consent to continue."),
  website: z.string().max(0, "Unable to process this request."),
  startedAt: z.number().finite(),
}).refine(data => {
  if (!validDate(data.date)) return true;
  return new Date(`${data.date}T${data.time}:00+05:30`).getTime() > Date.now();
}, { path: ["time"], message: "That time has passed. Please choose a later time or date." });
export type AppointmentInput = z.infer<typeof appointmentSchema>;
