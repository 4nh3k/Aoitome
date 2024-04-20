interface CategoryProps {
  title: string;
  imageURL: string;
}

export function Category(props: CategoryProps) {
  return (
    <div className="w-32 h-32 rounded-full bg-white flex-col justify-start items-center gap-2 inline-flex">
      <img className="w-32 h-32 rounded-full" src={props.imageURL} />
      <div className="text-sm font-normal">{props.title}</div>
    </div>
  );
}
