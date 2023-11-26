import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowEvent = () => {
    setShowMenu((val) => !val);
  };

  return (
    <header className="fixed shadow w-full h-16 p-3 md:p-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-10">
            <img src={logo} className="h-full " />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-8 text-base md:text-lg">
            <Link to={"/home"}>Home</Link>
            <Link to={"/menu"}>Menu</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contect"}>Contect</Link>
          </nav>
          <div className="text-slate-700 text-2xl relative">
            <FaCartShopping />
            <div className="absolute -top-2 -right-2 text-white bg-red-500 h-4  w-4  text-xs rounded-full  text-center">
              0
            </div>
          </div>
          <div className="text-slate-700 text-xl " onClick={handleShowEvent}>
            <div className="border-2 boprder-solid border-slate-500 p-1 rounded-full cursor-pointer">
              <FaUserLarge />
            </div>
            {showMenu && (
              <div className="absolute right-2 px-3 py-2 mt-3 shadow bg-white drop-shadow-md">
                <div>
                  <Link
                    to="/new-product"
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New Product
                  </Link>
                </div>
                <Link to="/login" className="whitespace-nowrap cursor-pointer">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
