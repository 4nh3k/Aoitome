interface OrderProductProps {
  id: number;
  imageURL: string;
  title: string;
  price: number;
  quantity: number;
}

export function OrderProduct({
  id,
  imageURL,
  title,
  price,
  quantity,
}: OrderProductProps) {
  return (
    <div className="w-full py-3 justify-between items-center inline-flex">
      <div className="self-stretch justify-start items-center gap-2.5 flex">
        <img className="self-stretch" src={imageURL} />
        <div className="text-right text-black text-lg font-medium font-['Inter'] leading-relaxed">
          {title}
        </div>
      </div>
      <div className="ml-80 text-right text-black text-lg font-normal font-['Inter'] leading-relaxed">
        x{quantity}
      </div>
      <div className="w-9 text-center text-black text-lg font-bold font-['Inter'] leading-none">
        ${price.toFixed(2)}
      </div>
    </div>
  );
}
