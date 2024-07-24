"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import NoteTitleInput from "@/components/NoteTitleInput";
import { v4 as uuidv4 } from "uuid";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const MarkdownEditor = dynamic(() => import("@/components/MarkdownEditor"), {
  ssr: false,
});
const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), {
  ssr: false,
});

interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [newNoteId, setNewNoteId] = useState<string | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    createNewNote();
  }, []);

  useEffect(() => {
    if (currentNote) {
      const updatedNotes = notes.filter((note) => note.id !== currentNote.id);
      if (currentNote.content.trim() !== "") {
        updatedNotes.push(currentNote);
      }
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      // Clear newNoteId after a short delay
      if (newNoteId === currentNote.id) {
        setTimeout(() => setNewNoteId(null), 300);
      }
    }
  }, [currentNote]);

  const createNewNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "",
      lastModified: Date.now(),
    };
    setCurrentNote(newNote);
    setNewNoteId(newNote.id);
  };

  const updateNoteContent = (content: string) => {
    if (currentNote) {
      setCurrentNote({
        ...currentNote,
        content,
        lastModified: Date.now(),
      });
    }
  };

  const updateNoteTitle = (title: string) => {
    if (currentNote) {
      setCurrentNote({
        ...currentNote,
        title,
        lastModified: Date.now(),
      });
    }
  };

  const selectNote = (noteId: string) => {
    const selectedNote = notes.find((note) => note.id === noteId);
    if (selectedNote) {
      setCurrentNote(selectedNote);
    }
  };

  const editNoteTitle = (noteId: string, newTitle: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, title: newTitle, lastModified: Date.now() }
          : note
      )
    );
    if (currentNote && currentNote.id === noteId) {
      setCurrentNote({
        ...currentNote,
        title: newTitle,
        lastModified: Date.now(),
      });
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (currentNote && currentNote.id === noteId) {
      setCurrentNote(null);
    }
    localStorage.setItem(
      "notes",
      JSON.stringify(notes.filter((note) => note.id !== noteId))
    );
  };

  return (
    <main className="flex min-h-screen bg-custom-bg dark:bg-custom-dark-bg transition-colors duration-200">
      <Sidebar
        notes={notes}
        onSelectNote={selectNote}
        onNewNote={createNewNote}
        onEditNoteTitle={editNoteTitle}
        onDeleteNote={deleteNote}
        newNoteId={newNoteId}
      />
      <div className="flex-grow flex flex-col p-6">
        <NoteTitleInput
          title={currentNote?.title || ""}
          onChange={updateNoteTitle}
        />
        <div className="flex flex-grow w-full max-w-[1500px] mx-auto space-x-6">
          <div className="w-1/2 bg-white dark:bg-custom-dark-panel rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Editor
            </h2>
            <div className="flex-grow">
              <MarkdownEditor
                value={currentNote?.content || ""}
                onChange={updateNoteContent}
              />
            </div>
          </div>
          <div className="w-1/2 bg-white dark:bg-custom-dark-panel rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Preview
            </h2>
            <div className="flex-grow overflow-auto">
              <MarkdownPreview content={currentNote?.content || ""} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
