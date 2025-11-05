import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FileEntry = {
  name: string;
  path: string;
};

type MarkdownViewerProps = {
  file: FileEntry;
};

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ file }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(file.path)
      .then(response => response.text())
      .then(text => setMarkdown(text));
  }, [file]);

  // Split the markdown file into sections based on the '---' separator
  const sections = markdown.split('---').map(s => s.trim());

  return (
    <div className="markdown-grid">
      {sections.map((section, index) => (
        <article key={index} className="markdown-section">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{section}</ReactMarkdown>
        </article>
      ))}
    </div>
  );
};

export default MarkdownViewer;