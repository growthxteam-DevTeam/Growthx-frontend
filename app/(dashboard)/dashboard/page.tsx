import ActionCard from "./_components/ActionCard";
import AnnouncementsCard from "./_components/AnnouncementsCard";
import CredibilityBadgeCard from "./_components/CredibilityBadgeCard";
import DashboardHeader from "./_components/DashboardHeader";
import ProgramBanner from "./_components/ProgramBanner";
import ScheduleCard from "./_components/ScheduleCard";
import TodoCard from "./_components/TodoCard";
import { ACTION_CARDS } from "./_constants";

const DashboardPage = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-6">
    <DashboardHeader />

    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="flex flex-col gap-6">
        <ProgramBanner />
        <div className="grid gap-6 sm:grid-cols-2">
          {ACTION_CARDS.map((card) => (
            <ActionCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ScheduleCard />
        <AnnouncementsCard />
        <TodoCard />
      </div>
    </div>

    <CredibilityBadgeCard />
  </div>
);

export default DashboardPage;
