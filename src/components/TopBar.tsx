import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

type FileEntry = {
  name: string;
  path: string;
};

type TopBarProps = {
  files: FileEntry[];
  selected: FileEntry | null;
  onSelect: (file: FileEntry) => void;
  theme: string;
  toggleTheme: () => void;
  flashcardMode: boolean;
  setFlashcardMode: (mode: boolean) => void;
};

const SunIcon = () => <>☀️</>;
const MoonIcon = () => <>🌙</>;
const CardIcon = () => <>🗂️</>;
const DocIcon = () => <>📄</>;

const TopBar: React.FC<TopBarProps> = ({ files, selected, onSelect, theme, toggleTheme, flashcardMode, setFlashcardMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="top-bar-container">
      <header className="top-bar">
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open navigation menu" aria-expanded={isMenuOpen}>
          <span>☰</span>
        </button>
        <nav aria-label="Cheat sheet navigation" className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
        {files.map(file => (
          <button
            key={file.name}
            onClick={() => {
              onSelect(file);
              setIsMenuOpen(false); // Close menu on selection
            }}
            className={selected?.name === file.name ? 'selected' : ''}
            role="button"
            aria-pressed={selected?.name === file.name}
          >
            {file.name.replace(/-/g, ' ')}
          </button>
        ))}
        </nav>
        {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}

        <div className="controls">
          <ToggleSwitch
            id="flashcard-toggle"
            checked={flashcardMode}
            onChange={() => setFlashcardMode(!flashcardMode)}
            iconOn={<CardIcon />}
            iconOff={<DocIcon />}
            label="Toggle Flashcard Mode"
          />
          <ToggleSwitch
            id="theme-toggle"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            iconOn={<MoonIcon />}
            iconOff={<SunIcon />}
            label="Toggle Dark/Light Theme"
          />
        </div>
      </header>
    </div>
  );
};

export default TopBar;