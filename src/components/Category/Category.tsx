interface CategoryProps {
  title: string;
  imageURL: string;
}

export function Category(props: CategoryProps) {
  return (
    <div className="w-full px-1 pb-3 bg-white rounded-xl flex-col justify-start items-center gap-2 inline-flex cursor-pointer">
      <img className="w-[12rem] h-[20rem] rounded-xl object-cover" src={props.imageURL} />
      <div className="text-lg font-semibold">{props.title}</div>
    </div>
  );
}
