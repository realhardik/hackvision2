"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { scrollY } from "@/utils/globalScroll";

export default function Tracks({ className = "" }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const tracksTitleRef = useRef(null);
  const listWrapRef = useRef(null);
  const listRef = useRef(null);

  const [m, setM] = useState({
    sectionOff: 0,
    wrapHeight: 0,
    freezeStart: 0,
    freezeEnd: 0,
    internalDistance: 0,
    listOffset: 0,
  });

  const tracks = [
    "Web Development",
    "Blockchain/Web3",
    "AI/ML",
    "Cybersecurity",
    "I.O.T",
    "Campus Solutions",
  ];

  const trackImages = [
    "webdev.png",
    "blockchain.png",
    "aiml.png",
    "cybersec.png",
    "iot.png",
    "campus.png",
  ];

  const [currentImage, setCurrentImage] = useState(trackImages[0]);

  function resize() {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const listW = listWrapRef.current;
    const list = listRef.current;
    if (!section || !wrapper || !listW || !list) return;

    const items = Array.from(list.children);
    if (!items.length) return;

    const winHeight = window.innerHeight;
    const sectionOff = section.offsetTop;
    const wrapHeight = wrapper.offsetHeight;

    const itemCenters = items.map((it) => it.offsetTop + it.offsetHeight / 2);
    const firstCenter = itemCenters[0];
    const lastCenter = itemCenters[itemCenters.length - 1];
    const internalDistance = Math.max(0, lastCenter - firstCenter);

    const freezeStart = sectionOff + wrapHeight / 2 - winHeight / 2;
    const freezeEnd = freezeStart + internalDistance;

    const wrapCenter = listW.clientHeight / 2;
    const listOffset = wrapCenter - firstCenter;

    const sectionHeightWithInternal = wrapHeight + internalDistance;
    section.style.minHeight = `${sectionHeightWithInternal}px`;

    setM({
      sectionOff,
      wrapHeight,
      freezeStart,
      freezeEnd,
      internalDistance,
      listOffset,
    });
  }

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const comp = useTransform(scrollY, [m.freezeStart, m.freezeEnd], [0, m.internalDistance || 0], {
    clamp: true,
  });

  const internalY = useTransform(comp, (v) => -(v - (m.listOffset || 0)));

  const activeIndex = useTransform(comp, (v) => {
    if (!m.internalDistance) return 0;
    const step = m.internalDistance / (tracks.length - 1);
    return Math.round(v / step);
  });

  useMotionValueEvent(activeIndex, "change", (latest) => {
    const idx = Math.max(0, Math.min(trackImages.length - 1, Math.round(latest)));
    setCurrentImage(trackImages[idx]);
  });
  
  return (
    <section
      id="tracks"
      ref={sectionRef}
      className={`relative w-full bg-[#4bfb4b] text-black overflow-hidden -mt-2 rounded-b-[64px] ${className}`}
    >
      <motion.div className="z-2" ref={wrapperRef} style={{ y: comp }}>
        {/* <PixelDaft className="z-0 absolute top-0 left-0 w-full h-screen" /> */}
        <div className="relative flex flex-col md:flex-row w-full bn z-2">
          {/* Left title - perfectly centered */}
          <div className="w-full md:w-1/2 h-screen flex flex-col md:space-y-10 items-center justify-center pr-5">
            <div className="">
                <h2
                ref={tracksTitleRef}
                className="text-[10vw] leading-none font-bold select-none"
                >
                Tracks
                </h2>
            </div>
            <div className="relative w-full h-auto min-h-[300px] hidden md:flex justify-center items-center">
                <Image
                    key={currentImage}
                    src={`/assets/tracks/${currentImage}`}
                    alt={currentImage.replace(".png", "")}
                    className="w-[300px] h-auto"
                    width={200}
                    height={120}
                    loading="eager"
                    priority
                />
            </div>
          </div>

          {/* Right list */}
          <div
            ref={listWrapRef}
            className="relative w-full md:w-1/2 h-screen flex items-center overflow-hidden pl-5"
            >
                {/* Track list */}
                <motion.div ref={listRef} style={{ y: internalY }} className="flex flex-col w-full justify-center items-center">
                    {tracks.map((t, i) => (
                    <motion.div
                        key={t}
                        className="py-6 text-[5vw] font-semibold"
                        style={{
                        opacity: useTransform(activeIndex, (a) => (a === i ? 1 : 0.6)),
                        }}
                    >
                        {t}
                    </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
      </motion.div>
    </section>
  );
}
