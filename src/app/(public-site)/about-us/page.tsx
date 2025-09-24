import Image from "next/image";
import Link from "next/link";
import FooterInfo from "@/components/home/footerInfo";
import { redirect } from "next/navigation"; 

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Invest In Nakuru",
  description:
    "Learn about Invest In Nakuru, the official investment platform of Nakuru County. Discover our mission, vision, and the team dedicated to facilitating investments, permits, and incentives.",
  keywords:
    "Nakuru County investment opportunities, affordable housing projects Kenya, diaspora investment Kenya, land investment Nakuru, tax incentives for investors Kenya, real estate investment Kenya, investment platforms Kenya, infrastructure development Nakuru, commercial real estate Kenya, green energy investments Kenya",
};

type CmsEntry = {
  CmsText: string;
};

async function getCmsContent(pageName: string): Promise<CmsEntry> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!baseUrl) throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined in .env.local");

  const url = `${baseUrl}/api/cms/${pageName}`;

  try {
    const res = await fetch(url, {
      cache: "no-store", 
    });

    if (res.status === 404) redirect("/error-404"); 
    if (res.status >= 500) redirect("/error-505");

    if (!res.ok) throw new Error(`Failed to fetch CMS content. Status: ${res.status}`);

    return res.json();
  } catch (error) {
    console.error("CMS Fetch Error:", error);
    redirect("/error-505");
  }
}

export default async function AboutPage() {
  const cmsEntry = await getCmsContent("About");

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Learn more about our mission, vision, and the dedicated team behind Invest in Nakuru.
          </p>
        </div>
      </section>

      <div className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <p>
              As the <strong>official investment platform of Nakuru County</strong>, InvestInNakuru.com
              is designed to make your investor journey simple, transparent, and rewarding. From
              discovering viable projects to accessing permits, tax incentives, and diaspora bonds,
              this platform is your direct connection to county-backed opportunities.
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

              <div className="description" dangerouslySetInnerHTML={{ __html: cmsEntry.CmsText }} />

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
