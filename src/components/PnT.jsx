"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Prizes from "./Prizes";
import Timeline from "./Timeline";
import { scrollY } from "@/utils/globalScroll";

export default function PnT() {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const [range, setRange] = useState([0, 0]);
  const y = useMotionValue(0);

  // useEffect(() => {
  //   const section = sectionRef.current;
  //   const tracks = document.querySelector("#tracks");
  //   if (!section || !tracks) return;

  //   const start = section.offsetTop - window.innerHeight;
  //   const end = tracks.offsetTop + tracks.offsetHeight;
  //   setRange([start, end]);
  // }, []);

  // useEffect(() => {
  //   const [start, end] = range;
  //   if (start === end) return;
  //   const total = end - start;

  //   const update = (val) => {
  //     const clamped = Math.min(Math.max(val, start), end);
  //     const progress = (clamped - start) / total;
  //     y.set(progress * total);
  //   };

  //   const unsub = scrollY.on("change", update);
  //   return () => unsub();
  // }, [range]);

  return (
    <section id="pnt" ref={sectionRef} className="w-full h-auto relative">
      <motion.div
        id="pnWrap"
        ref={wrapRef}
        style={{ y }}
        className="w-full h-auto relative"
      >
        <div className="absolute w-full h-full top-0 left-0 daybg -z-1" />
        <Prizes />
        <Timeline />
      </motion.div>
    </section>
  );
}
