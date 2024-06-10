import { BeatLoader } from "react-spinners";

export default function SmallLoader() {
  return (
    <div className="h-[100%] flex justify-center items-center">
      <BeatLoader className="text-white" />
    </div>
  );
}
