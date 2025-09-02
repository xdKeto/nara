import { useState, useEffect, useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import { div } from "framer-motion/client";
import { useFetchData } from "../hooks/FetchData";
import { updateGlobalData, getHomePageData, getContactPageData } from "../constants";
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
  hidden: { clipPath: "inset(0 50% 0 50%" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const Home = ({ onOpenCategory }) => {
  const { data, loading: fetchLoading, error } = useFetchData();

  useEffect(() => {
    // Update global data when fetch data changes
    if (data) {
      updateGlobalData({ data, loading: fetchLoading, error });
    }
  }, [data, fetchLoading, error]);

  if (fetchLoading) {
    return <LoadingScreen />;
  }

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

  // Get data from global variable
  const homePageData = getHomePageData();
  const contactPageData = getContactPageData();

  // console.log(homePageData?.bigTitle);

  return (
    <section className="select-none">
      <div className="relative">
        {homePageData?.bigImage?.url && <img src={getStrapiURL(homePageData.bigImage.url)} alt="Home Page Image" className="w-full h-screen md:h-auto object-cover" />}
        <h1 className="absolute top-28 md:left-18 left-8 text-white text-5xl md:text-9xl tracking-tight font-extrabold mb-4 text-left drop-shadow-lg whitespace-pre-line">{homePageData?.bigTitle}</h1>
      </div>

      <div className="p-6 md:p-16">
        {/* list of categories */}
        <div className="space-y-8">
          {homePageData?.homeCategories?.map((category, index) => (
            <button
              key={category.id}
              type="button"
              onClick={() => typeof onOpenCategory === "function" && onOpenCategory(category)}
              className="relative group w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <div className="relative overflow-hidden bg-gray-500">
                {category.thumbnail?.[0]?.url && <img src={getStrapiURL(category.thumbnail[0].url)} alt={category.title} className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className={`absolute bottom-4 ${index % 2 === 0 ? "right-6" : "left-6"}`}>
                  <h2 className="text-white text-3xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">{category.title}</h2>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
