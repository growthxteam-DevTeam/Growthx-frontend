import { useTranslations } from "next-intl";
import Image from "next/image";

import { PREVIOUS_CLASSES } from "../_constants";
import { getYouTubeId, getYouTubeThumbnailUrl } from "../_lib/youtube";

const PreviousClassesCard = () => {
  const t = useTranslations("Dashboard.class.previous");

  return (
    <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h2 className="font-serif text-lg font-bold text-primary">{t("title")}</h2>

      <ul className="mt-3 flex flex-col gap-4">
        {PREVIOUS_CLASSES.map((item) => {
          const videoId = getYouTubeId(item.videoUrl);
          const title = t("week", { week: item.week });

          return (
            <li key={item.week}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                {videoId && (
                  <Image
                    src={getYouTubeThumbnailUrl(videoId)}
                    alt={title}
                    fill
                    sizes="260px"
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
              <p className="mt-2 text-[15px] font-semibold text-primary">{title}</p>
              <p className="text-[12px] text-muted-foreground">
                {t("meta", { count: item.peersJoined, days: item.daysAgo })}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PreviousClassesCard;
