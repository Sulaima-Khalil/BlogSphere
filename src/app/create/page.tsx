"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, X, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import { categories } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/posts/RichTextEditor";
import { useAuth } from "@/context/AuthContext";
import { getAllPosts, saveCustomPost, updateCustomPost } from "@/lib/data";
import { Post } from "@/lib/types";

export default function CreatePostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState(["react", "web", "tutorial"]);
  const [tagInput, setTagInput] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  useEffect(() => {
    const editSlug = searchParams.get("edit");
    if (!editSlug || !user) {
      setEditingPostId(null);
      return;
    }

    const existingPost = getAllPosts().find(
      (post) => post.slug === editSlug && (post.author.id === user.id || post.author.email === user.email)
    );

    if (!existingPost) {
      setEditingPostId(null);
      return;
    }

    setEditingPostId(existingPost.id);
    setTitle(existingPost.title);
    setCategory(existingPost.category);
    setTags(existingPost.tags.length ? existingPost.tags : ["react", "web", "tutorial"]);
  }, [searchParams, user]);

  // Auth Guard: Block non-logged in users
  if (!user) {
    return (
      <section className="container-custom py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Login Required</h2>
          <p className="mb-6 text-sm text-gray-600 leading-relaxed">
            You must be logged in to create and publish articles or save drafts on BlogSphere.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/login">
              <Button className="w-full">Log In to Continue</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full">Create an Account</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePublish = (isDraft = false) => {
    if (!title.trim()) {
      setNotification({
        type: "error",
        message: "Please provide a post title before publishing.",
      });
      return;
    }

    setIsSubmitting(true);

    const generatedSlug =
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") || `post-${Date.now()}`;

    const existingPost = editingPostId ? getAllPosts().find((post) => post.id === editingPostId) : null;

    const newPost: Post = {
      id: existingPost?.id ?? `custom-${Date.now()}`,
      slug: existingPost?.slug ?? generatedSlug,
      title: title.trim(),
      excerpt: title.trim() + " - Read more on BlogSphere.",
      content: existingPost?.content ?? `<p>${title.trim()}</p><p>Welcome to this new story on BlogSphere! Thank you for reading.</p>`,
      featuredImage: existingPost?.featuredImage ?? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
      category: category,
      tags: tags,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
      publishedAt: existingPost?.publishedAt ?? new Date().toISOString().split("T")[0],
      commentCount: existingPost?.commentCount ?? 0,
      status: isDraft ? "Draft" : "Published",
      featured: existingPost?.featured ?? true,
    };

    if (existingPost) {
      updateCustomPost(newPost);
    } else {
      saveCustomPost(newPost);
    }

    setNotification({
      type: "success",
      message: existingPost
        ? "Post updated successfully!"
        : isDraft
          ? "Draft saved successfully! You can view it in your profile."
          : "Post published successfully! Redirecting to All Blogs...",
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(existingPost ? "/profile" : isDraft ? "/profile" : "/blogs");
    }, 1500);
  };

  return (
    <section className="container-custom py-10">
      {notification && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-lg p-4 text-sm font-medium ${
            notification.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handlePublish(true)}
            disabled={isSubmitting}
          >
            Save Draft
          </Button>
          <Button onClick={() => handlePublish(false)} disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Input
            label="Title"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as (typeof categories)[number])}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Featured Image
            </label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors">
              <Upload className="mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag and drop an image, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Content
          </label>
          <RichTextEditor />
        </div>
      </div>
    </section>
  );
}

