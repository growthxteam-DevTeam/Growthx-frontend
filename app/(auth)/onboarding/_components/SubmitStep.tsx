"use client";

import { ArrowLeft, ArrowRight, Camera, X } from "lucide-react";
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
      setFileError("Please upload a Jpeg or PNG image");
      return;
    }
    if (file.size > PASSPORT_PHOTO_MAX_BYTES) {
      setFileError("File must be 2 MB or smaller");
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
      <h2 className="font-serif text-2xl font-bold text-primary">
        Upload a Passport photograph of yourself (optional)
      </h2>

      <form onSubmit={onSubmit} className="mt-8">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-gray-50 px-6 py-14 text-center">
          {previewUrl ? (
            <div className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- transient client-side object URL, not an optimizable asset */}
              <img
                src={previewUrl}
                alt="Passport preview"
                className="size-24 rounded-full object-cover"
              />
              <p className="text-sm text-muted-foreground">{photoFile?.name}</p>
              <Button
                type="button"
                variant="ghost"
                onClick={clearPhoto}
                className="gap-1.5 text-sm text-muted-foreground"
              >
                <X className="size-3.5" />
                Remove photo
              </Button>
            </div>
          ) : (
            <>
              {/* TODO: live webcam capture (getUserMedia) isn't wired up yet —
                  this is a placeholder until that's explicitly built. */}
              <Camera className="size-10 text-muted-foreground" />
              <p className="text-muted-foreground">Start Camera</p>

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-primary text-primary"
              >
                Choose file
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={PASSPORT_PHOTO_ACCEPT.join(",")}
                hidden
                onChange={handleFileChange}
              />

              <p className="text-xs text-muted-foreground">Jpeg or PNG . Max 2 MB</p>
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
            Back
          </Button>

          <SubmitButton
            isLoading={isSubmitting}
            loadingText="Submitting..."
            className="flex w-fit items-center px-6"
          >
            Submit Application
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
