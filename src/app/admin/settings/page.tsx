"use client";

import { useState } from "react";
import { Settings, Bell, MessageSquareDashed, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminSettingsPage() {
  const { siteSettings, updateSiteSettings } = useAuth();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full max-w-none">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage site publishing preferences, notifications, and reader permissions.</p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800 border border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <span>Settings saved successfully! Changes are live across the site.</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Publishing Preferences Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Publishing Preferences</h2>
              <p className="text-sm text-gray-500">Control how content and reader interaction work.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Posts and comments per page</label>
            <select
              value={siteSettings.postsPerPage}
              onChange={(e) => updateSiteSettings({ postsPerPage: Number(e.target.value) })}
              className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={5}>5 posts</option>
              <option value={10}>10 posts</option>
              <option value={15}>15 posts</option>
              <option value={20}>20 posts</option>
            </select>
          </div>

          {/* Allow comments Toggle Box */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
            <div>
              <h3 className="font-medium text-gray-900">Allow comments</h3>
              <p className="text-sm text-gray-500">Let readers leave comments on published posts.</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={siteSettings.allowComments}
              onClick={() => updateSiteSettings({ allowComments: !siteSettings.allowComments })}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                siteSettings.allowComments ? "bg-[#006644]" : "bg-gray-300"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  siteSettings.allowComments ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500">Choose when to receive admin updates.</p>
            </div>
          </div>

          {/* Email notifications Toggle Box */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <MessageSquareDashed className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Email notifications</h3>
                <p className="text-sm text-gray-500">Receive an email when a new comment is submitted.</p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={siteSettings.emailNotifications}
              onClick={() => updateSiteSettings({ emailNotifications: !siteSettings.emailNotifications })}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                siteSettings.emailNotifications ? "bg-[#006644]" : "bg-gray-300"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  siteSettings.emailNotifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div>
          <button
            type="submit"
            className="rounded-lg bg-[#006644] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#004d33] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
