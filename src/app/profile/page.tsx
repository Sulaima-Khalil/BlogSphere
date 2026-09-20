"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserPosts, posts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { CheckCircle2, Upload, Camera, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [activeNav, setActiveNav] = useState<"posts" | "saved" | "settings">("posts");
  const [activeTab, setActiveTab] = useState<"Published" | "Draft">("Published");
  const [saveMessage, setSaveMessage] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || "Sarah Johnson");
  const [email, setEmail] = useState(user?.email || "sarah@blogsphere.com");
  const [bio, setBio] = useState(user?.bio || "Senior Web Developer & Tech Writer at BlogSphere.");
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[0]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <section className="container-custom py-20 text-center">
        <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </section>
    );
  }

  const userPosts = getUserPosts("1", activeTab);
  const savedPosts = posts.slice(0, 2);

  // Handle local image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      bio,
      avatar,
    });
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 3000);
  };

  return (
    <section className="container-custom py-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <ProfileSidebar
          activeNav={activeNav}
          onSelectNav={(nav) => setActiveNav(nav as "posts" | "saved" | "settings")}
        />

        <div className="flex-1">
          {activeNav === "posts" && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
                  <p className="text-sm text-gray-500">Manage and edit your published stories</p>
                </div>
                <Link href="/create">
                  <Button size="sm">Create New Post</Button>
                </Link>
              </div>

              <div className="mb-6 flex gap-2 border-b border-gray-200">
                {(["Published", "Draft"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                      activeTab === tab
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={80}
                        height={60}
                        className="rounded-lg object-cover h-16 w-24"
                      />
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{post.title}</h3>
                          <Badge status={post.status} variant="status" />
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/create?edit=${post.slug}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        {post.status === "Published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-medium text-gray-600 hover:underline"
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-gray-500">
                    No {activeTab.toLowerCase()} posts yet.
                  </p>
                )}
              </div>
            </>
          )}

          {activeNav === "saved" && (
            <>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Saved Posts</h1>
              <p className="mb-6 text-sm text-gray-500">Articles you have bookmarked to read later</p>
              <div className="space-y-4">
                {savedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={80}
                      height={60}
                      className="rounded-lg object-cover h-16 w-24"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.title}</h3>
                        <Badge category={post.category} />
                      </div>
                      <p className="text-sm text-gray-500">
                        By {post.author.name}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read Article
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeNav === "settings" && (
            <>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Edit Profile & Avatar</h1>
              <p className="mb-6 text-sm text-gray-500">Update your account information and profile photo</p>

              {saveMessage && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-800 border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Profile and photo updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                
                {/* Profile Photo Uploader Section */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-800">
                    Profile Photo / Avatar
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={avatar}
                        alt="Avatar preview"
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow hover:bg-primary-dark transition-colors"
                        title="Choose photo"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex-1 space-y-3 text-center sm:text-left">
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" />
                          <span>Upload Photo from Computer</span>
                        </Button>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-2 flex items-center justify-center sm:justify-start gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <span>Or select a preset avatar:</span>
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                          {PRESET_AVATARS.map((url, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setAvatar(url)}
                              className={`h-10 w-10 overflow-hidden rounded-full border-2 transition-all ${
                                avatar === url ? "border-primary scale-110 ring-2 ring-primary/30" : "border-transparent opacity-75 hover:opacity-100"
                              }`}
                            >
                              <Image src={url} alt={`Preset ${i}`} width={40} height={40} className="h-full w-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Form Inputs */}
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Bio / Short Description
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-end">
                  <Button type="submit" size="lg">
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
