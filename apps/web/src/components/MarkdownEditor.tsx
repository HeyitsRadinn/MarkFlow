"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="100%"
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
      ]}
      onChange={(val) => onChange(val)}
      theme="dark"
      className="h-full"
    />
  );
};

export default MarkdownEditor;
