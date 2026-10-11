import type { AppointmentInput } from "./appointment";
import { clinic } from "./clinic";

export function formatAppointmentMessage(details: AppointmentInput): string {
  const date = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(details.date + "T12:00:00Z"));
  const hour = Number(details.time.slice(0, 2));
  const time = (hour % 12 || 12) + details.time.slice(2) + (hour >= 12 ? " PM" : " AM") + " IST";

  return [
    "Appointment request — " + clinic.name,
    "",
    "Full name: " + details.name,
    "Phone: " + details.phone,
    "Email: " + details.email,
    "Interested service: " + details.service,
    "Preferred date: " + date,
    "Preferred time: " + time,
    "Message: " + (details.message || "Not provided"),
    "Contact consent: Yes",
    "",
    "Please confirm availability. This is an appointment request, not a confirmed booking.",
  ].join("\n");
}

export function createAppointmentWhatsAppUrl(details: AppointmentInput): string {
  return "https://wa.me/" + clinic.whatsappNumber + "?text=" + encodeURIComponent(formatAppointmentMessage(details));
}
