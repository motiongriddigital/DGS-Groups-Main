"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  STATIONS_DATA,
  RAILWAY_PATH_D,
  STATIONS_DATA_VERTICAL,
  RAILWAY_PATH_D_VERTICAL,
} from "@/data/mapData";
import MapHeader from "./MapHeader";
import MapBackground from "./MapBackground";
import MapStationNode from "./MapStationNode";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveTransitMap({ title, subtitle }) {
  const sectionRef = useRef(null);
  const pathRefHorizontal = useRef(null);
  const pathRefVertical = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const pathH = pathRefHorizontal.current;
    const pathV = pathRefVertical.current;

    if (pathH) {
      const totalH = pathH.getTotalLength();
      gsap.set(pathH, {
        strokeDasharray: totalH,
        strokeDashoffset: totalH,
      });
    }

    if (pathV) {
      const totalV = pathV.getTotalLength();
      gsap.set(pathV, {
        strokeDasharray: totalV,
        strokeDashoffset: totalV,
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * STATIONS_DATA.length),
              STATIONS_DATA.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      if (pathH) {
        tl.to(
          pathH,
          {
            strokeDashoffset: 0,
            ease: "none",
          },
          0
        );
      }

      if (pathV) {
        tl.to(
          pathV,
          {
            strokeDashoffset: 0,
            ease: "none",
          },
          0
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center py-12 px-4 md:px-8 overflow-hidden"
    >
      {/* Header */}
      <MapHeader title={title} subtitle={subtitle} />

      {/* ------------------------------------------------------------- */}
      {/* 1. MOBILE & TABLET LAYOUT (< lg): VERTICAL MAP ONLY */}
      {/* ------------------------------------------------------------- */}
      <div className="block lg:hidden relative w-full max-w-md sm:max-w-lg md:max-w-xl mt-8 sm:mt-12">
        <div className="relative w-full bg-[#f0f3f5] border border-[#e2e6ea] rounded-2xl p-3 sm:p-5 shadow-sm">
          <div className="relative w-full aspect-[5/9.8]">
            <svg
              viewBox="0 0 500 980"
              className="w-full h-full z-10 overflow-visible select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter
                  id="goldGlowMobile"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Vertical Map Background (Unmoved) */}
              <MapBackground isVertical={true} />

              {/* Shifted Left 10% (50px) Group ONLY for SVG Track Path & Station Nodes */}
              <g transform="translate(-50, 0)">
                {/* Faint Dashed Track */}
                <path
                  d={RAILWAY_PATH_D_VERTICAL}
                  fill="none"
                  stroke="#D8D2C5"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                />

                {/* Animated Active Gold Track */}
                <path
                  ref={pathRefVertical}
                  d={RAILWAY_PATH_D_VERTICAL}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#goldGlowMobile)"
                />

                {/* Station Nodes */}
                {STATIONS_DATA_VERTICAL.map((st, idx) => (
                  <MapStationNode
                    key={st.id}
                    station={st}
                    isActive={idx === activeIndex}
                    isPassed={idx <= activeIndex}
                    isVertical={true}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DESKTOP LAYOUT (>= lg): HORIZONTAL MAP ONLY */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:block relative w-full max-w-6xl mt-20 md:mt-24">
        <div className="relative w-full bg-[#f0f3f5] border border-[#e2e6ea] rounded-3xl shadow-sm p-6 overflow-hidden">
          <div className="relative w-full aspect-[12/5]">
            <svg
              viewBox="0 0 1200 500"
              className="w-full h-full z-10 overflow-visible select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter
                  id="goldGlowDesktop"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Centered & Scaled Map Group */}
              <g transform="translate(10, -124) scale(1.22)">
                <MapBackground isVertical={false} />

                <path
                  d={RAILWAY_PATH_D}
                  fill="none"
                  stroke="#D8D2C5"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                />

                <path
                  ref={pathRefHorizontal}
                  d={RAILWAY_PATH_D}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#goldGlowDesktop)"
                />

                {STATIONS_DATA.map((st, idx) => (
                  <MapStationNode
                    key={st.id}
                    station={st}
                    isActive={idx === activeIndex}
                    isPassed={idx <= activeIndex}
                    isVertical={false}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
