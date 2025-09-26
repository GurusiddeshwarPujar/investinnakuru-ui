"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ListIcon, PageIcon, SettingIcon, UserCircleIcon,BoxCubeIcon,DocsIcon,ChatIcon } from "../../../icons/index";
import { useRouter } from "next/navigation"; 
import { destroyCookie } from "nookies";


const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export default function Dashboard() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const router = useRouter();

  const [contactCount, setContactCount] = useState<number>(0);
  const [categoryCount,setCategoryCount] = useState<number>(0);
  const [newsCount,setNewsCount]=useState<number>(0);
  const [newsletterCount,setnewsletterCount]=useState<number>(0);
  const [bannerCount,setbannerCount]=useState<number>(0);
  const [testimonialCount,settestimonialCount]=useState<number>(0);


  const handleLogout = () => {
    destroyCookie(null, "authToken", { path: "/" });
    destroyCookie(null, "isAdmin", { path: "/" });
    
    console.log("Authentication failure detected, redirecting to login...");
    router.push("/admin/login");
  };

  const fetchContactCount = async () => {
    try {
      const token = getCookie("authToken");
      const res = await fetch(`${backendUrl}/api/contacts`, {
        headers: { "x-auth-token": token || "" },
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout(); 
        return; 
      }


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

  const fetchCategoryCount =async()=>{
    try{
      const token = getCookie("authToken");
      const res= await fetch(`${backendUrl}/api/cat`,{
        headers:{"x-auth-token":token || ""},
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout(); 
        return;
      }

      if(!res.ok) throw new Error("Failed to fetch categories");
      const data=await res.json();

       setCategoryCount(data.length || 0);
    }catch(err){
       console.error(err);
      setCategoryCount(0);
    }
  };

  const fetchNewsCount =async ()=>{
    try{
      const token = getCookie("authToken");
      const res= await fetch(`${backendUrl}/api/admin/news`,{
        headers:{"x-auth-token":token || ""},
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout(); 
        return;
      }

      if(!res.ok) throw new Error("Failed to fetch news articles");
      const data=await res.json();

       setNewsCount(data.length || 0);

    }catch(err){
    console.error(err);
      setNewsCount(0);
    }
  }

  const fetchNewsletterSubscriber =async ()=>{
    try{
        const token = getCookie("authToken");
      const res= await fetch(`${backendUrl}/api/newslettersubscriber`,{
        headers:{"x-auth-token":token || ""},
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout(); 
        return;
      }

      if(!res.ok) throw new Error("Failed to fetch newsletter subscriptions");
      const data=await res.json();

      setnewsletterCount(data.length || 0);
    }catch(err){
        console.error(err);
      setnewsletterCount(0);
    }
  }

  const fetchBanner =async ()=>{
    try{
      const token=getCookie("authToken");
      const res =await fetch(`${backendUrl}/api/admin/banners`,{
        headers:{"x-auth-token":token || ""},
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout(); 
        return;
      }


      if(!res.ok) throw new Error("Failed to fetch banner.");
      const data=await res.json();
      setbannerCount(data.length || 0);
    }catch(err){
      console.error(err);
      setbannerCount(0);
    }
  }
 const fetchTestimonial =async ()=>{
    try{
      const token=getCookie("authToken");
      const res =await fetch(`${backendUrl}/api/testimonials`,{
        headers:{"x-auth-token":token || ""},
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout(); 
        return;
      }

      if(!res.ok) throw new Error("Failed to fetch testimonials.");
      const data=await res.json();
      settestimonialCount(data.length || 0);
    }catch(err){
      console.error(err);
      settestimonialCount(0);
    }
  }



  useEffect(() => {
    fetchContactCount();
    fetchCategoryCount();
    fetchNewsCount();
    fetchNewsletterSubscriber();
    fetchBanner();
    fetchTestimonial();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/category">
          <div className="flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 text-red-600">
                <ListIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Key Sectors
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Key Sectors
                </span>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-bold rounded-full bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100">
              {categoryCount}
            </span>
          </div>
        </Link>
      </div>


      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/news">
          <div className="flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600">
                <BoxCubeIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Manage News Articles & Events
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total news articles & Events
                </span>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-bold rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100">
              {newsCount}
            </span>
          </div>
        </Link>
      </div>
            <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/testimonials">
          <div className="flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              {/* Changed from blue to teal */}
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600">
                <ChatIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Manage Success Stories
                </span>
              </div>
            </div>
            {/* Changed from blue to teal */}
          <span className="px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100">
            {testimonialCount}
          </span>
          </div>
        </Link>
      </div>

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
      <div className="col-span-12 sm:col-span-4">
        <Link href="/admin/banner">
          <div className="flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              {/* Changed from blue to teal */}
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600">
                <DocsIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Manage Banner
                </span>
              </div>
            </div>
            {/* Changed from blue to teal */}
          <span className="px-3 py-1 text-sm font-bold rounded-full bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-100">
            {bannerCount}
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
        <Link href="/admin/newsletter-subscribers">
          <div className="flex items-center justify-between gap-4 p-5 rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600">
                <ListIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                   Newsletter Subscribers 
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total newsletter Subscribers
                </span>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-bold rounded-full bg-pink-100 text-pink-700 dark:bg-pink-800 dark:text-pink-100">
              {newsletterCount}
            </span>
          </div>
        </Link>
      </div>

      

      {/* CMS Widget */}
      

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
