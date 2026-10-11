// Replace demonstration details here before publishing for a real clinic.
export const clinic = {
  name: "Lumière Dental Studio",
  tagline: "Redefining the Art of Dental Care",
  location: "Ahmedabad, Gujarat, India",
  phone: "+91 98765 43210",
  whatsappNumber: "918490997254",
  whatsappDisplay: "+91 84909 97254",
  email: "hello@lumieredental.example",
  timeZone: "Asia/Kolkata",
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
  demo: true,
  verifiedBusiness: false,
  streetAddress: "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  socialLinks: [] as { label: string; url: string }[],
  appointmentTimes: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
};

export const navigation = [
  ["Home", "home"], ["About", "about"], ["Services", "services"],
  ["Our Work", "our-work"], ["Why Choose Us", "why-us"], ["Reviews", "reviews"], ["Contact", "contact"],
] as const;

export const services = [
  { id: "general", name: "General Dentistry", eyebrow: "A HEALTHIER FOUNDATION", image: "tooth", description: "Thoughtful everyday care for lasting dental health.", detail: "Routine examinations, professional cleaning, and restorative care start with understanding your dental health. We explain the findings and discuss next steps together.", includes: ["Comprehensive dental assessment", "Preventive care guidance", "Restoration options, when needed"], tone: "mint" },
  { id: "whitening", name: "Teeth Whitening", eyebrow: "A LITTLE MORE BRILLIANCE", image: "tooth", description: "A considered approach to a brighter, natural finish.", detail: "Explore professional whitening with an assessment of your teeth, existing restorations, and sensitivity. Suitability and outcomes vary; a consultation helps set realistic expectations.", includes: ["Shade and suitability assessment", "Professional whitening options", "Sensitivity and aftercare guidance"], tone: "cream" },
  { id: "implants", name: "Dental Implants", eyebrow: "PRECISION IN EVERY DETAIL", image: "implant", description: "Expertly planned options to restore form and function.", detail: "Implant treatment is planned around your dental health, bone support, and long-term needs. Your consultation covers alternatives, the treatment stages, and a personalized estimate.", includes: ["Individual suitability assessment", "Imaging and treatment planning", "Restoration and maintenance discussion"], tone: "blue" },
  { id: "aligners", name: "Clear Aligners", eyebrow: "QUIETLY TRANSFORMATIVE", image: "aligner", description: "Discreet alignment, designed around your everyday.", detail: "Clear aligners use a sequence of removable trays to guide tooth movement. An assessment establishes whether they suit your needs and what daily wear and follow-up would involve.", includes: ["Alignment assessment", "Individual treatment planning", "Progress reviews and retention advice"], tone: "blue" },
  { id: "cosmetic", name: "Cosmetic Dentistry", eyebrow: "THE ART OF NATURAL DETAIL", image: "veneers", description: "Beautifully balanced details. Unmistakably you.", detail: "A personalized discussion of your goals can include bonding, ceramic veneers, or other restorative options. We explain the benefits, limitations, and maintenance of each suitable choice.", includes: ["Aesthetic goals consultation", "Material and treatment options", "Conservative planning and aftercare"], tone: "cream" },
  { id: "root-canal", name: "Root Canal Treatment", eyebrow: "PRESERVING WHAT MATTERS", image: "root-canal", description: "Carefully considered care to preserve natural teeth.", detail: "Root canal treatment may be recommended when the tissue inside a tooth is inflamed or infected. An examination determines the cause and whether this treatment is appropriate.", includes: ["Diagnostic assessment", "Treatment and comfort planning", "Restoration and follow-up guidance"], tone: "mint" },
] as const;

export const serviceNames = [...services.map(s => s.name), "Smile Makeovers", "Preventive Dentistry", "Not sure — help me choose"] as const;
export const galleryCategories = ["All", "Dental Implants", "Teeth Whitening", "Clear Aligners", "Dental Technology", "Clinic Interior"];
export const gallery = [
  { title: "Precision Implant Technology", category: "Dental Implants", image: "implant", description: "A closer look at the components behind an implant restoration.", tone: "mint" },
  { title: "Clear Aligner Innovation", category: "Clear Aligners", image: "aligner", description: "Transparent materials. Thoughtfully planned movement.", tone: "blue" },
  { title: "Modern Treatment Suite", category: "Clinic Interior", image: "clinic", description: "An architectural concept for calm, considered dental care.", tone: "cream" },
  { title: "Advanced Whitening Solutions", category: "Teeth Whitening", image: "tooth", description: "An enamel model exploring light, shade, and a natural finish.", tone: "cream" },
  { title: "Ceramic Dental Restorations", category: "Dental Technology", image: "veneers", description: "The refined form and material of individual ceramic veneers.", tone: "mint" },
  { title: "Inside Modern Endodontics", category: "Dental Technology", image: "root-canal", description: "An illustrative teaching model of a tooth’s internal structure.", tone: "blue" },
];
export const reviews = [
  { initials: "AP", name: "Aarav P.", service: "General Dentistry", text: "From the first conversation, everything felt calm and well explained. I really appreciated having time to understand my options." },
  { initials: "MS", name: "Meera S.", service: "Clear Aligners", text: "A thoughtful experience from start to finish. Having a clear plan and knowing what to expect made all the difference." },
  { initials: "RK", name: "Rohan K.", service: "Cosmetic Dentistry", text: "The attention to small details stood out. The space, the communication, and the approach to care all felt reassuring." },
  { initials: "ND", name: "Nisha D.", service: "Preventive Dentistry", text: "I valued the practical advice and the unhurried conversation. It felt like a plan built around my everyday routine." },
];
export const faqs = [
  ["How can I book an appointment?", "Complete the appointment form and select Request via WhatsApp. WhatsApp opens with all your details addressed to " + clinic.whatsappDisplay + ". Tap Send to deliver your request. Your appointment is confirmed only after the clinic replies."],
  ["What should I expect at my first visit?", "A first visit typically begins with a discussion of your dental history and goals, followed by an assessment. Bring any relevant records and a list of current medicines. Any recommended next steps should be explained before treatment."],
  ["Is teeth whitening right for everyone?", "Suitability depends on your oral health, the cause of discoloration, existing restorations, and sensitivity. A dental assessment helps you understand suitable options and realistic expectations."],
  ["How do I know if dental implants are suitable?", "A dental assessment and appropriate imaging are needed to consider your bone support, gum health, and medical history. Your dentist can explain alternatives and an individual treatment plan."],
  ["How long does clear aligner treatment take?", "Treatment time varies with the complexity of tooth movement and consistent wear. A personalized assessment is needed before an estimated timeline can be provided."],
  ["Will I receive a treatment plan before we begin?", "The proposed experience includes a discussion of suitable options, treatment stages, expected costs, and ongoing care. You should have time to ask questions and make an informed decision."],
  ["What payment options are available?", "Payment options and fees have not been configured for this fictional studio. For a live clinic, the team would confirm accepted payment methods and any available arrangements before treatment."],
];
