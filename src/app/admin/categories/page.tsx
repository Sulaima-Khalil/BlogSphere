"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Eye, FileText, FolderOpen, Plus, Trash2 } from "lucide-react";
import { getAllPosts, getCategories, removeCategoryFromPosts, renameCategoryInPosts } from "@/lib/data";
import { Category, Post } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  description: string;
};

const descriptions: Record<string, string> = {
  Technology: "Trends, tools, and insights from the world of technology.",
  Lifestyle: "Practical ideas for a balanced and intentional life.",
  Programming: "Guides and ideas for building better software.",
  Design: "Inspiration and principles for thoughtful design.",
  Business: "Strategies, growth, and ideas for modern businesses.",
};

export default function AdminCategoriesPage() {
  const [categoryRows, setCategoryRows] = useState<CategoryRow[]>([]);
  const [postList, setPostList] = useState<Post[]>([]);
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const refreshCategories = () => {
    const currentPosts = getAllPosts();
    const currentCategories = getCategories();
    setPostList(currentPosts);
    setCategoryRows(currentCategories.map((category) => ({
      id: category,
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      postCount: currentPosts.filter((post) => post.category === category).length,
      description: descriptions[category] || "Custom category for organizing related posts.",
    })));
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const openEditDialog = (category: CategoryRow) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setError("");
  };

  const handleRename = (event: React.FormEvent) => {
    event.preventDefault();
    const nextName = categoryName.trim();
    if (!editingCategory || !nextName) {
      setError("Enter a category name.");
      return;
    }
    if (categoryRows.some((category) => category.name.toLowerCase() === nextName.toLowerCase() && category.id !== editingCategory.id)) {
      setError("A category with this name already exists.");
      return;
    }
    renameCategoryInPosts(editingCategory.name, nextName);
    refreshCategories();
    setEditingCategory(null);
  };

  const handleDelete = (category: CategoryRow) => {
    const replacement = categoryRows.find((item) => item.id !== category.id);
    if (!replacement) return;
    if (!window.confirm(`Delete ${category.name}? Its ${category.postCount} post${category.postCount === 1 ? "" : "s"} will move to ${replacement.name}.`)) return;
    removeCategoryFromPosts(category.name, replacement.name);
    refreshCategories();
  };

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
            <p className="text-2xl font-bold text-gray-900">{categoryRows.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Categorized Posts</p>
            <p className="text-2xl font-bold text-gray-900">{postList.length}</p>
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
                <button type="button" onClick={() => openEditDialog(category)} aria-label={`Edit ${category.name} category`} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary">
                  <Edit className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => handleDelete(category)} disabled={categoryRows.length <= 1} aria-label={`Delete ${category.name} category`} className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={categoryRows}
      />

      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleRename} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Edit category</h2>
            <p className="mt-1 text-sm text-gray-500">This updates the category on every associated post.</p>
            <label className="mt-5 block text-sm font-medium text-gray-700" htmlFor="category-name">Category name</label>
            <input id="category-name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" autoFocus />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditingCategory(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">Save changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
