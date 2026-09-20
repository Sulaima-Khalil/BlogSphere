"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, topics, or keywords..."
          className="w-full rounded-lg border-0 px-5 py-3.5 pr-12 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <Button type="submit" size="lg" className="px-6">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}
