import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import NoteEditor from '@/components/NoteEditor';
import NoteList from '@/components/NoteList';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/note';

const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);

  const handleAddNew = () => {
    setCurrentNote(undefined);
    setIsEditing(true);
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleSave = (title: string, content: string) => {
    if (currentNote) {
      updateNote(currentNote.id, title, content);
    } else {
      addNote(title, content);
    }
    setIsEditing(false);
    setCurrentNote(undefined);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentNote(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notes</h1>
          {!isEditing && (
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          )}
        </div>

        {isEditing ? (
          <NoteEditor 
            note={currentNote} 
            onSave={handleSave} 
            onCancel={handleCancel} 
          />
        ) : (
          <NoteList 
            notes={notes} 
            onEdit={handleEdit} 
            onDelete={deleteNote} 
          />
        )}
      </div>
    </div>
  );
};

export default Notes;