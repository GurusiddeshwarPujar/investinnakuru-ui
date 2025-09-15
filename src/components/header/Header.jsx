// Header component generated from Figma design
import React from "react";

const imgLogo = "http://localhost:3845/assets/469d1368d82c6579c05c71e81b0a465175cadc4b.png";

export default function Header() {
  return (
    <header className="relative w-full">
      {/* Top Bar */}
      <div className="bg-[#006600] h-[50px] w-full flex items-center justify-center">
        <span className="text-white text-center text-[16px] whitespace-nowrap">
          Why Nakuru   |   About Us   |   Incentives & Support   |   Success Stories   |   News & Events
        </span>
      </div>
      {/* Main Header */}
      <div className="bg-white h-[90px] w-full flex items-center justify-between px-[135px]" style={{ minWidth: "127px" }}>
        {/* Logo */}
        <div className="flex items-center h-[70px] w-[127px] bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('${imgLogo}')` }} />
        {/* Navigation Links */}
        <nav className="flex gap-8 text-black text-[18px] font-bold">
          <span>Investment Opportunities</span>
          <span>Diaspora Engagement</span>
          <span>Key Sectors</span>
        </nav>
        {/* Contact Us Button */}
        <button className="bg-[#006600] text-white px-6 py-2 rounded text-[18px] font-bold">Contact Us</button>
      </div>
    </header>
  );
}
