"use client";

import React, { useState, useEffect } from "react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";

const Sidebar = ({
  isSidebarOpen = true,
  setIsSidebarOpen,
  activeMenuItem = "",
  setActiveMenuItem,
}) => {
  const [localIsSidebarOpen, setLocalIsSidebarOpen] = useState(isSidebarOpen);
  const [localActiveMenuItem, setLocalActiveMenuItem] =
    useState(activeMenuItem);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    if (setIsSidebarOpen) {
      setLocalIsSidebarOpen(isSidebarOpen);
    }
  }, [isSidebarOpen, setIsSidebarOpen]);

  useEffect(() => {
    if (setActiveMenuItem) {
      setLocalActiveMenuItem(activeMenuItem);
    }
  }, [activeMenuItem, setActiveMenuItem]);

  useEffect(() => {
    if (isDesktop) {
      if (setIsSidebarOpen) {
        setIsSidebarOpen(true);
      } else {
        setLocalIsSidebarOpen(true);
      }
    }
  }, [isDesktop, setIsSidebarOpen]);

  const handleSidebarToggle = () => {
    if (setIsSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setLocalIsSidebarOpen(!localIsSidebarOpen);
    }
  };

  const handleMenuItemClick = (item) => {
    if (setActiveMenuItem) {
      setActiveMenuItem(item);
    } else {
      setLocalActiveMenuItem(item);
    }
  };

  const sidebarOpen = setIsSidebarOpen ? isSidebarOpen : localIsSidebarOpen;
  const currentActiveMenuItem = setActiveMenuItem
    ? activeMenuItem
    : localActiveMenuItem;

  const menuItems = [
    { name: "Profile Toko", path: "/Dashboad/Profileseller" },
    { name: "Tambah Produk", path: "/Dashboad/Produk" },
    { name: "Upload resi", path: "/Dashboad/upload" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && !isDesktop && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleSidebarToggle}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? (
          <IoCloseOutline className="text-2xl text-gray-700" />
        ) : (
          <IoMenuOutline className="text-2xl text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white text-gray-800 h-full shadow-lg z-40 w-64 overflow-hidden 
          ${isDesktop ? "static" : "fixed top-0 left-0"}
          ${!sidebarOpen && !isDesktop ? "-translate-x-full" : "translate-x-0"}
          transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Toko Saya</h1>
          </div>

          {/* Menu Items */}
          <ul className="space-y-4 flex-grow">
            {menuItems.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  href={item.path}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200
                    ${
                      currentActiveMenuItem === item.name
                        ? "text-[#315CEA] font-medium bg-[#315CEA] bg-opacity-10"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  onClick={() => handleMenuItemClick(item.name)}
                >
                  {currentActiveMenuItem === item.name && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#315CEA] rounded-r-full" />
                  )}
                  <span className="relative z-10 ml-1">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Toko Saya
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
