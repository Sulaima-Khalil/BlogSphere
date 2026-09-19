"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { searchPosts } from "@/lib/data";
import PostCardList from "@/components/posts/PostCardList";
import Button from "@/components/ui/Button";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = query ? searchPosts(query) : [];

  return (
    <section className="container-custom py-10">
      <form action="/search" className="mb-8 flex max-w-2xl gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search articles..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Button type="submit">
          <Search className="h-5 w-5" />
        </Button>
      </form>

      {query && (
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Search Results for &ldquo;{query}&rdquo;
          <span className="ml-2 text-base font-normal text-gray-500">
            ({results.length} {results.length === 1 ? "result" : "results"})
          </span>
        </h1>
      )}

      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((post) => <PostCardList key={post.id} post={post} />)
        ) : query ? (
          <p className="py-12 text-center text-gray-500">
            No results found for &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        ) : (
          <p className="py-12 text-center text-gray-500">
            Enter a search term to find articles.
          </p>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
