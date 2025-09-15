// NewsEvents component generated from Figma design
import React from "react";

const image29 = "/images/news-image29.png";
const image27 = "/images/news-image27.png";
const image28 = "/images/news-image28.png";
const maskSvg = "/images/news-mask.svg";

export default function NewsEvents() {
  return (
    <section className="relative w-full bg-[#ffff] py-24 flex flex-col items-center justify-center">
      <h2 className="text-[48px] font-bold text-black text-center tracking-[-1.44px] mb-12">News & Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto mb-12">
        {/* Card 1 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col p-0 shadow-sm overflow-hidden">
          <div className="relative w-full h-[250px]">
            <img src={image28} alt="News 1" className="w-full h-full object-cover" style={{ WebkitMaskImage: `url('${maskSvg}')`, maskImage: `url('${maskSvg}')`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }} />
          </div>
          <div className="p-6 flex flex-col gap-2">
            <span className="text-[#bb0000] text-[16px]">Aug 14, 2025</span>
            <h3 className="text-[24px] font-bold text-black tracking-[-0.72px] leading-[38px]">It is a long established fact that a reader will be readable content.</h3>
            <p className="text-[16px] text-black leading-[28px]">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col p-0 shadow-sm overflow-hidden">
          <div className="relative w-full h-[250px]">
            <img src={image27} alt="News 2" className="w-full h-full object-cover" style={{ WebkitMaskImage: `url('${maskSvg}')`, maskImage: `url('${maskSvg}')`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }} />
          </div>
          <div className="p-6 flex flex-col gap-2">
            <span className="text-[#bb0000] text-[16px]">Aug 14, 2025</span>
            <h3 className="text-[24px] font-bold text-black tracking-[-0.72px] leading-[38px]">It is a long established fact that a reader will be readable content.</h3>
            <p className="text-[16px] text-black leading-[28px]">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col p-0 shadow-sm overflow-hidden">
          <div className="relative w-full h-[250px]">
            <img src={image29} alt="News 3" className="w-full h-full object-cover" style={{ WebkitMaskImage: `url('${maskSvg}')`, maskImage: `url('${maskSvg}')`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }} />
          </div>
          <div className="p-6 flex flex-col gap-2">
            <span className="text-[#bb0000] text-[16px]">Aug 14, 2025</span>
            <h3 className="text-[24px] font-bold text-black tracking-[-0.72px] leading-[38px]">It is a long established fact that a reader will be readable content.</h3>
            <p className="text-[16px] text-black leading-[28px]">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
          </div>
        </div>
      </div>
      <button className="bg-gradient-to-r from-[#EB3A2A] to-[#F29D3F] text-white px-6 py-2 rounded text-[18px] font-bold text-[16px]">View All News</button>
    </section>
  );
}
