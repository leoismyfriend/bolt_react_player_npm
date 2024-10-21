import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Note {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
}

export function NoteInput({ setNotes }: { setNotes: React.Dispatch<React.SetStateAction<Note[]>> }) {
  const [note, setNote] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = () => {
    const newNote: Note = {
      id: Date.now(),
      content: note,
      timestamp: new Date().toLocaleTimeString(),
      likes: 0
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
    setNote('');
  };

  return (
    <div className="mb-6">
      <Textarea
        placeholder="Type your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mb-2"
      />
      <Button onClick={handleSubmit}>Save Note</Button>
    </div>
  );
}