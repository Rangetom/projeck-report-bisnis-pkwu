"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoHeart, IoEye } from "react-icons/io5";
import Navbar from "../Components/Navbar/Page";
import Frooter from "../Components/Frooter/Page";
import { motion } from "framer-motion";

// image
import gadget from "@/app/aset/Benner/Bennergadget.png";
import Gadget1 from "@/app/aset/AssetGadget/1.png";
import Gadget2 from "@/app/aset/AssetGadget/2.png";
import Gadget3 from "@/app/aset/AssetGadget/3.png";
import Gadget4 from "@/app/aset/AssetGadget/4.png";
import Gadget5 from "@/app/aset/AssetGadget/5.png";
import Gadget6 from "@/app/aset/AssetGadget/6.png";
import Gadget7 from "@/app/aset/AssetGadget/7.png";
import Gadget8 from "@/app/aset/AssetGadget/8.png";
import Gadget9 from "@/app/aset/AssetGadget/9.png";
import Gadget10 from "@/app/aset/AssetGadget/10.png";
import Gadget11 from "@/app/aset/AssetGadget/11.png";
import Gadget12 from "@/app/aset/AssetGadget/12.png";
import Gadget13 from "@/app/aset/AssetGadget/13.png";
import Gadget14 from "@/app/aset/AssetGadget/14.png";
import Gadget15 from "@/app/aset/AssetGadget/15.png";
import Gadget16 from "@/app/aset/AssetGadget/16.png";
import Gadget17 from "@/app/aset/AssetGadget/17.png";
import Gadget18 from "@/app/aset/AssetGadget/18.png";
import Gadget19 from "@/app/aset/AssetGadget/19.png";
import Gadget20 from "@/app/aset/AssetGadget/20.png";
import Gadget21 from "@/app/aset/AssetGadget/21.png";
import Gadget22 from "@/app/aset/AssetGadget/22.png";
import Gadget23 from "@/app/aset/AssetGadget/23.png";
import Gadget24 from "@/app/aset/AssetGadget/24.png";
import Gadget25 from "@/app/aset/AssetGadget/25.png";
import Link from "next/link";

function Gadget() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

  // Animation variants for product container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for section headings
  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Animation variants for individual products
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      x: Math.random() * 100 - 50, // Random offset between -50 and 50px
      rotate: Math.random() * 10 - 5, // Slight random rotation
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  // Tambahkan fungsi formatPrice untuk rupiah
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("id-ID").format(Math.round(Number(price)));
  };

  // Product card component for reuse
  const ProductCard = ({ item, index }) => (
    <motion.div
      variants={itemVariants}
      className="h-full"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 },
      }}
    >
      <Link href={`/product/${item.slug}`} className="block h-full">
        <div className="bg-white rounded-sm border border-gray-100 p-3 md:p-4 h-full">
          <div className="relative">
            <Image
              src={item.img}
              alt={item.name}
              className="w-full h-32 md:h-48 object-cover rounded-sm mb-3 md:mb-4"
              width={200}
              height={200}
            />
            <motion.span
              className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs px-2 py-1 rounded"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
            >
              -{item.discount}%
            </motion.span>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <motion.button
                className="p-1 md:p-1.5 bg-white rounded-full shadow-sm"
                whileHover={{ scale: 1.2, backgroundColor: "#f5f5f5" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <IoHeart className="text-black text-sm md:text-base" />
              </motion.button>
              <motion.button
                className="p-1 md:p-1.5 bg-white rounded-full shadow-sm"
                whileHover={{ scale: 1.2, backgroundColor: "#f5f5f5" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <IoEye className="text-black text-sm md:text-base" />
              </motion.button>
            </div>
          </div>
          <motion.h3
            className="font-medium text-black text-sm md:text-base mb-1 md:mb-2 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {item.name}
          </motion.h3>
          <motion.div
            className="flex items-center gap-2 mb-1 md:mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[#DB4444] font-medium text-sm md:text-base">
              Rp{formatPrice(Number(item.price) * 15000)}
            </span>
            <span className="text-gray-400 line-through text-xs md:text-sm">
              {item.originalPrice
                ? `Rp${formatPrice(Number(item.originalPrice) * 15000)}`
                : ""}
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex text-yellow-400 text-xs md:text-sm">
              {"★".repeat(Math.floor(item.rating))}
            </div>
            <span className="text-xs md:text-sm text-gray-500">
              ({item.reviews})
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );

  // Product data arrays
  const products1 = [
    {
      img: Gadget1,
      name: "Instant Mini Camera",
      price: 189.89,
      originalPrice: 200,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "instant-mini-camera",
    },
    {
      img: Gadget2,
      name: "Premium Headphones",
      price: 79,
      originalPrice: 100,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "premium-headphones",
    },
    {
      img: Gadget3,
      name: "Small Microphone Kit",
      price: 69,
      originalPrice: 80,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "small-microphone-kit",
    },
    {
      img: Gadget4,
      name: "Apple Watch Series 8",
      price: 460.64,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "apple-watch-series-8",
    },
    {
      img: Gadget5,
      name: "iPad Air 5",
      price: 534.44,
      originalPrice: 570,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "ipad-air-5",
    },
  ];

  const products2 = [
    {
      img: Gadget6,
      name: "HV-G92 Microphone",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "hv-g92-microphone",
    },
    {
      img: Gadget7,
      name: "Garmin inReach Mini",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "garmin-inreach-mini",
    },
    {
      img: Gadget8,
      name: "Foldable Keyboard",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "foldable-keyboard",
    },
    {
      img: Gadget9,
      name: "Apple iMac Desktop",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "apple-imac-desktop",
    },
    {
      img: Gadget10,
      name: "Gaming PC Setup",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "gaming-pc-setup",
    },
  ];

  const products3 = [
    {
      img: Gadget11,
      name: "JBL Black Over-Ear Headphones",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "jbl-black-over-ear-headphones",
    },
    {
      img: Gadget12,
      name: "High-Performance Gaming PC",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "high-performance-gaming-pc",
    },
    {
      img: Gadget13,
      name: "Oculus Quest 2 VR Headset",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "oculus-quest-2-vr-headset",
    },
    {
      img: Gadget14,
      name: "Red & Black Wireless Headphones",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "red-black-wireless-headphones",
    },
    {
      img: Gadget15,
      name: "Nintendo gen 2 Switch Console",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "nintendo-gen-2-switch-console",
    },
  ];

  const products4 = [
    {
      img: Gadget16,
      name: "Razer Zephyr Smart Mask",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "razer-zephyr-smart-mask",
    },
    {
      img: Gadget17,
      name: "PlayStation 5 Slim",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "playstation-5-slim",
    },
    {
      img: Gadget18,
      name: "Apple AirPods Pro (2nd Gen)",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "apple-airpods-pro-2nd-gen",
    },
    {
      img: Gadget19,
      name: "Sony WH-1000XM5 Headphones",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "sony-wh-1000xm5-headphones",
    },
    {
      img: Gadget20,
      name: "Sony PSP Handheld Console",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "sony-psp-handheld-console",
    },
  ];

  const products5 = [
    {
      img: Gadget21,
      name: "ASUS WiFi 6 Gaming Router",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "asus-wifi-6-gaming-router",
    },
    {
      img: Gadget22,
      name: "Luxury Retro Wireless Mouse",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "luxury-retro-wireless-mouse",
    },
    {
      img: Gadget23,
      name: "Acer Aspire 5 Laptop",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "acer-aspire-5-laptop",
    },
    {
      img: Gadget24,
      name: "GoPro HERO11 with Tripod",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "gopro-hero11-with-tripod",
    },
    {
      img: Gadget25,
      name: "Acoustic Energy Bookshelf Speakers",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "acoustic-energy-bookshelf-speakers",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Include the Navbar component */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Hero Banner */}
        <motion.div
          className="rounded-lg overflow-hidden mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={gadget}
            alt="Gadget banner"
            className="w-full h-[200px] md:h-[400px] object-cover"
            width={1200}
            height={400}
          />
        </motion.div>

        {/* Product Sections */}
        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Today's Top Picks</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {products1.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Audio & Recording</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products2.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Gaming & Entertainment</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products3.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">
              Wearables & Accessories
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products4.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Computer & Network</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products5.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>
      </main>
      {/* Footer - Responsive */}
      <Frooter />
    </div>
  );
}

export default Gadget;
