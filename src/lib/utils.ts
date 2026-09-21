import { Category } from "./types";

export const categories: Category[] = [
  "Technology",
  "Lifestyle",
  "Programming",
  "Design",
  "Business",
];

export const categoryColors: Record<string, string> = {
  Technology: "bg-teal-100 text-teal-800",
  Lifestyle: "bg-yellow-100 text-yellow-800",
  Programming: "bg-blue-100 text-blue-800",
  Design: "bg-purple-100 text-purple-800",
  Business: "bg-orange-100 text-orange-800",
};

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
