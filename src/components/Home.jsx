import { useState, useEffect, useRef } from "react";
import HomeSkeleton from "./HomeSkeleton";
import { div } from "framer-motion/client";
import { useFetchData } from "../hooks/FetchData";
import { updateGlobalData, getHomePageData, getContactPageData } from "../constants";

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
  const { data, loading: fetchLoading, error } = useFetchData();

  useEffect(() => {
    // Update global data when fetch data changes
    if (data) {
      updateGlobalData({ data, loading: fetchLoading, error });
    }
  }, [data, fetchLoading, error]);

  if (fetchLoading) {
    return <HomeSkeleton />;
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

  return (
    <section className="select-none">
      <div className="px-6">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">{homePageData?.bigTitle || "Loading..."}</h1>
        <p className="text-gray-600 mb-8">{homePageData ? "Data loaded successfully" : "No data available"}</p>
        {!homePageData && !fetchLoading && (
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-800">
              <strong>Debug Info:</strong>
              <br />- Data: {JSON.stringify(data)}
              <br />- Loading: {fetchLoading}
              <br />- Error: {error}
              <br />- Home Page Data: {JSON.stringify(homePageData)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
