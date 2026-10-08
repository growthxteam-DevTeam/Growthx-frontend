"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { MONTH_NAMES, SCHEDULE } from "../_constants";

const ScheduleCard = () => {
  const [month, setMonth] = useState(new Date(SCHEDULE.year, SCHEDULE.defaultMonth));

  return (
    <section className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <h2 className="font-serif text-base font-bold text-primary">Schedule</h2>

      <Select
        value={String(month.getMonth())}
        onValueChange={(value) => setMonth(new Date(SCHEDULE.year, Number(value)))}
      >
        <SelectTrigger className="mt-3 h-8 w-full border-primary text-xs text-primary">
          <SelectValue>{MONTH_NAMES[month.getMonth()]}</SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {MONTH_NAMES.map((name, index) => (
            <SelectItem key={name} value={String(index)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Calendar
        month={month}
        onMonthChange={setMonth}
        hideNavigation
        modifiers={{ event: SCHEDULE.eventDates }}
        modifiersClassNames={{ event: "bg-[#f0dfae] font-semibold text-primary" }}
        classNames={{ root: "w-full", month_caption: "hidden", outside: "opacity-40" }}
        className="mt-2 p-0 text-primary"
      />
    </section>
  );
};

export default ScheduleCard;
