"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, Trash2 } from "lucide-react";
import { comments } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { Comment } from "@/lib/types";
import { cn } from "@/lib/utils";

const tabs = ["All", "Pending", "Approved", "Spam"] as const;

export default function AdminCommentsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const filteredComments =
    activeTab === "All"
      ? comments
      : comments.filter((c) => c.status === activeTab);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Manage Comments</h1>

      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <Table<Comment>
        columns={[
          {
            key: "author",
            header: "User",
            render: (comment) => (
              <div className="flex items-center gap-3">
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">{comment.author.name}</span>
              </div>
            ),
          },
          {
            key: "content",
            header: "Comment",
            render: (comment) => (
              <p className="max-w-xs truncate text-gray-600">
                {comment.content}
              </p>
            ),
          },
          {
            key: "postTitle",
            header: "Post",
            render: (comment) => (
              <span className="text-sm text-gray-600">
                {comment.postTitle || "—"}
              </span>
            ),
          },
          {
            key: "createdAt",
            header: "Date",
            render: (comment) => formatDate(comment.createdAt),
          },
          {
            key: "status",
            header: "Status",
            render: (comment) => (
              <Badge status={comment.status} variant="status" />
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: (comment) => (
              <div className="flex items-center gap-2">
                {comment.status === "Pending" && (
                  <>
                    <button className="rounded p-1.5 text-gray-500 hover:bg-green-50 hover:text-green-600">
                      <Check className="h-4 w-4" />
                    </button>
                    <button className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={filteredComments}
      />
    </div>
  );
}
