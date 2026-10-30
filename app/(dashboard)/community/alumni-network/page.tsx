import AlumniFeed from "./_components/AlumniFeed";
import AlumniHeader from "./_components/AlumniHeader";
import HowPointsWorkCard from "./_components/HowPointsWorkCard";
import PointsCard from "./_components/PointsCard";
import ReferralTrackerCard from "./_components/ReferralTrackerCard";
import TopContributorsCard from "./_components/TopContributorsCard";

const AlumniNetworkPage = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-6">
    <AlumniHeader />

    <div className="grid items-start gap-6 lg:grid-cols-[1fr_260px] lg:px-6">
      <AlumniFeed />

      <aside className="flex flex-col gap-4">
        <PointsCard />
        <ReferralTrackerCard />
        <TopContributorsCard />
        <HowPointsWorkCard />
      </aside>
    </div>
  </div>
);

export default AlumniNetworkPage;
