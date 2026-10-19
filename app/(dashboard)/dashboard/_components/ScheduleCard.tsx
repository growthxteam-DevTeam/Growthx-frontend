"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { MONTH_NAMES, SCHEDULE } from "../_constants";

const ScheduleCard = () => {
  const [month, setMonth] = useState(new Date(SCHEDULE.year, SCHEDULE.defaultMonth));

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">Schedule</h2>

      <div className="mt-4 rounded-md border border-border p-3">
        <Select
          value={String(month.getMonth())}
          onValueChange={(value) => setMonth(new Date(SCHEDULE.year, Number(value)))}
        >
          <SelectTrigger className="h-9 w-full border-primary text-sm text-primary">
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
          modifiersClassNames={{ event: "flex items-center justify-center rounded-md bg-[#f0dfae] font-semibold text-primary dark:bg-primary/20" }}
          classNames={{ root: "w-full", month_caption: "hidden", outside: "opacity-40" }}
          className="mt-3 p-0 text-sm text-primary"
        />
      </div>
    </section>
  );
};

export default ScheduleCard;
