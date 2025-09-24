import Image from "next/image";
import Link from "next/link";
import FooterInfo from "@/components/home/footerInfo";
import { redirect } from "next/navigation"; 

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Investment Opportunities | Invest In Nakuru",
  description:
    "Explore diverse investment opportunities in Nakuru County, Kenya. From real estate and affordable housing to agribusiness, tourism, infrastructure, and green energy, Nakuru offers a secure and profitable environment for local and diaspora investors.",
  keywords:
    "investment opportunities Nakuru, real estate investment Kenya, affordable housing projects Nakuru, agribusiness investment Kenya, tourism investment Nakuru, infrastructure development Kenya, green energy projects Nakuru, manufacturing investment Kenya, commercial real estate Nakuru, profitable investments Kenya",
};


type CmsEntry = {
  CmsText: string;
};

async function getCmsContent(pageName: string): Promise<CmsEntry> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined in .env.local");
  }

  const url = `${baseUrl}/api/cms/${pageName}`;

  try {
    const res = await fetch(url, {
      cache: "no-store", 
    });

    if (res.status === 404) redirect("/error-404"); 
    if (res.status >= 500) redirect("/error-505");

    if (!res.ok) {
      throw new Error(`Failed to fetch CMS content. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("CMS Fetch Error:", error);
    redirect("/error-505");
    return {
      CmsText: "<p>Content could not be loaded. Please try again later.</p>",
    };
  }
}

export default async function InvestmentOpportunitiesPage() {
  const cmsEntry = await getCmsContent("InvestmentOpportunities");

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Investment Opportunities</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore the key investment sectors, emerging industries, and
            government-backed opportunities in Nakuru County.
          </p>
        </div>
      </section>
      
      <div className="md:py-[90px] py-[60px] bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="md:w-1/2 md:float-right md:ml-8 mb-4">
                
                 <Image 
                            src="/frontend/images/categories/tour.jpg" 
                            alt="Scenic view of Nakuru" 
                            width={570} 
                            height={500} 
                            className="rounded-lg shadow-xl object-cover"
                /><br/>
                <Image 
                            src="/frontend/images/categories/real-estate.jpg" 
                            alt="Scenic view of Nakuru" 
                            width={570} 
                            height={500} 
                            className="rounded-lg shadow-xl object-cover"
                />
            </div>
            <div
              className="description prose max-w-none"
              dangerouslySetInnerHTML={{ __html: cmsEntry.CmsText }}
            />
          </div>
        </div>
      </div>

      <div className="md:py-[90px] py-[60px] bg-secondary text-center text-white">
        <div className="container">
          <h2 className="mb-6">Ready to Invest?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join Nakuru’s growth journey today. Access tailored investment
            guidance and connect with local opportunities.
          </p>
          <Link href="/contact" className="btn btn-light">
            Get Started
          </Link>
        </div>
      </div>
       
      <FooterInfo />
    </>
  );
}
