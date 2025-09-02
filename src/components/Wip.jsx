import { useEffect, useState } from "react";
import { getWipPageData } from "../constants";
import { getStrapiURL } from "../utils/api";

const Wip = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const wipData = getWipPageData();

  const openViewer = (img) => {
    setCurrentImage(img);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setCurrentImage(null);
  };

  // Early return if data is not available
  if (!wipData) {
    return (
      <section className="select-none">
        <div className="px-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Loading WIP data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 select-none max-w-5xl">
      <div className="px-6">
        {wipData.wips?.map((wip, index) => (
          // framer motion layer
          <div key={wip.id} className="mb-4">
            <h1 className="text-black my-2 font-semibold">{wip.title}</h1>
            <h3 className="text-black">{wip.description}</h3>

            <div className="w-full py-4 font-medium">
              <img
                src={getStrapiURL(wip.image?.url)}
                loading="lazy"
                alt={`WIP Image - ${wip.title}`}
                className="rounded-xl w-full h-full cursor-pointer will-change-transform transition-transform hover:scale-105"
                onClick={() => openViewer(getStrapiURL(wip.image?.url))}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Photo Viewer */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50" onClick={closeViewer}>
          <img
            src={currentImage}
            alt="Full View"
            className="max-w-full max-h-[86vh] rounded-lg shadow-lg mt-8"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />
          <button className="absolute top-6 right-8 text-black text-3xl font-bold" onClick={closeViewer}>
            &times;
          </button>
        </div>
      )}
    </section>
  );
};

export default Wip;
