interface ContainerProps {
  className?: string;
  children: React.ReactNode; // Change to singular "children"
}

export function Container(props: ContainerProps) {
  return (
    <div
      className={
        props.className
          ? props.className
          : "w-full px-6 py-6 my-8 bg-white rounded-xl shadow-sm"
      }
    >
      {props.children}
    </div>
  );
}
