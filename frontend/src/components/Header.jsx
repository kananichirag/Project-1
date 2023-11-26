import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const CurrentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowEvent = () => {
    setShowMenu((val) => !val);
  };

  const handleLogOut = () => {
    dispatch(logOutRedux());
    toast("Log out Succefully.!!!")
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
            <div className="text-3xl p-1 w-10 h-10 overflow-hidden rounded-full cursor-pointer">
              {CurrentUser.image ? (
                <img
                  className="h-full w-full rounded-full "
                  src={CurrentUser.image}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 px-2 py-2 mt-3 shadow bg-white drop-shadow-md">
                <div>
                  <Link
                    to="/new-product"
                    className="whitespace-nowrap cursor-pointer  p-1  rounded hover:text-white hover:bg-blue-500"
                  >
                    New Product
                  </Link>
                </div>
                {CurrentUser.image ? (
                  <p
                    className="cursor-pointer  bg-white  text-center mt-1 p-1 rounded hover:bg-red-500 hover:text-white"
                    onClick={handleLogOut}
                  >
                    Log out
                  </p>
                ) : (
                  <Link
                    to="/login"
                    className=" cursor-pointer text-center   px-8 py-1 rounded hover:text-white hover:bg-blue-500 "
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
