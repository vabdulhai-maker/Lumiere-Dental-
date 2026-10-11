# Lumière Dental Studio

A complete, responsive dental studio concept built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Swiper, Lucide, React Hook Form, and Zod. All imagery consists of artificial dental product renders and an empty architectural interior.

## Run locally

Use Node.js 20.9 or newer and pnpm:

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
pnpm build
pnpm start
```

`pnpm typecheck` runs the TypeScript check. The lockfile pins the installed dependencies. Fonts and images are local, so visitors do not need a third-party image or font service.

## Edit the content

- `src/lib/clinic.ts`: centralized business details, navigation, hours, services, gallery, FAQs, sample reviews, and social links.
- `src/app/globals.css`: design system, layouts, responsive styles, and reduced-motion settings.
- `src/components/`: navigation, hero, all page sections, accessible dialogs, gallery, and form.
- `public/images/`: six optimized custom images. `ASSETS.md` records the generation prompts.

## WhatsApp appointment requests

The form submits to `POST /api/appointments`. Both client and server share a Zod schema. Validation checks Indian mobile numbers, email, supported service and time values, consent, valid calendar dates, past dates/times in the clinic timezone, and Sunday closure. A hidden honeypot, minimum completion time, bounded request size, same-origin check, and temporary rate limit provide basic demonstration spam protection.

Successful validation returns a WhatsApp link addressed to **+91 8490997254** (`clinic.whatsappNumber`). The browser opens WhatsApp with the name, phone, email, service, date, time in IST, optional message, and consent filled in. The visitor must tap **Send** in WhatsApp. The site does not automatically send a message, track delivery, or confirm an appointment. A fallback link is shown if navigation cannot complete. Form details are retained on the current page for correction and are not saved, emailed, or logged by the server.

This uses WhatsApp's documented click-to-chat flow: https://faq.whatsapp.com/5913398998672934. Automatic background delivery would require a WhatsApp Business API sender, credentials, and an appropriate approved messaging setup; it is not configured. Use sample details for testing and do not send test messages to the recipient. The rate limiter is in-memory and is not a production distributed abuse control.

## Before a real clinic launch

1. Replace all fictional details and sample reviews with verified information in `src/lib/clinic.ts`.
2. Verify the WhatsApp recipient and the clinic’s confirmation process. For automatic notifications or booking management, integrate an authorized messaging provider or booking service.
3. Add appropriate production privacy and terms notices and a shared rate limiter or managed bot protection.
4. Set `NEXT_PUBLIC_SITE_URL` to the real origin. Confirm the complete address before enabling `verifiedBusiness`; local business structured data is deliberately omitted for the fictional clinic.
5. Update metadata, enable indexing when appropriate, and add only verified social profile URLs.
6. Deploy to a host that supports a Next.js server. A static-only export would not support this appointment endpoint.

The site currently prevents indexing, labels reviews and gallery images as illustrative, and routes fictional contact actions to an explanatory dialog instead of contacting a potentially unrelated number.

## Accessibility and motion

Semantic landmarks, a skip link, labeled controls, inline validation, native modal focus containment, Escape-to-close behavior, keyboard gallery controls, and reduced-motion support are included. At mobile widths, the navigation collapses and the form becomes a single column. Animations use opacity and transforms; no WebGL or heavyweight 3D runtime is necessary for the hero.
