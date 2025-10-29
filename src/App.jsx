import { useState } from "react";
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

function AppContent({ currentPage, setCurrentPage, selectedCategory, setSelectedCategory }) {
  const { loading } = useFetchData();

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
      BodyComponent = () => <HomeCategories category={selectedCategory} setCurrentPage={setCurrentPage} />;
      break;
    case "home":
    default:
      BodyComponent = () => <Home onOpenCategory={(cat) => { setSelectedCategory(cat); setCurrentPage("category"); }} />;
  }

  return (
    <>
      <Analytics />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} disabled={loading} />
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