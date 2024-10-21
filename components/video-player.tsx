'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Use dynamic import for ReactPlayer with ssr set to false
const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export function VideoPlayer() {
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const { toast } = useToast();
  const playerRef = useRef(null);

  const handleLoadVideo = () => {
    if (!url) {
      toast({
        title: 'Error',
        description: 'Please enter a valid YouTube URL',
        variant: 'destructive',
      });
      return;
    }
    setPlaying(true);
  };

  const handleError = () => {
    toast({
      title: 'Error',
      description:
        'Failed to load the video. Please check the URL and try again.',
      variant: 'destructive',
    });
    setPlaying(false);
    setReady(false);
  };

  const handleReady = () => {
    setReady(true);
    if (playing && playerRef.current) {
      playerRef.current.getInternalPlayer().playVideo();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleLoadVideo}>Load Video</Button>
      </div>
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {url ? (
          <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            playing={playing && ready}
            controls={true}
            onError={handleError}
            onReady={handleReady}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-500">
            Enter a YouTube URL and click "Load Video"
          </p>
        )}
      </div>
    </div>
  );
}
