"use client";

import React from "react";
import { marked } from "marked";

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  // Configure marked to treat newlines as line breaks
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const htmlContent = marked(content);

  return (
    <div
      className="prose dark:prose-invert max-w-none h-full overflow-auto whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownPreview;
