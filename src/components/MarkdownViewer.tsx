import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

type FileEntry = {
  name: string;
  path: string;
};

type Props = {
  file: FileEntry;
};

const MarkdownViewer: React.FC<Props> = ({ file }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(file.path)
      .then(res => res.text())
      .then(setContent)
      .catch(console.error);
  }, [file]);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: marked(content) }}
      style={{ padding: '1rem' }}
    />
  );
};

export default MarkdownViewer;
