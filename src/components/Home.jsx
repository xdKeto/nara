import { useState } from "react";
import { HOME_CONTENT } from "../constants";

const Home = () => {
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
    <section className="px-6">
      <div className="relative z-10 flex flex-col md:flex-row md:mt-6 space-y-4 md:space-y-0 mb-4 md:ms-4">
        <div className="w-full md:w-2/7 lg:w-1/5 py-4 justify-items-center md:justify-items-start">
          <p className="text-black font-semibold text-lg md:text-2xl"> {HOME_CONTENT.name} </p>
          <p className="text-black font-semibold text-md md:text-lg"> {HOME_CONTENT.role} </p>
          <a href={HOME_CONTENT.link}> {HOME_CONTENT.description} </a>
        </div>
        <div className="w-full md:w-1/5 py-2 md:py-6 px-8 justify-end flex flex-col">
          <div className="h-[3px] w-full md:w-96 lg:w-164 bg-black"></div>
        </div>
      </div>

      <div className="mx-auto space-y-4 max-w-5xl px-4">
        <img src={HOME_CONTENT.wideImage[0]} alt="" className="object-cover w-full rounded-xl h-[380px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.wideImage[0])} />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <img src={HOME_CONTENT.squareImage} alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.squareImage)} />
          </div>
          <div className="col-span-8">
            <img src={HOME_CONTENT.wideImage[1]} alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.wideImage[1])} />
          </div>

          <div className="col-span-8">
            <img src={HOME_CONTENT.wideImage[2]} alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.wideImage[2])} />
          </div>
          <div className="col-span-4">
            <img src={HOME_CONTENT.squareImage} alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.squareImage)} />
          </div>
        </div>
      </div>

      {/* Modal Photo Viewer */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeViewer}>
          <img
            src={currentImage}
            alt="Full View"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} 
          />
          <button className="absolute top-6 right-8 text-black text-3xl font-bold" onClick={closeViewer}>
            &times;
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
