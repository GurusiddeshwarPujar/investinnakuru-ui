// Footer component generated from Figma design
import React from "react";

const socialIcons = "/images/footer-social-icons.svg";
const icon = "/images/footer-icon.svg";
const icon1 = "/images/footer-icon1.svg";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-4">
        {/* Useful Links */}
        <div>
          <h4 className="uppercase font-bold text-[16px] mb-4">Useful Links</h4>
          <ul className="space-y-2 text-[16px] leading-[36px]">
            <li>Investment Opportunities</li>
            <li>Diaspora Engagement</li>
            <li>Key Sectors</li>
            <li>Incentives & Support</li>
            <li>Success Stories</li>
          </ul>
        </div>
        {/* About Us */}
        <div>
          <h4 className="uppercase font-bold text-[16px] mb-4">About us</h4>
          <ul className="space-y-2 text-[16px] leading-[36px]">
            <li>Home</li>
            <li>Why Nakuru</li>
            <li>About Us</li>
            <li>News & Events</li>
            <li>Contact Us</li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <img src={icon} alt="Email Icon" className="w-[32px] h-[32px]" />
            <span className="uppercase font-bold text-[16px]">Email us at:</span>
          </div>
          <span className="font-bold text-[32px]">diaspora@investinnakuru.com</span>
          <div className="flex items-center gap-3 mb-2 mt-4">
            <img src={icon1} alt="WhatsApp Icon" className="w-[32px] h-[32px]" />
            <span className="uppercase font-bold text-[16px]">WhatsApp:</span>
          </div>
          <span className="font-bold text-[32px]">+254 712 000 000</span>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full max-w-6xl mx-auto h-px bg-white opacity-20 my-8" />
      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <span className="text-[16px]">© 2025 Invest In Nakuru. All Rights Reserved</span>
        <span className="text-[16px] text-center">Terms & Conditions  |  Privacy Policy</span>
        <img src={socialIcons} alt="Social Icons" className="h-6" />
      </div>
    </footer>
  );
}
