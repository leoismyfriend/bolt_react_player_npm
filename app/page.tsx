'use client';

import { VideoPlayer } from '@/components/video-player';
import { NoteInput } from '@/components/note-input';
import { NoteList } from '@/components/note-list';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube NoteStamp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <VideoPlayer />
          <NoteInput />
        </div>
        <NoteList />
      </div>
    </div>
  );
}
