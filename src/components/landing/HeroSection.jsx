// HeroSection component generated from Figma design
import React from "react";

const imgImage10 = "/images/home/image-10.jpg";
const imgImage11 = "/images/home/image-12.jpg";
const imgSlideBullets = "/images/success-slide-bullets.svg";
const imgLeftArrow = "/images/hero-left-arrow.svg";
const imgRightArrow = "/images/hero-right-arrow.svg";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[650px] flex items-center justify-center overflow-hidden bg-black" data-name="banner" data-node-id="0:184">
      {/* Background image with mask */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${imgImage10}')`, WebkitMaskImage: `url('${imgImage11}')`, maskImage: `url('${imgImage11}')` }} />
        <div className="absolute inset-0 bg-black opacity-25" style={{ WebkitMaskImage: `url('${imgImage11}')`, maskImage: `url('${imgImage11}')` }} />
      </div>
      {/* Main flex container for content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-between w-full max-w-[1440px]" style={{position: 'relative', width: '100%'}}>
          {/* Left arrow at the very left edge */}
          <button className="flex items-center justify-center w-10 h-[70px] absolute left-0 top-1/2 -translate-y-1/2">
            <img alt="left arrow" className="w-full h-full" src={imgLeftArrow} />
          </button>
          {/* Heading centered */}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-white text-[64px] font-bold tracking-[-1.92px] leading-none text-center max-w-[970px]">
              Your Gateway to Investment in Nakuru County
            </h1>
          </div>
          {/* Right arrow at the very right edge */}
          <button className="flex items-center justify-center w-10 h-[70px] absolute right-0 top-1/2 -translate-y-1/2">
            <img alt="right arrow" className="w-full h-full" src={imgRightArrow} />
          </button>
        </div>
        {/* Slide bullets absolutely positioned at the bottom center of the image */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex justify-center">
          <img alt="slide bullets" className="w-[50px] h-2.5" src={imgSlideBullets} />
        </div>
      </div>
    </section>
  );
}
