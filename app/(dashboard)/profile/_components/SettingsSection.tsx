import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const SettingsSection = ({ title, children, className }: { title: string; children: ReactNode; className?: string }) => (
  <section className={cn("border-t border-border/70 pt-4", className)}>
    <h2 className="text-[17px] font-semibold text-primary">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

export default SettingsSection;
