import Link from "next/link";
import { redirect } from "next/navigation"; 

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Incentives & Support | Invest In Nakuru",
  description:
    "Discover the incentives and support available for investors in Nakuru County. Benefit from tax incentives, fast-tracked licensing, public-private partnerships, and a dedicated one-stop investor service desk to ease your investment journey in Kenya.",
  keywords:
    "investment incentives Kenya, Nakuru County tax incentives, business support Nakuru, one-stop investor service desk, Kenya public-private partnerships, land and licensing facilitation, government support investors Kenya, ease of doing business Nakuru, investor support services Kenya, investment facilitation Kenya",
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

export default async function IncentivesAndSupportPage() {
  const cmsEntry = await getCmsContent("IncentivesandSupport");

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            Incentives & Support
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the tax incentives, regulatory support, and investment facilitation programs available in Nakuru County.
          </p>
        </div>
      </section>
      <div className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto py-11">
            <div className="prose prose-lg mx-auto">
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: cmsEntry.CmsText }}
              />
              <div className="mt-6">
                <Link href="/contact" className="btn">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}