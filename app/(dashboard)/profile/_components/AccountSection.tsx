"use client";

import { Bell, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useDashboard } from "../../dashboard/_hooks/useDashboard";
import { PROFILE } from "../_constants";
import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

// TODO: changing the email or password and notification settings have no endpoints yet.
const AccountSection = () => {
  const t = useTranslations("Dashboard.profile.account");
  const tc = useTranslations("Dashboard.common");
  const { email } = useDashboard();

  const rows = [
    { id: "email", icon: Mail, value: email, action: t("change") },
    { id: "password", icon: Lock, value: PROFILE.passwordMask, action: t("change") },
    { id: "notifications", icon: Bell, value: t("notificationsValue"), action: t("manage") },
  ] as const;

  return (
    <SettingsSection title={t("title")}>
      {rows.map(({ id, icon: Icon, value, action }) => (
        <SettingRow key={id} label={t(id)} icon={<Icon className="size-4 shrink-0 text-ink-muted" />}>
          <span className="truncate text-xs text-ink-muted">{value}</span>
          <button
            type="button"
            onClick={() => toast.info(tc("comingSoon"))}
            className="cursor-pointer text-xs font-medium text-primary hover:underline"
          >
            {action}
          </button>
        </SettingRow>
      ))}
    </SettingsSection>
  );
};

export default AccountSection;
