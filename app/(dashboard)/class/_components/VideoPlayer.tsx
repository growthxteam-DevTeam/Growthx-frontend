"use client";

import { useEffect, useRef, useState } from "react";

import { Check, SquarePlay } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { CLASS_INTRO_PROGRAM, CURRENT_CLASS } from "../_constants";
import { getYouTubeId } from "../_lib/youtube";
import { loadYouTubeApi, type YouTubePlayer } from "../_lib/youtubePlayer";
import { QUIZ_PAGE_PATH } from "../quiz/_constants";

// Faint constellation of connected nodes behind the "Join Class" prompt.
const NetworkBackground = () => (
  <svg
    className="pointer-events-none absolute inset-0 size-full opacity-50"
    viewBox="0 0 400 225"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
  >
    <g stroke="rgba(125,211,252,0.35)" strokeWidth="0.6">
      <line x1="40" y1="30" x2="110" y2="55" />
      <line x1="110" y1="55" x2="70" y2="110" />
      <line x1="70" y1="110" x2="140" y2="140" />
      <line x1="140" y1="140" x2="60" y2="170" />
      <line x1="200" y1="40" x2="110" y2="55" />
      <line x1="200" y1="40" x2="260" y2="90" />
      <line x1="260" y1="90" x2="320" y2="50" />
      <line x1="320" y1="50" x2="380" y2="70" />
      <line x1="260" y1="90" x2="230" y2="150" />
      <line x1="230" y1="150" x2="300" y2="180" />
      <line x1="300" y1="180" x2="180" y2="190" />
      <line x1="180" y1="190" x2="60" y2="170" />
      <line x1="20" y1="120" x2="70" y2="110" />
      <line x1="140" y1="140" x2="230" y2="150" />
    </g>
    <g fill="rgba(165,243,252,0.7)">
      {[
        [40, 30],
        [110, 55],
        [70, 110],
        [140, 140],
        [200, 40],
        [260, 90],
        [320, 50],
        [380, 70],
        [230, 150],
        [300, 180],
        [180, 190],
        [60, 170],
        [20, 120],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" />
      ))}
    </g>
  </svg>
);

const VideoPlayer = () => {
  const t = useTranslations("Dashboard.class.video");
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
          <p className="flex size-full items-center justify-center text-base text-white">{t("unavailable")}</p>
        ) : hasJoined ? (
          <div ref={containerRef} className="size-full [&>iframe]:size-full" />
        ) : (
          <div className="relative flex size-full flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_20%_30%,rgba(45,212,191,0.14),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.14),transparent_45%)] px-6 text-center text-white">
            <NetworkBackground />
            <p className="relative text-sm text-white/80">{CLASS_INTRO_PROGRAM}</p>
            <p className="relative max-w-md text-xl font-semibold">{t("intro")}</p>
            <Button
              type="button"
              onClick={() => setHasJoined(true)}
              className="relative h-11 cursor-pointer gap-2 px-5 text-lg font-medium"
            >
              {t("join")}
              <SquarePlay className="size-5" />
            </Button>
          </div>
        )}

        {isEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 px-6 text-center text-white">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-700">
              <Check className="size-5" strokeWidth={3} />
            </span>
            <p className="text-xl font-semibold">{t("completeTitle")}</p>
            <p className="text-sm text-white/80">{t("completeMessage")}</p>
            <Button type="button" onClick={takeQuiz} className="mt-1 h-11 w-44 cursor-pointer text-base font-medium">
              {t("takeQuiz")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={replay}
              className="h-11 w-44 cursor-pointer gap-2 border-white/60 bg-transparent text-base font-medium text-white hover:bg-white/10 hover:text-white"
            >
              <SquarePlay className="size-4" />
              {t("replay")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPlayer;
