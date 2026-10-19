import { Megaphone } from "lucide-react";

import { ANNOUNCEMENT_MESSAGE } from "../_constants";

const AnnouncementsCard = () => (
  <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
    <h2 className="text-lg font-bold text-foreground">Announcements</h2>

    <div className="mt-4 flex flex-col items-center gap-2 rounded-md border border-border px-4 py-4 text-center">
      <Megaphone className="size-5 text-primary" />
      <p className="text-sm text-foreground">{ANNOUNCEMENT_MESSAGE}</p>
    </div>
  </section>
);

export default AnnouncementsCard;
