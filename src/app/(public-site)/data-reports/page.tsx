// app/data-reports/page.tsx

import React from "react";
import DataReportsBanner from "@/components/home/datareports";
// import ReportsList from "@/components/home/ReportsList";
import FooterInfo from "@/components/home/footerInfo";

export const metadata = {
  title: "Data & Reports | Invest In Nakuru",
  description:
    "Access the latest market data, special reports, and investment insights for Nakuru County's key sectors: real estate, agribusiness, and green energy.",
  keywords:
    "Nakuru investment data, real estate reports Kenya, agribusiness market research, green energy outlook, HASS Index equivalent Nakuru",
};

const DataReportsPage: React.FC = () => {
  return (
    <>

      {/* <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Data & Reports</h1>
          <p className="text-lg max-w-2xl mx-auto">
           
          </p>
        </div>
      </section> */}
      <DataReportsBanner />
      {/* <ReportsList/> */}
      <FooterInfo />
    </>
  );
};

export default DataReportsPage;