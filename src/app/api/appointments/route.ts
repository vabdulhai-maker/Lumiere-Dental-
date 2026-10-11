import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/appointment";
import { createAppointmentWhatsAppUrl } from "@/lib/whatsapp";

// Bounded in-memory throttling for the demo. Use a shared store for production.
const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Next may normalize nextUrl to localhost even when the browser uses 127.0.0.1.
  // Compare against the actual request Host, preserving a same-origin boundary.
  const expectedOrigin = request.nextUrl.protocol + "//" + request.headers.get("host");
  if (origin && origin !== expectedOrigin) return NextResponse.json({ error: "This request could not be verified." }, { status: 403 });
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local-demo";
  const now = Date.now();
  for (const [ip, item] of attempts) if (item.reset < now) attempts.delete(ip);
  if (attempts.size > 5000) attempts.clear();
  const record = attempts.get(key) || { count: 0, reset: now + WINDOW };
  if (record.count >= 10) return NextResponse.json({ error: "Too many attempts. Please try again in ten minutes." }, { status: 429 });
  record.count++;
  attempts.set(key, record);
  if (Number(request.headers.get("content-length")) > 12000) return NextResponse.json({ error: "Your request is too large." }, { status: 413 });
  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: "Please provide form details." }, { status: 400 });
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 12000) { await reader.cancel(); return NextResponse.json({ error: "Your request is too large." }, { status: 413 }); }
      chunks.push(value);
    }
    const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const result = appointmentSchema.safeParse(data);
    if (!result.success) return NextResponse.json({ error: "Please check the highlighted details.", fields: result.error.flatten().fieldErrors }, { status: 422 });
    if (now - result.data.startedAt < 1500 || now - result.data.startedAt > 24 * 60 * 60 * 1000) return NextResponse.json({ error: "Please refresh the page, review your details, and try again." }, { status: 400 });
    // Prepare a draft only. The visitor sends it in WhatsApp; the server stores no details.
    return NextResponse.json({
      mode: "whatsapp",
      whatsappUrl: createAppointmentWhatsAppUrl(result.data),
      message: "Your request is ready. Tap Send in WhatsApp to share your details with the clinic. Your appointment is only confirmed when the clinic replies.",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "We could not read the request. Please try again." }, { status: 400 });
  }
}
