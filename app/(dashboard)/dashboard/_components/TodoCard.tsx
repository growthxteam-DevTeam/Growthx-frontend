import { Coffee } from "lucide-react";

const TodoCard = () => (
  <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
    <h2 className="font-serif text-base font-bold text-primary">To-Do</h2>

    <div className="mt-3 flex flex-col items-center gap-4 rounded-md border border-border px-4 py-6 text-center">
      <p className="text-xs font-bold text-primary">
        You deserve a break!
        <br />
        There&apos;s nothing to do at this moment
      </p>
      {/* TODO: swap for the empty-state illustration once the asset is available. */}
      <Coffee className="size-14 text-primary" strokeWidth={1} />
      <p className="text-[10px] text-muted-foreground">You will see your tasks here</p>
    </div>
  </section>
);

export default TodoCard;
