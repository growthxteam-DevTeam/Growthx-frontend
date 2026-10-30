import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import AssignmentCards from "./_components/AssignmentCards";
import ClassHeader from "./_components/ClassHeader";
import DiscussionForum from "./_components/DiscussionForum";
import ModulesCard from "./_components/ModulesCard";
import PreviousClassesCard from "./_components/PreviousClassesCard";
import VideoPlayer from "./_components/VideoPlayer";
import { CURRENT_CLASS } from "./_constants";

const ClassPage = () => {
  const t = useTranslations("Dashboard.class");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <ClassHeader />

      {/* Desktop: video + modules share a row (modules match the video's height and scroll inside it), the
        class title sits under the video, then the discussion and assignments beside Previous Classes,
        so that card starts level with the Discussion Forum header. */}
      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="grid gap-6 lg:col-span-2 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <VideoPlayer />
          </div>

          <div className="flex flex-col gap-1 lg:col-start-1 lg:row-start-2">
            <h2 className="font-serif text-xl font-bold text-primary">{t("title")}</h2>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <User className="size-3.5" />
              <span>
                {t("practitioner", { presenter: CURRENT_CLASS.presenter, minutes: CURRENT_CLASS.durationMinutes })}
              </span>
            </div>
          </div>

          <div className="relative lg:col-start-2 lg:row-start-1">
            <ModulesCard />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-start-1 lg:row-start-2">
          <DiscussionForum />
          <AssignmentCards />
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <PreviousClassesCard />
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
