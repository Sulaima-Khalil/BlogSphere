import { Post, Comment, User } from "./types";

export const authors = {
  sarah: {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    email: "sarah@blogsphere.com",
  },
  michael: {
    id: "2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    email: "michael@blogsphere.com",
  },
  emily: {
    id: "3",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    email: "emily@blogsphere.com",
  },
  david: {
    id: "4",
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    email: "david@blogsphere.com",
  },
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "future-of-web-development-2025",
    title: "The Future of Web Development in 2025",
    excerpt:
      "Explore the latest trends shaping web development including AI integration, server components, and edge computing.",
    content: `
      <p>The web development landscape is evolving at an unprecedented pace. As we move through 2025, several key trends are reshaping how we build and deploy web applications.</p>
      <h2>Key Trends to Watch</h2>
      <ol>
        <li><strong>AI-Powered Development</strong> - AI assistants are now integral to the development workflow, helping with code generation, debugging, and optimization.</li>
        <li><strong>Server Components</strong> - React Server Components and similar patterns are becoming the standard for building performant applications.</li>
        <li><strong>Edge Computing</strong> - Deploying logic closer to users for faster response times and better experiences.</li>
        <li><strong>WebAssembly</strong> - Running high-performance code in the browser for compute-intensive applications.</li>
      </ol>
      <p>These trends represent a fundamental shift in how we approach web development. Staying current with these changes is essential for any developer looking to remain competitive in the industry.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    category: "Technology",
    tags: ["react", "web", "tutorial"],
    author: authors.sarah,
    publishedAt: "2025-01-15",
    commentCount: 12,
    status: "Published",
    featured: true,
  },
  {
    id: "2",
    slug: "minimalist-living-guide",
    title: "A Complete Guide to Minimalist Living",
    excerpt:
      "Discover how simplifying your life can lead to greater happiness, reduced stress, and more meaningful experiences.",
    content: `
      <p>Minimalism isn't about having less for the sake of it—it's about making room for what truly matters. In this guide, we'll explore practical steps to embrace a minimalist lifestyle.</p>
      <h2>Getting Started</h2>
      <p>Begin with one area of your life. Whether it's your wardrobe, digital files, or daily schedule, start small and build momentum.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=500&fit=crop",
    category: "Lifestyle",
    tags: ["minimalism", "wellness"],
    author: authors.emily,
    publishedAt: "2025-01-12",
    commentCount: 8,
    status: "Published",
    featured: true,
  },
  {
    id: "3",
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    excerpt:
      "Deep dive into TypeScript generics with practical examples that will level up your type-safe code.",
    content: `
      <p>Generics are one of TypeScript's most powerful features. They allow you to create reusable components that work with a variety of types.</p>
      <h2>Basic Generic Functions</h2>
      <p>Learn how to write functions that maintain type information across their usage.</p>
    `,
    featuredImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800&h=500",
    category: "Programming",
    tags: ["typescript", "programming"],
    author: authors.michael,
    publishedAt: "2025-01-10",
    commentCount: 15,
    status: "Published",
    featured: true,
  },
  {
    id: "4",
    slug: "ui-design-principles-2025",
    title: "Essential UI Design Principles for 2025",
    excerpt:
      "Learn the fundamental principles that make interfaces intuitive, accessible, and visually appealing.",
    content: `<p>Great UI design is invisible—it just works. Here are the principles every designer should know.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    category: "Design",
    tags: ["design", "ui", "ux"],
    author: authors.david,
    publishedAt: "2025-01-08",
    commentCount: 6,
    status: "Published",
  },
  {
    id: "5",
    slug: "startup-growth-strategies",
    title: "Proven Growth Strategies for Startups",
    excerpt:
      "Actionable strategies that successful startups use to scale from zero to millions of users.",
    content: `<p>Growth is the lifeblood of any startup. Learn the strategies that work.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop",
    category: "Business",
    tags: ["startup", "growth"],
    author: authors.sarah,
    publishedAt: "2025-01-05",
    commentCount: 9,
    status: "Published",
  },
  {
    id: "6",
    slug: "react-server-components-guide",
    title: "Understanding React Server Components",
    excerpt:
      "A comprehensive guide to React Server Components and how they change the way we build React apps.",
    content: `<p>React Server Components represent a paradigm shift in React development.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    category: "Programming",
    tags: ["react", "server-components"],
    author: authors.michael,
    publishedAt: "2025-01-03",
    commentCount: 11,
    status: "Published",
  },
  {
    id: "7",
    slug: "draft-post-example",
    title: "Draft: Upcoming Features Preview",
    excerpt: "A sneak peek at what's coming next to BlogSphere.",
    content: `<p>This is a draft post.</p>`,
    featuredImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
    category: "Technology",
    tags: ["announcement"],
    author: authors.sarah,
    publishedAt: "2025-01-20",
    commentCount: 0,
    status: "Draft",
  },
];

export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    postTitle: "The Future of Web Development in 2025",
    author: {
      id: "5",
      name: "Alex Turner",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    content:
      "Great article! The section on AI-powered development really resonated with me. We've been using Copilot at work and it's been a game changer.",
    createdAt: "2025-01-16T10:30:00",
    likes: 5,
    status: "Approved",
  },
  {
    id: "2",
    postId: "1",
    postTitle: "The Future of Web Development in 2025",
    author: {
      id: "6",
      name: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    content:
      "Would love to see a follow-up article on WebAssembly use cases in production. Any plans for that?",
    createdAt: "2025-01-16T14:20:00",
    likes: 3,
    status: "Approved",
  },
  {
    id: "3",
    postId: "1",
    postTitle: "The Future of Web Development in 2025",
    author: {
      id: "7",
      name: "James Miller",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    },
    content:
      "Server Components have completely changed how I think about React architecture. Excellent overview!",
    createdAt: "2025-01-17T09:15:00",
    likes: 8,
    status: "Approved",
  },
  {
    id: "4",
    postId: "2",
    postTitle: "A Complete Guide to Minimalist Living",
    author: authors.emily,
    content: "Thanks for reading! Let me know if you'd like more lifestyle content.",
    createdAt: "2025-01-13T11:00:00",
    likes: 2,
    status: "Approved",
  },
  {
    id: "5",
    postId: "3",
    postTitle: "Mastering TypeScript Generics",
    author: {
      id: "8",
      name: "Spam User",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    content: "Buy cheap products at spam-site.com!!!",
    createdAt: "2025-01-11T08:00:00",
    likes: 0,
    status: "Spam",
  },
  {
    id: "6",
    postId: "4",
    postTitle: "Essential UI Design Principles for 2025",
    author: {
      id: "9",
      name: "New User",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    },
    content: "This looks interesting, waiting for moderation.",
    createdAt: "2025-01-09T16:00:00",
    likes: 0,
    status: "Pending",
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@blogsphere.com",
    avatar: authors.sarah.avatar,
    role: "Admin",
    joinedAt: "2024-06-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@blogsphere.com",
    avatar: authors.michael.avatar,
    role: "Editor",
    joinedAt: "2024-08-20",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@blogsphere.com",
    avatar: authors.emily.avatar,
    role: "User",
    joinedAt: "2024-10-05",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@blogsphere.com",
    avatar: authors.david.avatar,
    role: "User",
    joinedAt: "2024-11-12",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured && p.status === "Published");
}

export function getPostsByCategory(category: string): Post[] {
  if (category === "All") return posts.filter((p) => p.status === "Published");
  return posts.filter(
    (p) => p.category === category && p.status === "Published"
  );
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.status === "Published" &&
      (p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export function getCommentsByPostId(postId: string) {
  return comments.filter(
    (c) => c.postId === postId && c.status === "Approved"
  );
}

export function getUserPosts(userId: string, status?: "Published" | "Draft") {
  return posts.filter(
    (p) =>
      p.author.id === userId && (status ? p.status === status : true)
  );
}
