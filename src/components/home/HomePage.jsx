"use client";

import React, { useEffect } from "react";
import { useLoading } from "@/context/Loading.context";
import { gsap, ScrollTrigger } from "@/utils/gsap.utils";
import DualPortalGateway from "./components/hero/DualPortalGateway";
import MotiveSection from "./components/sections/MotiveSection";
import CountUpStats from "./components/countup/CountUpStats";
import MumbaiPresenceMap from "./components/sections/MumbaiPresenceMap";
import Awards from "./components/sections/Awards";
import AboutUs from "./components/sections/AboutUs";
import TextZoom from "./components/sections/TextZoom";
import Reviews from "./components/sections/Reviews";
import ContactSection from "./components/sections/ContactSection";
import Preloader from "@/components/Loader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    if (!isLoading) {
      const rafId = requestAnimationFrame(() => {
        const images = document.querySelectorAll("img");
        const imagePromises = Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        });

        const timeout = new Promise((resolve) => setTimeout(resolve, 2000));

        Promise.race([Promise.all(imagePromises), timeout]).then(() => {
          window.dispatchEvent(new Event("resize"));
          ScrollTrigger.refresh(true);
        });
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [isLoading]);

  return (
    <main
      id="main-wrapper"
      className="relative flex flex-col items-center w-full"
    >
      {isLoading && (
        <Preloader
          words={[
            "30 Years of Trust.",
            "Affordable Luxury.",
            "Redefining Mumbai's Skyline.",
          ]}
          backgroundColor="#1c1c1c"
          circleColor="#F9F8F5"
          holdDuration={0.6}
          fadeInDuration={0.5}
          fadeOutDuration={0.3}
          exitDuration={0.01}
          explodeDuration={1}
          onComplete={() => {
            setIsLoading(false);
          }}
        />
      )}

      <div
        className={`relative w-full ${isLoading ? "pointer-events-none" : ""}`}
      >
        <div id="hero" className="w-full">
          <DualPortalGateway />
        </div>
        <div id="motive" className="w-full">
          <MotiveSection />
        </div>
        <div id="legacy" className="w-full">
          <CountUpStats />
        </div>
        <div id="presence" className="w-full">
          <MumbaiPresenceMap />
        </div>
        <div id="awards" className="w-full">
          <Awards />
        </div>
        <div id="about" className="w-full">
          <AboutUs />
        </div>
        <div id="zoom" className="w-full">
          <TextZoom />
        </div>
        <div id="reviews" className="w-full">
          <Reviews />
        </div>
        <div id="contact" className="w-full">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
