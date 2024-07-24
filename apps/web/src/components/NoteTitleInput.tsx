"use client";

import { useRef, useEffect } from "react";

interface NoteTitleInputProps {
  title: string;
  onChange: (title: string) => void;
}

export default function NoteTitleInput({
  title,
  onChange,
}: NoteTitleInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaWidth();
  }, [title]);

  const adjustTextareaWidth = () => {
    if (inputRef.current) {
      // Reset the width to allow shrinking
      inputRef.current.style.width = "auto";
      // Set a small width to force content overflow
      inputRef.current.style.width = "0px";
      // Set the width to the scroll width
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4 relative inline-block max-w-full">
      <textarea
        ref={inputRef}
        value={title}
        onChange={handleChange}
        className="text-2xl font-bold bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 text-gray-800 dark:text-gray-200 resize-none overflow-hidden"
        placeholder="Enter note title..."
        rows={1}
        style={{ minWidth: "200px", maxWidth: "100%" }}
      />
    </div>
  );
}
