import { Brand, ArrowLink } from "@/components/ui";
export const metadata = { title: "Terms | Lumière Dental Studio" };
export default function Terms() {
  return <main className="legal-page"><Brand /><p className="eyebrow">TERMS OF USE</p><h1>A little clarity.</h1>
    <h2>An illustrative experience</h2><p>Lumière Dental Studio is a design concept. Unverified business details, opening hours, service descriptions, images, and testimonials are illustrative. Product renders and the architectural interior do not represent actual patient cases.</p>
    <h2>Appointment requests</h2><p>The appointment form prepares a WhatsApp message for the number supplied by the site owner. You must tap Send in WhatsApp to deliver it. Opening WhatsApp does not itself send the message or confirm an appointment. The recipient must reply to confirm availability, the date, and the time. The website cannot verify message delivery.</p>
    <h2>General information</h2><p>Website content is not a diagnosis, treatment recommendation, or guarantee of results. Clinical suitability, treatment planning, timelines, and costs require assessment by a qualified dental professional.</p>
    <h2>Using the form</h2><p>Provide accurate contact details for a real request. Use sample details when testing and do not send test messages to the recipient. Do not include sensitive medical records or attempt to disrupt the service.</p><ArrowLink href="/">Return to the studio</ArrowLink></main>;
}
