import Image from "next/image";

import { PREVIOUS_CLASSES } from "../_constants";
import { getYouTubeId, getYouTubeThumbnailUrl } from "../_lib/youtube";

const PreviousClassesCard = () => (
  <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
    <h2 className="font-serif text-lg font-bold text-primary">Previous Classes</h2>

    <ul className="mt-3 flex flex-col gap-4">
      {PREVIOUS_CLASSES.map((item, index) => {
        const videoId = getYouTubeId(item.videoUrl);

        return (
          <li key={`${item.title}-${index}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
              {videoId && (
                <Image
                  src={getYouTubeThumbnailUrl(videoId)}
                  alt={item.title}
                  fill
                  sizes="260px"
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>
            <p className="mt-2 text-[15px] font-semibold text-primary">{item.title}</p>
            <p className="text-[12px] text-muted-foreground">{item.meta}</p>
          </li>
        );
      })}
    </ul>
  </section>
);

export default PreviousClassesCard;
