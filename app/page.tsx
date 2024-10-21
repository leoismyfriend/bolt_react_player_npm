'use client';

import { VideoPlayer } from '@/components/video-player';
import { NoteInput } from '@/components/note-input';
import { NoteList } from '@/components/note-list';
import { useState } from 'react';

type Notestamp = {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
};

export default function Home() {
  const [notes, setNotes] = useState<Notestamp[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube NoteStamp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <VideoPlayer />
          <NoteInput setNotes={setNotes} />
        </div>
        <NoteList notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}