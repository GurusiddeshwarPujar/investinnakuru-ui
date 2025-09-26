import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";




type NewsArticle = {
  NewsId: string;
  NewsTitle: string;
  NewsURL: string;
  NewsShortDescription: string;
  Image: string;
  createdAt: string;
};


async function getNewsData(): Promise<NewsArticle[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_API_URL not defined in .env.local");
  }

  const url = `${baseUrl}/api/admin/news/listnews`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.status === 404) redirect("/error-404");
    if (res.status >= 500) redirect("/error-505");

    if (!res.ok) {
      throw new Error(`Failed to fetch news. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("News Fetch Error:", error);
    redirect("/error-505");
    return [];
  }
}



export default async function NewsEventsPage() {
  const allNews = await getNewsData();
  const latestNews = allNews.slice(0, 3);

  if (latestNews.length === 0) {
    return null;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const IMAGE_BASE_PATH = `${baseUrl}/images/news/`;

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">News & Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay informed about the latest news, events, and investment updates
            happening in Nakuru County.
          </p>
        </div>
      </section>
      <div className="md:py-[90px] py-[60px] bg-white">
        <div className="container">
          {latestNews.length > 0 ? (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
              {latestNews.map((news) => (
                <div key={news.NewsId} className="h-full">
                  <div className="relative pb-[68%] overflow-hidden mb-5 rounded-lg shadow-md">
                    <Link href={`/news-events/${news.NewsURL}`}>
                      <Image
                        src={`${IMAGE_BASE_PATH}${news.Image}`}
                        alt={news.NewsTitle}
                        width={375}
                        height={250}
                        className="absolute top-0 left-0 w-full h-full object-cover transition duration-300 hover:scale-[1.05]"
                      />
                    </Link>
                  </div>

                  <p className="text-primary mb-3 text-sm">
                    {new Date(news.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <h5 className="mb-3 text-lg font-semibold">
                    <Link
                      href={`/news-events/${news.NewsURL}`}
                      className="text-inherit hover:text-primary transition duration-300"
                    >
                      {news.NewsTitle}
                    </Link>
                  </h5>

                  <p className="text-gray-700">{news.NewsShortDescription}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No news articles available at the moment.
            </p>
          )}

          <div className="text-center mt-10">
            <Link href="/news-events" className="btn">
              View All News & Events
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
