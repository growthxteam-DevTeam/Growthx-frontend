"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { Switch } from "@/components/ui/switch";

import {
  DEFAULT_PREFERENCES,
  PREFERENCE_ROWS,
  TEXT_SIZES,
  type PreferenceToggleId,
  type TextSize,
} from "../_constants";
import OptionSelect from "./OptionSelect";
import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

// TODO: no settings endpoint yet, so these choices only live in the page until it exists.
const PreferencesSection = () => {
  const t = useTranslations("Dashboard.profile.preferences");
  const [toggles, setToggles] = useState(DEFAULT_PREFERENCES);
  const [textSize, setTextSize] = useState<TextSize>("default");

  const setToggle = (id: PreferenceToggleId, checked: boolean) => setToggles((current) => ({ ...current, [id]: checked }));

  return (
    <SettingsSection title={t("title")}>
      {PREFERENCE_ROWS.map((row) =>
        row.kind === "toggle" ? (
          <SettingRow key={row.id} label={t(`items.${row.id}.label`)} hint={t(`items.${row.id}.hint`)}>
            <Switch
              checked={toggles[row.id]}
              onCheckedChange={(checked) => setToggle(row.id, checked)}
              aria-label={t(`items.${row.id}.label`)}
            />
          </SettingRow>
        ) : (
          <SettingRow key="textSize" label={t("items.textSize.label")} hint={t("items.textSize.hint")}>
            <OptionSelect
              value={textSize}
              options={TEXT_SIZES}
              onChange={setTextSize}
              labelFor={(size) => t(`items.textSize.options.${size}`)}
              ariaLabel={t("items.textSize.label")}
            />
          </SettingRow>
        ),
      )}
    </SettingsSection>
  );
};

export default PreferencesSection;
