import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <Badge category={post.category} className="mb-3" />
          <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-primary">
            {post.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.commentCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
