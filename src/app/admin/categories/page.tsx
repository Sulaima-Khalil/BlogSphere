import Link from "next/link";
import { Edit, Eye, FileText, FolderOpen, Plus, Trash2 } from "lucide-react";
import { posts } from "@/lib/data";
import { categories } from "@/lib/utils";
import { Category } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";

type CategoryRow = {
  id: Category;
  name: Category;
  slug: string;
  postCount: number;
  description: string;
};

const descriptions: Record<Category, string> = {
  Technology: "Trends, tools, and insights from the world of technology.",
  Lifestyle: "Practical ideas for a balanced and intentional life.",
  Programming: "Guides and ideas for building better software.",
  Design: "Inspiration and principles for thoughtful design.",
  Business: "Strategies, growth, and ideas for modern businesses.",
};

export default function AdminCategoriesPage() {
  const categoryRows: CategoryRow[] = categories.map((category) => ({
    id: category,
    name: category,
    slug: category.toLowerCase(),
    postCount: posts.filter((post) => post.category === category).length,
    description: descriptions[category],
  }));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
          <p className="mt-1 text-sm text-gray-600">Organize posts and help readers discover topics.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Categories</p>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Categorized Posts</p>
            <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
          </div>
        </div>
      </div>

      <Table<CategoryRow>
        columns={[
          {
            key: "name",
            header: "Category",
            render: (category) => <Badge category={category.name} />,
          },
          { key: "slug", header: "Slug", render: (category) => <span className="text-gray-600">/{category.slug}</span> },
          { key: "description", header: "Description", className: "min-w-64", render: (category) => <span className="text-gray-600">{category.description}</span> },
          { key: "postCount", header: "Posts", render: (category) => <span className="font-medium text-gray-900">{category.postCount}</span> },
          {
            key: "actions",
            header: "Actions",
            render: (category) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/blogs?category=${category.name}`}
                  aria-label={`View ${category.name} category`}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <button aria-label={`Edit ${category.name} category`} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary">
                  <Edit className="h-4 w-4" />
                </button>
                <button aria-label={`Delete ${category.name} category`} className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={categoryRows}
      />
    </div>
  );
}
