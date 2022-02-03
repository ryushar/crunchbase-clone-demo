export default function Container({ children, style }) {
  return (
    <div className="w-full lg:w-8/12 mx-auto pt-16" style={style}>
      {children}
    </div>
  );
}
