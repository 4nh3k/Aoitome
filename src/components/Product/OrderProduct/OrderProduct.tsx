export function OrderProduct() {
  return (
    <div className="w-full py-3 justify-between items-center inline-flex">
      <div className="self-stretch justify-start items-center gap-2.5 flex">
        <img className="self-stretch" src="https://via.placeholder.com/50x69" />
        <div className="text-right text-black text-lg font-medium font-['Inter'] leading-relaxed">
          Elysian Realm
        </div>
      </div>
      <div className="ml-80 text-right text-black text-lg font-normal font-['Inter'] leading-relaxed">
        x1
      </div>
      <div className="w-9 text-center text-black text-lg font-bold font-['Inter'] leading-none">
        $90
      </div>
    </div>
  );
}
