import { useState } from 'react';
import { Note } from '@/components/note-input'; // Adjust the path correctly based on your project structure
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'; // Adjust these imports as needed to fit your project

interface Note {
  id: number;
  content: string;
  likes: number;
  timestamp: string; // Assuming timestamp is a string; adjust if it's a different type
}

interface NoteListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function NoteList({ notes, setNotes }: NoteListProps) {
  const [editableNote, setEditableNote] = useState<Note | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const handleLike = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, likes: note.likes + 1 } : note,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (note: Note) => {
    setEditableNote(note);
    setEditContent(note.content);
  };

  const handleSaveEdit = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: editContent } : note,
      ),
    );
    setEditableNote(null); // Clear the editable note
    setEditContent('');     // Clear the edit input
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
            {editableNote?.id === note.id ? (
              <div>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <Button onClick={() => handleSaveEdit(note.id)}>Save</Button>
                <Button onClick={() => setEditableNote(null)}>Cancel</Button>
              </div>
            ) : (
              <div>
                <p>{note.content}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(note)}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(note.id)}
                  >
                    {note.likes}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}