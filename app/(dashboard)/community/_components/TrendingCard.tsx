import { TRENDING_TOPICS } from "../_constants";

const TrendingCard = () => (
  <section className="rounded-xl border border-border bg-card p-5">
    <h2 className="text-base font-bold text-foreground">Trending</h2>

    <div className="mt-3 flex flex-wrap gap-2">
      {TRENDING_TOPICS.map((topic) => (
        <span key={topic} className="rounded-full bg-tint px-3 py-1.5 text-xs font-semibold text-primary">
          {topic}
        </span>
      ))}
    </div>
  </section>
);

export default TrendingCard;
