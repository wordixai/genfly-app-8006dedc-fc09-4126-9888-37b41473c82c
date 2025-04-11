import React from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Note } from "@/types/note";
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{note.title}</h3>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(note)}
            className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(note.id)}
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.content}</p>
      <div className="text-xs text-gray-400">
        Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
      </div>
    </div>
  );
};

export default NoteCard;