import React from "react";
import { Box } from "@mantine/core";
import { HeroSection } from "./HeroSection";
import { HowIteWorks } from "./HowIteWorks";
import { Testimonies } from "./Testimonies";
import { Features } from "./Features";

export const LandingPage: React.FC = () => {
  return (
    <>
      <Box>
        <HeroSection />
        <HowIteWorks />
        <Features />
        <Testimonies />
      </Box>
    </>
  );
};
