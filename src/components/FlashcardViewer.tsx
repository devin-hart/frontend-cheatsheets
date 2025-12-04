import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
type FileEntry = {
  name: string;
  path: string;
};

type Props = {
  file: FileEntry;
};

const FlashcardViewer: React.FC<Props> = ({ file }) => {
  const [slides, setSlides] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(file.path)
      .then(res => res.text())
      .then(raw => {
        const parts = raw.split('---').map(part => part.trim());
        setSlides(parts);
        setIndex(0);
      });
  }, [file]);

  const next = () => setIndex(i => Math.min(i + 1, slides.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <div style={{ padding: '1rem' }} className='flashcard-body'>
      <div style={{ marginBottom: '2rem' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !node.properties.inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {slides[index]}
        </ReactMarkdown>
      </div>

      <div style={{
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  background: '#1a1a1a',
  padding: '0.75rem 1rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  borderTop: '1px solid #333',
  zIndex: 10,
}}>
        <button onClick={prev} disabled={index === 0}>
          Previous
        </button>
        <button onClick={next} disabled={index === slides.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardViewer;
