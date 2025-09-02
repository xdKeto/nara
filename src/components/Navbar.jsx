import { useState } from "react";
import { RiCloseFill, RiMenu3Fill, RiMenuFill } from "react-icons/ri";

const Navbar = ({ currentPage, setCurrentPage, disabled = false }) => {
  const navItems = [
    { name: "PORTFOLIO", key: "home" },
    { name: "RESUME", key: "resume" },
    { name: "CONTACT", key: "contact" },
    { name: "WIP", key: "wip" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white select-none ${disabled ? "pointer-events-none opacity-100" : ""}`}>
      <div className=" flex px-8 py-4 mx-auto">
        <a href="#" onClick={() => !disabled && setCurrentPage("home")} className="text-2xl font-black flex me-8" aria-disabled={disabled}>
          NARA
        </a>
        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1  justify-center gap-2 md:gap-8 lg:gap-32 xl:gap-52 items-stretch">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={`text-lg px-6 h-full transition-colors ${currentPage === item.key ? "font-semibold border-b-2 border-black" : "font-semibold"}`}
                onClick={() => !disabled && setCurrentPage(item.key)}
                disabled={disabled}
                aria-disabled={disabled}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex-1 flex justify-end">
          <button onClick={() => !disabled && setMenuOpen(!menuOpen)} className="text-black focus:outline-none" aria-label={menuOpen ? "Close Menu" : "Open Menu"} disabled={disabled} aria-disabled={disabled}>
            {menuOpen ? <RiCloseFill className="w-6 h-6 " /> : <RiMenu3Fill className="w-6 h-6" />}{" "}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-12 left-0 w-full bg-white shadow-md z-50">
            <ul className="flex flex-col items-center py-4 gap-4">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    className={`px-6 py-2 w-full text-center transition-colors ${currentPage === item.key ? "font-semibold border-b-2 border-black" : "hover:bg-gray-100"}`}
                    onClick={() => {
                      if (disabled) return;
                      setCurrentPage(item.key);
                      setMenuOpen(false);
                    }}
                    disabled={disabled}
                    aria-disabled={disabled}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;