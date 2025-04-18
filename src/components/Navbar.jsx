import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/pasteSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.paste.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user:- ");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-2 sm:gap-0">
        
        {/* Logo */}
        <div className="text-3xl font-bold">
          <NavLink to="/" className="hover:text-gray-200 transition">
            Notes Saver
          </NavLink>
        </div>

        {/* Welcome message if logged in */}
        {loggedInUser && (
          <div className="text-2xl font-bold">
            Welcome, {loggedInUser.name || "User"}
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center gap-4 text-sm sm:text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-200 transition ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `hover:text-gray-200 transition ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            Notes
          </NavLink>

          {/* Login/Logout Button */}
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-gray-200 transition ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
