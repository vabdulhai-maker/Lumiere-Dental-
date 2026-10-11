import { Brand, ArrowLink } from "@/components/ui";
import { clinic } from "@/lib/clinic";
export const metadata = { title: "Privacy | Lumière Dental Studio" };
export default function Privacy() {
  return <main className="legal-page"><Brand /><p className="eyebrow">PRIVACY NOTICE</p><h1>Your privacy, considered.</h1>
    <h2>Appointment requests through WhatsApp</h2><p>The form collects your name, phone, email, selected service, preferred date and time, message, and contact consent. Our server validates these details and prepares a WhatsApp link addressed to {clinic.whatsappDisplay}. The website does not store or email your form submission.</p><p>Submitting the form opens WhatsApp with these details in a prefilled message. The details are included in the WhatsApp link and may appear in your browser history. WhatsApp processes the information under its own privacy terms. You must tap Send in WhatsApp to deliver the message to the recipient. The clinic then handles your request and any follow-up in WhatsApp. Please avoid sensitive medical details.</p>
    <h2>Technical information</h2><p>A temporary in-memory request counter limits repeated submissions. The server or hosting provider may process ordinary connection information, such as IP addresses and request timestamps, to serve the website. No analytics or advertising trackers have been added.</p>
    <h2>Images, fonts, and external links</h2><p>Website images and fonts are served locally. WhatsApp and any other external services have their own privacy terms.</p>
    <h2>About this website</h2><p>Studio imagery, testimonials, and unverified business information remain illustrative. The configured WhatsApp number is the destination supplied by the site owner. Questions about handling messages can be directed to that recipient in WhatsApp.</p><ArrowLink href="/">Return to the studio</ArrowLink></main>;
}
