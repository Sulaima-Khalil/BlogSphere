"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { getPostBySlug, getCommentsByPostId } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import CommentSection from "@/components/posts/CommentSection";
import BlogPostActions from "@/components/posts/BlogPostActions";
import { Post, Comment } from "@/lib/types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = getPostBySlug(slug);
    setPost(foundPost);
    if (foundPost) {
      setPostComments(getCommentsByPostId(foundPost.id));
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="container-custom py-20 text-center text-gray-500">
        Loading article...
      </div>
    );
  }

  if (!post || post.status !== "Published") {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The post you are looking for does not exist or has been unpublished.</p>
        <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* Featured Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container-custom py-10">
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all blogs
        </Link>

        <Badge category={post.category} className="mb-4" />
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{post.author.name}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.commentCount} comments
              </span>
            </div>
          </div>
        </div>

        {/* Action Bar: Read Time, Like, Save, Share */}
        <BlogPostActions content={post.content} initialLikes={24} />

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <CommentSection comments={postComments} postId={post.id} />
      </div>
    </article>
  );
}

