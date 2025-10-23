import { useEffect, useRef } from "react";
import { scrollY } from "@/utils/globalScroll";

export default function PixelReveal({ className="" }) {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const colorB = "#4bfb4b";

    const pixelSize = 90;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let grid = [];

    // stable mapping based on visual position each frame (resilient to layout shifts)

    const setupCanvasAndGrid = () => {
      // Use CSS size for crisp DPR scaling
      const cssW = canvas.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || window.innerHeight;
      width = cssW;
      height = cssH;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / pixelSize);
      rows = Math.ceil(height / pixelSize);

      grid = [];
      for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) row.push({ x, y });
        row.sort(() => Math.random() - 0.5);
        grid.push(row);
      }
    };

    setupCanvasAndGrid();

    const rowDuration = 0.15; // keep short duration
    const rowOffset = 0.05;   // small stagger

    // easing function for smoother reveal per row
    const easeInOut = (t) => {
      // easeInOutCubic
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const draw = (p) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colorB; // set once per frame
      
      // from bottom to top
      for (let r = 0; r < rows; r++) {
        const row = grid[rows - 1 - r];
        const offset = r * rowOffset;
        const t = (p - offset) / rowDuration;
        const clamped = Math.min(Math.max(t, 0), 1);
        const eased = easeInOut(clamped);
        const f = row.length * eased;
        const pixelCount = Math.floor(f);
        const frac = f - pixelCount;

        for (let i = 0; i < pixelCount; i++) {
          const { x, y } = row[i];
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }

        // draw the next pixel with partial alpha to smooth the step
        if (pixelCount < row.length && frac > 0) {
          const { x, y } = row[pixelCount];
          const prevAlpha = ctx.globalAlpha;
          ctx.globalAlpha = frac;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          ctx.globalAlpha = prevAlpha;
        }
      }
    };

    // rAF throttle to ensure one draw per frame
    let ticking = false;
    let lastProgress = 0;
    const scheduleDraw = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          draw(lastProgress);
          ticking = false;
        });
      }
    };

    const unsub = scrollY.on("change", () => {
      const tracks = document.getElementById("tracks");
      if (!tracks) return;
      const top = tracks.getBoundingClientRect().top; // in px, relative to viewport
      const vh = window.innerHeight;
      // Map: top == vh  -> 0,  top == 0 -> 1
      lastProgress = Math.min(Math.max(1 - top / vh, 0), 1);
      scheduleDraw();
    });

    const onResize = () => {
      setupCanvasAndGrid();
      scheduleDraw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`relative h-screen -mt-[50%] ${className}`}>
      <canvas ref={canvasRef} className="sticky top-0 h-screen w-full" />
    </div>
  );
}
