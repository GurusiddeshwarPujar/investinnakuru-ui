'use client';

import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import Link from "next/link";

export default function CategoryTable({ categories, onEditClick, onCategoryDeleted, onError, handleAuthError }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const { authToken } = parseCookies();

  // State for datatable features
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // Handle category deletion
  const handleDelete = async (catId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await fetch(`${backendUrl}/api/cat/${catId}`, {
          method: "DELETE",
          headers: { "x-auth-token": authToken || "" },
        });

        // Check for non-OK status codes before trying to parse as JSON
        if (!res.ok) {
          if (res.status === 401) {
            handleAuthError();
            return;
          }
          // The server is not returning a 200 OK, so we can't assume a JSON response.
          // This prevents the "Unexpected token '<', ..." JSON parsing error.
          throw new Error(`Failed to delete category: Server responded with status ${res.status}. Please check your backend API.`);
        }

        onCategoryDeleted();

      } catch (err) {
        onError(err.message);
      }
    }
  };

  // Filter categories based on search input
  const filteredCategories = categories.filter((c) =>
    [c.CatName, c.CatURL]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  // Effect to reset page when search or rowsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, rowsPerPage, categories]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">List of Categories</h2>
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
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-50 font-medium text-gray-600 text-left border-b">Category Name</th>
              <th className="py-3 px-4 bg-gray-50 font-medium text-gray-600 text-left border-b">Category URL</th>
              <th className="py-3 px-4 bg-gray-50 font-medium text-gray-600 text-left border-b">Created Date</th>
              <th className="py-3 px-4 bg-gray-50 font-medium text-gray-600 text-left border-b">Updated Date</th>
              <th className="py-3 px-4 bg-gray-50 font-medium text-gray-600 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No categories found.</td>
              </tr>
            ) : (
              currentCategories.map((category) => (
                <tr key={category.CatId} className="border-b">
                  <td className="py-3 px-4 text-gray-800">{category.CatName}</td>
                  <td className="py-3 px-4 text-gray-800">{category.CatURL}</td>
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(category.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => onEditClick(category)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.CatId)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"//text-red-600 hover:underline
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
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredCategories.length)} of{" "}
          {filteredCategories.length} categories
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">
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
    </>
  );
}
