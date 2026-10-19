import AlumniNetworkCard from "./_components/AlumniNetworkCard";
import BadgeProgressCard from "./_components/BadgeProgressCard";
import CommunityFeed from "./_components/CommunityFeed";
import CommunityHeader from "./_components/CommunityHeader";
import FoundersGalleryCard from "./_components/FoundersGalleryCard";
import TrendingCard from "./_components/TrendingCard";

const CommunityPage = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-6">
    <CommunityHeader />

    <div className="rounded-2xl bg-tint-soft p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <CommunityFeed />

        <div className="flex flex-col gap-5">
          <FoundersGalleryCard />
          <AlumniNetworkCard />
          <BadgeProgressCard />
          <TrendingCard />
        </div>
      </div>
    </div>
  </div>
);

export default CommunityPage;
