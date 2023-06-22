import { BiLoaderAlt } from "react-icons/Bi";

const LoadingSpinner = ({ size, color }: { size: string; color?: string }) => {
  return (
    <span className="block py-0.5 px-2">
      <BiLoaderAlt
        className={`${size} animate-spin ${color ? "" : "text-sky-600"}`}
      />
    </span>
  );
};

export default LoadingSpinner;
