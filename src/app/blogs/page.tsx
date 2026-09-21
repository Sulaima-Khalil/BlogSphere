"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { getCategories, getPostsByCategory } from "@/lib/data";
import PostCardList from "@/components/posts/PostCardList";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Category, Post } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

function BlogsContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [allFiltered, setAllFiltered] = useState<Post[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { siteSettings } = useAuth();
  const postsPerPage = Math.max(1, siteSettings.postsPerPage);
  const totalPages = Math.max(1, Math.ceil(allFiltered.length / postsPerPage));

  useEffect(() => {
    setAllFiltered(getPostsByCategory(activeCategory));
    setCategoryOptions(getCategories());
    setCurrentPage(1);
  }, [activeCategory]);

  const displayPosts = useMemo(
    () => allFiltered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage),
    [allFiltered, currentPage, postsPerPage]
  );
  const bannerImage = allFiltered[0]?.featuredImage;

  useEffect(() => {
    setCurrentPage(1);
  }, [postsPerPage]);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex h-56 items-center justify-center overflow-hidden bg-primary-dark md:h-64">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt={`${activeCategory} category banner`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            {activeCategory === "All" ? "All Blogs" : activeCategory}
          </h1>
          <p className="mt-3 text-base text-white/85">
            Explore blogs from different categories.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="container-custom py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", ...categoryOptions].map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blogs" : `/blogs?category=${cat}`}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Post List */}
        <div className="space-y-6">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <PostCardList key={post.id} post={post} />
            ))
          ) : (
            <p className="py-12 text-center text-gray-500">
              No posts found in this category.
            </p>
          )}
        </div>
        {allFiltered.length > 0 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-5 text-sm text-gray-600 sm:flex-row">
            <span>
              Showing {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, allFiltered.length)} of {allFiltered.length} posts
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="whitespace-nowrap">Page {currentPage} of {totalPages}</span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <BlogsContent />
    </Suspense>
  );
}
