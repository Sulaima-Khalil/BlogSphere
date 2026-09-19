import { Category } from "@/lib/types";
import { categoryColors, cn } from "@/lib/utils";

interface BadgeProps {
  category?: Category;
  label?: string;
  variant?: "category" | "status";
  status?: "Published" | "Draft" | "Approved" | "Pending" | "Spam" | "Admin" | "Editor" | "User";
  className?: string;
}

const statusColors: Record<string, string> = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-gray-100 text-gray-600",
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Spam: "bg-red-100 text-red-800",
  Admin: "bg-red-100 text-red-800",
  Editor: "bg-blue-100 text-blue-800",
  User: "bg-gray-100 text-gray-700",
};

export default function Badge({
  category,
  label,
  variant = "category",
  status,
  className,
}: BadgeProps) {
  const text = label || category || status || "";
  const colorClass =
    variant === "category" && category
      ? categoryColors[category]
      : status
        ? statusColors[status]
        : "bg-gray-100 text-gray-700";

  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-medium",
        colorClass,
        className
      )}
    >
      {text}
    </span>
  );
}
