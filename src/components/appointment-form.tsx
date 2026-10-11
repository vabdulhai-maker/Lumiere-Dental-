"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CircleCheck, LoaderCircle, LockKeyhole, MessageCircle } from "lucide-react";
import { appointmentSchema, clinicToday, type AppointmentInput } from "@/lib/appointment";
import { clinic, serviceNames } from "@/lib/clinic";

export default function AppointmentForm({ selectedService }: { selectedService: string }) {
  const [result, setResult] = useState<{ ok: boolean; text: string; whatsappUrl?: string } | null>(null);
  const { register, handleSubmit, setValue, setError, formState: { errors, isSubmitting } } = useForm<AppointmentInput>({ resolver: zodResolver(appointmentSchema), defaultValues: { name: "", phone: "", email: "", service: "", date: "", time: "", message: "", consent: false, website: "", startedAt: 0 }, mode: "onBlur" });
  useEffect(() => { setValue("startedAt", Date.now()); }, [setValue]);
  useEffect(() => { if (selectedService) setValue("service", selectedService, { shouldValidate: true }); }, [selectedService, setValue]);
  const submit = async (values: AppointmentInput) => {
    setResult(null);
    try {
      const response = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values), signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) {
        if (data.fields) for (const [key, messages] of Object.entries(data.fields)) setError(key as keyof AppointmentInput, { message: (messages as string[])[0] });
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      const destination = new URL(data.whatsappUrl);
      if (destination.origin !== "https://wa.me" || destination.pathname !== "/" + clinic.whatsappNumber) throw new Error("The WhatsApp link could not be prepared. Please try again.");
      setResult({ ok: true, text: data.message, whatsappUrl: destination.href });
      // Same-tab navigation works on mobile and avoids blocked asynchronous popups.
      // Keep the form values intact in case the visitor returns to edit their request.
      window.location.assign(destination.href);
    } catch (error) { setResult({ ok: false, text: error instanceof Error && error.name !== "TimeoutError" ? error.message : "The request timed out. Please try again." }); }
  };
  const error = (field: keyof AppointmentInput) => errors[field] ? <span className="field-error" id={field + "-error"}>{errors[field]?.message}</span> : null;
  const a11y = (field: keyof AppointmentInput) => ({ "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? field + "-error" : undefined });
  return <form className="appointment-form" onSubmit={handleSubmit(submit)} noValidate>
    <div className="form-heading"><h3>A little about you.</h3><span><span className="status-dot" /> WHATSAPP BOOKING</span></div>
    <p className="form-note">We’ll open WhatsApp with your appointment details addressed to {clinic.whatsappDisplay}. Tap Send there to submit your request. The clinic will confirm availability.</p>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Full name <span>*</span></label><input id="name" autoComplete="name" placeholder="Your full name" {...register("name")} {...a11y("name")} />{error("name")}</div>
      <div className="field"><label htmlFor="phone">Phone number <span>*</span></label><input id="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" {...register("phone")} {...a11y("phone")} />{error("phone")}</div>
      <div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} {...a11y("email")} />{error("email")}</div>
      <div className="field"><label htmlFor="service">Interested service <span>*</span></label><select id="service" {...register("service")} {...a11y("service")}><option value="">Select a service</option>{serviceNames.map(s => <option key={s}>{s}</option>)}</select>{error("service")}</div>
      <div className="field"><label htmlFor="date">Preferred date <span>*</span></label><input id="date" type="date" min={clinicToday()} {...register("date")} {...a11y("date")} />{error("date")}</div>
      <div className="field"><label htmlFor="time">Preferred time (IST) <span>*</span></label><select id="time" {...register("time")} {...a11y("time")}><option value="">Choose a time</option>{clinic.appointmentTimes.map(t => <option key={t} value={t}>{Number(t.slice(0, 2)) > 12 ? Number(t.slice(0, 2)) - 12 : Number(t.slice(0, 2))}:00 {Number(t.slice(0, 2)) >= 12 ? "PM" : "AM"}</option>)}</select>{error("time")}</div>
      <div className="field full-width"><label htmlFor="message">Anything you’d like us to know? <span className="optional">(optional)</span></label><textarea id="message" rows={3} placeholder="Tell us a little about what brings you here. Please avoid sensitive medical details." maxLength={1500} {...register("message")} {...a11y("message")} />{error("message")}</div>
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
    <label className="consent"><input type="checkbox" {...register("consent")} {...a11y("consent")} /><span>I agree to share these details with WhatsApp and the clinic at {clinic.whatsappDisplay} for this appointment request and follow-up. <a href="/privacy">Privacy policy</a>.</span></label>{error("consent")}
    <button className="button primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="spin" size={18} /> Preparing your request…</> : <><MessageCircle size={18} />Request via WhatsApp<ArrowUpRight size={19} /></>}</button>
    <p className="form-footnote"><LockKeyhole size={13} /> Opens WhatsApp · Tap Send to complete your request</p>
    {result && <div className={"form-result " + (result.ok ? "success" : "error")} role={result.ok ? "status" : "alert"}>{result.ok && <CircleCheck size={22} />}<div><strong>{result.ok ? "Continue in WhatsApp." : "Let’s try that again."}</strong><p>{result.text}</p>{result.whatsappUrl && <a className="text-link" href={result.whatsappUrl} referrerPolicy="no-referrer">Open WhatsApp again<ArrowUpRight size={16} /></a>}</div></div>}
  </form>;
}
