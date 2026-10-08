const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = ["youtube.com", "m.youtube.com", "youtube-nocookie.com"];

// Accepts watch, youtu.be, embed, shorts and live links. Anything else (including
// non-YouTube hosts) returns null so an arbitrary URL can never end up in an iframe.
export const getYouTubeId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    let id: string | null = null;
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (YOUTUBE_HOSTS.includes(host)) {
      id =
        parsed.pathname === "/watch"
          ? parsed.searchParams.get("v")
          : (parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ?? null);
    }

    return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
};

export const getYouTubeEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0`;

export const getYouTubeThumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
