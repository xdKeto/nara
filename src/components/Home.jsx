import { useState, useEffect } from "react";
import { HOME_CONTENT } from "../constants";
import { motion } from "framer-motion";
import HomeSkeleton from "./HomeSkeleton";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const imageVariants = {
  hidden: { clipPath: "inset(0 50% 0 50%" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const Home = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = [...HOME_CONTENT.wideImage, ...HOME_CONTENT.squareImage];
    const promises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(promises).then(() => {
      setLoading(false);
    });
  }, []);

  const openViewer = (img) => {
    setCurrentImage(img);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setCurrentImage(null);
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <section className="px-6 select-none">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="will-change-transformrelative z-10 flex flex-col md:flex-row md:mt-6 space-y-4 md:space-y-0 mb-4 md:ms-4">
        <div className="w-full md:w-2/7 lg:w-1/5 py-4 flex flex-col items-center md:items-start">
          <motion.p initial="hidden" animate="visible" variants={textVariants} className="will-change-transform text-black font-semibold text-lg md:text-2xl"> {HOME_CONTENT.name} </motion.p>
          <motion.p initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-md md:text-lg will-change-transform"> {HOME_CONTENT.role} </motion.p>
          <motion.a initial="hidden" animate="visible" variants={textVariants} href={HOME_CONTENT.link} className="will-change-transform text-black"> {HOME_CONTENT.description} </motion.a>
        </div>
        <motion.div initial="hidden" animate="visible" variants={textVariants} className="will-change-transform w-full md:w-1/5 py-2 md:py-6 px-8 justify-end flex flex-col">
          <div className="h-[3px] w-full md:w-96 lg:w-164 bg-black"></div>
        </motion.div>
      </motion.div>

      <div className="mx-auto space-y-4 max-w-5xl px-4">
        <img src={HOME_CONTENT.wideImage[0]} loading="lazy" alt="" className="object-cover w-full rounded-xl h-[400px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.wideImage[0])} />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <img src={HOME_CONTENT.squareImage[0]} loading="lazy" alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.squareImage[0])} />
          </div>
          <div className="col-span-8">
            <img src={HOME_CONTENT.wideImage[1]} loading="lazy" alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.wideImage[1])} />
          </div>

          <div className="col-span-8">
            <img src={HOME_CONTENT.wideImage[2]} loading="lazy" alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.wideImage[2])} />
          </div>
          <div className="col-span-4">
            <img src={HOME_CONTENT.squareImage[1]} loading="lazy" alt="" className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform" onClick={() => openViewer(HOME_CONTENT.squareImage[1])} />
          </div>
        </div>
      </div>

      {/* Modal Photo Viewer */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeViewer}>
          <img
            src={currentImage}
            alt="Full View"
            className="max-w-full max-h-[86vh] rounded-lg shadow-lg mt-8"
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
