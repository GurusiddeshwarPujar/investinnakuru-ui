"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function KeySector({ showTitle = true }) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${baseUrl}/api/cat/listkeysector`);
        if (!res.ok) throw new Error("Unable to fetch. Please try again later.");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-10">Loading categories...</p>;
  if (error) return <p className="text-center py-10">{error}</p>; //text-red-500

  if (categories.length === 0) {
    return null; 
  }

  return (
    <div className="md:py-[90px] pt-[60px] pb-[80px]">
      <div className="container">
        {showTitle && (
          <h2 className="text-center mb-8">Key Sector to Invest</h2>
        )}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 text-center">
          {categories.map(({ CatId, CatName, CatURL, Image }) => (
            <Link
              key={CatId}
              href={"#"}
              className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-gradient-to-b before:from-transparent before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white"
              style={{ backgroundImage: `url(${baseUrl}/images/keysector/${Image})` }}
            >
              <div className="relative z-10">
                <h5 className="mb-0">{CatName}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
