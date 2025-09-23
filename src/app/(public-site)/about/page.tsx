import Image from "next/image";
import Link from "next/link";
import FooterInfo from "@/components/home/footerInfo";

export const dynamic = "force-dynamic";

type CmsEntry = {
  CmsPageName: string;
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
      cache: "no-store" // give  each req fresh
      // // ISR: cache, but revalidate every 60 seconds
      // next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch CMS content. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("CMS Fetch Error:", error);

    
    return {
      CmsPageName: "About Us",
      CmsText: "<p>Content could not be loaded. Please try again later.</p>",
    };
  }
}

export default async function AboutPage() {
  const cmsEntry = await getCmsContent("About");

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            {cmsEntry.CmsPageName}
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Learn more about our mission, vision, and the dedicated team behind Invest in Nakuru.
          </p>
        </div>
      </section>
      <div className="py-14 bg-white">
        <div className="container mx-auto px-4">
        
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <p>
              As the <strong>official investment platform of Nakuru County</strong>, 
              InvestInNakuru.com is designed to make your investor journey simple, 
              transparent, and rewarding. From discovering viable projects to 
              accessing permits, tax incentives, and diaspora bonds, this 
              platform is your direct connection to county-backed opportunities.
            </p>
          </div>

       
          <div className="container mx-auto px-4 py-14">
            <div className="prose prose-lg mx-auto">
             
              <div className="float-left w-72 md:w-96 mb-4 mr-4 shape-square">
                <Image
                  src="/frontend/images/nakuru-team.png"
                  alt="Nakuru team"
                  width={400}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>

             
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: cmsEntry.CmsText }}
              />

             
              <div className="clear-both mt-6">
                <Link href="/contact" className="btn">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterInfo />
    </>
  );
}
