import ForumFeed from "./_components/ForumFeed";
import ForumHeader from "./_components/ForumHeader";
import ForumTopicCard from "./_components/ForumTopicCard";

const DiscussionPage = () => (
  <div className="mx-auto flex max-w-5xl flex-col gap-8">
    <ForumHeader />
    <ForumTopicCard />
    <ForumFeed />
  </div>
);

export default DiscussionPage;
