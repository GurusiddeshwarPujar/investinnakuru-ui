import Link from "next/link";
import { redirect } from "next/navigation"; 

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Diaspora Engagement | Invest In Nakuru",
  description:
    "Explore diaspora investment opportunities in Nakuru County. Invest in affordable housing, real estate, infrastructure, agribusiness, and green energy while contributing to Kenya’s economic growth. Learn about incentives, support, and secure investment channels for the diaspora community.",
  keywords:
    "diaspora investment Kenya, Nakuru County diaspora opportunities, Kenya diaspora bonds, real estate investment diaspora, affordable housing diaspora Kenya, diaspora agribusiness investment, diaspora remittances Kenya, infrastructure investment diaspora, green energy diaspora Kenya, secure diaspora investment platforms",
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

export default async function DiasporaEngagementPage() {
  const cmsEntry = await getCmsContent("DiasporaEngagement");

  return (
    <>
    
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Diaspora Engagement</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover how Nakuru County is fostering strong partnerships with
            the diaspora community to drive growth, innovation, and inclusive
            development.
          </p>
        </div>
      </section>

     
      <div className="md:py-[90px] py-[60px] bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div
              className="description prose max-w-none"
              dangerouslySetInnerHTML={{ __html: cmsEntry.CmsText }}
            />
          </div>
        </div>
      </div>

      
      <div className="md:py-[90px] py-[60px] bg-secondary text-center text-white">
        <div className="container">
          <h2 className="mb-6">Join the Diaspora Network</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Be part of Nakuru’s growth story. Connect with other diaspora
            professionals, access tailored opportunities, and contribute to
            sustainable development.
          </p>
          <Link href="/contact" className="btn btn-light">
            Get Involved
          </Link>
        </div>
      </div>
    </>
  );
}
