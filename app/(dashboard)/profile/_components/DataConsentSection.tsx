"use client";

import { useState } from "react";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

const outlineButton =
  "h-8 cursor-pointer gap-1.5 rounded-md border-primary px-3 text-sm font-semibold text-primary hover:bg-transparent";

// TODO: reviewing application answers, exporting data and consent have no endpoints yet.
const DataConsentSection = () => {
  const t = useTranslations("Dashboard.profile.data");
  const tc = useTranslations("Dashboard.common");
  const [sessionRecording, setSessionRecording] = useState(true);
  const notifyComingSoon = () => toast.info(tc("comingSoon"));

  return (
    <SettingsSection title={t("title")}>
      <SettingRow label={t("accessibilityInfo.label")} hint={t("accessibilityInfo.hint")}>
        <Button type="button" variant="outline" onClick={notifyComingSoon} className={outlineButton}>
          {t("accessibilityInfo.action")}
        </Button>
      </SettingRow>

      <SettingRow label={t("sessionRecording.label")} hint={t("sessionRecording.hint")}>
        <Switch
          checked={sessionRecording}
          onCheckedChange={setSessionRecording}
          aria-label={t("sessionRecording.label")}
        />
      </SettingRow>

      <SettingRow label={t("downloadData.label")} hint={t("downloadData.hint")}>
        <Button type="button" variant="outline" onClick={notifyComingSoon} className={outlineButton}>
          <Download className="size-4" />
          {t("downloadData.action")}
        </Button>
      </SettingRow>
    </SettingsSection>
  );
};

export default DataConsentSection;
