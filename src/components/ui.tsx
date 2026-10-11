"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export function ToothMark({ className = "" }: { className?: string }) {
  return <svg className={className} width="34" height="38" viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M11 5C2 7 4 17 7 24c2 5 3 15 6 15 4 0 2-15 7-15s3 15 7 15c3 0 4-10 6-15 3-7 5-17-4-19-4-1-6 2-9 2s-5-3-9-2Z" stroke="currentColor" strokeWidth="2.3"/><path d="m17 7 9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
export function Brand({ light = false }: { light?: boolean }) {
  return <a href="/#home" className={"brand " + (light ? "brand-light" : "")} aria-label="Lumière Dental Studio home"><span className="brand-mark"><ToothMark /></span><span className="brand-type">lumière<span>DENTAL STUDIO</span></span></a>;
}
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 1, y: 0 }} whileInView={reduced ? {} : { y: [20, 0], opacity: [0.45, 1] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={"eyebrow " + (light ? "eyebrow-light" : "")}><span />{children}</p>;
}
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={"text-link " + className}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
export function Modal({ open, onClose, title, children, className = "" }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, [open]);
  return <dialog ref={ref} className={"modal " + className} aria-label={title} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) { const box = e.currentTarget.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) onClose(); } }}><button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog"><X size={21} /></button>{open && children}</dialog>;
}
