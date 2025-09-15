import React from "react";

const imgLogo = "/images/home/logo.png";

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Green Bar */}
      <div className="bg-[#006600] h-[50px] flex items-center justify-center">
        <nav className="flex items-center space-x-6 text-white text-[16px]">
          <span>Why Nakuru</span>
          <span>|</span>
          <span>About Us</span>
          <span>|</span>
          <span>Incentives & Support</span>
          <span>|</span>
          <span>Success Stories</span>
          <span>|</span>
          <span>News & Events</span>
        </nav>
      </div>

      {/* Main Header Section */}
      <div className="bg-white h-[90px] flex items-center justify-between px-[120px]">
        {/* Logo */}
        <div
          className="h-[70px] w-[130px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('${imgLogo}')` }}
        />

        {/* Center Navigation */}
        <nav className="flex items-center space-x-14 text-black text-[18px] font-bold">
          <span>Investment Opportunities</span>
          <span>Diaspora Engagement</span>
          <span>Key Sectors</span>
        </nav>

        {/* Contact Us Button */}
        <button className="bg-gradient-to-r from-[#EB3A2A] to-[#F29D3F] text-white px-6 py-2 rounded text-[18px] font-bold">
          Contact Us
        </button>
      </div>
    </header>
  );
}

