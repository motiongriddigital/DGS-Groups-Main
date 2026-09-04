import React from "react";
import { aboutUsData } from "@/data/featuresData";
import MultiStepTextScroll from "../MultiStepTextScroll";

const AboutUs = () => {
  return <MultiStepTextScroll data={aboutUsData} bgColor="#F9F8F5" />;
};

export default AboutUs;
