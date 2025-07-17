import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import MarkdownViewer from './components/MarkdownViewer';
import FlashcardViewer from './components/FlashcardViewer';
import "./App.css";

type FileEntry = {
  name: string;
  path: string;
};

const App: React.FC = () => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null);
  const [flashcardMode, setFlashcardMode] = useState(false);

useEffect(() => {
  const mdFilenames = [
    'javascript.md',
    'react-hooks.md',
    'react-components-lifecycle.md',
    'typescript.md'
  ];

  const entries: FileEntry[] = mdFilenames.map(name => ({
    name: name.replace('.md', ''),
    path: `/md/${name}`
  }));

  setFiles(entries);
  setSelectedFile(entries[0]); // 👈 Default to first file (javascript.md)
}, []);

  return (
    <div>
      <TopBar files={files} onSelect={setSelectedFile} selected={selectedFile} />

      {selectedFile && (
        <section className='content'>
          <button
            style={{ margin: '1rem' }}
            onClick={() => setFlashcardMode(prev => !prev)}
          >
            {flashcardMode ? 'Exit Flashcard Mode' : 'Enter Flashcard Mode'}
          </button>

          {flashcardMode ? (
            <FlashcardViewer file={selectedFile} />
          ) : (
            <MarkdownViewer file={selectedFile} />
          )}
        </section>
      )}
    </div>
  );
};

export default App;
