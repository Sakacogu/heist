"use client";

import type { FC } from "react";
import Lottie from "lottie-react";

interface LottieSlideProps {
  // Raw Lottie JSON
  json: object;
}

// Thin wrapper around <Lottie> so the carousel doesn’t need its types.
const LottieSlide: FC<LottieSlideProps> = ({ json }) => (
  <Lottie
    animationData={json}
    loop
    autoplay
    className="h-full w-full object-contain"
  />
);

export default LottieSlide;
