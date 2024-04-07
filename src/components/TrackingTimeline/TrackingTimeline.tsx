import { IconType } from "react-icons";

interface TrackingTimelineProps {
  icon: IconType;
  iconClassName?: string;
  time: string;
  title: string;
}

export function TrackingTimeline({
  icon: Icon,
  iconClassName,
  time,
  title,
}: TrackingTimelineProps) {
  return (
    <div className="flex w-40 space-y-1 text-center flex-col items-center">
      <Icon size={30} className={iconClassName} />
      <span className="small">{time}</span>
      <span className="font-medium">{title}</span>
    </div>
  );
}
