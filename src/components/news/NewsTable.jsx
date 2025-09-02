'use client';

import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";

export default function NewsTable({
  news,
  onEditClick,
  onNewsDeleted,
  onError,
  handleAuthError,
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const { authToken } = parseCookies();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);

  const handleDelete = async (newsId) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        const res = await fetch(`${backendUrl}/api/admin/news/${newsId}`, {
          method: "DELETE",
          headers: { "x-auth-token": authToken || "" },
        });

        if (!res.ok) {
          if (res.status === 401) {
            handleAuthError();
            return;
          }
          throw new Error(
            `Failed to delete news article: Server responded with ${res.status}`
          );
        }
        onNewsDeleted();
      } catch (err) {
        onError(err.message);
      }
    }
  };

  const filteredNews = news.filter((n) =>
    [n.NewsTitle, n.NewsURL, n.category.CatName]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentNews = filteredNews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNews.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, rowsPerPage, news]);


  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">List of News Articles</h2>
      {/* Filter and Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border px-3 py-2 rounded-lg"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
        />
      </div>

      {/* News Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">News Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentNews.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No news found
                </td>
              </tr>
            ) : (
              currentNews.map((article) => (
                <tr key={article.NewsId} className="border-b">
                   <td className="px-4 py-3">
                    <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                    {article.Image && (
                      <img
                        src={`${backendUrl}${article.Image}`}
                        alt={article.NewsTitle}
                        className="object-cover rounded-lg"
                      />
                    )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">{article.NewsTitle}</td>
                  <td className="px-4 py-3">{article.category.CatName}</td>
                  <td className="px-4 py-3">{article.NewsURL}</td>
                  <td className="px-4 py-3">
                    {new Date(article.createdAt) .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(/ /g, "/")}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => setSelectedNews(article)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEditClick(article)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.NewsId)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredNews.length)} of{" "}
          {filteredNews.length}
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* News Details Modal (Popup) */}
    {selectedNews && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 overflow-y-auto">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">News Details</h3>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="border rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-[50vh] overflow-y-auto">
        {/* News Image */}
        {selectedNews.Image && (
          <div className="p-4">
            <img
              src={`${backendUrl}${selectedNews.Image}`}
              alt={selectedNews.NewsTitle}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
      
        {/* News Details */}
        <div className="p-4">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Category:</span>
            <span className="text-gray-900 dark:text-white text-right">{selectedNews.category.CatName}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Title:</span>
            {selectedNews.NewsTitle}
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">URL:</span>
            {selectedNews.NewsURL}
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Created At:</span>
            <span className="text-gray-900 dark:text-white text-right">{new Date(selectedNews.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).replace(/ /g, "/")}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
            <span className="text-gray-900 dark:text-white text-right">{new Date(selectedNews.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).replace(/ /g, "/")}</span>
          </div>
        </div>

        {/* Full Article */}
        <div className="px-4 py-2">
          <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Description:</span>
          <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: selectedNews.NewsDescription }} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setSelectedNews(null)}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
