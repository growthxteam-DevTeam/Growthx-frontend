import { ArchiveRestore, ListTodo } from "lucide-react";

const TODO_ITEMS = [
  { id: 1, title: "Turn in Quiz 2", points: 20, due: "Sep 30 at 11:59 WAT" },
  { id: 2, title: "Turn in peer review assignment", points: 20, due: "Sep 30 at 11:59 WAT" },
  { id: 3, title: "Peer review for week 1", points: 20, due: "Sep 30 at 11:59 WAT" },
  { id: 4, title: "Peer review for week 1", points: 20, due: "Sep 30 at 11:59 WAT" },
];

const TodoCard = () => (
  <section className="rounded-lg border border-border bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-foreground">To-Do</h2>

    <div className="mt-4 flex flex-col gap-3">
      {TODO_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-lg border border-border px-4 py-3"
        >
          {/* Checklist icon */}
          <ListTodo className="size-8 shrink-0 text-primary" strokeWidth={1.5} />

          {/* Text */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-primary leading-snug">{item.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.points} points &bull; {item.due}
            </p>
          </div>

          {/* Submit icon */}
          <ArchiveRestore className="size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
        </div>
      ))}
    </div>
  </section>
);

export default TodoCard;
