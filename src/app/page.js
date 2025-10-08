"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import Summary from "@/components/Summary";
import { initSmoothScroll } from "@/utils/smoothScrollEngine";

export default function Home() {
  useEffect(() => {
    // Initialize smooth scroll when component mounts
    const engine = initSmoothScroll({ isX: false });
    
    return () => {
      if (engine) {
        engine.off();
      }
    };
  }, []);

  return (
    <main id="folio" className="relative min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <LandingPage className=""/>
      <Summary className=""/>
    </main>
  );
}
