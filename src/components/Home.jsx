import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { useFetchData } from "../hooks/FetchData";
import { getStrapiURL } from "../utils/api";

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
  hidden: { clipPath: "inset(0 50% 0 50%)" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const Home = ({ onOpenCategory }) => {
  const { data, loading: fetchLoading, error } = useFetchData();
  const [heroReady, setHeroReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const homePageData = data?.homePage || null;

  useEffect(() => {
    if (homePageData && !homePageData?.bigImage?.url) {
      setHeroReady(true);
    }
  }, [homePageData]);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const categoriesSection = document.getElementById("home-categories");
      if (!categoriesSection) return;

      const rect = categoriesSection.getBoundingClientRect();
      const inSight = rect.top < window.innerHeight; // Categories are entering or in view
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isBottom = scrollPosition >= docHeight - 50; // Near bottom

      // Show if categories in sight AND not at bottom
      // Also ensure we are past the very top of the hero if that's implied, 
      // but "appears when list of categories is in sight" is the main condition.
      // And "doesnt appear in the hero section" implies if we are strictly looking at hero (which implies rect.top > window.innerHeight usually, unless hero is very short).
      // If hero is fully in view, rect.top is roughly window.innerHeight.
      
      if (inSight && !isBottom) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return (
      <section className="select-none">
        <div className="px-6">
          <h1 className="text-red-600 text-2xl md:text-4xl font-medium tracking-tight mb-4">Error Loading Data</h1>
          <p className="text-red-500 mb-8">{error}</p>
          <p className="text-gray-600">Please check your API connection and try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="select-none">
      <motion.div className="relative" id="hero" initial="hidden" animate={heroReady ? "visible" : "hidden"} variants={containerVariants}>
        {homePageData?.bigImage?.url && (
          <motion.img
            src={getStrapiURL(homePageData.bigImage.url)}
            alt="Home Page Image"
            className="w-full h-screen md:h-auto object-cover will-change-transform"
            variants={imageVariants}
            onLoad={() => setHeroReady(true)}
            onError={() => setHeroReady(true)}
          />
        )}
        <motion.h1 variants={textVariants} className="absolute top-28 md:left-18 left-8 text-white text-5xl md:text-9xl tracking-tight font-extrabold mb-4 text-left whitespace-pre-line will-change-transform">
          {homePageData?.bigTitle}
        </motion.h1>
        {/* Floating center "See" button */}
        <motion.button
          type="button"
          onClick={() => document.getElementById("home-categories")?.scrollIntoView({ behavior: "smooth" })}
          variants={textVariants}
          className="absolute left-1/2 bottom-26 md:bottom-40 -translate-x-1/2 -translate-y-1/2 z-10 bg-white text-black border-2 border-black rounded-none px-8 py-3 transition-transform duration-300 hover:scale-105 motion-safe:animate-bounce animate-float font-extrabold will-change-transform"
          aria-label="See categories"
        >
          EXPLORE
        </motion.button>
      </motion.div>

      <div className="p-6 md:p-16" id="home-categories">
        {/* list of categories */}
        <div className="space-y-8">
          {homePageData?.homeCategories?.map((category, index) => (
            <button
              key={category.id}
              type="button"
              onClick={() => typeof onOpenCategory === "function" && onOpenCategory(category)}
              className="relative group w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <div className="relative overflow-hidden bg-gray-500 h-[512px]">

                {category.thumbnail?.[0]?.url && <img src={getStrapiURL(isMobile && category.mobile_thumbnail?.url ? category.mobile_thumbnail.url : category.thumbnail[0].url)} alt={category.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 origin-center transform-gpu will-change-transform group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className={`absolute bottom-4 ${index % 2 === 0 ? "right-6" : "left-6"}`}>
                  <h2 className="text-white text-3xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">{category.title}</h2>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showFloatingButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" })}
            className="hidden md:flex fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-white text-black p-4 rounded-full shadow-2xl items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaArrowDown size={24} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;