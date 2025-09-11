'use client';

import React, { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import AddCategoryForm from "./AddCategoryForm";
import CategoryTable from "./ListCategories";

export default function CategoryManager() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { authToken } = parseCookies();

  const handleAuthError = () => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "isAdmin");
    router.push("/admin/login");
  };

  // Fetch all categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/cat`, {
        headers: { "x-auth-token": authToken || "" },
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch key sectors.");
      }

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fade out status after 5 sec
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading key sectors...</p>
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
      <AddCategoryForm 
        backendUrl={backendUrl}
        authToken={authToken}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        onCategoryAdded={() => {
          setStatus("Key sector added successfully!");
          fetchCategories();
        }}
        onCategoryUpdated={() => {
          setStatus("Key sector updated successfully!");
          setEditingCategory(null);
          fetchCategories();
        }}
        onError={(message) => setStatus(message)}
        handleAuthError={handleAuthError}
      />
      <div className="border-t border-gray-200 pt-6 mt-6">
        <CategoryTable 
          categories={categories}
          onEditClick={setEditingCategory}
          onCategoryDeleted={() => {
            setStatus("Key sector deleted successfully!");
            fetchCategories();
          }}
          onError={(message) => setStatus(message)}
          handleAuthError={handleAuthError}
        />
      </div>
    </div>
  );
}
