"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Users, MessageSquare, Plus, Trash2, Eye, Edit3, ChevronLeft, ChevronRight } from "lucide-react";
import { deleteCustomPost, getAllPosts, users, comments } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Post, User } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "users" | "comments">("posts");
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const { siteSettings } = useAuth();
  const commentsPerPage = Math.max(1, siteSettings.postsPerPage);
  const commentsTotalPages = Math.max(1, Math.ceil(comments.length / commentsPerPage));
  const visibleComments = useMemo(
    () => comments.slice((commentsPage - 1) * commentsPerPage, commentsPage * commentsPerPage),
    [commentsPage, commentsPerPage]
  );

  useEffect(() => {
    setPostsList(getAllPosts());
  }, []);

  useEffect(() => {
    setCommentsPage(1);
  }, [commentsPerPage]);

  const handleDeletePost = (id: string) => {
    deleteCustomPost(id);
    setPostsList((prev) => prev.filter((p) => p.id !== id));
  };

  const stats = [
    {
      label: "Total Posts",
      value: postsList.length,
      icon: FileText,
      color: "bg-blue-500",
      key: "posts" as const,
    },
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-green-500",
      key: "users" as const,
    },
    {
      label: "Total Comments",
      value: comments.length,
      icon: MessageSquare,
      color: "bg-purple-500",
      key: "comments" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of site performance, user activity, and published articles</p>
        </div>
        <Link href="/create">
          <Button className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Create Post</span>
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color, key }) => (
          <button
            key={label}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-4 rounded-xl border p-6 text-left transition-all ${
              activeTab === key
                ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <div className={`rounded-lg ${color} p-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </button>
        ))}
      </div>

      {activeTab === "posts" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Manage Posts</h2>
          <Table<Post>
            columns={[
              { key: "title", header: "Title" },
              {
                key: "category",
                header: "Category",
                render: (post) => <Badge category={post.category} />,
              },
              {
                key: "author",
                header: "Author",
                render: (post) => post.author.name,
              },
              {
                key: "publishedAt",
                header: "Date",
                render: (post) => formatDate(post.publishedAt),
              },
              {
                key: "status",
                header: "Status",
                render: (post) => (
                  <Badge status={post.status} variant="status" />
                ),
              },
              {
                key: "id",
                header: "Actions",
                render: (post) => (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-primary"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/create?edit=${post.slug}`}
                      className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={postsList}
          />
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          <Table<User>
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              {
                key: "role",
                header: "Role",
                render: (u) => (
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 border border-blue-200">
                    {u.role}
                  </span>
                ),
              },
              {
                key: "joinedAt",
                header: "Joined",
                render: (u) => formatDate(u.joinedAt),
              },
            ]}
            data={users}
          />
        </div>
      )}

      {activeTab === "comments" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Comments</h2>
          <div className="space-y-3">
            {visibleComments.map((c) => (
              <div
                key={c.id}
                className="flex items-start justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{c.author.name}</span>
                    <span className="text-xs text-gray-500">on &quot;{c.postTitle}&quot;</span>
                  </div>
                  <p className="text-sm text-gray-700">{c.content}</p>
                </div>
                <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 border border-green-200">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
          {comments.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-5 text-sm text-gray-600 sm:flex-row">
              <span>
                Showing {(commentsPage - 1) * commentsPerPage + 1}-{Math.min(commentsPage * commentsPerPage, comments.length)} of {comments.length} comments
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCommentsPage((page) => Math.max(1, page - 1))}
                  disabled={commentsPage === 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <span className="whitespace-nowrap">Page {commentsPage} of {commentsTotalPages}</span>
                <button
                  type="button"
                  onClick={() => setCommentsPage((page) => Math.min(commentsTotalPages, page + 1))}
                  disabled={commentsPage === commentsTotalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
