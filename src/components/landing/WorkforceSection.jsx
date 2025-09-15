// WorkforceSection component generated from Figma design
import React from "react";

const bgImage = "/images/workforce-bg.png";
const maskImage = "/images/workforce-mask.svg";

export default function WorkforceSection() {
  return (
    <section className="relative w-full h-[660px] flex items-center justify-center overflow-hidden bg-black">
      {/* Masked background image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${bgImage}')`, WebkitMaskImage: `url('${maskImage}')`, maskImage: `url('${maskImage}')`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }} />
        <div className="absolute inset-0 bg-black opacity-25" style={{ WebkitMaskImage: `url('${maskImage}')`, maskImage: `url('${maskImage}')` }} />
      </div>
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-white text-[48px] font-bold tracking-[-1.44px] text-center mb-8 max-w-[770px]">Young innovative educated workforce</h2>
        <button className="bg-[#006600] text-white px-8 py-3 rounded font-bold text-[16px]">Read More</button>
      </div>
    </section>
  );
}
