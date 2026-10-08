import { NotebookText } from "lucide-react";

import { PROGRAM } from "../_constants";

const ProgramBanner = () => (
  <section className="relative flex min-h-64 flex-col justify-between overflow-hidden rounded-lg bg-primary p-8 text-white">
    <div className="pointer-events-none absolute -top-16 left-6 h-72 w-16 rotate-12 bg-white/10" />
    <div className="pointer-events-none absolute -bottom-16 -right-10 h-28 w-96 rounded-[100%] bg-[#f0dfae]" />
    <div className="pointer-events-none absolute -bottom-12 -right-6 h-28 w-96 rounded-[100%] bg-primary" />

    <div className="relative mt-10 pl-6">
      <p className="text-xs">{PROGRAM.label}</p>
      <h2 className="mt-1 font-serif text-3xl font-bold">{PROGRAM.title}</h2>
      <p className="mt-2 flex items-center gap-2 text-xs">
        <NotebookText className="size-4" />
        {PROGRAM.duration}
      </p>
    </div>

    <p className="relative flex gap-8 pl-6 text-[10px] font-semibold">
      <span>Led by: {PROGRAM.leader}</span>
      <span>Cohort Members: {PROGRAM.cohortMembers}</span>
    </p>
  </section>
);

export default ProgramBanner;
