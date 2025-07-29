import { useState, useEffect } from "react";
import { HOME_CONTENT } from "../constants";
import { CONTACT_CONTENT } from "../constants";
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagesToPreload = HOME_CONTENT.images.map((item) => item.mainImage);

    const promises = imagesToPreload.map((src) => {
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

  const openViewer = (item) => {
    setSelectedItem(item);
    setActiveImageIndex(0); // Start with the main image
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setSelectedItem(null);
    setActiveImageIndex(0);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedItem) {
      const totalImages = [selectedItem.mainImage, ...selectedItem.carousel].length;
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedItem) {
      const totalImages = [selectedItem.mainImage, ...selectedItem.carousel].length;
      setActiveImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    }
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <section className="px-6 select-none">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="will-change-transform relative z-10 flex flex-col md:flex-row md:mt-6 space-y-4 md:space-y-0 mb-4 md:ms-4">
        <div className="w-full md:w-2/7 lg:w-1/5 py-4 flex flex-col items-center md:items-start">
          <motion.p initial="hidden" animate="visible" variants={textVariants} className="will-change-transform text-black font-semibold text-lg md:text-2xl">
            {" "}
            {HOME_CONTENT.name}{" "}
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-md md:text-lg will-change-transform">
            {" "}
            {HOME_CONTENT.role}{" "}
          </motion.p>
          <motion.a initial="hidden" animate="visible" variants={textVariants} href={`mailto:${CONTACT_CONTENT.email}`} className="will-change-transform text-black">
            {CONTACT_CONTENT.email}
          </motion.a>
        </div>
        <motion.div initial="hidden" animate="visible" variants={textVariants} className="will-change-transform w-full md:w-1/5 py-2 md:py-6 px-8 justify-end flex flex-col">
          <div className="h-[3px] w-full md:w-96 lg:w-164 bg-black"></div>
        </motion.div>
      </motion.div>

      <div className="mx-auto space-y-4 max-w-5xl px-4">
        <img
          src={HOME_CONTENT.images[0].mainImage}
          loading="lazy"
          alt={HOME_CONTENT.images[0].title}
          className="object-cover w-full rounded-xl h-[400px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
          onClick={() => openViewer(HOME_CONTENT.images[0])}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <img
              src={HOME_CONTENT.images[1].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[1].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[1])}
            />
          </div>
          <div className="col-span-8">
            <img
              src={HOME_CONTENT.images[2].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[2].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[2])}
            />
          </div>

          <div className="col-span-8">
            <img
              src={HOME_CONTENT.images[3].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[3].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[3])}
            />
          </div>
          <div className="col-span-4">
            <img
              src={HOME_CONTENT.images[4].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[4].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[4])}
            />
          </div>
        </div>
      </div>

      {/* Modal Photo Viewer */}
      {viewerOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/95 flex flex-col md:flex-row items-center justify-start pt-32 md:pt-0 md:justify-center z-50 p-4 md:p-16 gap-8 lg:gap-16" onClick={closeViewer}>
          <div className="w-full lg:w-3/8 md:py-8 ">
            <h1 className="text-white text-xl md:text-5xl font-bold"> {selectedItem.title} </h1>
            <h1 className="text-white text-sm md:text-xl font-semibold"> {selectedItem.description} </h1>
            <h1 className="text-white text-xs  md:text-xl mt-8 font-medium"> {selectedItem.madeIn} </h1>
          </div>
          <div className="relative w-full md:w-1/2 flex mt-2 md:mt-8 ">
            <div className="flex flex-col items-center ">
              <img src={[selectedItem.mainImage, ...selectedItem.carousel][activeImageIndex]} alt="Full View" className=" max-w-full max-h-[56vh] rounded-lg shadow-lg object-contain" onClick={(e) => e.stopPropagation()} />
              {/* Thumbnails for desktop */}
              <div className="hidden md:flex md:flex-row md:space-x-2">
                {[selectedItem.mainImage, ...selectedItem.carousel].map((thumb, index) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-8 xl:w-32 md:h-16 object-cover rounded-md cursor-pointer border-2 ${activeImageIndex === index ? "border-white" : "border-transparent"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Arrow buttons for mobile */}
            <button onClick={prevImage} className="absolute left-[-1rem] bottom-2 top-1/2 -translate-y-1/2 md:hidden bg-black/50 text-white p-2 rounded-lg text-4xl sm:text-7xl font-bold">
              &#8249;
            </button>
            <button onClick={nextImage} className="absolute right-[-1rem] bottom-2 top-1/2 -translate-y-1/2 md:hidden bg-black/50 text-white p-2 rounded-lg text-4xl sm:text-7xl font-bold">
              &#8250;
            </button>

            {/* <button className="absolute top-7 left-1 text-white text-4xl font-bold" onClick={closeViewer}>
              &times;
            </button> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
