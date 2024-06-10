import { BeatLoader } from "react-spinners";

export default function FullSpinner() {
  return (
    <div className="h-[100dvh] flex justify-center items-center bg-gray-50">
      <BeatLoader className="text-blue-700" />
    </div>
  );
}
