import { User } from "lucide-react";

import { FOUNDERS_GALLERY } from "../_constants";

// TODO: no member photos yet — stand in with avatar icons until the artwork/API exists.
const FoundersGalleryCard = () => (
  <section className="rounded-xl border border-border bg-card p-5">
    <h2 className="text-center text-base font-bold text-foreground">{FOUNDERS_GALLERY.title}</h2>

    <div className="mt-4 grid grid-cols-4 gap-2.5">
      {Array.from({ length: FOUNDERS_GALLERY.memberCount }).map((_, index) => (
        <span
          key={index}
          className="flex aspect-square items-center justify-center rounded-full bg-tint-strong text-primary"
        >
          <User className="size-4" />
        </span>
      ))}
    </div>
  </section>
);

export default FoundersGalleryCard;
