"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Tracks({ className = "" }) {
  const canvasRef = useRef(null);
  const animState = useRef({ raf: 0, order: [], idx: 0 });
  const [hovered, setHovered] = useState(null);

  const rows = useMemo(
    () => [
      { key: "Cybersecurity", code: "TR.01", img: "/assets/tracks/cybersec.png" },
      { key: "Web Development", code: "TR.02", img: "/assets/tracks/webdev.png" },
      { key: "Web3 / Blockchain", code: "TR.03", img: "/assets/tracks/blockchain.png" },
      { key: "AI/ML", code: "TR.04", img: "/assets/tracks/aiml.png" },
      { key: "I.O.T", code: "TR.05", img: "/assets/tracks/iot.png" },
      { key: "Campus Solution", code: "TR.06", img: "/assets/tracks/campus.png" },
    ],
    []
  );

  const images = useMemo(() => {
    const map = new Map();
    rows.forEach((r) => {
      const img = new Image();
      img.src = r.img;
      map.set(r.key, img);
    });
    return map;
  }, [rows]);

  const clearAnim = () => {
    if (animState.current.raf) cancelAnimationFrame(animState.current.raf);
    animState.current.raf = 0;
  };

  const startReveal = (imgObj) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgObj) return;
    const ctx = canvas.getContext("2d");

    // Set CSS size from current layout and scale for DPR
    const cssW = Math.max(1, canvas.clientWidth || 350);
    const cssH = Math.max(1, canvas.clientHeight || 350);
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fit image into canvas (contain)
    const iw = imgObj.naturalWidth || imgObj.width;
    const ih = imgObj.naturalHeight || imgObj.height;
    const scale = Math.min(cssW / iw, cssH / ih);
    const dw = Math.round(iw * scale);
    const dh = Math.round(ih * scale);
    const dx = Math.floor((cssW - dw) / 2);
    const dy = Math.floor((cssH - dh) / 2);

    // Draw into offscreen buffer once
    const off = document.createElement("canvas");
    off.width = dw;
    off.height = dh;
    const offCtx = off.getContext("2d");
    offCtx.drawImage(imgObj, 0, 0, dw, dh);

    // Prepare shuffled blocks (pixel-sized tiles)
    const tile = 14; // px tile size for reveal granularity
    const cols = Math.ceil(dw / tile);
    const rowsC = Math.ceil(dh / tile);
    const order = [];
    for (let y = 0; y < rowsC; y++) {
      for (let x = 0; x < cols; x++) order.push({ x, y });
    }
    // shuffle
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    clearAnim();
    animState.current.order = order;
    animState.current.idx = 0;

    // clear canvas
    ctx.clearRect(0, 0, cssW, cssH);

    const batch = Math.max(60, Math.floor(order.length / 18)); // tune speed

    const step = () => {
      const from = animState.current.idx;
      const to = Math.min(order.length, from + batch);
      for (let k = from; k < to; k++) {
        const { x, y } = order[k];
        const sx = x * tile;
        const sy = y * tile;
        const sw = Math.min(tile, dw - sx);
        const sh = Math.min(tile, dh - sy);
        if (sw <= 0 || sh <= 0) continue;
        ctx.drawImage(off, sx, sy, sw, sh, dx + sx, dy + sy, sw, sh);
      }
      animState.current.idx = to;
      if (to < order.length) {
        animState.current.raf = requestAnimationFrame(step);
      } else {
        animState.current.raf = 0;
      }
    };

    animState.current.raf = requestAnimationFrame(step);
  };

  useEffect(() => () => clearAnim(), []);

  const handleEnter = (label) => {
    setHovered(label);
    const img = images.get(label);
    if (img && img.complete) startReveal(img);
    else if (img)
      img.onload = () => {
        if (hovered === label) startReveal(img);
      };
  };

  const handleLeave = () => {
    setHovered(null);
    clearAnim();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section
      id="tracks"
      className={`relative w-full bg-[var(--yellow)] text-[var(--f2)] overflow-hidden -mt-2 rounded-b-[64px] ${className}`}
  >
      <div className="relative w-full h-max flex justify-center items-center mb-[3vh] md:mb-[5.5vh]">
        <h2 className="cd text-[14vw] select-none">Tracks</h2>
      </div>
      <div className="relative h-max w-full px-[3vw] md:px-[5vw] lg:px-[7vw]">
        <div id="tracks-grid" className="flex flex-col flex-wrap text-[5vw] bn">
          {rows.map((r, i) => (
            <div
              key={r.key}
              onMouseEnter={() => handleEnter(r.key)}
              onMouseLeave={handleLeave}
              style={{ opacity: hovered === r.key ? 1 : 0.6 }}
            >
              <span>
                <span>{r.code}</span>
              </span>
              <span>
                <span>{r.key}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="tracks-canvas absolute right-0 top-0">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </section>
  );
}
