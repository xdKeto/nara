import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Wip from "./components/Wip";
import { Analytics } from "@vercel/analytics/next";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

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
    case "home":
    default:
      BodyComponent = Home;
  }

  return (
    <>
      <Analytics />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="pt-24 pb-16 min-h-screen bg-white antialiased overflow-x-hidden overflow-y-hidden max-w-5xl mx-auto relative z-10 justify-items-center">
        <BodyComponent />
      </div>
      <Footer />
    </>
  );
}

export default App;
