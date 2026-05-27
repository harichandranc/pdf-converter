"use client";

import { useEffect } from "react";

export default function SocialBarAd() {
  useEffect(() => {
    // PREVENT DUPLICATE
    const existing =
      document.getElementById(
        "adsterra-social-bar"
      );

    if (existing) return;

    const script =
      document.createElement("script");

    script.id =
      "adsterra-social-bar";

    script.src =
      "https://recollectsideway.com/0c/97/45/0c97457551e6950183e8afdd87b58aad.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      const ad =
        document.getElementById(
          "adsterra-social-bar"
        );

      if (ad) {
        document.body.removeChild(ad);
      }
    };
  }, []);

  return null;
}