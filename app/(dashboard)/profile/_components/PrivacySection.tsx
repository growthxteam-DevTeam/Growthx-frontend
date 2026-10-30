"use client";

import { useState } from "react";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useAppDispatch } from "@/redux/app/hooks";
import { logout } from "@/redux/features/auth/authSlice";

import { PROFILE_VISIBILITIES, type ProfileVisibility } from "../_constants";
import OptionSelect from "./OptionSelect";
import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

// TODO: profile visibility and account deletion have no endpoints yet.
const PrivacySection = () => {
  const t = useTranslations("Dashboard.profile.privacy");
  const tc = useTranslations("Dashboard.common");
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState<ProfileVisibility>("allFounders");

  return (
    <SettingsSection title={t("title")}>
      <SettingRow label={t("visibility.label")}>
        <OptionSelect
          value={visibility}
          options={PROFILE_VISIBILITIES}
          onChange={setVisibility}
          labelFor={(option) => t(`visibility.options.${option}`)}
          ariaLabel={t("visibility.label")}
        />
      </SettingRow>

      <div className="flex items-center justify-between pt-3.5">
        <button
          type="button"
          onClick={() => toast.info(tc("comingSoon"))}
          className="cursor-pointer text-[11px] text-destructive hover:underline"
        >
          {t("deleteAccount")}
        </button>
        <button
          type="button"
          onClick={() => dispatch(logout())}
          className="flex cursor-pointer items-center gap-1.5 text-[11px] text-ink-muted hover:text-primary"
        >
          <LogOut className="size-3.5" />
          {t("logout")}
        </button>
      </div>
    </SettingsSection>
  );
};

export default PrivacySection;
