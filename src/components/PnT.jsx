"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Prizes from "./Prizes";
import Timeline from "./Timeline";

export default function PnT() {
  const sectionRef = useRef(null)
  const wrapRef = useRef(null);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      scrollY.set(window._G?.s?.y || 0);
      requestAnimationFrame(update);
    };
    update();
  }, [scrollY]);

  const [start, end] = [useRef(0), useRef(0)];

  useEffect(() => {
    const section = sectionRef.current
    const pntWrap = wrapRef.current;
    const tracks = document.querySelector("#tracks");
    if (!pntWrap || !tracks) return;

    const rect1 = pntWrap.getBoundingClientRect();
    const rect2 = tracks.getBoundingClientRect();

    start.current = section.offsetTop - window.innerHeight;
    end.current = tracks.offsetTop + tracks.offsetHeight;
    console.log(start.current)
    console.log(end.current)
  }, []);

  const y = useTransform(
    scrollY,
    [start.current, end.current],
    [0, -(end.current - start.current)],
    { clamp: true }
  );

  return (
    <section id="pnt" ref={sectionRef} className="w-full h-auto relative">
      <motion.div
        id="pnWrap"
        ref={wrapRef}
        style={{ y }}
        className="w-full h-auto relative -top-[100vh]"
      >
        <div className="absolute w-full h-screen top-0 left-0 daybg -z-1" />
        <Prizes />
        <Timeline />
      </motion.div>
    </section>
  );
}
