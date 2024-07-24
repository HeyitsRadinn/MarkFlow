import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { marked } from 'marked';

const MarkdownEditor: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState('# Hello, MarkFlow!');

  const handleChange = React.useCallback((value: string) => {
    setMarkdownContent(value);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4">
        <CodeMirror
          value={markdownContent}
          height="100%"
          extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
          onChange={handleChange}
        />
      </div>
      <div className="w-1/2 p-4 overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
      </div>
    </div>
  );
};

export default MarkdownEditor;