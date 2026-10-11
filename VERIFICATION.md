# Verification

Verified on 11 October 2026 against the local production server.

WhatsApp update: the form now prepares an encoded WhatsApp draft for `918490997254`. The production build and TypeScript checks passed. Endpoint checks verified the recipient, all customer fields, date/time in IST, optional-message fallback, Unicode, and special characters. A browser submission with sample details navigated to the WhatsApp URL with the expected number and complete message. No WhatsApp message was sent during testing. Visitors must tap Send in WhatsApp; delivery and appointment confirmation are not claimed by the website.

- Production build and TypeScript compilation passed with Next.js 16.4.0.
- All thirteen requested page sections are implemented, plus privacy and terms pages.
- Browser console showed no warnings or errors during the final checks.
- All six custom assets rendered successfully. Visual inspection confirmed artificial dental objects and an empty clinic interior; no human imagery is used.
- No horizontal overflow at 320, 375, 390, 768, 1024, 1440, or 1920 pixels.
- Desktop navigation and the mobile menu were exercised.
- Service dialogs opened; the consultation action preselected the corresponding service in the form.
- Gallery next/previous behavior, all six category filters, lightbox navigation, and Escape dismissal passed.
- Review navigation and FAQ expansion passed.
- The form displayed required-field errors and prepared a valid WhatsApp appointment draft through the backend.
- Server integration checks passed for past and impossible dates, invalid contact details, missing consent, the honeypot, instant submissions, cross-origin requests, malformed JSON, oversized requests, and rate limiting.
- Terms navigation and the return-home link passed.
- Final desktop and mobile screenshots are saved in `verification/`.

The final typography change was visually checked on mobile and desktop, and the seven-width overflow audit passed again on the finished build. No Lighthouse score is claimed. This is a local Next.js application, not a publicly deployed website. The appointment endpoint validates details and returns a WhatsApp draft link; it does not store details, send messages automatically, or confirm bookings.

To rerun endpoint integration checks with the server running, execute `python scripts/verify-endpoint.py`. It uses sample details only. Restart the server or wait ten minutes between runs because the test deliberately reaches the rate limit.
