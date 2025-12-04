import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return (node && !node.properties?.inline && match) ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {section}
          </ReactMarkdown>
        </article>
      ))}
    </div>
  );
};

export default MarkdownViewer;