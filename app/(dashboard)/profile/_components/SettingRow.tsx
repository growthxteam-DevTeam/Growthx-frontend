import type { ReactNode } from "react";

interface SettingRowProps {
  label: string;
  hint?: string;
  icon?: ReactNode;
  /** The row's control (toggle, select, button, link) sits on the right. */
  children: ReactNode;
}

const SettingRow = ({ label, hint, icon, children }: SettingRowProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-border/70 py-3.5 last:border-b-0">
    <div className="flex min-w-0 items-center gap-3">
      {icon}
      <div className="min-w-0">
        <p className="text-[13px] text-ink">{label}</p>
        {hint && <p className="mt-0.5 text-[11px] text-ink-muted">{hint}</p>}
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-3">{children}</div>
  </div>
);

export default SettingRow;
