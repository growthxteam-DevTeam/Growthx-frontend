"use client";

import { useState } from "react";

import { useLocale, useTranslations } from "next-intl";
import { enUS, fr } from "react-day-picker/locale";

import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useDashboardContent } from "../_hooks/useDashboardContent";

const CALENDAR_LOCALES = { en: enUS, fr };

const ScheduleCard = () => {
  const t = useTranslations("Dashboard.home.schedule");
  const locale = useLocale() as keyof typeof CALENDAR_LOCALES;
  // Month names come from the browser's own locale data, so they follow the language switcher.
  const { content } = useDashboardContent();
  const eventDates = (content?.events ?? []).map((event) => new Date(event.date));
  const [today] = useState(() => new Date());
  // Opens on the next event's month (events arrive soonest first), else on the current month, until
  // the learner picks a month themselves.
  const firstDate = eventDates[0] ?? today;
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const month = selectedMonth ?? new Date(firstDate.getFullYear(), firstDate.getMonth());
  const monthNames = Array.from({ length: 12 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(month.getFullYear(), index)),
  );

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>

      <div className="mt-4 rounded-md border border-border p-3">
        <Select
          value={String(month.getMonth())}
          onValueChange={(value) => setSelectedMonth(new Date(month.getFullYear(), Number(value)))}
        >
          <SelectTrigger className="h-9 w-full border-primary text-sm text-primary">
            <SelectValue>{monthNames[month.getMonth()]}</SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {monthNames.map((name, index) => (
              <SelectItem key={name} value={String(index)}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Calendar
          month={month}
          onMonthChange={setSelectedMonth}
          hideNavigation
          locale={CALENDAR_LOCALES[locale]}
          modifiers={{ event: eventDates }}
          modifiersClassNames={{
            event:
              "flex items-center justify-center rounded-md bg-[#f0dfae] font-semibold text-primary dark:bg-primary/20",
          }}
          classNames={{
            root: "w-full",
            month_caption: "hidden",
            outside: "opacity-40",
          }}
          className="mt-3 p-0 text-sm text-primary"
        />
      </div>
    </section>
  );
};

export default ScheduleCard;
