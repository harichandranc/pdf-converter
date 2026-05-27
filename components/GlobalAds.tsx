"use client";

import Script from "next/script";

export default function GlobalAds() {
  return (
    <>
      {/* SOCIAL BAR AD */}
      <Script
        id="adsterra-social"
        strategy="afterInteractive"
        src="https://recollectsideway.com/0c/97/45/0c97457551e6950183e8afdd87b58aad.js"
      />
    </>
  );
}