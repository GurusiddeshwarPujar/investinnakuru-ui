"use client";

import { useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";
import { Editor } from "primereact/editor";

export default function CmsManager() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const router = useRouter();

  const [cmsPages, setCmsPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [content, setContent] = useState("");

  const [status, setStatus] = useState("");
  const [isFetchingContent, setIsFetchingContent] = useState(false);
  const [isUpdatingContent, setIsUpdatingContent] = useState(false);

  const [pageError, setPageError] = useState("");
  const [contentError, setContentError] = useState("");

  const { authToken } = parseCookies();

    const editorHeader = (
  <span className="ql-formats">
    <select className="ql-header" defaultValue="0">
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
      <option value="0">Normal</option>
    </select>
    <select className="ql-font" defaultValue="sans-serif">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>

    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <select className="ql-align"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-clean"></button>
  </span>
);
  // 🔹 Handle token expiry
  const handleAuthError = () => {
    destroyCookie(null, "authToken");
    router.push("/login");
  };

  
  // Fetch all CMS pages
  const fetchCmsPages = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/cms`, {
        headers: { "x-auth-token": authToken || "" },
        credentials: "include",
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch CMS pages");

      const data = await res.json();
      setCmsPages(data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  // Fetch content of selected page
  const fetchPageContent = async (pageName) => {
    setIsFetchingContent(true); // Start fetching state
    try {
      const res = await fetch(`${backendUrl}/api/cms/${pageName}`, {
        headers: { "x-auth-token": authToken || "" },
        credentials: "include",
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch page content");

      const data = await res.json();
      setContent(data.CmsText || "");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setIsFetchingContent(false); // End fetching state
    }
  };

  // Update CMS page
  const handleUpdate = async () => {
    setStatus("");
    setPageError("");
    setContentError("");

    let isValid = true;
    if (!selectedPage) {
      setPageError("Please select a CMS page.");
      isValid = false;
    }
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();
    if (!strippedContent) {
      setContentError("Content cannot be empty.");
      isValid = false;
    }
    if (!isValid) return;

    setIsUpdatingContent(true); // Start updating state
    try {
      if (!authToken) {
        handleAuthError();
        return;
      }

      const res = await fetch(`${backendUrl}/api/cms`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          CmsPageName: selectedPage,
          CmsText: content,
        }),
        credentials: "include",
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Update failed");

      setStatus(data.msg || "Page updated successfully");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setIsUpdatingContent(false); // End updating state
    }
  };

  // Fade out status after 5 sec
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Load CMS pages on initial component mount
  useEffect(() => {
    fetchCmsPages();
  }, []);

  // Fetch or clear content when dropdown changes
  useEffect(() => {
    if (selectedPage) {
      fetchPageContent(selectedPage);
    } else {
      setContent("");
    }
  }, [selectedPage]);

  // Determine if the editor should be disabled
  const isEditorDisabled = !selectedPage || isFetchingContent || isUpdatingContent;

  return (
    <div className="lg:col-span-2">
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        
        {/* Status Message */}
        {status && (
          <div
            className={`p-3 mb-4 text-sm rounded-lg ${
              status.toLowerCase().includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </div>
        )}

        {/* Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="cmsPage"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Page
          </label>
          <select
            id="cmsPage"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm 
                        text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            <option value="">-- Select a CMS Page --</option>
            {cmsPages.map((page) => (
              <option key={page.CmsId} value={page.CmsPageName}>
                {page.CmsPageName}
              </option>
            ))}
          </select>
          {pageError && (
            <p className="mt-2 text-sm text-red-500">{pageError}</p>
          )}
        </div>

        {/* PrimeReact Editor */}
        <div className="mb-4">
          {isFetchingContent ? (
            <div className="text-center text-gray-500 dark:text-gray-400">Loading content...</div>
          ) : (
            <Editor
              headerTemplate={editorHeader}
              key={selectedPage} // Forces a re-render when the page changes
              value={content}
              onTextChange={(e) => setContent(e.htmlValue)}
              style={{ height: "320px" }}
              readOnly={isEditorDisabled}
            />
          )}
          {contentError && (
            <p className="mt-2 text-sm text-red-500">{contentError}</p>
          )}
        </div>

        {/* Button */}
        <Button
          className="mt-2 w-full"
          size="sm"
          type="button"
          onClick={handleUpdate}
          disabled={!selectedPage || isUpdatingContent}
        >
          {isUpdatingContent ? "Saving..." : "Update Page"}
        </Button>
      </div>
    </div>
  );
}