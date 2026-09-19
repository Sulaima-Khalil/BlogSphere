import Link from "next/link";
import { FileText, Users, MessageSquare } from "lucide-react";
import { posts, users, comments } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { Post } from "@/lib/types";

export default function AdminDashboardPage() {
  const recentPosts = posts.filter((p) => p.status === "Published").slice(0, 5);

  const stats = [
    {
      label: "Total Posts",
      value: posts.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Total Comments",
      value: comments.length,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className={`rounded-lg ${color} p-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Posts</h2>
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
        ]}
        data={recentPosts}
      />
    </div>
  );
}
