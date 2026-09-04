"use client";
import React from "react";
import { dgsBatches } from "@/data/textZoom";
import TextZoomScroll from "../TextZoomScroll";

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
