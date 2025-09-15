// SuccessStories component generated from Figma design
import React from "react";

const image25 = "/images/success-image25.png"; // Not downloaded due to 404
const image24 = "/images/success-image24.png";
const slideBullets = "/images/success-slide-bullets.svg";
const maskSvg = "/images/success-mask.svg";

export default function SuccessStories() {
  return (
    <section className="relative w-full bg-[#f7f7f7] py-24 flex flex-col items-center justify-center">
      <h2 className="text-[48px] font-bold text-black text-center tracking-[-1.44px] mb-12">Success Stories</h2>
      <div className="flex flex-row gap-16 items-center justify-center mb-12">
        {/* Story 1 */}
        <div className="flex flex-row items-center max-w-[500px]">
          <div className="relative w-[170px] h-[170px] mr-8 flex-shrink-0">
            <img src={image24} alt="Success Story 1" className="w-full h-full object-cover rounded-full" style={{ WebkitMaskImage: `url('${maskSvg}')`, maskImage: `url('${maskSvg}')`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }} />
          </div>
          <div>
            <p className="text-[16px] text-black leading-[28px] mb-2">“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
            <p className="text-[20px] text-black font-bold leading-normal whitespace-pre">Rothar James</p>
            <p className="text-[16px] text-black leading-normal whitespace-pre">Business Owner</p>
          </div>
        </div>
        {/* Story 2 (image missing) */}
        <div className="flex flex-row items-center max-w-[500px]">
          <div className="relative w-[170px] h-[170px] mr-8 flex-shrink-0">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full" style={{ WebkitMaskImage: `url('${maskSvg}')`, maskImage: `url('${maskSvg}')`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'cover', maskSize: 'cover' }}>
              <span className="text-gray-500">Image not found</span>
            </div>
          </div>
          <div>
            <p className="text-[16px] text-black leading-[28px] mb-2">“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
            <p className="text-[20px] text-black font-bold leading-normal whitespace-pre">Rothar James</p>
            <p className="text-[16px] text-black leading-normal whitespace-pre">Business Owner</p>
          </div>
        </div>
      </div>
      {/* Slide bullets */}
      <div className="flex justify-center mt-4">
        <img src={slideBullets} alt="Slide Bullets" className="w-[50px] h-2.5" />
      </div>
    </section>
  );
}
