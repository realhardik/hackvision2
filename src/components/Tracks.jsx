"use client";
import { useMemo } from "react";

export default function Tracks({ className = "" }) {

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
              className="group relative border-b border-dotted border-black mb-[2vw] opacity-60 hover:opacity-100 transition-opacity"
              style={{ lineHeight: "5vw" }}
            >
              <span className="block float-left w-[30vw] md:w-[35vw] lg:w-[20vw]">
                <span>{r.code}</span>
              </span>
              <span className="block float-left w-[60vw] md:w-[60vw] lg:w-[40vw]">
                <span>{r.key}</span>
              </span>
              <img
                src={r.img}
                alt="track preview"
                className="hidden md:block pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-150 absolute right-[3vw] top-1/2 -translate-y-1/2 w-[40vw] md:w-[300px] lg:w-[350px] h-auto object-contain rounded-lg"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
