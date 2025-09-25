
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SuccessStories from "@/components/home/successStories";

export const dynamic = "force-dynamic";

async function getNewsArticle(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/api/admin/news/slug/${slug}`, {
      cache: "no-store",
    });

    if (res.status === 404) return null;
    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}


export default async function NewsDetailsPage({ params }) {
  const slug = params?.slug;

  if (!slug) notFound();

  const article = await getNewsArticle(slug);

  if (!article) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "";
  const articleDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-2">{article.NewsTitle}</h1>
          <p className="text-lg text-primary">{articleDate}</p>
        </div>
      </section>

      <div className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src={`${baseUrl}/images/news/${article.Image}`}
                alt={article.NewsTitle}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg mx-auto">
              <div dangerouslySetInnerHTML={{ __html: article.NewsDescription }} />
            </div>

            <div className="mt-8">
              <Link href="/news-events" className="btn">
                ← Back to All News & Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SuccessStories />
    </>
  );
}
