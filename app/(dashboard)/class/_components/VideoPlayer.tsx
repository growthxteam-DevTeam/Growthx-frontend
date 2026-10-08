import { CURRENT_CLASS } from "../_constants";
import { getYouTubeEmbedUrl, getYouTubeId } from "../_lib/youtube";

const VideoPlayer = () => {
  const videoId = getYouTubeId(CURRENT_CLASS.videoUrl);

  return (
    <section>
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
        {videoId ? (
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            title={CURRENT_CLASS.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="size-full border-0"
          />
        ) : (
          <p className="flex size-full items-center justify-center text-sm text-white">
            This class video is unavailable right now.
          </p>
        )}
      </div>

      <h2 className="mt-3 font-serif text-sm font-bold text-primary">{CURRENT_CLASS.title}</h2>
    </section>
  );
};

export default VideoPlayer;
