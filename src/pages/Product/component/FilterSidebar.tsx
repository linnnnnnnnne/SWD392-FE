'use client';

import React from 'react';

interface CategoryItem {
  name: string;
  count: number;
}

interface FilterSidebarProps {
  categories: CategoryItem[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories }) => {
  return (
    <aside className="w-[24%] max-md:ml-0 max-md:w-full">
      <div className="max-md:mt-10">
        <section className="w-full">
          <h2 className="w-full p-3 text-xl font-semibold text-black">
            Bộ lọc
          </h2>
          <div className="mt-4 w-full whitespace-nowrap pl-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="mt-2 flex w-full items-center justify-between gap-10"
              >
                <label className="my-auto flex items-center gap-2 self-stretch text-base font-medium text-black">
                  <input
                    type="checkbox"
                    className="my-auto flex h-4 w-4 shrink-0 self-stretch rounded border border-solid border-neutral-700 border-opacity-50"
                  />
                  <span className="my-auto self-stretch">{category.name}</span>
                </label>
                <span className="my-auto min-h-5 self-stretch rounded-xl bg-gray-50 px-2 py-1.5 text-sm text-orange-500">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};
