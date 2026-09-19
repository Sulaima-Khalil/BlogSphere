"use client";

import Image from "next/image";
import { Heart, Reply } from "lucide-react";
import { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Comments ({comments.length})
      </h2>

      <div className="mb-8 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Image
              src={comment.author.avatar}
              alt={comment.author.name}
              width={40}
              height={40}
              className="h-10 w-10 flex-shrink-0 rounded-full"
            />
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {comment.author.name}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="mb-2 text-gray-700">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary">
                  <Reply className="h-4 w-4" />
                  Reply
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
                  <Heart className="h-4 w-4" />
                  {comment.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <Textarea
          placeholder="Write a comment..."
          rows={4}
          className="mb-4 bg-white"
        />
        <Button>Post Comment</Button>
      </div>
    </section>
  );
}
