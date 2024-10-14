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
          : "w-full px-4 py-4 my-8 bg-white rounded-md shadow-sm flex flex-col content-border"
      }
    >
      {props.children}
    </div>
  );
}
