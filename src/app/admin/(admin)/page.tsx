"use client";

import React from "react";
import Link from "next/link";
import { PageIcon, SettingIcon, UserCircleIcon } from "../../../icons/index";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/contact-us">
          <div className="flex items-center gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600">
              <UserCircleIcon />
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Contacts Received
            </span>
          </div>
        </Link>
      </div>
      
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
