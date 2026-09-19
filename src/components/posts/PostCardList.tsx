import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PostCardListProps {
  post: Post;
}

export default function PostCardList({ post }: PostCardListProps) {
  return (
    <article className="group flex gap-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/blog/${post.slug}`}
        className="relative h-40 w-48 flex-shrink-0 overflow-hidden rounded-lg"
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="192px"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-center">
        <Badge category={post.category} className="mb-2 w-fit" />
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{post.author.name}</span>
          <span>{formatDate(post.publishedAt)}</span>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
