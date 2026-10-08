import AssignmentCards from "./_components/AssignmentCards";
import ClassHeader from "./_components/ClassHeader";
import DiscussionForum from "./_components/DiscussionForum";
import ModulesCard from "./_components/ModulesCard";
import PreviousClassesCard from "./_components/PreviousClassesCard";
import VideoPlayer from "./_components/VideoPlayer";

const ClassPage = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-6">
    <ClassHeader />

    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="flex min-w-0 flex-col gap-6">
        <VideoPlayer />
        <DiscussionForum />
        <AssignmentCards />
      </div>

      <div className="flex flex-col gap-6">
        <ModulesCard />
        <PreviousClassesCard />
      </div>
    </div>
  </div>
);

export default ClassPage;
