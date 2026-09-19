import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getFeaturedPosts } from "@/lib/data";
import PostCard from "@/components/posts/PostCard";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[500px] items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=800&fit=crop"
          alt="Mountain landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Stories, Ideas & Knowledge
            <br />
            for a Better You
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
            Explore insightful articles on technology, lifestyle, programming,
            and more from our community of writers.
          </p>
          <form action="/search" className="mx-auto flex max-w-xl gap-2">
            <div className="relative flex-1">
              <input
                type="search"
                name="q"
                placeholder="Search articles..."
                className="w-full rounded-lg border-0 px-5 py-3.5 pr-12 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" size="lg" className="px-6">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container-custom py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Blogs</h2>
            <p className="mt-1 text-sm text-gray-600">Explore blogs from different categories.</p>
          </div>
          <Link
            href="/blogs"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
