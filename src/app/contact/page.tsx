"use client";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Get in touch</p>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600">Have a question or feedback? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <form className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" onSubmit={(e) => e.preventDefault()}>
            <Input label="Name" type="text" placeholder="Your name" required />
            <Input label="Email" type="email" placeholder="you@example.com" required />
            <Textarea label="Message" rows={6} placeholder="Your message..." required />
            <Button type="submit" size="lg">Send Message</Button>
          </form>

          <aside className="rounded-2xl bg-primary-dark p-8 text-white shadow-sm">
            <MessageCircle className="mb-5 h-8 w-8 text-white/80" />
            <h2 className="mb-3 text-2xl font-bold">Let&apos;s start a conversation</h2>
            <p className="mb-8 leading-7 text-white/75">
              Share your question, feedback, or idea and our team will get back to you soon.
            </p>
            <div className="flex items-center gap-3 border-t border-white/15 pt-6">
              <Mail className="h-5 w-5 text-white/80" />
              <a href="mailto:hello@blogsphere.com" className="font-medium hover:underline">hello@blogsphere.com</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
