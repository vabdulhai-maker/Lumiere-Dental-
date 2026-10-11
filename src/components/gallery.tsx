"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { gallery, galleryCategories } from "@/lib/clinic";
import { Eyebrow, Modal, Reveal } from "./ui";
import "swiper/css";
import "swiper/css/pagination";

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [slider, setSlider] = useState<SwiperType | null>(null);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = gallery.filter(item => category === "All" || item.category === category);
  const current = lightbox === null ? null : items[lightbox];
  const change = (direction: number) => setLightbox(i => i === null ? null : (i + direction + items.length) % items.length);
  useEffect(() => {
    if (lightbox === null) return;
    const key = (e: KeyboardEvent) => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); setLightbox(i => i === null ? null : (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length); } };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [lightbox, items.length]);
  return <section id="our-work" className="section gallery-section"><div className="container">
    <Reveal className="section-heading split-heading"><div><Eyebrow>A CLOSER LOOK</Eyebrow><h2>Explore Our Dental<br />Work &amp; Technology.</h2></div><p>Considered materials. Remarkable detail.<br />Discover the possibilities of modern dentistry.</p></Reveal>
    <div className="gallery-tabs" role="group" aria-label="Filter gallery by category">{galleryCategories.map(c => <button key={c} className={category === c ? "active" : ""} aria-pressed={category === c} onClick={() => { setCategory(c); setSlide(0); }}>{c}</button>)}</div>
    <div className="sr-only" aria-live="polite">{items.length} illustrations in {category}</div>
    <Swiper key={category} modules={[A11y, Keyboard, Pagination]} onSwiper={setSlider} onSlideChange={s => setSlide(s.activeIndex)} keyboard={{ enabled: true, onlyInViewport: true }} pagination={{ clickable: true }} spaceBetween={24} slidesPerView={1.08} breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 22 }, 1024: { slidesPerView: 3, spaceBetween: 26 } }} speed={550} className="gallery-swiper">
      {items.map((item, i) => <SwiperSlide key={item.title}><button className="gallery-card" onClick={() => setLightbox(i)} aria-label={"View " + item.title}><div className={"gallery-image tone-" + item.tone + (item.image === "clinic" ? " is-interior" : "")}><Image src={"/images/" + item.image + ".webp"} alt={item.title + " — illustrative concept render"} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px" /><span className="expand"><Expand size={17} /></span><span className="gallery-number">0{i + 1}</span></div><div className="gallery-card-copy"><span className="micro-label">{item.category}</span><h3>{item.title}<ArrowUpRight size={20} /></h3><p>{item.description}</p></div></button></SwiperSlide>)}
    </Swiper>
    <div className="gallery-bottom"><p>Concept visuals &amp; product renders. Not actual patient cases.</p><div className="slider-controls"><button className="icon-button" aria-label="Previous gallery slide" disabled={!slider || slide === 0} onClick={() => slider?.slidePrev()}><ArrowLeft size={20} /></button><button className="icon-button" aria-label="Next gallery slide" disabled={!slider || slider.isEnd} onClick={() => slider?.slideNext()}><ArrowRight size={20} /></button></div></div>
    <Modal open={current !== null} onClose={() => setLightbox(null)} title={current?.title || "Gallery image"} className="lightbox">{current && <><div className={"lightbox-image tone-" + current.tone + (current.image === "clinic" ? " is-interior" : "")}><Image src={"/images/" + current.image + ".webp"} alt={current.title + " — illustrative concept"} fill sizes="90vw" /></div><div className="lightbox-copy"><div><span className="micro-label">{current.category} · Concept render</span><h3>{current.title}</h3><p>{current.description}</p></div><div className="slider-controls"><button className="icon-button" onClick={() => change(-1)} aria-label="Previous image"><ArrowLeft size={20} /></button><span aria-live="polite">{(lightbox ?? 0) + 1} / {items.length}</span><button className="icon-button" onClick={() => change(1)} aria-label="Next image"><ArrowRight size={20} /></button></div></div></>}</Modal>
  </div></section>;
}
