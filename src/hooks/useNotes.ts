import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '@/types/note';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes, (key, value) => 
          key === 'createdAt' || key === 'updatedAt' ? new Date(value) : value
        );
      } catch (e) {
        console.error('Failed to parse notes from localStorage', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const now = new Date();
    setNotes([
      ...notes,
      {
        id: uuidv4(),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id 
          ? { 
              ...note, 
              title, 
              content, 
              updatedAt: new Date() 
            } 
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
}