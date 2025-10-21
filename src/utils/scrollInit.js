// app/ScrollInit.js
"use client";
import { useEffect } from "react";
import { initGlobalScroll } from "@/utils/globalScroll";

export default function ScrollInit() {
  useEffect(() => {
    initGlobalScroll();
  }, []);
  return null;
}
