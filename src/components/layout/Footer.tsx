import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">BlogSphere</span>
            </div>
            <p className="max-w-md text-sm text-gray-600">
              Stories, ideas & knowledge for a better you. Discover insightful
              articles on technology, lifestyle, programming, and more.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/blogs" className="hover:text-primary">All Blogs</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/blogs?category=Technology" className="hover:text-primary">Technology</Link></li>
              <li><Link href="/blogs?category=Lifestyle" className="hover:text-primary">Lifestyle</Link></li>
              <li><Link href="/blogs?category=Programming" className="hover:text-primary">Programming</Link></li>
              <li><Link href="/blogs?category=Design" className="hover:text-primary">Design</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BlogSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
