"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { getPostsByCategory } from "@/lib/data";
import { categories } from "@/lib/utils";
import PostCardList from "@/components/posts/PostCardList";
import { cn } from "@/lib/utils";
import Link from "next/link";

function BlogsContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const filteredPosts = getPostsByCategory(activeCategory);
  const bannerImage = filteredPosts[0]?.featuredImage;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex h-48 items-center justify-center overflow-hidden bg-primary-dark">
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
        <h1 className="relative z-10 text-4xl font-bold text-white">
          {activeCategory === "All" ? "All Blogs" : activeCategory}
        </h1>
      </section>

      {/* Category Filters */}
      <section className="container-custom py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
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
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCardList key={post.id} post={post} />
            ))
          ) : (
            <p className="py-12 text-center text-gray-500">
              No posts found in this category.
            </p>
          )}
        </div>
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
