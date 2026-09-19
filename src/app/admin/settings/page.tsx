"use client";

import { FormEvent, ReactNode, useState } from "react";
import { Bell, Globe2, MessageSquare, Settings } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div className="w-full max-w-none">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your blog preferences and notifications.</p>
      </div>

      <form className="space-y-8" onSubmit={handleSave}>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><Globe2 className="h-5 w-5" /></div>
            <div>
              <h2 className="font-semibold text-gray-900">Site Details</h2>
              <p className="mt-1 text-sm text-gray-500">Update the information readers see about your blog.</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Site name" defaultValue="BlogSphere" required />
            <Input label="Contact email" type="email" defaultValue="hello@blogsphere.com" required />
            <div className="md:col-span-2">
              <Textarea
                label="Site description"
                rows={3}
                defaultValue="Discover insightful articles on technology, lifestyle, programming, design, and business."
                required
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600"><Settings className="h-5 w-5" /></div>
            <div>
              <h2 className="font-semibold text-gray-900">Publishing Preferences</h2>
              <p className="mt-1 text-sm text-gray-500">Control how content and reader interaction work.</p>
            </div>
          </div>
          <div className="space-y-5">
            <label className="block max-w-xs">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Posts per page</span>
              <select defaultValue="10" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="6">6 posts</option>
                <option value="10">10 posts</option>
                <option value="12">12 posts</option>
              </select>
            </label>
            <Toggle
              checked={commentsEnabled}
              onChange={setCommentsEnabled}
              title="Allow comments"
              description="Let readers leave comments on published posts."
            />
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-lg bg-violet-100 p-2.5 text-violet-600"><Bell className="h-5 w-5" /></div>
            <div>
              <h2 className="font-semibold text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm text-gray-500">Choose when to receive admin updates.</p>
            </div>
          </div>
          <Toggle
            checked={emailNotifications}
            onChange={setEmailNotifications}
            title="Email notifications"
            description="Receive an email when a new comment is submitted."
            icon={<MessageSquare className="h-4 w-4 text-gray-400" />}
          />
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button type="submit" size="lg" className="w-full sm:w-auto">Save Changes</Button>
          {saved && <p className="text-sm font-medium text-green-600">Settings saved successfully.</p>}
        </div>
      </form>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  description,
  icon,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-lg border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-gray-300"}`}
      >
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
