'use client';

import React, { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import AddNewsForm from "./AddNewsForm";
import NewsTable from "./NewsTable";
import Button from "../ui/button/Button"; 

export default function NewsManager() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
  const router = useRouter();

  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [view, setView] = useState('list'); 
  const { authToken } = parseCookies();

  const handleAuthError = () => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "isAdmin");
    router.push("/admin/login");
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/cat`, {
        headers: { "x-auth-token": authToken || "" },
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch categories.");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/admin/news`, {
        headers: { "x-auth-token": authToken || "" },
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch news.");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Handler for adding a new article
  const handleAddClick = () => {
    setEditingNews(null); // Clear any editing state
    setView('form');
  };

  // Handler for editing an existing article
  const handleEditClick = (article) => {
    setEditingNews(article);
    setView('form');
  };

  // Handler to go back to the list view
  const handleBackToList = () => {
    fetchNews(); // Refresh news list
    setView('list');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading news...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md">
      {status && (
        <div
          className={`p-3 mb-4 text-sm rounded-lg ${
            status.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </div>
      )}

      {view === 'list' ? (
        <>
          <div className="flex justify-end mb-4">
            <Button onClick={handleAddClick}>Add News Article</Button>
          </div>
          <NewsTable
            news={news}
            onEditClick={handleEditClick}
            onNewsDeleted={() => {
              setStatus("News article deleted successfully!");
              fetchNews();
            }}
            onError={(message) => setStatus(message)}
            handleAuthError={handleAuthError}
          />
        </>
      ) : (
        <AddNewsForm
          backendUrl={backendUrl}
          authToken={authToken}
          categories={categories}
          editingNews={editingNews}
          setEditingNews={setEditingNews}
          onNewsAdded={() => {
            setStatus("News article added successfully!");
            handleBackToList();
          }}
          onNewsUpdated={() => {
            setStatus("News article updated successfully!");
            handleBackToList();
          }}
          onError={(message) => setStatus(message)}
          handleAuthError={handleAuthError}
          onCancel={handleBackToList} // Add a new prop for the cancel button
        />
      )}
    </div>
  );
}