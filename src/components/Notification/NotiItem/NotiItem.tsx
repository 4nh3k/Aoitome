interface NotiItemProps {
  hasRead: boolean;
  title: string;
  content: string;
  time: string;
  size?: "sm" | "lg";
}

export function NotiItem({
  hasRead,
  title,
  content,
  time,
  size = "sm",
}: NotiItemProps) {
  return (
    <div
      className={`w-${
        size === "sm" ? "[496px]" : "[1200px]"
      } h-32 p-2 justify-start items-center gap-3.5 inline-flex`}
    >
      <div className="w-16 h-16 relative bg-emerald-600 rounded-full" />
      <div className="w-full h-28 relative text-left space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-black font-medium">{title}</div>
          {!hasRead && (
            <div className={`w-3.5 h-3.5 bg-red-500 rounded-full`} />
          )}{" "}
        </div>
        <div className="text-black line-clamp-3 text-sm font-normal ">
          {content}
        </div>
        <div className=" text-black text-sm font-normal">{time}</div>
      </div>
    </div>
  );
}
