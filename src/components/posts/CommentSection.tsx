"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Reply, Send, LogIn, AlertCircle, MessageSquareOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { useAuth } from "@/context/AuthContext";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export default function CommentSection({ comments: initialComments, postId }: CommentSectionProps) {
  const router = useRouter();
  const { user, siteSettings } = useAuth();

  const [commentList, setCommentList] = useState<Comment[]>(initialComments);
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = Math.max(1, siteSettings.postsPerPage);
  const totalPages = Math.max(1, Math.ceil(commentList.length / commentsPerPage));
  const visibleComments = useMemo(
    () => commentList.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage),
    [commentList, commentsPerPage, currentPage]
  );

  useEffect(() => {
    setCommentList(initialComments);
  }, [initialComments]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [commentsPerPage]);

  const requireAuth = (actionName: string): boolean => {
    if (!user) {
      setAuthNotice(`Please log in to ${actionName}.`);
      setTimeout(() => setAuthNotice(null), 3500);
      return false;
    }
    return true;
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSettings.allowComments) return;
    if (!requireAuth("post comments")) return;
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      postTitle: "",
      author: {
        id: user!.id,
        name: user!.name,
        avatar: user!.avatar,
      },
      content: newCommentText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      status: "Approved",
    };

    setCommentList((previousComments) => [newComment, ...previousComments]);
    setCurrentPage(1);
    setNewCommentText("");
  };

  const handleLikeComment = (commentId: string) => {
    if (!requireAuth("like comments")) return;

    const isAlreadyLiked = likedCommentIds.includes(commentId);

    if (isAlreadyLiked) {
      // Toggle Unlike (decrement count and remove from liked set)
      setLikedCommentIds((prev) => prev.filter((id) => id !== commentId));
      setCommentList((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1) } : c))
      );
    } else {
      // Toggle Like (increment count and add to liked set)
      setLikedCommentIds((prev) => [...prev, commentId]);
      setCommentList((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
      );
    }
  };

  const handleSendReply = (commentId: string) => {
    if (!siteSettings.allowComments) return;
    if (!requireAuth("reply to comments")) return;
    if (!replyText.trim()) return;

    const replyComment: Comment = {
      id: Date.now().toString(),
      postId,
      postTitle: "",
      author: {
        id: user!.id,
        name: user!.name,
        avatar: user!.avatar,
      },
      content: `@Reply: ${replyText.trim()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      status: "Approved",
    };

    setCommentList((previousComments) => [...previousComments, replyComment]);
    setReplyText("");
    setActiveReplyId(null);
  };

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Comments ({commentList.length})
      </h2>

      {/* Auth Notice Popup */}
      {authNotice && (
        <div className="mb-6 flex items-center justify-between rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-900 border border-amber-200 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <span>{authNotice}</span>
          </div>
          <Button size="sm" onClick={() => router.push("/login")} className="flex items-center gap-1.5">
            <LogIn className="h-4 w-4" />
            <span>Log In</span>
          </Button>
        </div>
      )}

      {/* Check if Comments are Disabled by Site Admin */}
      {!siteSettings.allowComments ? (
        <div className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center shadow-sm">
          <MessageSquareOff className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <h4 className="font-semibold text-gray-800">Comments Disabled</h4>
          <p className="mt-1 text-sm text-gray-500">
            The site administrator has currently disabled comments for published articles.
          </p>
        </div>
      ) : user ? (
        <form onSubmit={handlePostComment} className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <div className="mb-3 flex items-center gap-3">
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-gray-900">Commenting as {user.name}</span>
          </div>
          <Textarea
            placeholder="Write a thoughtful comment..."
            rows={3}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="mb-4 bg-white"
          />
          <Button type="submit" disabled={!newCommentText.trim()}>
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-gray-200 bg-blue-50/50 p-6 text-center sm:text-left">
          <div>
            <h4 className="font-semibold text-gray-900">Join the Conversation</h4>
            <p className="text-sm text-gray-600">Please log in to post comments, reply to discussions, or like comments.</p>
          </div>
          <Link href="/login">
            <Button className="flex items-center gap-1.5 flex-shrink-0">
              <LogIn className="h-4 w-4" />
              <span>Log In to Comment</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-6">
        {visibleComments.map((comment) => {
          const isLiked = likedCommentIds.includes(comment.id);

          return (
            <div key={comment.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {comment.author.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mb-3 text-gray-700 leading-relaxed">{comment.content}</p>
                  
                  <div className="flex items-center gap-4">
                    {siteSettings.allowComments && (
                      <button
                        onClick={() => {
                          if (requireAuth("reply to comments")) {
                            setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                          }
                        }}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </button>
                    )}

                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        isLiked ? "text-red-600 font-semibold" : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all ${
                          isLiked ? "fill-red-500 text-red-500 scale-110" : "text-gray-400"
                        }`}
                      />
                      <span>{comment.likes}</span>
                    </button>
                  </div>

                  {/* Inline Reply Form */}
                  {siteSettings.allowComments && activeReplyId === comment.id && user && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        placeholder={`Reply to ${comment.author.name}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendReply(comment.id)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                      <Button size="sm" onClick={() => handleSendReply(comment.id)}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {commentList.length > 0 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-5 text-sm text-gray-600 sm:flex-row">
          <span>
            Showing {(currentPage - 1) * commentsPerPage + 1}-{Math.min(currentPage * commentsPerPage, commentList.length)} of {commentList.length} comments
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              aria-label="Previous comments page"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="whitespace-nowrap">Page {currentPage} of {totalPages}</span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next comments page"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
