import Link from "next/link";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { posts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Post } from "@/lib/types";

export default function AdminPostsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
        <Link href="/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        </Link>
      </div>

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
            key: "actions",
            header: "Actions",
            render: (post) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/create?edit=${post.slug}`}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
                {post.status === "Published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ),
          },
        ]}
        data={posts}
      />
    </div>
  );
}
