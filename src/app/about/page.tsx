import { BookOpen, Heart, Lightbulb } from "lucide-react";

const values = [
  { icon: BookOpen, title: "Share knowledge", text: "Publish ideas that help people learn and grow." },
  { icon: Lightbulb, title: "Spark curiosity", text: "Discover thoughtful perspectives across every topic." },
  { icon: Heart, title: "Build community", text: "Connect writers and readers through meaningful stories." },
];

export default function AboutPage() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Our story</p>
          <h1 className="text-4xl font-bold text-gray-900">About BlogSphere</h1>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              BlogSphere is a modern blogging platform where writers share stories,
              ideas, and knowledge across technology, lifestyle, programming, design,
              and business.
            </p>
            <p>
              Our mission is to create a space where quality content meets an
              engaging reading experience. Whether you&apos;re a seasoned writer or
              just starting out, BlogSphere provides the tools you need to share
              your voice with the world.
            </p>
          </div>

          <div className="mt-10 grid gap-5 border-t border-gray-100 pt-8 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl bg-gray-50 p-5">
                <Icon className="mb-3 h-6 w-6 text-primary" />
                <h2 className="mb-1 font-semibold text-gray-900">{title}</h2>
                <p className="text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
