'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import YouTube, { YouTubePlayer } from 'react-youtube';

type Video = { id: string; title: string; thumb: string };

const VIDEOS: Video[] = [
  {
    id: 'XxUvLBE6wow',
    title: 'Plejd Dimmer demo – living-room scene',
    thumb: 'https://img.youtube.com/vi/XxUvLBE6wow/hqdefault.jpg',
  },
  {
    id: '3gUm0pcvefI',
    title: 'Shelly power metering – live savings',
    thumb: 'https://img.youtube.com/vi/3gUm0pcvefI/hqdefault.jpg',
  },
  {
    id: 'TBMQkY1M_ng',
    title: 'UniFi Protect AI cameras overview',
    thumb: 'https://img.youtube.com/vi/TBMQkY1M_ng/hqdefault.jpg',
  },
  {
    id: 'WqjOW3mY4PA',
    title: 'Home Assistant quick tour',
    thumb: 'https://img.youtube.com/vi/WqjOW3mY4PA/hqdefault.jpg',
  },
];

export default function VideoList() {
  const [playingId, setPlayingId]   = useState<string | null>(null);
  const [expanded, setExpanded]     = useState<{ id: string; t: number } | null>(null);
  const players = useRef<Record<string, YouTubePlayer>>({});

  useEffect(() => {
    if (expanded) {
      const p = players.current[expanded.id];
      p?.pauseVideo();
    }
  }, [expanded]);

  const inlineOpts = {
    width: '100%',
    height: '100%',
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
  };

  return (
    <>
      <section className="flex flex-col gap-6">
        {VIDEOS.map((v) => {
          const isPlaying  = playingId === v.id;

          return (
            <div
              key={v.id}
              className="relative w-full aspect-video overflow-hidden rounded-xl shadow"
            >
              {isPlaying ? (
                <>
                  <YouTube
                    videoId={v.id}
                    opts={inlineOpts}
                    onReady={(e) => (players.current[v.id] = e.target)}
                    className="w-full h-full rounded-xl"
                  />

                  <button
                    onClick={() => {
                      const t = Math.floor(players.current[v.id]?.getCurrentTime() ?? 0);
                      setExpanded({ id: v.id, t });
                    }}
                    className="absolute top-2 right-10 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
                    aria-label="Expand video"
                  >
                    ⤢
                  </button>

                  <button
                    onClick={() => setPlayingId(null)}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label="Close video"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <button onClick={() => setPlayingId(v.id)} className="group absolute inset-0">
                  <Image
                    src={v.thumb}
                    alt={v.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <svg width="68" height="48" viewBox="0 0 68 48" className="fill-white">
                      <path d="M66.52 7.87A8.27 8.27 0 0 0 60.6 2...Z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </section>

      {expanded && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setExpanded(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <YouTube
              videoId={expanded.id}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
                  start: expanded.t,
                },
              }}
              className="w-full h-full rounded-lg"
            />
            <button
              onClick={() => setExpanded(null)}
              className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full w-10 h-10 shadow"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
