// 

import { redirect } from "next/navigation";
import NewsList from "@/components/news/UserNewsList"; 

export const dynamic = "force-dynamic";

// News Article type definition
export type NewsArticle = {
  NewsId: string;
  NewsTitle: string;
  NewsShortDescription: string;
  NewsDescription: string;
  NewsURL: string;
  Image: string;
  createdAt: string;
};

// Fetch news data function
async function fetchNews(): Promise<NewsArticle[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const url = `${baseUrl}/api/admin/news/listnews`;

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (res.status === 404) {
      redirect("/error-404");
    }
    if (res.status >= 500) {
      redirect("/error-505");
    }

    if (!res.ok) {
      console.error(`Failed to fetch news. Status: ${res.status}`);
      return [];
    }
    
    const data: NewsArticle[] = await res.json();
    return data;

  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
}


export default async function NewsListingPage() {
  const news = await fetchNews();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';

  if (!news || news.length === 0) {
    return (
      <div className="py-14 text-center">
        <p>No news articles found at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">News & Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay informed with the latest updates and announcements.
          </p>
        </div>
      </section>

      <div className="md:py-[90px] py-[60px] bg-white">
        <div className="container mx-auto px-4">
          <NewsList news={news} baseUrl={baseUrl} />
        </div>
      </div>
    </>
  );
}