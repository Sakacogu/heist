"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

type VideoMeta = { id: string; title: string; thumb: string };

const VIDEOS: VideoMeta[] = [
  {
    id: "XxUvLBE6wow",
    title: "Plejd Dimmer demo – living-room scene",
    thumb: "https://img.youtube.com/vi/XxUvLBE6wow/hqdefault.jpg",
  },
  {
    id: "3gUm0pcvefI",
    title: "Shelly power metering – live savings",
    thumb: "https://img.youtube.com/vi/3gUm0pcvefI/hqdefault.jpg",
  },
  {
    id: "TBMQkY1M_ng",
    title: "UniFi Protect AI cameras overview",
    thumb: "https://img.youtube.com/vi/TBMQkY1M_ng/hqdefault.jpg",
  },
  {
    id: "WqjOW3mY4PA",
    title: "Home Assistant quick tour",
    thumb: "https://img.youtube.com/vi/WqjOW3mY4PA/hqdefault.jpg",
  },
];

export default function VideoList() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [modal, setModal] = useState<{ id: string; t: number } | null>(null);

  // Keeping a handle to each embedded player so we can query its time.
  const players = useRef<Record<string, YouTubePlayer>>({});

  // Pause inline video when we pop it out to the modal
  useEffect(() => {
    if (modal) {
      players.current[modal.id]?.pauseVideo();
    }
  }, [modal]);

  const inlinePlayerOpts = {
    width: "100%",
    height: "100%",
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
  };

  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col gap-4 p-4 md:p-8">
        {VIDEOS.map((video) => {
          const isCurrentlyPlaying = playingId === video.id;

          return (
            <div
              key={video.id}
              className="relative aspect-video w-full overflow-hidden rounded-xl shadow"
            >
              {isCurrentlyPlaying ? (
                <>
                  <YouTube
                    className="w-full h-full rounded-xl"
                    videoId={video.id}
                    opts={inlinePlayerOpts}
                    onReady={(e) => (players.current[video.id] = e.target)}
                  />

                  <button
                    className="absolute top-2 right-10 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
                    onClick={() =>
                      setModal({
                        id: video.id,
                        t: Math.floor(
                          players.current[video.id]?.getCurrentTime() ?? 0,
                        ),
                      })
                    }
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
                <button
                  onClick={() => setPlayingId(video.id)}
                  className="group absolute inset-0"
                >
                  <Image
                    src={video.thumb}
                    alt={video.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <svg
                      width="68"
                      height="48"
                      viewBox="0 0 68 48"
                      className="fill-white"
                    >
                      <path d="M66.52 7.87A8.27 8.27 0 0 0 60.6 2...Z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </section>

      {/* modal player */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <YouTube
              videoId={modal.id}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
                  start: modal.t,
                },
              }}
              className="w-full h-full rounded-lg"
            />
            <button
              className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full w-10 h-10 shadow"
              onClick={() => setModal(null)}
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
