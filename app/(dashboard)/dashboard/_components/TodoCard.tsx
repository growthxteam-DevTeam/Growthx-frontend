import { Coffee } from "lucide-react";

const TodoCard = () => (
  <section className="rounded-lg border border-border bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-foreground">To-Do</h2>

    <div className="mt-4 flex flex-col items-center gap-4 rounded-md border border-border px-4 py-6 text-center">
      <p className="text-sm font-bold text-foreground">
        You deserve a break!
        <br />
        There&apos;s nothing to do at this moment
      </p>
      {/* TODO: swap for the empty-state illustration once the asset is available. */}
      <Coffee className="size-16 text-primary" strokeWidth={1} />
      <p className="text-xs text-foreground">You will see your tasks here</p>
    </div>
  </section>
);

export default TodoCard;
