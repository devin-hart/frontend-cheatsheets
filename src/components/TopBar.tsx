import React from "react";

type FileEntry = {
  name: string;
  path: string;
};

type Props = {
  files: FileEntry[];
  onSelect: (file: FileEntry) => void;
  selected: FileEntry | null;
};

const toTitleCase = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const TopBar: React.FC<Props> = ({ files, onSelect, selected }) => {
  return (
    <div
    className="top-bar"
    style={{
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap', // prevents overflow without height stretching
    }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          background: "#1a1a1a",
          borderBottom: "1px solid #333",
        }}
      >
        {files.map((file) => (
          <button
            key={file.name}
            onClick={() => onSelect(file)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border:
                selected?.name === file.name
                  ? "2px solid white"
                  : "1px solid gray",
              background: selected?.name === file.name ? "#111" : "#222",
              color: selected?.name === file.name ? "white" : "#ccc",
              fontWeight: selected?.name === file.name ? "bold" : "normal",
            }}
          >
            {toTitleCase(file.name)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
