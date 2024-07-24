"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Note {
  id: string;
  title: string;
  lastModified: number;
}

interface SidebarProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
  onNewNote: () => void;
  onEditNoteTitle: (noteId: string, newTitle: string) => void; // Make sure this is here
  onDeleteNote: (noteId: string) => void;
  newNoteId: string | null;
}

export default function Sidebar({
  notes,
  onSelectNote,
  onNewNote,
  onEditNoteTitle, // Make sure this is destructured
  onDeleteNote,
  newNoteId,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastAddedNoteId, setLastAddedNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    if (notes.length > 0) {
      const latestNote = notes[notes.length - 1];
      setLastAddedNoteId(latestNote.id);
      // Reset the lastAddedNoteId after the animation duration
      const timer = setTimeout(() => setLastAddedNoteId(null), 300);
      return () => clearTimeout(timer);
    }
  }, [notes]);

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.lastModified - a.lastModified);

  const handleEditClick = (noteId: string, currentTitle: string) => {
    setEditingNoteId(noteId);
    setEditedTitle(currentTitle);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleSubmit = (noteId: string) => {
    onEditNoteTitle(noteId, editedTitle);
    setEditingNoteId(null);
  };

  return (
    <div className="w-64 bg-[#e6e4dc] dark:bg-[#2a2a2a] h-screen flex flex-col rounded-tr-2xl shadow-md">
      <div className="p-4">
        <button
          className="w-full bg-[#d1cec7] dark:bg-[#3a3a3a] text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-[#c5c2bb] dark:hover:bg-[#444444] transition-colors mb-2"
          onClick={onNewNote}
        >
          New Note
        </button>
      </div>
      <div className="overflow-y-auto flex-grow ml-5">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Recent Notes
        </h3>
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-2 hover:bg-[#d1cec7] dark:hover:bg-[#3a3a3a] cursor-pointer rounded-md mb-1 text-gray-800 dark:text-gray-200 transition-all duration-300 ${
              note.id === newNoteId ? "animate-slide-in" : ""
            } group relative`}
            onClick={() => onSelectNote(note.id)}
          >
            {editingNoteId === note.id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                onBlur={() => handleTitleSubmit(note.id)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleTitleSubmit(note.id)
                }
                className="w-full bg-transparent outline-none"
                autoFocus
              />
            ) : (
              <>
                {note.title}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden group-hover:flex space-x-2">
                  <FaEdit
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(note.id, note.title);
                    }}
                  />
                  <FaTrash
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
