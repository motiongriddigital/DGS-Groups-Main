import React from "react";
import { awardsData } from "@/data/awardsData";
import ScrollAssembleGrid from "../ScrollAssemblyGrid";

const Awards = () => {
  return (
    <ScrollAssembleGrid
      heading={"Awards & Milestones"}
      items={awardsData}
      cardType="award"
      end="+=100%"
      overlayColor="#fcfcfc"
      overlayOpacity={0.9}
      columns={4}
      gap="1.02rem"
      pinOnMobile={true}
    />
  );
};

export default Awards;
