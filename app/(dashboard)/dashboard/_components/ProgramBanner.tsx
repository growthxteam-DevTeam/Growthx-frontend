import { NotebookText } from "lucide-react";

import { PROGRAM } from "../_constants";

const ProgramBanner = () => (
  <section className="relative flex min-h-30 flex-col justify-between overflow-hidden rounded-lg bg-primary p-6 text-white lg:p-10">
    {/* Decorative arcs from the design: light band top-left, faint ring top-right, gold sweep bottom-right. */}
    <div className="pointer-events-none absolute -left-44 -top-10 h-[150%] w-56 rounded-full border-r-[26px] border-white/30" />
    <div className="pointer-events-none absolute -top-72 left-1/2 size-[520px] rounded-full border-[3px] border-white/10" />
    <div className="pointer-events-none absolute -bottom-20 -right-10 h-32 w-[75%] rounded-[100%] bg-[#f0dfae]" />
    <div className="pointer-events-none absolute -bottom-[60px] -right-4 h-32 w-[75%] rounded-[100%] bg-primary" />

    <div className="relative mt-4 pl-4 lg:mt-8 lg:pl-10">
      <p className="text-base text-[#f0dfae]">{PROGRAM.label}</p>
      <h2 className="mt-1 text-2xl font-bold lg:text-4xl">{PROGRAM.title}</h2>
      <p className="mt-3 flex items-center gap-2 text-base">
        <NotebookText className="size-5" />
        {PROGRAM.duration}
      </p>
    </div>

    <p className="relative flex flex-wrap gap-4 pl-4 text-sm font-bold lg:gap-10 lg:pl-10">
      <span>Led by: {PROGRAM.leader}</span>
      <span>Cohort Members: {PROGRAM.cohortMembers}</span>
    </p>
  </section>
);

export default ProgramBanner;
