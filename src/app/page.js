"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import Summary from "@/components/Summary";
import Tracks from "@/components/Tracks";
import { createGlobalConfig } from "@/utils/scrollConfig";
import { initSmoothScroll } from "@/utils/smoothScrollEngine";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window._G) {
      window._G = createGlobalConfig();
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const engine = initSmoothScroll({ isX: false });
    return () => engine?.off();
  }, [ready]);

  if (!ready) return null;

  return (
    <main id="folio" className="relative min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <LandingPage />
      <Summary />
      <Tracks />
    </main>
  );
}