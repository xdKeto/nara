import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { getStrapiURL } from "../utils/api";
import { useFetchData } from "../hooks/FetchData";
import ReactPlayer from "react-player";

// Skeleton loading placeholder component
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 ${className}`} />
);

// Lazy loading media component using Intersection Observer
const LazyMedia = ({ src, alt, className, onClick, isVideo: isVideoType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} onClick={onClick}>
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 rounded-xl" />
      )}
      {/* Actual media - only render when visible */}
      {isVisible && (
        isVideoType ? (
          <video
            src={src}
            poster=""
            preload="metadata"
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoadedData={() => setIsLoaded(true)}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={() => setIsLoaded(true)}
          />
        )
      )}
    </div>
  );
};

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
  const [isScroll, setIsScroll] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper function to detect if a URL is a video
  const isVideo = (url) => {
    // console.log(url);
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
    const lowerUrl = url.toLowerCase();
    // Check for video file extensions
    if (videoExtensions.some(ext => lowerUrl.includes(ext))) return true;
    // Check for video hosting platforms
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') || 
        lowerUrl.includes('vimeo.com') || lowerUrl.includes('dailymotion.com')) return true;
    return false;
  };

  const images = (sourceCategory?.detailPage?.images || []).map((img) => {
    // Use mobile_thumbnail if on mobile and it exists, otherwise fall back to regular thumbnail
    const thumbnailUrl = isMobile && img?.mobile_thumbnail?.url 
      ? img.mobile_thumbnail.url 
      : img?.thumbnail?.url;
    return {
      title: img.title,
      description: img.description,
      madeIn: img.madeIn,
      mainImage: getStrapiURL(thumbnailUrl),
      carousel: (img?.carouselImage || []).map((c) => getStrapiURL(c.url)),
      scroll: img.scroll
    };
  });

  // Handle URL-based viewer navigation
  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state || {};
      
      // Check if we're closing the viewer
      if (!state.viewerImageIndex && viewerOpen) {
        closeViewerWithoutHistory();
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Initialize viewer from URL on mount
    const params = new URLSearchParams(window.location.search);
    const imageIndex = params.get("image");

    if (imageIndex !== null && images.length > 0) {
      const index = parseInt(imageIndex);
      if (index >= 0 && index < images.length) {
        openViewerWithoutHistory(images[index], index);
      }
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, [viewerOpen]); // Only depend on viewerOpen to avoid infinite loops

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
      <section className="select-none ">
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

  // Helper to open viewer without adding to history (used when initializing from URL)
  const openViewerWithoutHistory = (item, imageIndex) => {
    if (item.scroll) {
      setIsScroll(true);
    }
    setSelectedItem(item);
    setActiveImageIndex(0);
    setViewerOpen(true);
    setIsAtBottom(false);
  };

  const openViewer = (item, imageIndex) => {
    // Update URL with image index
    const params = new URLSearchParams(window.location.search);
    params.set("image", imageIndex);
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ viewerImageIndex: imageIndex }, "", url);

    if (item.scroll) {
      setIsScroll(true);
    }
    setSelectedItem(item);
    setActiveImageIndex(0);
    setViewerOpen(true);
    setIsAtBottom(false);
  };

  // Helper to close viewer without affecting history (used by popstate handler)
  const closeViewerWithoutHistory = () => {
    setIsScroll(false);
    setViewerOpen(false);
    setSelectedItem(null);
    setActiveImageIndex(0);
  };

  const closeViewer = () => {
    // Go back in history to remove the viewer URL
    window.history.back();
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
      <div className="max-w-3xl mx-auto px-4 pt-24">
        <nav className="text-sm text-gray-600">
          <button type="button" className="hover:underline text-gray-900 font-bold" onClick={() => (typeof setCurrentPage === "function" ? setCurrentPage("home") : window.history.back())}>
            Home
          </button>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900 font-bold ">{sourceCategory?.detailPage?.title || ""}</span>
        </nav>
      </div>

      {/* centered category title */}
      <h1 className="text-center md:text-5xl mb-4 mt-2 font-extrabold text-3xl">{sourceCategory?.detailPage?.title || ""}</h1>

      {/* pattern for the category images (dynamic data, same grid pattern) */}
      {groups.map((group, gi) => (
        <div key={gi} className="mx-auto space-y-2 md:space-y-4 px-4 md:px-8">
          {group[0] && (
            <div>
              <LazyMedia
                src={group[0].mainImage}
                alt={group[0].title}
                className="object-cover w-full rounded-xl h-[200px] md:h-[500px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                onClick={() => openViewer(group[0], gi * 6 + 0)}
              />
              <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl">{group[0].title}</h1>
            </div>
          )}


          <div className="grid grid-cols-12 gap-2 md:gap-4">
            {/* Row 1: group[1] and group[2] - if only one exists, make it full width */}
            <div className={group[1] && group[2] ? "col-span-4" : "col-span-12"}>
              {group[1] && (
                <div>
                  <LazyMedia
                    src={group[1].mainImage}
                    alt={group[1].title}
                    className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[1], gi * 6 + 1)}
                  />
                  <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl">{group[1].title}</h1>
                </div>
              )}
            </div>

            {group[1] && group[2] && (
              <div className="col-span-8">
                {group[2] && (
                  <div>
                    <LazyMedia
                      src={group[2].mainImage}
                      alt={group[2].title}
                      className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                      onClick={() => openViewer(group[2], gi * 6 + 2)}
                    />
                    <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl text-end">{group[2].title}</h1>
                  </div>
                )}
              </div>
            )}

            {/* If group[1] doesn't exist but group[2] does, show group[2] full width */}
            {!group[1] && group[2] && (
              <div className="col-span-12">
                <div>
                  <LazyMedia
                    src={group[2].mainImage}
                    alt={group[2].title}
                    className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[2], gi * 6 + 2)}
                  />
                  <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl">{group[2].title}</h1>
                </div>
              </div>
            )}

            {/* Row 2: group[3] - always full width */}
            <div className="col-span-12">
              {group[3] && (
                <div>
                  <LazyMedia
                    src={group[3].mainImage}
                    alt={group[3].title}
                    className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[3], gi * 6 + 3)}
                  />
                  <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl">{group[3].title}</h1>
                </div>
              )}
            </div>

            {/* Row 3: group[4] and group[5] - if only one exists, make it full width */}
            <div className={group[4] && group[5] ? "col-span-8" : "col-span-12"}>
              {group[4] && (
                <div>
                  <LazyMedia
                    src={group[4].mainImage}
                    alt={group[4].title}
                    className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[4], gi * 6 + 4)}
                  />
                  <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl">{group[4].title}</h1>
                </div>
              )}
            </div>

            {group[4] && group[5] && (
              <div className="col-span-4">
                {group[5] && (
                  <div>
                    <LazyMedia
                      src={group[5].mainImage}
                      alt={group[5].title}
                      className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                      onClick={() => openViewer(group[5], gi * 6 + 5)}
                    />
                    <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl text-end">{group[5].title}</h1>
                  </div>
                )}
              </div>
            )}

            {/* If group[4] doesn't exist but group[5] does, show group[5] full width */}
            {!group[4] && group[5] && (
              <div className="col-span-12">
                <div>
                  <LazyMedia
                    src={group[5].mainImage}
                    alt={group[5].title}
                    className="object-cover rounded-xl w-full h-[150px] md:h-[380px] cursor-pointer transition-transform hover:scale-102 will-change-transform"
                    onClick={() => openViewer(group[5], gi * 6 + 5)}
                  />
                  <h1 className="text-black font-semibold text-sm md:text-xl lg:text-2xl">{group[5].title}</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Modal Photo Viewer */}
      {isScroll && viewerOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/99 flex flex-col lg:flex-row items-center justify-start pt-32 md:pt-0 md:justify-center z-50 p-4 md:p-8 lg:p-16 gap-8 xl:gap-16" onClick={closeViewer}>
          <div className="w-full lg:w-3/8 md:py-8 xl:pe-32">
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="text-white text-xl md:text-5xl font-bold"> {selectedItem.title} </h1>
              <button
                type="button"
                className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform uppercase"
                onClick={(e) => {
                  e.stopPropagation();
                  closeViewer();
                }}
              >
                Back
              </button>
            </div>
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
                  {isVideo(selectedItem.carousel[activeImageIndex]) ? (
                    <video
                      src={selectedItem.carousel[activeImageIndex]}
                      controls
                      controlsList="nodownload"
                      loop
                      preload="metadata"
                      className="max-w-full lg:max-w-[100vh] max-h-[56vh] rounded-lg shadow-lg object-contain"
                      style={{ maxHeight: '56vh' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <img
                      src={selectedItem.carousel[activeImageIndex]}
                      alt="Full View"
                      className="max-w-full lg:max-w-[100vh] max-h-[56vh] rounded-lg shadow-lg object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <div ref={thumbnailContainerRef} className="hidden md:flex md:flex-row gap-2 mt-2 overflow-x-auto py-2 scrollbar-hide max-w-[680px]">
                    {selectedItem.carousel.map((thumb, index) => (
                      <div
                        key={index}
                        ref={(el) => (thumbnailRefs.current[index] = el)}
                        className={`w-32 h-16 rounded-md cursor-pointer border-2 flex-shrink-0 overflow-hidden ${activeImageIndex === index ? "border-white" : "border-transparent"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(index);
                        }}
                      >
                        {isVideo(thumb) ? (
                          <ReactPlayer
                            url={thumb}
                            width="100%"
                            height="100%"
                            light
                            className="object-cover"
                            style={{ pointerEvents: 'none' }}
                          />
                        ) : (
                          <img
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
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

      {/* Scroll View*/}
      {!isScroll && viewerOpen && selectedItem && (
        <div 
          ref={scrollContainerRef}
          onScroll={() => {
            if (scrollContainerRef.current) {
              const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
              setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 50);
            }
          }}
          className="fixed inset-0 bg-black/99 overflow-y-auto pt-16 md:pt-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="px-4 md:px-12 lg:px-86 py-4 md:py-20 " onClick={closeViewer}>
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="text-white text-xl md:text-4xl font-bold"> {selectedItem.title} </h1>
              <button
                type="button"
                className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform uppercase"
                onClick={(e) => {
                  e.stopPropagation();
                  closeViewer();
                }}
              >
                Back
              </button>
            </div>
            <h1 className="text-white text-sm md:text-xl font-extralight mt-2"> {selectedItem.description} </h1>
            <h1 className="text-white text-xs md:text-lg mt-2 font-extralight"> {selectedItem.madeIn} </h1>

            {/* photo viewer */}
            <div className="flex flex-col mt-2 pb-20 md:pb-0">
              {selectedItem.carousel.map((media, index) => (
                isVideo(media) ? (
                  <video
                    key={index}
                    src={media}
                    controls
                    controlsList="nodownload"
                    loop
                    preload="metadata"
                    className="w-full block"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <img
                    key={index}
                    src={media}
                    alt={`${selectedItem.title} - Image ${index + 1}`}
                    className="w-full block"
                    onClick={(e) => e.stopPropagation()}
                  />
                )
              ))}
            </div>
          </div>

          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                if (scrollContainerRef.current) {
                  if (isAtBottom) {
                    scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    scrollContainerRef.current.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" });
                  }
                }
              }}
              className="fixed bottom-9 left-1/2 -translate-x-1/2 z-50 bg-white text-black p-3 md:p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <motion.div
                key={isAtBottom ? "up" : "down"}
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {isAtBottom ? <FaArrowUp className="w-4 h-4 md:w-5 md:h-5" /> : <FaArrowDown className="w-4 h-4 md:w-5 md:h-5" />}
              </motion.div>
            </motion.button>
          </AnimatePresence>
        </div>
      )
      }
    </section >
  );
};

export default HomeCategories;
