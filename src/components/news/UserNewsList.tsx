"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/app/(public-site)/news-events/page"; 

type Props = {
  news: NewsArticle[];
  baseUrl: string;
};

const ITEMS_PER_PAGE = 12;

export default function NewsList({ news, baseUrl }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleNews = news.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

 
  if (!news || news.length === 0) {
    return (
      <div className="py-14 text-center">
        <p>No news articles found at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
        {visibleNews.map((article) => (
          <div key={article.NewsId} className="h-[100%] transition hover:shadow-xl rounded-lg overflow-hidden bg-white">
            
           
            <div className="relative pb-[68%] overflow-hidden">
              <Link href={`/news-events/${article.NewsURL}`} aria-label={article.NewsTitle}>
                <Image
                  src={`${baseUrl}/images/news/${article.Image}`}
                  alt={article.NewsTitle}
                  className="absolute top-0 left-0 w-[100%] h-[100%] object-cover transition-transform duration-300 hover:scale-105"
                  width={375}
                  height={250}
                />
              </Link>
            </div>

            <div className="p-5">
            
              <p className="text-primary mb-3 text-sm">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              
             
              <h5 className="mb-3 text-xl font-semibold">
                <Link href={`/news-events/${article.NewsURL}`} className="text-inherit hover:text-primary transition">
                  {article.NewsTitle}
                </Link>
              </h5>

             
              <div className="description text-gray-600">
                <p className="last:mb-0">{article.NewsShortDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {visibleCount < news.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="btn"
          >
            Load More News
          </button>
        </div>
      )}
    </>
  );
}