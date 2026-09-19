# BlogSphere

A modern blog platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Page** — Hero section with search and featured posts grid
- **Blog Listing** — Category filters and list-style post cards
- **Single Blog Post** — Full article view with comments section
- **Search** — Search results page with query filtering
- **Authentication** — Login and Register pages with Google OAuth UI
- **User Profile** — Sidebar navigation with published/draft post tabs
- **Create/Edit Post** — Rich text editor with tags and featured image upload
- **Admin Panel** — Dashboard, posts, users, and comments management

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin panel pages
│   ├── blog/[slug]/      # Single blog post
│   ├── blogs/            # Blog listing
│   ├── create/           # Post editor
│   ├── login/            # Authentication
│   ├── profile/          # User profile
│   └── search/           # Search results
├── components/
│   ├── admin/            # Admin sidebar
│   ├── layout/           # Navbar, Footer
│   ├── posts/            # Post cards, comments, editor
│   ├── profile/          # Profile sidebar
│   └── ui/               # Reusable UI components
└── lib/
    ├── data.ts           # Mock data
    ├── types.ts          # TypeScript types
    └── utils.ts          # Utility functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured posts |
| `/blogs` | All blogs with category filters |
| `/blog/[slug]` | Single blog post with comments |
| `/search?q=` | Search results |
| `/login` | Login page |
| `/register` | Registration page |
| `/profile` | User profile and posts |
| `/create` | Create/edit post editor |
| `/admin` | Admin dashboard |
| `/admin/posts` | Manage posts |
| `/admin/users` | Manage users |
| `/admin/comments` | Moderate comments |

## License

MIT
