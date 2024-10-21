"use client"

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function NoteInput() {
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    // Here you would typically save the note to your database
    console.log('Saving note:', note);
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