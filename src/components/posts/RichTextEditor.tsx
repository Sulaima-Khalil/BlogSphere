"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const toolbarButtons = [
  { icon: Heading2, label: "Heading" },
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: List, label: "Bullet List" },
  { icon: ListOrdered, label: "Numbered List" },
  { icon: LinkIcon, label: "Link" },
  { icon: ImageIcon, label: "Image" },
];

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start writing your post...",
}: RichTextEditorProps) {
  const [content, setContent] = useState(value);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
        {toolbarButtons.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "min-h-[400px] w-full resize-none border-0 px-4 py-4 text-sm focus:outline-none focus:ring-0"
        )}
      />
    </div>
  );
}
