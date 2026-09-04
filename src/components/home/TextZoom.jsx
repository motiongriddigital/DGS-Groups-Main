"use client";
import React from "react";
import TextZoomScroll from "@/components/reuseable-animated-component/TextZoomScroll";
import { dgsBatches } from "@/data/textZoom";

const TextZoom = () => {
  return (
    <TextZoomScroll
      batches={dgsBatches}
      bgColor="#F9F8F5"
      textColor="#121212"
      subTextColor="var(--color-primary, #C59B6D)"
    />
  );
};

export default TextZoom;
