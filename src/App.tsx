import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import MarkdownViewer from './components/MarkdownViewer'; // Make sure this path is correct
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
  const [theme, setTheme] = useState('dark');

useEffect(() => {
  // Use Vite's import.meta.glob to get all .md files in the /public/md directory
  const mdFiles = import.meta.glob('/public/md/*.md', { query: '?raw', import: 'default' });

  // The keys of mdFiles are the paths, e.g., "/public/md/javascript.md"
  const entries: FileEntry[] = Object.keys(mdFiles).map(path => {
    const fileName = path.split('/').pop()!; // e.g., "javascript.md"
    return {
      name: fileName.replace('.md', ''),
      path: `/md/${fileName}`
    };
  });

  setFiles(entries);
  setSelectedFile(entries[0]); // 👈 Default to first file (javascript.md)
}, []);

useEffect(() => {
  document.body.className = theme;
}, [theme]);

const toggleTheme = () => {
  setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
};

  return (
    <div>
      <TopBar
        files={files}
        onSelect={setSelectedFile}
        selected={selectedFile}
        theme={theme}
        toggleTheme={toggleTheme}
        flashcardMode={flashcardMode}
        setFlashcardMode={setFlashcardMode}
      />

      {selectedFile && (
        <section className='content'>
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
