"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { CircleCheck, Crosshair } from "lucide-react";

const spring = { stiffness: 125, damping: 20, mass: 0.8 };

export default function HeroDentalVisual() {
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pointerX = useSpring(0, spring);
  const pointerY = useSpring(0, spring);
  const engagement = useSpring(0, { stiffness: 150, damping: 23 });
  const x = useTransform(pointerX, [-1, 1], [-28, 28]);
  const y = useTransform(pointerY, [-1, 1], [-20, 20]);
  const rotateX = useTransform(pointerY, [-1, 1], [14, -14]);
  const rotateY = useTransform(pointerX, [-1, 1], [-22, 22]);
  const rotateZ = useTransform(pointerX, [-1, 1], [-5, 5]);
  const scale = useTransform(engagement, [0, 1], [1, 1.045]);
  const ringX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const ringY = useTransform(pointerY, [-1, 1], [-6, 6]);
  const cardX = useTransform(pointerX, [-1, 1], [12, -12]);
  const cardY = useTransform(pointerY, [-1, 1], [8, -8]);
  const implantX = useTransform(pointerX, [-1, 1], [18, -18]);
  const implantY = useTransform(pointerY, [-1, 1], [12, -12]);
  const implantRotation = useTransform(pointerX, [-1, 1], [14, 30]);
  const glowX = useTransform(pointerX, [-1, 1], [-85, 85]);
  const glowY = useTransform(pointerY, [-1, 1], [-65, 65]);
  const glowOpacity = useTransform(engagement, [0, 1], [0, 0.65]);
  const shadowX = useTransform(pointerX, [-1, 1], [-20, 20]);
  const shadowScale = useTransform(engagement, [0, 1], [1, 0.88]);

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
    engagement.set(0);
  };

  useEffect(() => {
    // Reset immediately if the accessibility preference changes during a hover.
    if (reduced) {
      pointerX.jump(0);
      pointerY.jump(0);
      engagement.jump(0);
    }
    const resetOnBlur = () => { pointerX.set(0); pointerY.set(0); engagement.set(0); };
    window.addEventListener("blur", resetOnBlur);
    return () => window.removeEventListener("blur", resetOnBlur);
  }, [reduced, pointerX, pointerY, engagement]);

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !visual.current) return;
    const rect = visual.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    // Measure the stationary stage so the moving tooth never shifts its own target.
    pointerX.set(clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2));
    pointerY.set(clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2));
    engagement.set(1);
  };

  return <div className="hero-art" ref={visual} onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset}>
    <div className="hero-orb" aria-hidden="true" />
    <motion.div className="hero-pointer-glow" aria-hidden="true" style={{ x: glowX, y: glowY, opacity: glowOpacity }} />
    <motion.div className="orbit orbit-one" aria-hidden="true" style={{ x: ringX, y: ringY, rotate: -29, scaleY: 0.5 }}><span /></motion.div>
    <div className="orbit orbit-two" aria-hidden="true" />
    <span className="tiny-orbit" aria-hidden="true" />
    <span className="hero-cross cross-one" aria-hidden="true">+</span>
    <span className="hero-cross cross-two" aria-hidden="true">+</span>
    <div className="hero-tooth-wrap">
      <motion.div className="hero-tooth-tilt" style={{ x, y, rotateX, rotateY, rotateZ, scale }}>
        <Image className="hero-tooth" src="/images/tooth.webp" alt="Floating white enamel molar with soft teal reflections — interactive 3D dental model" width={1280} height={1280} priority draggable={false} sizes="(max-width: 700px) 90vw, 590px" />
      </motion.div>
    </div>
    <motion.div className="tooth-shadow" aria-hidden="true" style={{ x: shadowX, scale: shadowScale }} />
    <motion.div className="precision-card" style={{ x: cardX, y: cardY }}>
      <span className="precision-icon"><Crosshair size={24} /></span>
      <div><strong>Precision Dental Care</strong><span>Thoughtfully designed around you</span></div><CircleCheck size={17} />
    </motion.div>
    <motion.div className="implant-float" aria-hidden="true" style={{ x: implantX, y: implantY, rotate: implantRotation }}><span className="implant-orbit" /><Image src="/images/implant.webp" alt="" width={100} height={150} draggable={false} /></motion.div>
    <div className="art-caption"><span className="status-dot" /><span className="art-caption-static">THE ART OF CARE. THE SCIENCE OF PRECISION.</span><span className="art-caption-interactive">MOVE YOUR CURSOR · EXPLORE EVERY ANGLE</span></div>
  </div>;
}
