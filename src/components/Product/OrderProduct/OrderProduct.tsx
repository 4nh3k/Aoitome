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
    <div className="w-full px-2 py-2 justify-between items-center inline-flex box-border h-24">
      <div className="self-stretch justify-start items-center gap-2.5 flex">
        <img className="self-stretch h-18 w-14" src={imageURL} />
        <div className="text-right ml-4 text-black text-lg font-medium leading-relaxed">
          {title}
        </div>
      </div>
      <div className="ml-80 text-right text-black text-lg font-normal leading-relaxed">
        x{quantity}
      </div>
      <div className="w-9 ml-10 mr-2 text-center text-black text-lg font-bold leading-none">
        ${price.toFixed(2)}
      </div>
    </div>
  );
}
