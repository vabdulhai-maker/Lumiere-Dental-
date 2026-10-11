import DentalStudio from "@/components/dental-studio";
import { clinic } from "@/lib/clinic";

export default function HomePage() {
  const structuredData = clinic.verifiedBusiness && !clinic.demo ? {
    "@context": "https://schema.org", "@type": "Dentist", name: clinic.name,
    telephone: clinic.phone, email: clinic.email, url: clinic.siteUrl,
    address: { "@type": "PostalAddress", streetAddress: clinic.streetAddress, addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  } : null;
  return <>{structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}<DentalStudio /></>;
}
