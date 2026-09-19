"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"Published" | "Draft">("Published");
  const userPosts = getUserPosts("1", activeTab);

  return (
    <section className="container-custom py-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <ProfileSidebar />

        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">My Posts</h1>

          <div className="mb-6 flex gap-2 border-b border-gray-200">
            {(["Published", "Draft"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={80}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <Badge status={post.status} variant="status" />
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/create?edit=${post.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    {post.status === "Published" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-gray-600 hover:underline"
                      >
                        View
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-gray-500">
                No {activeTab.toLowerCase()} posts yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
