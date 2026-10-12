"use client";

import { ArrowLeft, ArrowRight, Camera, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useController, type UseFormReturn } from "react-hook-form";

import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";

import { PASSPORT_PHOTO_ACCEPT, PASSPORT_PHOTO_MAX_BYTES } from "../_constants";
import type { SubmitStepValues } from "../_types";

interface SubmitStepProps {
  form: UseFormReturn<SubmitStepValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  onBack: () => void;
}

const SubmitStep = ({ form, onSubmit, isSubmitting, onBack }: SubmitStepProps) => {
  const t = useTranslations("Onboarding.submit");
  const tc = useTranslations("Onboarding.common");
  const {
    field: { value: photoFile, onChange: setPhotoFile },
  } = useController({ control: form.control, name: "passportPhoto" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Revoke the object URL when the preview changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    if (!PASSPORT_PHOTO_ACCEPT.includes(file.type)) {
      setFileError(t("errors.invalidType"));
      return;
    }
    if (file.size > PASSPORT_PHOTO_MAX_BYTES) {
      setFileError(t("errors.tooLarge"));
      return;
    }

    setFileError(null);
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearPhoto = () => {
    setPhotoFile(undefined);
    setPreviewUrl(null);
    setFileError(null);
  };

  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <h2 className="font-serif text-2xl font-bold text-primary">{t("title")}</h2>

      <form onSubmit={onSubmit} className="mt-8">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-gray-50 px-6 py-14 text-center">
          {previewUrl ? (
            <div className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- transient client-side object URL, not an optimizable asset */}
              <img src={previewUrl} alt={t("previewAlt")} className="size-24 rounded-full object-cover" />
              <p className="text-sm text-muted-foreground">{photoFile?.name}</p>
              <Button
                type="button"
                variant="ghost"
                onClick={clearPhoto}
                className="gap-1.5 text-sm text-muted-foreground"
              >
                <X className="size-3.5" />
                {t("removePhoto")}
              </Button>
            </div>
          ) : (
            <>
              {/* TODO: live webcam capture (getUserMedia) isn't wired up yet —
                  this is a placeholder until that's explicitly built. */}
              <Camera className="size-10 text-muted-foreground" />
              <p className="text-muted-foreground">{t("startCamera")}</p>

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-primary text-primary"
              >
                {t("chooseFile")}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={PASSPORT_PHOTO_ACCEPT.join(",")}
                hidden
                onChange={handleFileChange}
              />

              <p className="text-xs text-muted-foreground">{t("fileHint")}</p>
            </>
          )}
        </div>

        {fileError && <p className="mt-2 text-sm text-red-500">{fileError}</p>}

        <div className="mt-10 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11! gap-2 rounded-md border-primary px-6 text-sm font-medium text-primary hover:bg-transparent"
          >
            <ArrowLeft className="size-4" />
            {tc("back")}
          </Button>

          <SubmitButton isLoading={isSubmitting} loadingText={t("submitting")} className="flex w-fit items-center px-6">
            {t("submit")}
            <span className="flex size-5 items-center justify-center rounded bg-white/20">
              <ArrowRight className="size-3.5" />
            </span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default SubmitStep;
