import { Megaphone } from "lucide-react";

import { ANNOUNCEMENT_MESSAGE } from "../_constants";

const AnnouncementsCard = () => (
  <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
    <h2 className="font-serif text-base font-bold text-primary">Announcements</h2>

    <div className="mt-3 flex flex-col items-center gap-2 rounded-md border border-border px-4 py-3 text-center">
      <Megaphone className="size-4 text-primary" />
      <p className="text-[10px] text-muted-foreground">{ANNOUNCEMENT_MESSAGE}</p>
    </div>
  </section>
);

export default AnnouncementsCard;
