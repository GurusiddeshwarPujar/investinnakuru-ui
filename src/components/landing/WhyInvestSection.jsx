// WhyInvestSection component generated from Figma design
import React from "react";

const icon1 = "/images/whyinvest-icon1.svg";
const icon2 = "/images/whyinvest-icon2.svg";
const icon3 = "/images/whyinvest-icon3.svg";
const icon4 = "/images/whyinvest-icon4.svg";

export default function WhyInvestSection() {
  return (
    <section className="relative w-full bg-[#f7f7f7] py-24 flex flex-col items-center justify-center">
      <h2 className="text-[56px] font-bold text-black text-center tracking-[-1.44px] mb-12">Why InvestInNakuru.com?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl mx-auto mb-12">
        {/* Card 1 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col items-center p-8 shadow-sm">
          <img src={icon4} alt="Curated investment-ready projects" className="w-20 h-20 mb-6" />
          <p className="text-[20px] text-black text-center leading-[32px]">Curated investment-ready projects with government support</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col items-center p-8 shadow-sm">
          <img src={icon3} alt="One-stop access" className="w-20 h-20 mb-6" />
          <p className="text-[20px] text-black text-center leading-[32px]">One-stop access to licensing, permits, and business setup tools</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col items-center p-8 shadow-sm">
          <img src={icon2} alt="Diaspora and international investor programs" className="w-20 h-20 mb-6" />
          <p className="text-[20px] text-black text-center leading-[32px]">Diaspora and international investor programs, including the Nakuru Diaspora Bond</p>
        </div>
        {/* Card 4 */}
        <div className="bg-white border border-[#e8e8e8] rounded-lg flex flex-col items-center p-8 shadow-sm">
          <img src={icon1} alt="Personalized guidance" className="w-20 h-20 mb-6" />
          <p className="text-[20px] text-black text-center leading-[32px]">Personalized guidance from the Nakuru County Investment Office</p>
        </div>
      </div>
      {/* Figma text below the cards */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <p className="text-[20px] text-black leading-[30px] mb-0">Whether you’re a start-up innovator, a global investor, a Kenyan in the diaspora, or a development partner—Nakuru warmly invites you to be part of its inclusive growth story.</p>
        <p className="text-[20px] text-black leading-[30px] mb-0">&nbsp;</p>
        <p className="text-[20px] text-black leading-[30px]">Because when you invest in Nakuru, you're not just growing a business—you're building the future of Kenya.</p>
      </div>
      <button className="bg-black text-white px-8 py-3 rounded font-bold text-[18px]">Invest Now</button>
    </section>
  );
}
