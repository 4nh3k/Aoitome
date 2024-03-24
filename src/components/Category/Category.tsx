interface CategoryProps {
  title: string;
  imageURL: string;
}

export function Category(props: CategoryProps) {
  return (
    <div className="w-44 h-56 pb-3 bg-white rounded-xl shadow flex-col justify-start items-center gap-2 inline-flex">
      <img className="w-44 h-44 rounded-xl" src={props.imageURL} />
      <div className="text-lg font-semibold">{props.title}</div>
    </div>
  );
}
