"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Bookmark, Share2, Check, Clock, LogIn } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

interface BlogPostActionsProps {
  content: string;
  initialLikes?: number;
}

export default function BlogPostActions({ content, initialLikes = 24 }: BlogPostActionsProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [authNotice, setAuthNotice] = useState(false);

  // Calculate estimated read time (assuming 200 words per minute)
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const checkAuth = (): boolean => {
    if (!user) {
      setAuthNotice(true);
      setTimeout(() => setAuthNotice(false), 3500);
      return false;
    }
    return true;
  };

  const handleLike = () => {
    if (!checkAuth()) return;
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setLiked(true);
    }
  };

  const handleBookmark = () => {
    if (!checkAuth()) return;
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-6 border-y border-gray-100 py-4">
      {authNotice && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-amber-50 p-3 text-sm font-medium text-amber-900 border border-amber-200">
          <span>Please log in to like or save this article.</span>
          <Button size="sm" onClick={() => router.push("/login")} className="flex items-center gap-1">
            <LogIn className="h-3.5 w-3.5" />
            <span>Log In</span>
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{readTime} min read</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={liked ? "primary" : "outline"}
            size="sm"
            onClick={handleLike}
            className="flex items-center gap-1.5"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-white text-white" : "text-gray-600"}`} />
            <span>{likes}</span>
          </Button>

          <Button
            variant={bookmarked ? "primary" : "outline"}
            size="sm"
            onClick={handleBookmark}
            aria-label="Bookmark post"
            className="flex items-center gap-1.5"
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-white text-white" : "text-gray-600"}`} />
            <span>{bookmarked ? "Saved" : "Save"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Copied Link!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-gray-600" />
                <span>Share</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
