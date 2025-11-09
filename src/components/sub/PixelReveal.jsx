import { useEffect, useRef } from "react";
import { scrollY } from "@/utils/globalScroll";

export default function PixelReveal({ className="" }) {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const colorB = "#ffe600";

    const pixelSize = 90;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let grid = [];

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

    const rowDuration = 0.15;
    const rowOffset = 0.05;

    const easeInOut = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const draw = (p) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colorB; 
      
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

        if (pixelCount < row.length && frac > 0) {
          const { x, y } = row[pixelCount];
          const prevAlpha = ctx.globalAlpha;
          ctx.globalAlpha = frac;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          ctx.globalAlpha = prevAlpha;
        }
      }
    };

    let targetProgress = 0; // set by scroll (0..1)
    let currentProgress = 0; // used for drawing (0..1), eased over time
    let rafId = 0;
    let lastTs = 0;
    const revealDurationMs = 900; // time to cover full 0->1 if target jumps instantly

    const run = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(100, ts - lastTs); // clamp to avoid huge steps on tab switch
      lastTs = ts;

      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 1e-4) {
        const step = dt / revealDurationMs; // fraction per frame based on elapsed ms
        const next = currentProgress + Math.sign(delta) * Math.min(Math.abs(delta), step);
        currentProgress = Math.min(1, Math.max(0, next));
        draw(currentProgress);
        rafId = requestAnimationFrame(run);
      } else {
        // Snap to target and stop
        currentProgress = targetProgress;
        draw(currentProgress);
        rafId = 0;
        lastTs = 0;
      }
    };

    const ensureAnimating = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(run);
      }
    };

    const unsub = scrollY.on("change", () => {
      const tracks = document.getElementById("tracks");
      if (!tracks) return;
      const top = tracks.getBoundingClientRect().top;
      const vh = window.innerHeight;
      targetProgress = Math.min(Math.max(1 - top / vh, 0), 1);
      ensureAnimating();
    });

    const onResize = () => {
      setupCanvasAndGrid();
      draw(currentProgress);
    };
    window.addEventListener("resize", onResize);

    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`relative h-screen -mt-[50%] ${className}`}>
      <canvas ref={canvasRef} className="sticky top-0 h-screen w-full" />
    </div>
  );
}
