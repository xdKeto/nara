import { section } from "framer-motion/client";

const HomeCategories = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    if (viewerOpen && thumbnailContainerRef.current && thumbnailRefs.current[activeImageIndex]) {
      const container = thumbnailContainerRef.current;
      const activeThumbnail = thumbnailRefs.current[activeImageIndex];
      const containerWidth = container.offsetWidth;
      const thumbnailLeft = activeThumbnail.offsetLeft;
      const thumbnailWidth = activeThumbnail.offsetWidth;

      container.scrollTo({
        left: thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeImageIndex, viewerOpen]);


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

  return (
    <section>
      {/* category title here */}
      <h1></h1> 
      {/* pattern for the category images */}
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

          <div className="col-span-12">
            <img
              src={HOME_CONTENT.images[3].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[3].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[3])}
            />
          </div>

          <div className="col-span-8">
            <img
              src={HOME_CONTENT.images[4].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[4].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[4])}
            />
          </div>

          <div className="col-span-4">
            <img
              src={HOME_CONTENT.images[5].mainImage}
              loading="lazy"
              alt={HOME_CONTENT.images[5].title}
              className="object-cover rounded-xl w-full h-[280px] cursor-pointer transition-transform hover:scale-105 will-change-transform"
              onClick={() => openViewer(HOME_CONTENT.images[5])}
            />
          </div>
        </div>
      </div>

      {/* Modal Photo Viewer */}
      {viewerOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/99 flex flex-col lg:flex-row items-center justify-start pt-32 md:pt-0 md:justify-center z-50 p-4 md:p-8 lg:p-16 gap-8 xl:gap-16" onClick={closeViewer}>
          <div className="w-full lg:w-3/8 md:py-8 xl:pe-32">
            <h1 className="text-white text-xl md:text-5xl font-bold"> {selectedItem.title} </h1>
            <h1 className="text-white text-sm md:text-xl font-semibold mt-2 lg:mt-8"> {selectedItem.description} </h1>
            <h1 className="text-white text-xs  md:text-xl mt-8 font-medium"> {selectedItem.madeIn} </h1>
          </div>
          <div className="w-full lg:w-1/2 flex mt-2 md:mt-8 justify-center items-center">
            {/* <button onClick={prevImage} className="z-10 bg-black/50 text-white py-2 lg:py-8 px-2 rounded-lg text-4xl sm:text-5xl font-bold">
              &#8249;
            </button> */}
            <div id="pictureContainer" className="relative w-full lg:w-1/2 flex mt-2 md:mt-8 justify-center items-center">
              <div className="relative">
                <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white py-2 lg:py-8 px-2 rounded-lg text-4xl sm:text-5xl font-bold">
                  &#8249;
                </button>
                <div className="flex flex-col items-center ">
                  <img
                    src={[selectedItem.mainImage, ...selectedItem.carousel][activeImageIndex]}
                    alt="Full View"
                    className="max-w-full lg:max-w-[100vh] max-h-[56vh] rounded-lg shadow-lg object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Thumbnails for desktop */}
                  <div ref={thumbnailContainerRef} className="hidden md:flex md:flex-row gap-2 mt-2 overflow-x-auto py-2 scrollbar-hide max-w-[680px]">
                    {[selectedItem.mainImage, ...selectedItem.carousel].map((thumb, index) => (
                      <img
                        key={index}
                        ref={(el) => (thumbnailRefs.current[index] = el)}
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-32 h-16 object-cover rounded-md cursor-pointer border-2 flex-shrink-0 ${activeImageIndex === index ? "border-white" : "border-transparent"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white py-2 lg:py-8 px-2  rounded-lg text-4xl sm:text-5xl  font-bold">
                  &#8250;
                </button>
              </div>
            </div>
            {/* <button onClick={nextImage} className="z-10 bg-black/50 text-white py-2 lg:py-8 px-2  rounded-lg text-4xl sm:text-5xl  font-bold">
              &#8250;
            </button> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeCategories;
