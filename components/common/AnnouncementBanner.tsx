import { CheckCircle2 } from "lucide-react";

interface AnnouncementBannerProps {
  message: string;
}

const AnnouncementBanner = ({ message }: AnnouncementBannerProps) => {
  return (
    <div className="flex items-center justify-center gap-2 bg-emerald-50 px-4 py-3 text-center">
      <CheckCircle2 className="size-5 shrink-0 fill-emerald-500 text-emerald-50" />
      <p className="text-sm font-medium text-emerald-800">{message}</p>
    </div>
  );
};

export default AnnouncementBanner;
