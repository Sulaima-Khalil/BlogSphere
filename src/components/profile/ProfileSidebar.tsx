"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FileText,
  MessageSquare,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";
import { authors } from "@/lib/data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/profile", label: "My Posts", icon: FileText },
  { href: "/profile/comments", label: "Comments", icon: MessageSquare },
  { href: "/profile/saved", label: "Saved Posts", icon: Bookmark },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const user = authors.sarah;

  return (
    <aside className="w-full rounded-xl border border-gray-200 bg-white p-6 lg:w-72">
      <div className="mb-6 text-center">
        <Image
          src={user.avatar}
          alt={user.name}
          width={80}
          height={80}
          className="mx-auto mb-3 rounded-full"
        />
        <h3 className="font-bold text-gray-900">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <Button variant="outline" size="sm" className="mt-3">
          Edit Profile
        </Button>
      </div>

      <nav className="space-y-1">
        {menuItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
