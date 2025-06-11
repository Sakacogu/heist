"use client";

import Lottie from "lottie-react";

export default function LottieSlide({ json }: { json: object }) {
  return (
    <Lottie
      animationData={json}
      loop
      autoplay
      className="w-full h-full object-contain"
    />
  );
}
