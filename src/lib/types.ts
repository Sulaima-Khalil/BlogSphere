export type Category =
  | "Technology"
  | "Lifestyle"
  | "Programming"
  | "Design"
  | "Business";

export type PostStatus = "Published" | "Draft";

export type UserRole = "Admin" | "Editor" | "User";

export type CommentStatus = "Approved" | "Pending" | "Spam";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;
  commentCount: number;
  status: PostStatus;
  featured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  postTitle?: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  status: CommentStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  joinedAt: string;
}
