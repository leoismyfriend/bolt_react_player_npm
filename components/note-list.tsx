"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, ThumbsUp } from 'lucide-react';

type Notestamp = {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
};

export function NoteList() {
  const [notes, setNotes] = useState<Notestamp[]>([
    { id: 1, content: "This is an example note", timestamp: "0:30", likes: 0 },
  ]);

  const handleLike = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, likes: note.likes + 1 } : note
    ));
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      {notes.map((note) => (
        <Card key={note.id} className="mb-4">
          <CardHeader>
            <CardTitle>Note at {note.timestamp}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{note.content}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <Button variant="outline" size="sm" className="mr-2">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(note.id)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleLike(note.id)}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                {note.likes}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}