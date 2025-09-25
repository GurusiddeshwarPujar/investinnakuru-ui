import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Privacy Policy | Invest In Nakuru",
  description:
    "Understand how Invest In Nakuru handles your data. Read our privacy policy covering data collection, use, storage, and protection to ensure transparency and trust.",
  keywords:
    "privacy policy Nakuru, Invest in Nakuru privacy, data protection Kenya, investor data handling, Nakuru website privacy, personal data use Kenya, GDPR Kenya, investment website privacy terms, user data policy Kenya",
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

export default async function PrivacyPolicyPage() {
  const cmsEntry = await getCmsContent("PrivacyPolicy");

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Learn how we collect, use, and protect your personal information when you interact with Invest In Nakuru.
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
