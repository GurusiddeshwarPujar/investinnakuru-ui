// KeySectorsSection component generated from Figma design
import React from "react";

const sectors = [
  {
    title: "ICT & Innovation",
    image: "/images/keysector-ict.png",
    mask: "/images/keysector-mask.svg"
  },
  {
    title: "Renewable Energy",
    image: "/images/keysector-renewable.png",
    mask: "/images/keysector-mask.svg"
  },
  {
    title: "Tourism & Hospitality",
    image: "/images/keysector-tourism.png",
    mask: "/images/keysector-mask.svg"
  },
  {
    title: "Real Estate",
    image: "/images/keysector-realestate.png",
    mask: "/images/keysector-mask.svg"
  },
  {
    title: "Manufacturing",
    image: "/images/keysector-manufacturing1.png",
    mask: "/images/keysector-mask.svg"
  },
  {
    title: "Agribusiness",
    image: "/images/keysector-agribusiness.png",
    mask: "/images/keysector-mask.svg"
  }
];

export default function KeySectorsSection() {
  return (
    <section className="relative w-full py-24 bg-white flex flex-col items-center justify-center">
      <h2 className="text-[48px] font-bold text-black text-center tracking-[-1.44px] mb-12">Key Sectors to Invest</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl mx-auto">
        {sectors.map((sector, idx) => (
          <div key={sector.title} className="relative flex flex-col items-center justify-end h-[370px] w-full max-w-[370px] mx-auto bg-gradient-to-b from-transparent to-black rounded-xl overflow-hidden shadow-md">
            <div className="absolute inset-0 w-full h-full">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url('${sector.image}')`,
                  WebkitMaskImage: `url('${sector.mask}')`,
                  maskImage: `url('${sector.mask}')`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'cover',
                  maskSize: 'cover'
                }}
              />
            </div>
            <div className="relative z-10 w-full text-center pb-6">
              <h3 className="text-white text-[24px] font-bold tracking-[-0.72px] whitespace-pre mb-0">{sector.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
