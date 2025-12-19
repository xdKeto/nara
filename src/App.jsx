import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Wip from "./components/Wip";
import { Analytics } from "@vercel/analytics/react";
import { FetchDataProvider } from "./hooks/FetchData";
import HomeCategories from "./components/HomeCategories";
import LoadingScreen from "./components/LoadingScreen";
import { useFetchData } from "./hooks/FetchData";
import Snowfall from "react-snowfall";

function AppContent({ currentPage, setCurrentPage, selectedCategory, setSelectedCategory }) {
  const { loading, data } = useFetchData();

  // Handle URL-based navigation
  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state || {};
      
      if (state.page) {
        setCurrentPage(state.page);
        if (state.category) {
          setSelectedCategory(state.category);
        }
      } else {
        // Default to home if no state
        setCurrentPage("home");
        setSelectedCategory(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Initialize from current URL on mount
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    const categoryId = params.get("category");

    if (pageParam) {
      setCurrentPage(pageParam);
      
      // If there's a category ID, find it in the data
      if (categoryId && data?.homePage?.homeCategories) {
        const category = data.homePage.homeCategories.find(cat => cat.id === parseInt(categoryId));
        if (category) {
          setSelectedCategory(category);
        }
      }
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, [data, setCurrentPage, setSelectedCategory]);

  // Helper function to navigate with URL update
  const navigateToPage = (page, category = null) => {
    const params = new URLSearchParams();
    params.set("page", page);
    
    if (category) {
      params.set("category", category.id);
    }

    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ page, category }, "", url);
    
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
  };

  let BodyComponent;
  switch (currentPage) {
    case "resume":
      BodyComponent = Resume;
      break;
    case "contact":
      BodyComponent = Contact;
      break;
    case "wip":
      BodyComponent = Wip;
      break;
    case "category":
      BodyComponent = () => <HomeCategories category={selectedCategory} setCurrentPage={(page) => navigateToPage(page)} />;
      break;
    case "home":
    default:
      BodyComponent = () => <Home onOpenCategory={(cat) => navigateToPage("category", cat)} />;
  }

  return (
    <>
      <Snowfall
        color="#dee4fd"
        snowflakeCount={200}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
      <Analytics />
      <Navbar currentPage={currentPage} setCurrentPage={(page) => navigateToPage(page)} disabled={loading} />
      <div className="pb-16 min-h-screen bg-white antialiased overflow-x-hidden overflow-y-hidden mx-auto relative z-10 justify-items-center ">
        <BodyComponent />
      </div>
      <Footer />
      {loading && <LoadingScreen />}
    </>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <FetchDataProvider>
      <AppContent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </FetchDataProvider>
  );
}

export default App;