// utils/globalScroll.js
"use client";
import { motionValue } from "framer-motion";

export const scrollY = motionValue(0);

let started = false;
export function initGlobalScroll() {
  if (started) return;
  started = true;

  const update = () => {
    const y = window._G?.s?.y ?? window.scrollY ?? 0;
    scrollY.set(y);
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
