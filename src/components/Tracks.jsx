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

    const cssW = Math.max(1, canvas.clientWidth || 350);
    const cssH = Math.max(1, canvas.clientHeight || 350);
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const iw = imgObj.naturalWidth || imgObj.width;
    const ih = imgObj.naturalHeight || imgObj.height;
    const scale = Math.min(cssW / iw, cssH / ih);
    const dw = Math.round(iw * scale);
    const dh = Math.round(ih * scale);
    const dx = Math.floor((cssW - dw) / 2);
    const dy = Math.floor((cssH - dh) / 2);

    const off = document.createElement("canvas");
    off.width = dw;
    off.height = dh;
    const offCtx = off.getContext("2d");
    offCtx.drawImage(imgObj, 0, 0, dw, dh);
    
    const tile = 14;
    const cols = Math.ceil(dw / tile);
    const rowsC = Math.ceil(dh / tile);

    // Build per-row shuffled tile orders
    const rowTiles = new Array(rowsC);
    for (let y = 0; y < rowsC; y++) {
      const row = [];
      for (let x = 0; x < cols; x++) row.push(x);
      // Fisher-Yates per row
      for (let i = row.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [row[i], row[j]] = [row[j], row[i]];
      }
      rowTiles[y] = row;
    }

    const rowIdx = new Array(rowsC).fill(0);
    let topRow = 0;
    const windowSize = 4;
    const totalTiles = cols * rowsC;
    let remaining = totalTiles;

    clearAnim();
    ctx.clearRect(0, 0, cssW, cssH);

    const batch = Math.max(60, Math.floor(totalTiles / 18)); // tune speed

    const drawOneFromRow = (y) => {
      if (y < 0 || y >= rowsC) return false;
      const idx = rowIdx[y];
      const row = rowTiles[y];
      if (idx >= row.length) return false;
      const x = row[idx];
      rowIdx[y] = idx + 1;
      const sx = x * tile;
      const sy = y * tile;
      const sw = Math.min(tile, dw - sx);
      const sh = Math.min(tile, dh - sy);
      if (sw > 0 && sh > 0) {
        ctx.drawImage(off, sx, sy, sw, sh, dx + sx, dy + sy, sw, sh);
      }
      remaining--;
      return true;
    };

    const step = () => {
      let drawn = 0;
      const bottomRow = Math.min(rowsC - 1, topRow + windowSize - 1);

      while (drawn < batch && remaining > 0) {
        let progressedInCycle = false;
        for (let y = topRow; y <= bottomRow && drawn < batch; y++) {
          if (drawOneFromRow(y)) {
            drawn++;
            progressedInCycle = true;
          }
        }
        if (!progressedInCycle) break;
      }

      while (topRow < rowsC && rowIdx[topRow] >= rowTiles[topRow].length) {
        topRow++;
      }

      if (remaining > 0) {
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
      <div className="relative h-max w-full px-[3vw] md:px-[5vw] lg:px-[7vw] py-[8vh] md:py-[10vh] lg:py-[12vh]">
        <div id="tracks-grid" className="flex flex-col flex-wrap text-[7.5vw] md:text-[5vw] bn">
          {rows.map((r, i) => (
            <div
              key={r.key}
              onMouseEnter={() => handleEnter(r.key)}
              onMouseLeave={handleLeave}
              className="border-b border-dotted border-black"
              style={{ opacity: hovered === r.key ? 1 : 0.6 }}
            >
              <span className="block float-left w-[30vw] md:w-[35vw] lg:w-[20vw]">
                <span>{r.code}</span>
              </span>
              <span className="block float-left w-[60vw] md:w-[60vw] lg:w-[40vw]">
                <span>{r.key}</span>
              </span>
            </div>
          ))}
        </div>
        <div
          className="tracks-canvas pointer-events-none aspect-square static mx-auto w-[78vw] mt-5 md:w-[66vw] md:max-w-[520px] md:static md:mx-auto lg:absolute lg:right-0 lg:top-0 lg:w-[46vw] lg:max-w-[420px] lg:mt-0 lg:mx-0"
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </section>
  );
}
