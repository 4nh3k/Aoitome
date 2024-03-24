interface ContainerProps {
  children: React.ReactNode; // Change to singular "children"
}

export function Container(props: ContainerProps) {
  return (
    <div className="w-full px-6 py-8 my-8 bg-white rounded-xl flex-col justify-start items-start gap-6 inline-flex">
      {props.children}
    </div>
  );
}
