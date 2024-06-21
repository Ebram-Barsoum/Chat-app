/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { HiOutlineCloudDownload } from "react-icons/hi";
import toast from "react-hot-toast";

export default function DownloadButton({ path }) {
  const [download, setDownload] = useState(false);

  useEffect(() => {
    if (download) {
      (async function () {
        const response = await fetch(path);

        try {
          if (!response.ok) {
            throw Error("Failed to fetch image");
          }

          const blob = await response.blob();
          const link = document.createElement("a");

          link.href = URL.createObjectURL(blob);
          const start = path.lastIndexOf("/");
          const imageName = path.slice(start + 1);
          link.download = `ME | Chat ${imageName}`;

          link.click();
          URL.revokeObjectURL(link.href);
        } catch (error) {
          toast.error("Failed to download the image");
        } finally {
          setDownload(false);
        }
      })();
    }
  }, [download, path]);

  return (
    <button
      className="text-md"
      onClick={() => setDownload(true)}
      title="Click to download"
    >
      <HiOutlineCloudDownload />
    </button>
  );
}
