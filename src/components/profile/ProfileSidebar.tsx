"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FileText,
  Bookmark,
  Settings,
  LogOut,
  Camera,
} from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface ProfileSidebarProps {
  activeNav?: string;
  onSelectNav?: (key: string) => void;
}

const menuItems = [
  { key: "posts", label: "My Posts", icon: FileText },
  { key: "saved", label: "Saved Posts", icon: Bookmark },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function ProfileSidebar({
  activeNav = "posts",
  onSelectNav,
}: ProfileSidebarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) return null;

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <>
      <aside className="w-full rounded-xl border border-gray-200 bg-white p-6 lg:w-72 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-3 h-20 w-20">
            <Image
              src={user.avatar}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full object-cover h-20 w-20 border-2 border-primary/20"
            />
            <button
              onClick={() => onSelectNav && onSelectNav("settings")}
              className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-white shadow-md hover:bg-primary-dark transition-colors"
              title="Upload new avatar"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            {user.role}
          </span>
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => onSelectNav && onSelectNav("settings")}
            >
              Edit Profile & Avatar
            </Button>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onSelectNav && onSelectNav(key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeNav === key
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-gray-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
              <LogOut className="h-6 w-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">Logout Confirmation</h3>
              <p className="mt-1 text-sm text-gray-500">
                Are you sure you want to log out of your account?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="w-full rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="w-full rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
