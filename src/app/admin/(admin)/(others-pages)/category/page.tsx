import React from "react";
import CategoryManager from "@/components/category/CategoryManger"; 


export const metadata = {
   title: "Manage Key Sectors | Invest In Nakuru",
  description: "Admin can add, view, and manage key sectors.",
};

const CategoryPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Key Sectors
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Add and manage your key sectors.
          </p>
        </div>
      </div>

      {/* Category Manager Component */}
      <CategoryManager />
    </>
  );
};

export default CategoryPage;
