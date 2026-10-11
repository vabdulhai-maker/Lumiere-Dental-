"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, CalendarDays, Check, ChevronDown, CircleCheck, Clock3, Crosshair, Gem, Layers3, Leaf, Mail, MapPin, Menu, MessageCircle, Microscope, MoveUpRight, Phone, Plus, ScanLine, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { clinic, faqs, navigation, reviews, services } from "@/lib/clinic";
import { ArrowLink, Brand, Eyebrow, Modal, Reveal, ToothMark } from "./ui";
import Gallery from "./gallery";
import AppointmentForm from "./appointment-form";

const benefits = [
  { icon: ScanLine, title: "Advanced Technology", text: "Thoughtful tools for a clearer picture of your dental health." },
  { icon: Leaf, title: "Gentle Treatment Philosophy", text: "An unhurried approach, with your comfort at its heart." },
  { icon: Crosshair, title: "Personalized Care", text: "A treatment plan shaped around your needs and goals." },
  { icon: MessageCircle, title: "Transparent Communication", text: "Clear explanations. Considered options. No unanswered questions." },
];

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    navigation.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", scroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (e.key === "Tab") {
        const links = mobileNav.current?.querySelectorAll<HTMLElement>("a");
        if (!links?.length) return;
        if (e.shiftKey && document.activeElement === menuButton.current) { e.preventDefault(); links[links.length - 1].focus(); }
        if (!e.shiftKey && document.activeElement === links[links.length - 1]) { e.preventDefault(); menuButton.current?.focus(); }
      }
    };
    const mq = window.matchMedia("(min-width: 1150px)");
    const resize = () => { if (mq.matches) setOpen(false); };
    document.addEventListener("keydown", key); mq.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", key); mq.removeEventListener("change", resize); };
  }, [open]);
  return <header className={"site-header " + (scrolled || open ? "is-scrolled" : "")}><div className="container nav-wrap"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, id]) => <a key={id} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined} href={"#" + id}>{label}</a>)}</nav><a className="button primary nav-cta" href="#contact">Book Appointment<ArrowUpRight size={16} /></a><button ref={menuButton} className="icon-button menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div><AnimatePresence>{open && <motion.div ref={mobileNav} id="mobile-navigation" className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><nav aria-label="Mobile navigation">{navigation.map(([label, id]) => <a key={id} href={"#" + id} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}<a href="#contact" className="button primary" onClick={() => setOpen(false)}>Book Appointment<CalendarDays size={17} /></a></nav></motion.div>}</AnimatePresence></header>;
}

function Hero() {
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !visual.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    visual.current.style.setProperty("--pointer-x", ((e.clientX - r.left) / r.width - 0.5) * 12 + "px");
    visual.current.style.setProperty("--pointer-y", ((e.clientY - r.top) / r.height - 0.5) * 12 + "px");
  };
  return <section id="home" className="hero" onPointerMove={pointer} onPointerLeave={() => { visual.current?.style.setProperty("--pointer-x", "0px"); visual.current?.style.setProperty("--pointer-y", "0px"); }}>
    <div className="hero-wash" aria-hidden="true" />
    <div className="container hero-grid">
      <div className="hero-copy"><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><Eyebrow>THE FUTURE OF DENTAL CARE</Eyebrow></motion.div><h1>{["Elevating", "Every Smile", "With Modern", "Dentistry."].map((line, i) => <motion.span className={i === 1 ? "accent" : ""} key={line} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + i * 0.11 }}>{line}{i === 1 && <svg className="headline-swoosh" viewBox="0 0 350 15" aria-hidden="true"><path d="M3 9C92 0 232 0 346 9M55 13C149 4 271 5 319 10" /></svg>}</motion.span>)}</h1><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}><p className="hero-description">Discover a new standard of dental care with advanced technology, personalized treatments, and a commitment to your comfort and confidence.</p><div className="hero-actions"><a href="#contact" className="button primary">Book Your Appointment<ArrowUpRight size={18} /></a><a href="#services" className="button secondary">Explore Our Services<ArrowRight size={17} /></a></div><div className="hero-trust"><span><ShieldCheck />Advanced Technology</span><span><Sparkles />Personalized Care</span><span><ToothMark />Modern Treatments</span></div></motion.div></div>
      <div className="hero-art" ref={visual}><div className="hero-orb" aria-hidden="true" /><div className="orbit orbit-one" aria-hidden="true"><span /></div><div className="orbit orbit-two" aria-hidden="true" /><span className="tiny-orbit" aria-hidden="true" /><span className="hero-cross cross-one" aria-hidden="true">+</span><span className="hero-cross cross-two" aria-hidden="true">+</span><div className="hero-tooth-wrap"><Image className="hero-tooth" src="/images/tooth.webp" alt="Oversized floating white enamel molar with soft teal reflections — 3D dental model" width={1280} height={1280} priority sizes="(max-width: 700px) 90vw, 590px" /></div><div className="tooth-shadow" aria-hidden="true" /><div className="precision-card"><span className="precision-icon"><Crosshair size={24} /></span><div><strong>Precision Dental Care</strong><span>Thoughtfully designed around you</span></div><CircleCheck size={17} /></div><div className="implant-float" aria-hidden="true"><span className="implant-orbit" /><Image src="/images/implant.webp" alt="" width={100} height={150} /></div><div className="art-caption"><span className="status-dot" /> THE ART OF CARE. THE SCIENCE OF PRECISION.</div></div>
    </div>
    <div className="container hero-bottom"><span><MapPin size={14} /> AHMEDABAD, GUJARAT</span><a href="#about">A better dental experience, by design <ArrowDown size={15} /></a><span className="hero-edition">THE LUMIÈRE APPROACH — 01</span></div>
  </section>;
}

function TrustStrip() {
  const items = [{ icon: ScanLine, title: "Advanced Dental Technology", text: "Precision at every step" }, { icon: Leaf, title: "Comfortable Care", text: "A calmer kind of dentistry" }, { icon: Gem, title: "Personalized Treatment", text: "As individual as you are" }, { icon: Layers3, title: "Comprehensive Services", text: "Your care, connected" }];
  return <div className="trust-strip"><div className="container trust-grid">{items.map((item, i) => <Reveal key={item.title} className="trust-item" delay={i * 0.05}><item.icon size={27} strokeWidth={1.35} /><div><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>)}</div></div>;
}

function About() {
  return <section id="about" className="section about-section"><div className="container about-grid"><Reveal className="about-visual"><div className="about-image"><Image src="/images/clinic.webp" alt="Architectural concept of an empty dental suite with a sage chair, warm oak cabinetry, and daylight" fill sizes="(max-width: 800px) 90vw, 550px" /><span className="image-label">THE STUDIO · AN ARCHITECTURAL CONCEPT</span></div><div className="about-stamp"><ToothMark /><span>Designed for care.<br /><strong>Defined by detail.</strong></span></div><span className="image-corner" aria-hidden="true" /></Reveal><Reveal className="about-copy"><Eyebrow>WELCOME TO LUMIÈRE</Eyebrow><h2>A New Perspective<br />on Dental <span className="accent">Excellence.</span></h2><p>We believe exceptional dentistry begins with a different kind of experience. One that feels calm, considered, and entirely centered on you.</p><p>At Lumière, modern technology meets a thoughtful approach to care. From your first conversation to your ongoing treatment, every detail is designed to help you feel informed and at ease.</p><ul className="check-list"><li><Check />Modern Dental Equipment</li><li><Check />Individualized Treatment Planning</li><li><Check />Transparent Patient Communication</li></ul><ArrowLink href="#why-us">Discover the Lumière difference</ArrowLink></Reveal></div></section>;
}

function Services({ onSelect }: { onSelect: (index: number) => void }) {
  return <section id="services" className="section services-section"><div className="container"><Reveal className="section-heading split-heading"><div><Eyebrow>EXPERTISE, THOUGHTFULLY DELIVERED</Eyebrow><h2>Advanced Care for<br />Every Dental Need.</h2></div><p>From everyday essentials to transformative care,<br className="desktop-break" /> a considered approach at every stage.</p></Reveal><div className="services-grid">{services.map((service, i) => <Reveal className={"service-card tone-" + service.tone} key={service.id} delay={(i % 3) * 0.07}><button onClick={() => onSelect(i)} aria-label={"Learn more about " + service.name}><div className="service-top"><span className="service-number">0{i + 1}</span><span className="service-arrow"><ArrowUpRight size={20} /></span></div><div className={"service-image service-" + service.id}><Image src={"/images/" + service.image + ".webp"} alt={service.name + " artificial dental model"} fill sizes="(max-width: 600px) 80vw, (max-width: 900px) 40vw, 320px" />{service.id === "whitening" && <><Sparkles className="whitening-sparkle" /><span className="shine-dot" /></>}</div><div className="service-content"><span className="micro-label">{service.eyebrow}</span><h3>{service.name}</h3><p>{service.description}</p><span className="service-learn">Learn more<ArrowRight size={15} /></span></div></button></Reveal>)}</div><p className="services-note">Looking for something specific? <a href="#contact">Let’s find the right care for you <ArrowUpRight size={14} /></a></p></div></section>;
}

function WhyUs() {
  return <section id="why-us" className="section why-section"><div className="container why-grid"><Reveal><Eyebrow light>THE LUMIÈRE DIFFERENCE</Eyebrow><h2>Precision, Comfort,<br />and <span>Innovation.</span></h2><p className="why-intro">Great care is more than a treatment.<br />It’s how every part of the experience comes together.</p><div className="benefits">{benefits.map((item, i) => <div className="benefit" key={item.title}><span className="benefit-icon"><item.icon size={23} strokeWidth={1.4} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="benefit-number">0{i + 1}</span></div>)}</div></Reveal><Reveal className="why-visual"><div className="why-ring" /><Image src="/images/implant.webp" alt="Exploded view of a ceramic crown, titanium abutment, and implant screw" width={1024} height={1536} sizes="(max-width: 800px) 70vw, 430px" /><div className="tech-label tech-label-one"><span />CERAMIC RESTORATION</div><div className="tech-label tech-label-two"><span />PRECISION ENGINEERING</div><div className="why-caption"><Crosshair size={20} /><span>Small details.<br /><strong>A meaningful difference.</strong></span></div></Reveal></div></section>;
}

function Process() {
  const steps = [{ icon: CalendarDays, title: "Book a Consultation", text: "Choose a time that fits your day. We’ll take it from there." }, { icon: ScanLine, title: "Dental Assessment", text: "A thoughtful look at your dental health, needs, and goals." }, { icon: Layers3, title: "Personalized Treatment Plan", text: "Understand your options with a clear, considered plan." }, { icon: ShieldCheck, title: "Continued Dental Care", text: "Ongoing guidance to support your long-term dental health." }];
  return <section className="section process-section"><div className="container"><Reveal className="section-heading centered"><Eyebrow>CONSIDERED CARE, EVERY STEP</Eyebrow><h2>Your Journey to<br />Better Dental Care.</h2><p>A clear path. A comfortable pace. Care that continues.</p></Reveal><div className="process-grid">{steps.map((s, i) => <Reveal className="process-step" key={s.title} delay={i * 0.09}><div className="process-top"><span className="step-icon"><s.icon size={26} strokeWidth={1.5} /></span><span className="step-number">0{i + 1}</span></div><h3>{s.title}</h3><p>{s.text}</p></Reveal>)}</div></div></section>;
}

function Reviews() {
  const [slider, setSlider] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  return <section id="reviews" className="section reviews-section"><div className="container"><Reveal className="section-heading split-heading"><div><Eyebrow>WORDS THAT MATTER</Eyebrow><h2>What Our Patients Say.</h2></div><div className="review-heading-right"><p>The kind of experience we aspire to create.</p><span className="sample-pill">ILLUSTRATIVE SAMPLE REVIEWS</span></div></Reveal><Swiper modules={[A11y, Keyboard, Pagination]} onSwiper={setSlider} onSlideChange={s => setIndex(s.activeIndex)} keyboard={{ enabled: true, onlyInViewport: true }} pagination={{ clickable: true }} slidesPerView={1} spaceBetween={24} breakpoints={{ 700: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }} className="reviews-swiper">{reviews.map((r, i) => <SwiperSlide key={r.name}><article className="review-card"><div className="review-stars" aria-label="5 out of 5 stars, sample rating">{[1, 2, 3, 4, 5].map(n => <Star key={n} size={14} fill="currentColor" />)}<span aria-hidden="true">“</span></div><blockquote>“{r.text}”</blockquote><div className="review-person"><span className={"initials initials-" + i}>{r.initials}</span><div><h3>{r.name}</h3><p>{r.service}</p></div><span className="review-sample">Sample</span></div></article></SwiperSlide>)}</Swiper><div className="reviews-bottom"><p>Fictional names and reviews for this concept. Verified patient feedback will replace these before launch.</p><div className="slider-controls"><button className="icon-button" aria-label="Previous review" disabled={index === 0} onClick={() => slider?.slidePrev()}><ArrowLeft size={19} /></button><button className="icon-button" aria-label="Next review" disabled={!slider || slider.isEnd} onClick={() => slider?.slideNext()}><ArrowRight size={19} /></button></div></div></div></section>;
}

function CallToAction({ onCall }: { onCall: () => void }) {
  return <section className="cta-section"><div className="container"><Reveal className="cta-panel"><div className="cta-copy"><Eyebrow light>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2>Your Next Step Toward<br />Better Dental Health<br /><span>Starts Here.</span></h2><p>Connect with our team and discover personalized dental care designed around your needs.</p><div className="cta-actions"><a href="#contact" className="button light">Book Appointment<ArrowUpRight size={18} /></a><button className="button ghost-light" onClick={onCall}><Phone size={16} />Call Our Clinic</button></div></div><div className="cta-art" aria-hidden="true"><div className="cta-ring" /><div className="cta-ring second" /><Image src="/images/tooth.webp" alt="" width={450} height={450} sizes="450px" /><Sparkles className="cta-sparkle" size={31} strokeWidth={1} /></div><span className="cta-footer">THE ART OF CARE. THE LUMIÈRE WAY.</span></Reveal></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="section faq-section"><div className="container faq-grid"><Reveal><Eyebrow>A LITTLE CLARITY</Eyebrow><h2>Frequently<br />Asked Questions.</h2><p>Good care starts with good conversations.<br />Here are a few answers to get you started.</p><ArrowLink href="#contact">Have another question? Let’s talk</ArrowLink></Reveal><div className="faq-list">{faqs.map(([q, a], i) => <div className={"faq-item " + (open === i ? "is-open" : "")} key={q}><h3><button aria-expanded={open === i} aria-controls={"faq-panel-" + i} id={"faq-button-" + i} onClick={() => setOpen(open === i ? null : i)}><span className="faq-number">0{i + 1}</span>{q}<Plus size={19} /></button></h3><div className="faq-answer" id={"faq-panel-" + i} role="region" aria-labelledby={"faq-button-" + i} hidden={open !== i}><p>{a}</p></div></div>)}</div></div></section>;
}

function Contact({ selectedService, onContact }: { selectedService: string; onContact: () => void }) {
  return <section id="contact" className="section contact-section"><div className="container contact-grid"><Reveal className="contact-copy"><Eyebrow>LET’S BEGIN</Eyebrow><h2>Let’s Take<br />the <span className="accent">First Step.</span></h2><p>Tell us what you’re looking for.<br />Thoughtful care begins with a conversation.</p><div className="contact-details"><div><span className="contact-icon"><MapPin size={20} /></span><div><span>FIND THE STUDIO</span><p>{clinic.location}</p><small>Concept location · Address to be confirmed</small></div></div><div><span className="contact-icon"><Phone size={20} /></span><div><span>GIVE US A CALL</span><button className="plain-link" onClick={onContact}>{clinic.phone}</button><small>Fictional contact number</small></div></div><div><span className="contact-icon"><Mail size={20} /></span><div><span>DROP US A NOTE</span><button className="plain-link" onClick={onContact}>{clinic.email}</button><small>Demonstration email address</small></div></div><div><span className="contact-icon"><Clock3 size={20} /></span><div><span>PROPOSED STUDIO HOURS</span><p>{clinic.hours}</p><small>Sunday: closed</small></div></div></div><div className="contact-mini-image"><Image src="/images/clinic.webp" alt="Sunlit, empty dental studio architectural concept" fill sizes="(max-width: 800px) 90vw, 450px" /><span>A calmer kind of dental care.</span></div></Reveal><Reveal><AppointmentForm selectedService={selectedService} /></Reveal></div></section>;
}

function Footer({ onContact }: { onContact: () => void }) {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Brand light /><p>{clinic.tagline}.<br />Thoughtful care. Modern dentistry.<br />A little more Lumière.</p><span className="footer-location"><MapPin size={14} />Ahmedabad, Gujarat</span></div><div><h3>Explore</h3><nav aria-label="Footer navigation">{navigation.slice(1).map(([label, id]) => <a key={id} href={"#" + id}>{label}</a>)}</nav></div><div><h3>Our Care</h3><nav aria-label="Our services">{services.map(s => <a key={s.id} href="#services">{s.name}</a>)}</nav></div><div className="footer-contact"><h3>Let’s Connect</h3><button onClick={onContact}>{clinic.phone}<ArrowUpRight size={14} /></button><button onClick={onContact}>{clinic.email}</button><p>Monday – Saturday<br />9:00 AM – 7:00 PM</p>{clinic.socialLinks.length ? clinic.socialLinks.map(s => <a key={s.url} href={s.url} rel="noopener noreferrer" target="_blank">{s.label}<ArrowUpRight size={14} /></a>) : <small>Social channels will be added at launch.</small>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Lumière Dental Studio.</span><div><a href="/privacy">Privacy Policy</a><a href="/terms">Terms &amp; Conditions</a></div><a href="#home" className="back-top">Back to top<ArrowUp size={16} /></a></div><p className="demo-disclosure">Studio imagery, reviews, opening hours, and unverified business details are illustrative. Appointment requests continue in WhatsApp and require confirmation.</p></div></footer>;
}

export default function DentalStudio() {
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const selected = serviceIndex === null ? null : services[serviceIndex];
  const bookService = () => {
    if (selected) setSelectedService(selected.name);
    setServiceIndex(null);
    requestAnimationFrame(() => { document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); });
  };
  return <MotionConfig reducedMotion="user"><a href="#main" className="skip-link">Skip to content</a><Navigation /><main id="main"><Hero /><TrustStrip /><About /><Services onSelect={setServiceIndex} /><WhyUs /><Gallery /><Process /><Reviews /><CallToAction onCall={() => setContactOpen(true)} /><FAQ /><Contact selectedService={selectedService} onContact={() => setContactOpen(true)} /></main><Footer onContact={() => setContactOpen(true)} /><Modal open={selected !== null} onClose={() => setServiceIndex(null)} title={selected?.name || "Service details"} className="service-modal">{selected && <><div className={"modal-service-image tone-" + selected.tone}><Image src={"/images/" + selected.image + ".webp"} alt={selected.name + " concept render"} fill sizes="500px" /></div><div className="modal-service-copy"><Eyebrow>OUR APPROACH TO CARE</Eyebrow><h2>{selected.name}</h2><p>{selected.detail}</p><ul className="check-list">{selected.includes.map(s => <li key={s}><Check size={17} />{s}</li>)}</ul><p className="modal-note">Illustrative service information. Treatment suitability, costs, and outcomes require an individual clinical assessment.</p><button className="button primary" onClick={bookService}>Explore a consultation<ArrowUpRight size={18} /></button></div></>}</Modal><Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Contact the concept studio" className="contact-modal"><span className="contact-modal-icon"><MessageCircle size={30} /></span><Eyebrow>A STUDIO CONCEPT</Eyebrow><h2>Let’s try the experience.</h2><p>Lumière is a fictional dental studio. The phone number and email address shown here are placeholders and are not connected to a clinic.</p><p>The appointment form opens WhatsApp with your details. Tap Send there to contact the configured recipient and request confirmation.</p><button className="button primary" onClick={() => { setContactOpen(false); requestAnimationFrame(() => document.getElementById("contact")?.scrollIntoView()); }}>Request via WhatsApp<ArrowUpRight size={18} /></button></Modal></MotionConfig>;
}
