import { useState } from "react";
import { WIP_CONTENT } from "../constants";

const Wip = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openViewer = (img) => {
    setCurrentImage(img);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setCurrentImage(null);
  };

  return (
    <section className="select-none">
      <div className="px-6">
        {WIP_CONTENT.map((wip, index) => (
          // framer motion layer
          <div key={index} className="mb-4">
            <h1 className="text-black my-2 font-semibold">WIP {index+1}</h1>
            <h3 className="text-black">{wip.description}</h3>

            <div className="w-full py-4 font-medium">
              <img src={wip.image} loading="lazy" alt="WIP Image" className="rounded-xl w-full h-full cursor-pointer will-change-transform transition-transform hover:scale-105" onClick={() => openViewer(wip.image)} />
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
            className="max-w-full max-h-[86vh] rounded-lg shadow-lg"
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
