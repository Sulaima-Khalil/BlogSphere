import Link from "next/link";
import { Edit, Eye, Hash, Plus, Tag, Trash2 } from "lucide-react";
import { posts } from "@/lib/data";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";

type TagRow = {
  id: string;
  name: string;
  slug: string;
  postCount: number;
};

export default function AdminTagsPage() {
  const tagRows: TagRow[] = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  )
    .sort()
    .map((tag) => ({
      id: tag,
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, "-"),
      postCount: posts.filter((post) => post.tags.includes(tag)).length,
    }));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Tags</h1>
          <p className="mt-1 text-sm text-gray-600">Use tags to make related content easier to find.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <Tag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Tags</p>
            <p className="text-2xl font-bold text-gray-900">{tagRows.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-lg bg-violet-100 p-3 text-violet-600">
            <Hash className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tag Assignments</p>
            <p className="text-2xl font-bold text-gray-900">{posts.reduce((total, post) => total + post.tags.length, 0)}</p>
          </div>
        </div>
      </div>

      <Table<TagRow>
        columns={[
          {
            key: "name",
            header: "Tag",
            render: (tag) => (
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                #{tag.name}
              </span>
            ),
          },
          { key: "slug", header: "Slug", render: (tag) => <span className="text-gray-600">/{tag.slug}</span> },
          { key: "postCount", header: "Posts", render: (tag) => <span className="font-medium text-gray-900">{tag.postCount}</span> },
          {
            key: "actions",
            header: "Actions",
            render: (tag) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/search?q=${encodeURIComponent(tag.name)}`}
                  aria-label={`View posts tagged ${tag.name}`}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <button aria-label={`Edit ${tag.name} tag`} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary">
                  <Edit className="h-4 w-4" />
                </button>
                <button aria-label={`Delete ${tag.name} tag`} className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={tagRows}
      />
    </div>
  );
}
