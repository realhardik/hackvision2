"use client";

import { useEffect, useRef } from "react";

export default function LandingPage({ className = "" }) {
    const containerRef = useRef(null);
    const pixelRefs = useRef([]);

    useEffect(() => {
        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };
      
        const pixelSpeeds = Array.from({ length: 8 }, () => {
          const r = Math.random();
          if (r > 0.85) return 0.12 + Math.random() * 0.05;
          if (r > 0.6) return 0.09 + Math.random() * 0.02;
          return 0.05 + Math.random() * 0.03;
        });
      
        const handleMouseMove = (e) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          target.x = (e.clientX - centerX) / (rect.width / 2);
          target.y = (e.clientY - centerY) / (rect.height / 2);
        };
        document.addEventListener("mousemove", handleMouseMove);
      
        const landingPage = containerRef.current;
        const animate = () => {
          requestAnimationFrame(animate);
          current.x += (target.x - current.x) * 0.07;
          current.y += (target.y - current.y) * 0.07;
      
          pixelRefs.current.forEach((pixelRef, i) => {
            if (!pixelRef) return;
            const moveX = -current.x * 20;
            const moveY = -current.y * 15;
            const speed = pixelSpeeds[i];
            const prev = pixelRef._pos || { x: 0, y: 0 };
            const newX = prev.x + (moveX - prev.x) * speed;
            const newY = prev.y + (moveY - prev.y) * speed;
            pixelRef.style.transform = `translate(${newX}px, ${newY}px)`;
            pixelRef._pos = { x: newX, y: newY };
          });
          if (window._G) {
            const scrollY = window._G.s?.y ?? 0;
            const h = landingPage.offsetHeight;

            // only run if scroll within 0–height
            if (scrollY < 0 || scrollY > h) return;

            const start = h * 0;
            const end = h * 0.8;

            if (scrollY < start) {
            landingPage.style.transform = "scale(1)";
            landingPage.style.opacity = 1;
            return;
            }

            let progress = (scrollY - start) / (end - start);
            progress = Math.min(Math.max(progress, 0), 1);

            const scale = 1 - 0.2 * progress;   // 1 → 0.7
            const opacity = 1 - progress;       // 1 → 0

            landingPage.style.transform = `scale(${scale})`;
            landingPage.style.opacity = opacity;
          }
        };
        animate();
      
        return () => document.removeEventListener("mousemove", handleMouseMove);
      }, []);
      

    return (
        <div id="landing-page" ref={containerRef} className={`relative w-full min-h-screen h-max flex flex-col p2p justify-center items-center text-white px-5 py-20 overflow-hidden z-9 ${className}`}>
            {/* Floating Pixel Images - Scattered Across Screen */}
            <div className="pointer-events-none absolute inset-0 z-5">
                {/* Pixel 1 - Top Left */}
                <img 
                    id="pixel-1"
                    ref={(el) => pixelRefs.current[0] = el}
                    src="/assets/home/pixel.png" 
                    alt="floating pixel" 
                    className="absolute top-[15vh] left-[8vw] w-[10px] sm:w-[12px] md:w-[14px] h-auto opacity-70 pixel-float-1 pixel-mouse-interactive" 
                    style={{ animationDelay: '0s' }}
                />
                
                {/* Pixel 2 - Top Right */}
                <img 
                    id="pixel-2"
                    ref={(el) => pixelRefs.current[1] = el}
                    src="/assets/home/pixel2.png" 
                    alt="floating pixel" 
                    className="absolute top-[25vh] right-[12vw] w-[8px] sm:w-[10px] md:w-[12px] h-auto opacity-75 pixel-float-2 pixel-mouse-interactive" 
                    style={{ animationDelay: '3s' }}
                />
                
                {/* Pixel 3 - Center Left */}
                <img 
                    ref={(el) => pixelRefs.current[2] = el}
                    src="/assets/home/pixel3.png" 
                    alt="floating pixel" 
                    className="absolute top-[45vh] left-[15vw] w-[12px] sm:w-[14px] md:w-[16px] h-auto opacity-80 pixel-float-3 pixel-mouse-interactive" 
                    style={{ animationDelay: '6s' }}
                />
                
                {/* Pixel 1 - Center Right */}
                <img 
                    ref={(el) => pixelRefs.current[3] = el}
                    src="/assets/home/pixel.png" 
                    alt="floating pixel" 
                    className="absolute bottom-[7vh] left-[30vw] w-[6px] sm:w-[8px] md:w-[10px] h-auto opacity-65 pixel-float-4 pixel-mouse-interactive" 
                    style={{ animationDelay: '9s' }}
                />
                
                {/* Pixel 2 - Center */}
                <img 
                    ref={(el) => pixelRefs.current[4] = el}
                    src="/assets/home/pixel2.png" 
                    alt="floating pixel" 
                    className="absolute bottom-[12vh] right-[35vw] w-[10px] sm:w-[12px] md:w-[14px] h-auto opacity-70 pixel-float-5 pixel-mouse-interactive" 
                    style={{ animationDelay: '12s' }}
                />
                
                {/* Pixel 3 - Bottom Left - Non-interactive */}
                <img 
                    ref={(el) => pixelRefs.current[5] = el}
                    src="/assets/home/pixel3.png" 
                    alt="floating pixel" 
                    className="absolute top-[65vh] left-[10vw] w-[12px] sm:w-[14px] md:w-[16px] h-auto opacity-75 pixel-float-6" 
                    style={{ animationDelay: '15s' }}
                />
                
                {/* Pixel 1 - Bottom Right - Non-interactive */}
                <img 
                    ref={(el) => pixelRefs.current[6] = el}
                    src="/assets/home/pixel.png" 
                    alt="floating pixel" 
                    className="absolute top-[70vh] right-[20vw] w-[8px] sm:w-[10px] md:w-[12px] h-auto opacity-60 pixel-float-7" 
                    style={{ animationDelay: '18s' }}
                />
                
                {/* Pixel 2 - Bottom Center - Non-interactive */}
                <img 
                    ref={(el) => pixelRefs.current[7] = el}
                    src="/assets/home/pixel2.png" 
                    alt="floating pixel" 
                    className="absolute top-[75vh] left-[45vw] w-[6px] sm:w-[8px] md:w-[10px] h-auto opacity-65 pixel-float-1" 
                    style={{ animationDelay: '21s' }}
                />
            </div>
            <div className="relative z-10 mb-[4vh]">
                <img
                src="/assets/home/hackvisionlogo.svg"
                alt="HackVision logo"
                className="w-[90vw] sm:w-[90vw] md:w-[80vw] h-auto"
                />
            </div>
            <div className="relative z-10 mb-[8vh] text-xl">
                <span className="text-amber-200">SAVE THE DATE! </span> — <span className="font-bold">OCTOBER 15th, 2025</span>
            </div>
            <div className="relative flex z-10 space-x-10">
                <img
                    src="/assets/home/register-front.png"
                    alt="Register button"
                    className="absolute w-[150px] md:w-[250px] h-auto cursor-pointer translate-[-5px] hover:translate-[0px] hover:brightness-85"
                />
                <img
                    src="/assets/home/register-back.png"
                    alt="Register button"
                    className="w-[150px] md:w-[250px] h-auto pointer-events-none"
                />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[40px] h-[40px] animate-float">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 25 25"
                >
                    <defs>
                    <clipPath id="a">
                        <path d="M0 0h25v25H0z" />
                    </clipPath>
                    <clipPath id="f">
                        <path d="M0 0h19v19H0z" />
                    </clipPath>
                    <clipPath id="g">
                        <path d="M0 0h9v9H0z" />
                    </clipPath>
                    <clipPath id="d">
                        <path d="M0 0h19v19H0z" />
                    </clipPath>
                    <clipPath id="e">
                        <path d="M0 0h9v9H0z" />
                    </clipPath>
                    <clipPath id="b">
                        <path d="M0 0h19v19H0z" />
                    </clipPath>
                    <clipPath id="c">
                        <path d="M0 0h9v9H0z" />
                    </clipPath>
                    </defs>

                    <g clipPath="url(#a)">
                    <g clipPath="url(#f)" transform="translate(3 3)" style={{ display: "block" }}>
                        <g
                        clipPath="url(#g)"
                        transform="rotate(.011) scale(2.1111)"
                        style={{ display: "block" }}
                        >
                        <path
                            fill="#FFF"
                            d="M0 2.25v1.5h.75v.75h.75v.75h.75V6H3v.75h.75V6h.75v-.75h.75V4.5H6v-.75h.75v-1.5H0z"
                            transform="rotate(.005) scale(1.3333)"
                            style={{ display: "block" }}
                        />
                        <path d="M9 0H0v9h9V0z" fill="none" style={{ display: "block" }} />
                        </g>
                    </g>
                    </g>
                </svg>
            </div>
        </div>
    )
}