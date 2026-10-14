"use client";

import { useEffect, useRef, useState } from "react";

import { Check, SquarePlay } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { CLASS_COMPLETE, CLASS_INTRO, CURRENT_CLASS } from "../_constants";
import { getYouTubeId } from "../_lib/youtube";
import { loadYouTubeApi, type YouTubePlayer } from "../_lib/youtubePlayer";
import { QUIZ_PAGE_PATH } from "../quiz/_constants";

const VideoPlayer = () => {
  const router = useRouter();
  const [hasJoined, setHasJoined] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const videoId = getYouTubeId(CURRENT_CLASS.videoUrl);

  // Fetch the player script early so playback starts right after "Join Class".
  useEffect(() => {
    if (videoId) loadYouTubeApi().catch(() => undefined);
  }, [videoId]);

  useEffect(() => {
    if (!hasJoined || !videoId) return;

    let cancelled = false;
    const container = containerRef.current;
    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !container) return;

        // The API swaps this node for an iframe, so React must not own it.
        const mount = document.createElement("div");
        container.appendChild(mount);
        playerRef.current = new YT.Player(mount, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: { autoplay: 1, rel: 0 },
          events: {
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.ENDED) setIsEnded(true);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      container?.replaceChildren();
    };
  }, [hasJoined, videoId]);

  const replay = () => {
    setIsEnded(false);
    playerRef.current?.seekTo(0, true);
    playerRef.current?.playVideo();
  };

  const takeQuiz = () => router.push(QUIZ_PAGE_PATH);

  return (
    <section>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        {!videoId || loadFailed ? (
          <p className="flex size-full items-center justify-center text-sm text-white">
            This class video is unavailable right now.
          </p>
        ) : hasJoined ? (
          <div ref={containerRef} className="size-full [&>iframe]:size-full" />
        ) : (
          // TODO: swap the gradients for the network-nodes artwork once the asset is available.
          <div className="flex size-full flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_20%_30%,rgba(45,212,191,0.14),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.14),transparent_45%)] px-6 text-center text-white">
            <p className="text-xs text-white/80">{CLASS_INTRO.program}</p>
            <p className="max-w-md text-lg font-semibold">{CLASS_INTRO.message}</p>
            <Button
              type="button"
              onClick={() => setHasJoined(true)}
              className="h-11 cursor-pointer gap-2 px-5 text-base font-medium"
            >
              {CLASS_INTRO.buttonLabel}
              <SquarePlay className="size-5" />
            </Button>
          </div>
        )}

        {isEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 px-6 text-center text-white">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-700">
              <Check className="size-5" strokeWidth={3} />
            </span>
            <p className="text-lg font-semibold">{CLASS_COMPLETE.title}</p>
            <p className="text-xs text-white/80">{CLASS_COMPLETE.message}</p>
            <Button type="button" onClick={takeQuiz} className="mt-1 h-11 w-44 cursor-pointer text-sm font-medium">
              {CLASS_COMPLETE.quizLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={replay}
              className="h-11 w-44 cursor-pointer gap-2 border-white/60 bg-transparent text-sm font-medium text-white hover:bg-white/10 hover:text-white"
            >
              <SquarePlay className="size-4" />
              {CLASS_COMPLETE.replayLabel}
            </Button>
          </div>
        )}
      </div>

      <h2 className="mt-3 font-serif text-sm font-bold text-primary">{CURRENT_CLASS.title}</h2>
    </section>
  );
};

export default VideoPlayer;
