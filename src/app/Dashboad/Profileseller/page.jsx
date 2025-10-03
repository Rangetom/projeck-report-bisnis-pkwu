"use client";

import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Siderbar from "../SiderSeller/page";

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("Profile Toko");
  const [formData, setFormData] = useState({
    namaToko: "",
    deskripsiToko: "",
  });

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle file selection for logo
  const handleLogoSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const sidebarVariants = {
    open: {
      x: 0,
      width: "16rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
    closed: {
      x: isSidebarOpen ? "-16rem" : 0,
      width: isSidebarOpen ? "16rem" : "0rem",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const logoVariants = {
    rest: { scale: 1, borderColor: "#E5E7EB" },
    hover: {
      scale: 1.05,
      borderColor: "#315CEA",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
    noLogo: {
      background: "linear-gradient(145deg, #f3f4f6, #ffffff)",
      boxShadow: "5px 5px 10px #d1d5db, -5px -5px 10px #ffffff",
    },
    withLogo: {
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const navIconVariants = {
    rest: { y: 0, opacity: 1 },
    hover: {
      y: -3,
      opacity: 1,
      color: "#315CEA",
      transition: { duration: 0.2 },
    },
  };

  const formFieldVariants = {
    rest: { borderColor: "#E5E7EB" },
    focus: {
      borderColor: "#315CEA",
      boxShadow: "0 0 0 2px rgba(49, 92, 234, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="flex h-screen bg-gray-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Siderbar />
          {/* Main Content */}
          <motion.main
            className="flex-1 flex flex-col overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Content Area */}
            <motion.div
              className="flex-1 p-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-2xl font-bold mb-6 text-gray-800"
                variants={itemVariants}
              >
                Informasi Toko Anda
              </motion.h1>

              <motion.div
                className="bg-white p-8 rounded-xl shadow-sm"
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Logo Upload Section */}
                  <motion.div
                    className="flex-shrink-0 md:w-1/3 flex flex-col items-center justify-center"
                    variants={itemVariants}
                  >
                    <motion.label
                      className={`w-40 h-40 border-2 rounded-full flex items-center justify-center cursor-pointer mb-4 overflow-hidden relative ${
                        logoPreview ? "border-[#315CEA]" : "border-gray-300"
                      }`}
                      variants={logoVariants}
                      initial={logoPreview ? "withLogo" : "noLogo"}
                      whileHover="hover"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoSelect}
                      />
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center text-gray-400"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <IoCloudUploadOutline className="text-4xl mb-2" />
                          <span className="text-sm text-center px-2">
                            Upload Logo
                          </span>
                        </motion.div>
                      )}

                      {/* Overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white text-sm font-medium">
                          Ubah Logo
                        </span>
                      </motion.div>
                    </motion.label>
                    <motion.span
                      className="text-center text-gray-700 font-medium"
                      variants={itemVariants}
                    >
                      Logo Toko
                    </motion.span>
                  </motion.div>

                  {/* Store Name and Description Section */}
                  <motion.div
                    className="md:w-2/3 space-y-6"
                    variants={containerVariants}
                  >
                    <motion.div variants={itemVariants}>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="namaToko"
                      >
                        Nama Toko
                      </label>
                      <motion.input
                        className="appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="namaToko"
                        type="text"
                        placeholder="Nama Toko Anda"
                        value={formData.namaToko}
                        onChange={handleInputChange}
                        variants={formFieldVariants}
                        initial="rest"
                        whileFocus="focus"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="deskripsiToko"
                      >
                        Deskripsi Toko
                      </label>
                      <motion.textarea
                        className="appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
                        id="deskripsiToko"
                        placeholder="Deskripsi Toko Anda"
                        rows={4}
                        value={formData.deskripsiToko}
                        onChange={handleInputChange}
                        variants={formFieldVariants}
                        initial="rest"
                        whileFocus="focus"
                      ></motion.textarea>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                      className="flex justify-end gap-4 mt-8"
                      variants={itemVariants}
                    >
                      <Link href="/Home">
                        <motion.button
                          className="px-6 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg font-medium transition-colors duration-200"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Kembali
                        </motion.button>
                      </Link>
                      <motion.button
                        className="px-6 py-3 bg-[#315CEA] text-white rounded-lg font-medium transition-colors duration-200"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        animate={{
                          boxShadow: [
                            "0px 0px 0px rgba(49, 92, 234, 0)",
                            "0px 2px 10px rgba(49, 92, 234, 0.4)",
                            "0px 0px 0px rgba(49, 92, 234, 0)",
                          ],
                        }}
                        transition={{
                          boxShadow: {
                            repeat: Infinity,
                            duration: 2,
                            repeatDelay: 1,
                          },
                        }}
                      >
                        Simpan Produk
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.footer
              className="bg-white text-black py-10 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Tentang Grip.com",
                      links: [
                        { name: "Tentang Kami", href: "/about" },
                        { name: "Karir", href: "/karir" },
                        { name: "Blog", href: "/blog" },
                        { name: "Press", href: "/press" },
                      ],
                    },
                    {
                      title: "Promo & Layanan",
                      links: [
                        { name: "Promo", href: "/promo" },
                        { name: "Layanan", href: "/layanan" },
                        {
                          name: "Syarat & Ketentuan",
                          href: "/syarat-ketentuan",
                        },
                        {
                          name: "Kebijakan Privasi",
                          href: "/kebijakan-privasi",
                        },
                      ],
                    },
                    {
                      title: "Pusat Bantuan",
                      links: [
                        { name: "FAQ", href: "/faq" },
                        { name: "Kontak", href: "/kontak" },
                        { name: "Pengembalian", href: "/pengembalian" },
                        { name: "Pengiriman", href: "/pengiriman" },
                      ],
                    },
                  ].map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.8 + sectionIndex * 0.1,
                        duration: 0.5,
                      }}
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.links.map((link, linkIndex) => (
                          <motion.li
                            key={link.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay:
                                0.9 + linkIndex * 0.05 + sectionIndex * 0.1,
                              duration: 0.3,
                            }}
                          >
                            <a
                              href={link.href}
                              className="hover:text-[#315CEA] transition-colors duration-200"
                            >
                              {link.name}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 flex justify-end space-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                    (Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="text-gray-600"
                        whileHover={{
                          y: -3,
                          color: "#315CEA",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <Icon size={22} />
                      </motion.a>
                    )
                  )}
                </motion.div>

                <motion.div
                  className="mt-8 text-center text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <motion.p
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    &copy; 2025 Grip.com. All rights reserved.
                  </motion.p>
                </motion.div>
              </div>
            </motion.footer>
          </motion.main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Dashboard;
