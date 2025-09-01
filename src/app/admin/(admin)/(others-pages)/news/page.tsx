import React from "react";
import NewsManager from "@/components/news/NewsManager";

export const metadata = {
  title: "News Manager | Admin Dashboard",
  description: "Admin can create, edit, and manage news articles.",
};

const NewsPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage News
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Create and manage news articles.
          </p>
        </div>
      </div>

      {/* News Manager UI */}
      <NewsManager />
    </>
  );
};

export default NewsPage;