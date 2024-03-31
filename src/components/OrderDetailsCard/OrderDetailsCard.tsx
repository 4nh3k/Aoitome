interface OrderDetailsCardProps {
  title: string;
  subTitle?: string;
  description?: string;
  isEditable?: boolean;
}

export function OrderDetailsCard({
  title,
  subTitle,
  description,
  isEditable = false,
}: OrderDetailsCardProps) {
  return (
    <div className="w-full mt-6 px-5 py-5 space-y-2 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex">
      <span className=" text-black text-lg font-semibold">{title}</span>
      <span className=" text-black font-medium">{subTitle}</span>
      <span className=" text-gray-500">{description}</span>
      {isEditable && (
        <button className=" text-blue-700 font-medium">Edit</button>
      )}
    </div>
  );
}
