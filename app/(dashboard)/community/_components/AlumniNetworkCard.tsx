import { Lock } from "lucide-react";

import { ALUMNI_NETWORK } from "../_constants";

// TODO: locked until graduation; no graduation status exists yet, so this always renders locked.
const AlumniNetworkCard = () => (
  <section className="rounded-xl border border-border bg-card p-5">
    <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
      <Lock className="size-4" />
      {ALUMNI_NETWORK.title}
    </h2>

    <p className="mt-3 text-sm text-muted-foreground/60 blur-[1.5px] select-none">{ALUMNI_NETWORK.teaser}</p>

    <button
      type="button"
      disabled
      className="mt-4 w-full rounded-lg bg-tint py-2.5 text-sm font-semibold text-primary disabled:cursor-not-allowed"
    >
      {ALUMNI_NETWORK.unlockLabel}
    </button>
  </section>
);

export default AlumniNetworkCard;
