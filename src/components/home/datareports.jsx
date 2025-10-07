// components/data-reports/DataReportsBanner.tsx

import Link from "next/link";

export default function DataReportsBanner() {
  return (
    <div className="relative py-24 md:py-36 bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90"></div>
        <div className="absolute inset-0 bg-repeat opacity-10"
             style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 10px)" }}>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
           <h1 className="uppercase">{/* text-5xl md:text-6xl font-serif mb-6 tracking-wider uppercase*/}
            THE INVESTMENT PLATFORM SPECIAL REPORT
          </h1>

          <p className="description text-lg mb-4">
            Nakuru County's key investment sectors are showing promising growth and delivering strong returns,
            according to a new Special Report by the Investment Platform. The study compares local performance
            with national and regional trends, revealing Nakuru's strategic positioning and strong domestic demand.
          </p>

          <p className="description text-lg mb-8">
            Since its official launch, the platform has tracked significant investment interest across real estate,
            agribusiness, and green energy, with year-on-year capital appreciation representing a leading performance
            in the region.
          </p>
          <Link
            href="/frontend/reports/sample.pdf"
            className="btn"
            // inline-block px-10 py-3 mt-4 border border-white text-white hover:bg-white hover:text-gray-800 transition duration-300 font-dm-sans uppercase tracking-widest
          >
            Read The Full Report
          </Link>
        </div>
      </div>
    </div>
  );
}