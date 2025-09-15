// AboutSection component generated from Figma design
import React from "react";

const imgImage13 = "/images/about-image13.png";
const imgImage12 = "/images/about-image12.png";
const imgImage14 = "/images/about-image14.svg";

export default function AboutSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-24 bg-white" data-name="About" data-node-id="3:60">
      {/* Top description */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <p className="text-[20px] leading-[34px] text-black">
          As the <span className="font-bold">official investment platform of Nakuru County</span>,
          <a className="underline text-black" href="http://investinnakuru.com/"> InvestInNakuru.com </a>
          is designed to make your investor journey simple, transparent, and rewarding. From discovering viable projects to accessing permits, tax incentives, and diaspora bonds, this platform is your direct connection to county-backed opportunities.
        </p>
      </div>
      {/* Main content row with images */}
      <div className="relative flex flex-row gap-16 items-start justify-between w-full max-w-7xl mx-auto">
        {/* Image container */}
        <div className="relative w-[580px] h-[680px]">
          {/* Main image (back) */}
          <div className="absolute right-0 top-0 w-[420px] h-[580px]">
            <img
              src={imgImage12}
              alt="Business people in office"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          {/* Secondary image (front) */}
          <div className="absolute left-0 bottom-0 w-[380px] h-[520px] z-10">
            <img
              src={imgImage13}
              alt="Team collaboration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
        {/* Right text content */}
        <div className="flex flex-col gap-6 max-w-xl">
          <h2 className="text-[48px] font-bold text-black tracking-[-1.44px] leading-tight mb-4">Welcome to Nakuru — The Heartbeat of Opportunity</h2>
          <p className="text-[18px] text-black leading-[30px] mb-2">
            Nestled in the heart of the majestic Great Rift Valley, Nakuru County is more than just a beautiful destination—it's Kenya’s rising economic powerhouse. With its rich natural resources, investor-friendly leadership, and vibrant entrepreneurial spirit, Nakuru is fast becoming one of East Africa’s most dynamic hubs for sustainable and profitable investment.
          </p>
          <p className="text-[18px] text-black leading-[30px] mb-2">
            Whether your interests lie in geothermal energy, agroprocessing, healthcare, tourism, real estate, or infrastructure, Nakuru offers a unique blend of opportunity and impact—where your capital doesn’t just grow, it transforms communities.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded font-bold text-[16px] w-fit self-start">Read More About us</button>
        </div>
      </div>
    </section>
  );
}
