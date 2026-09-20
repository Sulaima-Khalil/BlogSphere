"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <section className="container-custom py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#006644] border border-emerald-200/60 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className="mb-3 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-base sm:text-lg">
            Have a question about BlogSphere, interested in collaborating, or need support? Send us a message and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Contact Form Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Thank you for reaching out!</h3>
                <p className="mt-2 max-w-md text-sm text-gray-600 leading-relaxed">
                  We have received your message and sent a confirmation to your email. Our team typically responds within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 rounded-xl border-gray-300"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  type="text"
                  placeholder="How can we help you?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  label="Message"
                  rows={5}
                  placeholder="Tell us more about your query or feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button type="submit" size="lg" className="w-full rounded-xl bg-[#006644] hover:bg-[#004d33] text-white py-3.5 font-semibold text-base shadow-md shadow-[#006644]/20 transition-all">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Compact Balanced Green Info Card */}
          <aside className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#006644] via-[#005438] to-[#003d29] p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between h-full">
            {/* Background Decorative Ambient Circles */}
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-200 backdrop-blur-md border border-white/10 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Support Online</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Contact Information
                </h2>
                <p className="mt-1 text-xs text-emerald-100/80 leading-relaxed">
                  Have questions or feedback? Feel free to reach out directly through any channel.
                </p>
              </div>

              {/* Direct Details Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-emerald-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Email</p>
                    <a href="mailto:hello@blogsphere.com" className="text-xs font-semibold text-white hover:underline truncate block">
                      hello@blogsphere.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-emerald-300">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Phone</p>
                    <p className="text-xs font-semibold text-white">+1 (555) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-emerald-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Location</p>
                    <p className="text-xs font-semibold text-white">Tech City, CA 94016</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Footer */}
            <div className="relative z-10 pt-4 mt-6 border-t border-white/15 flex items-center justify-between">
              <span className="text-[11px] font-medium text-emerald-100/80">Follow BlogSphere:</span>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-emerald-200 hover:bg-white hover:text-[#006644] transition-all"
                  title="Twitter"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-emerald-200 hover:bg-white hover:text-[#006644] transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-emerald-200 hover:bg-white hover:text-[#006644] transition-all"
                  title="GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

