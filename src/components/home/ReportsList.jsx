// components/data-reports/ReportsList.tsx

import Link from "next/link";

// Dummy data for other reports
const reports = [
  {
    title: "Nakuru Agribusiness Sector Deep Dive 2024",
    date: "July 2024",
    link: "/reports/agribusiness-2024.pdf",
    description: "An in-depth analysis of high-yield crops and value addition opportunities in the county."
  },
  {
    title: "Green Energy Investment Outlook Q3 2024",
    date: "September 2024",
    link: "/reports/green-energy-q3-2024.pdf",
    description: "Exploring solar, geothermal, and bioenergy projects and incentives for foreign investors."
  },
  {
    title: "Nakuru Real Estate Market Review 2023",
    date: "December 2023",
    link: "/reports/real-estate-2023.pdf",
    description: "A summary of property price trends, rental yields, and major development zones."
  },
];

export default function ReportsList() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold mb-10 text-center">More Data & Insights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reports.map((report, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg border-t-4 border-primary transition duration-300 hover:shadow-xl">
              <span className="text-sm text-gray-500 block mb-2">{report.date}</span>
              <h3 className="text-xl font-semibold mb-3">
                {report.title}
              </h3>
              <p className="text-gray-600 mb-4 h-16 line-clamp-3">{report.description}</p>
              <Link href={report.link} className="text-primary hover:underline font-medium flex items-center">
                Download Report
                {/* SVG for right arrow icon */}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}