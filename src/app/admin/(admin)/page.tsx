"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageIcon, SettingIcon, UserCircleIcon } from "../../../icons/index";

// Helper: Get cookie
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export default function Dashboard() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const [contactCount, setContactCount] = useState<number>(0);

  const fetchContactCount = async () => {
    try {
      const token = getCookie("authToken");
      const res = await fetch(`${backendUrl}/api/contacts`, {
        headers: { "x-auth-token": token || "" },
      });

      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();

      // If API returns array of contacts
      setContactCount(data.length || 0);

      // If you make a separate API for count, just setContactCount(data.count);
    } catch (err) {
      console.error(err);
      setContactCount(0);
    }
  };

  useEffect(() => {
    fetchContactCount();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      
      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/contact-us">
          <div className="flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600">
                <UserCircleIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Contacts Received
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total contact received
                </span>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-bold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100">
              {contactCount}
            </span>
          </div>
        </Link>
      </div>


      {/* CMS Widget */}
      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/cms">
          <div className="flex items-center gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600">
              <PageIcon />
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              CMS
            </span>
          </div>
        </Link>
      </div>

      {/* Settings Widget */}
      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/settings">
          <div className="flex items-center gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600">
              <SettingIcon />
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Settings
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
