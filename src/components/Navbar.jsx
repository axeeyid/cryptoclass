import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = () => {
    setIsMenuOpen(false); // Menutup menu saat item diklik
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`bg-utama sticky top-0 z-50 backdrop-blur-md transition-opacity duration-300 ${
          scrolled ? "bg-opacity-85" : "bg-opacity-100"
        }`}
      >
        <div className="max-w container mx-auto">
          <div className="navbar flex items-center">
            {/* Toggle Button for Mobile */}
            <div className="navbar-start lg:hidden flex items-center">
              <button className="btn btn-ghost text-white" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
            </div>

            {/* Navbar Content for Desktop */}
            <div className="navbar-start hidden lg:flex">
              <div className="dropdown">
                <a
                  href="/"
                  className="text-white font-primary italic font-extrabold text-2xl"
                >
                  AxeeyId
                </a>
                <ul className="menu menu-sm dropdown-content glass rounded-box z-[1] mt-3 w-52 p-2 shadow text-white cursor-pointer">
                  <li>
                    <Link to="/" className="hover:text-ketiga">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/createsubs" className="hover:text-ketiga">
                      product
                    </Link>
                  </li>
                  <li>
                    <Link to="/createposting" className="hover:text-ketiga">
                      MyClass
                    </Link>
                  </li>
                  <li>
                    <Link to="/posting" className="hover:text-ketiga">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="flex gap-5 px-1 text-white text-xs font-primary font-bold cursor-pointer">
                <li>
                  <Link to="/" className="text-white hover:text-ketiga">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/createsubs" className="hover:text-ketiga">
                    product
                  </Link>
                </li>
                <li>
                  <Link to="/classview" className="hover:text-ketiga">
                    classs
                  </Link>
                </li>
                <li>
                  <Link to="/createposting" className="hover:text-ketiga">
                    MyClass
                  </Link>
                </li>
                <li>
                  <Link to="/posting" className="hover:text-ketiga">
                    Communty
                  </Link>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <Header />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 lg:hidden">
            <div className="flex flex-col items-center p-4">
              {/* Close Button */}
              <button className="self-end text-white" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ul className="flex flex-col items-center mt-6 w-full bg-utama backdrop-blur-md bg-opacity-85 text-white rounded-lg">
                <li className="py-2">
                  <Link
                    to="/"
                    className="text-white hover:text-ketiga"
                    onClick={handleItemClick}
                  >
                    Home
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    to="/products"
                    className="text-white hover:text-ketiga"
                    onClick={handleItemClick}
                  >
                    Product
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    to="/createsubs"
                    className="text-white hover:text-ketiga"
                    onClick={handleItemClick}
                  >
                    Courses
                  </Link>
                </li>

                <li className="py-2">
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-ketiga"
                    onClick={handleItemClick}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
