import { RiLoader4Line } from "react-icons/ri";
export default function Error({ title }) {
  return (
    <div className="text-white flex-col w-full   h-screen flex justify-center items-center">
      <RiLoader4Line size={100} />
      <h1 className="text-2xl font-bold text-white mt-4">
        {title || "loading..."}
      </h1>
    </div>
  );
}
