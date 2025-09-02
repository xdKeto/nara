import { useEffect, useRef, useState, useMemo } from "react";
import { getStrapiURL } from "../utils/api";
import { useFetchData } from "../hooks/FetchData";

const HomeCategories = ({ category, setCurrentPage }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data } = useFetchData();

  // Rehydrate category from the latest context data using its id, if available
  const sourceCategory = useMemo(() => {
    const allCats = data?.homePage?.homeCategories || [];
    if (category?.id) {
      const found = allCats.find((c) => c.id === category.id);
      return found || category;
    }
    return category || null;
  }, [data, category]);

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

  if (!sourceCategory) {
    return (
      <section className="select-none">
        <div className="max-w-5xl mx-auto px-4 pt-24">
          <nav className="text-sm text-gray-600">
            <button type="button" className="hover:underline text-gray-900 font-bold" onClick={() => (typeof setCurrentPage === "function" ? setCurrentPage("home") : window.history.back())}>
              Home
            </button>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-bold ">Category</span>
          </nav>
          <p className="mt-6 text-gray-500">Category not found.</p>
        </div>
      </section>
    );
  }

  const images = (sourceCategory?.detailPage?.images || []).map((img) => ({
    title: img.title,
    description: img.description,
    madeIn: img.madeIn,
    mainImage: getStrapiURL(img?.thumbnail?.url),
    carousel: (img?.carouselImage || []).map((c) => getStrapiURL(c.url)),
  }));

  const openViewer = (item) => {
    setSelectedItem(item);
    setActiveImageIndex(0);
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

  // helper to chunk into groups of 6
  const chunk6 = (arr) => {
    const out = [];
    for (let i = 0; i < arr.length; i += 6) out.push(arr.slice(i, i + 6));
    return out;
  };

  const groups = chunk6(images);

  return (
    <section className="select-none">
      {/* breadcrumbs */}
      <div className="max-w-5xl mx-auto px-4 pt-24">
        <nav className="text-sm text-gray-600">
          <button type="button" className="hover:underline text-gray-900 font-bold" onClick={() => (typeof setCurrentPage === "function" ? setCurrentPage("home") : window.history.back())}>
            Home
          </button>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900 font-bold ">{sourceCategory?.title || ""}</span>
        </nav>
      </div>

      {/* centered category title */}
      <h1 className="text-center md:text-5xl mb-4 mt-2 font-extrabold text-3xl">{sourceCategory?.title || ""}</h1>

      {/* pattern for the category images (dynamic data, same grid pattern) */}
      {groups.map((group, gi) => (
        <div key={gi} className="mx-auto space-y-4 px-8">
          {group[0] && (
            <div>
              <img
                src={group[0].mainImage}
                loading="lazy"
                alt={group[0].title}
                className="object-cover w-full rounded-xl h-[500px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                onClick={() => openViewer(group[0])}
              />
              <h1 className="text-black font-semibold text-xl md:text-2xl">{group[0].title}</h1>
            </div>
          )}

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              {group[1] && (
                <div>
                  <img
                    src={group[1].mainImage}
                    loading="lazy"
                    alt={group[1].title}
                    className="object-cover rounded-xl w-full h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[1])}
                  />
                  <h1 className="text-black font-semibold text-xl md:text-2xl">{group[1].title}</h1>
                </div>
              )}
            </div>

            <div className="col-span-8">
              {group[2] && (
                <div>
                  <img
                    src={group[2].mainImage}
                    loading="lazy"
                    alt={group[2].title}
                    className="object-cover rounded-xl w-full h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[2])}
                  />
                  <h1 className="text-black font-semibold text-xl md:text-2xl text-end">{group[2].title}</h1>
                </div>
              )}
            </div>

            <div className="col-span-12">
              {group[3] && (
                <div>
                  <img
                    src={group[3].mainImage}
                    loading="lazy"
                    alt={group[3].title}
                    className="object-cover rounded-xl w-full h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[3])}
                  />
                  <h1 className="text-black font-semibold text-xl md:text-2xl">{group[3].title}</h1>
                </div>
              )}
            </div>

            <div className="col-span-8">
              {group[4] && (
                <div>
                  <img
                    src={group[4].mainImage}
                    loading="lazy"
                    alt={group[4].title}
                    className="object-cover rounded-xl w-full h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[4])}
                  />
                  <h1 className="text-black font-semibold text-xl md:text-2xl">{group[4].title}</h1>
                </div>
              )}
            </div>

            <div className="col-span-4">
              {group[5] && (
                <div>
                  <img
                    src={group[5].mainImage}
                    loading="lazy"
                    alt={group[5].title}
                    className="object-cover rounded-xl w-full h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[5])}
                  />
                  <h1 className="text-black font-semibold text-xl md:text-2xl text-end">{group[5].title}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Modal Photo Viewer */}
      {viewerOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/99 flex flex-col lg:flex-row items-center justify-start pt-32 md:pt-0 md:justify-center z-50 p-4 md:p-8 lg:p-16 gap-8 xl:gap-16" onClick={closeViewer}>
          <div className="w-full lg:w-3/8 md:py-8 xl:pe-32">
            <h1 className="text-white text-xl md:text-5xl font-bold"> {selectedItem.title} </h1>
            <h1 className="text-white text-sm md:text-xl font-extralight mt-2 lg:mt-8"> {selectedItem.description} </h1>
            <h1 className="text-white text-xs  md:text-xl mt-8 font-extralight"> {selectedItem.madeIn} </h1>
          </div>
          <div className="w-full lg:w-1/2 flex mt-2 md:mt-8 justify-center items-center">
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
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeCategories;