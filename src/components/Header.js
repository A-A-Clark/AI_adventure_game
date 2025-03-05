import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimer = useRef(null);

  const handleSignOut = () => {
    // Clear token and redirect to login
    setToken("");
    navigate("/login");
  };

  const handleMouseEnter = () => {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // Delay closing for 300ms
  };

  return (
    <header className="w-full flex items-center justify-between p-4 bg-blue-900">
      {/* Left section: Home icon */}
      <Link
        to="/game"
        title="Home"
        className="text-gray-800 dark:text-gray-100 text-3xl hover:text-gray-600 dark:hover:text-gray-300"
      >
        <FaHome />
      </Link>

      {/* Middle section: Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        The Endless Journey
      </h1>

      {/* Right section: Profile dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Profile Icon */}
        <FaUserCircle
          className="text-gray-800 dark:text-gray-100 text-3xl hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          title="Profile Menu"
        />

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg transition-opacity duration-200 opacity-100">
            <ul className="py-2">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
