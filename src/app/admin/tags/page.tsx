"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Eye, Hash, Plus, Tag, Trash2 } from "lucide-react";
import { getAllPosts, removeTagFromPosts, renameTagInPosts } from "@/lib/data";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { Post } from "@/lib/types";

type TagRow = {
  id: string;
  name: string;
  slug: string;
  postCount: number;
};

function createTagRows(postList: Post[]): TagRow[] {
  return Array.from(
    new Set(postList.flatMap((post) => post.tags))
  )
    .sort()
    .map((tag) => ({
      id: tag,
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, "-"),
      postCount: postList.filter((post) => post.tags.includes(tag)).length,
    }));
}

export default function AdminTagsPage() {
  const [tagRows, setTagRows] = useState<TagRow[]>([]);
  const [editingTag, setEditingTag] = useState<TagRow | null>(null);
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  const refreshTags = () => setTagRows(createTagRows(getAllPosts()));

  useEffect(() => {
    refreshTags();
  }, []);

  const openEditDialog = (tag: TagRow) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setError("");
  };

  const handleRename = (event: React.FormEvent) => {
    event.preventDefault();
    const nextName = tagName.trim();

    if (!editingTag || !nextName) {
      setError("Enter a tag name.");
      return;
    }
    if (tagRows.some((tag) => tag.name.toLowerCase() === nextName.toLowerCase() && tag.id !== editingTag.id)) {
      setError("A tag with this name already exists.");
      return;
    }

    renameTagInPosts(editingTag.name, nextName);
    refreshTags();
    setEditingTag(null);
  };

  const handleDelete = (tag: TagRow) => {
    if (!window.confirm(`Delete the #${tag.name} tag from ${tag.postCount} post${tag.postCount === 1 ? "" : "s"}?`)) return;
    removeTagFromPosts(tag.name);
    refreshTags();
  };

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
            <p className="text-2xl font-bold text-gray-900">{tagRows.reduce((total, tag) => total + tag.postCount, 0)}</p>
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
                <button
                  type="button"
                  onClick={() => openEditDialog(tag)}
                  aria-label={`Edit ${tag.name} tag`}
                  className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(tag)}
                  aria-label={`Delete ${tag.name} tag`}
                  className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={tagRows}
      />

      {editingTag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleRename} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Edit tag</h2>
            <p className="mt-1 text-sm text-gray-500">This updates the tag on every associated post.</p>
            <label className="mt-5 block text-sm font-medium text-gray-700" htmlFor="tag-name">Tag name</label>
            <input
              id="tag-name"
              value={tagName}
              onChange={(event) => setTagName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditingTag(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">Save changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
