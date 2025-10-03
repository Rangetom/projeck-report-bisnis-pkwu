"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Frooter from "../Components/Frooter/Page";
import aks from "@/app/aset/Benner/BennerAksesoris.jpg";
import Navbar from "../Components/Navbar/Page";
import { motion } from "framer-motion";

import Aks1 from "@/app/aset/AssetAksesoris/1.png";
import Aks2 from "@/app/aset/AssetAksesoris/2.png";
import Aks3 from "@/app/aset/AssetAksesoris/3.png";
import Aks4 from "@/app/aset/AssetAksesoris/4.png";
import Aks5 from "@/app/aset/AssetAksesoris/5.png";
import Aks6 from "@/app/aset/AssetAksesoris/6.png";
import Aks7 from "@/app/aset/AssetAksesoris/7.png";
import Aks8 from "@/app/aset/AssetAksesoris/8.png";
import Aks9 from "@/app/aset/AssetAksesoris/9.png";
import Aks10 from "@/app/aset/AssetAksesoris/10.png";
import Aks11 from "@/app/aset/AssetAksesoris/11.png";
import Aks12 from "@/app/aset/AssetAksesoris/12.png";
import Aks13 from "@/app/aset/AssetAksesoris/13.png";
import Aks14 from "@/app/aset/AssetAksesoris/14.png";
import Aks15 from "@/app/aset/AssetAksesoris/15.png";
import Aks16 from "@/app/aset/AssetAksesoris/16.png";
import Aks17 from "@/app/aset/AssetAksesoris/17.png";
import Aks18 from "@/app/aset/AssetAksesoris/18.png";
import Aks19 from "@/app/aset/AssetAksesoris/19.png";
import Aks20 from "@/app/aset/AssetAksesoris/20.png";
import Aks21 from "@/app/aset/AssetAksesoris/21.png";
import Aks22 from "@/app/aset/AssetAksesoris/22.png";
import Aks23 from "@/app/aset/AssetAksesoris/23.png";
import Aks24 from "@/app/aset/AssetAksesoris/24.png";
import Aks25 from "@/app/aset/AssetAksesoris/25.png";
import { IoHeart, IoEye } from "react-icons/io5";

// Define the Aksesoris component
function Aksesoris() {
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
      y: 40,
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
    return new Intl.NumberFormat("id-ID").format(
      Math.round(Number(price) * 15000)
    );
  };

  // Product card component for reuse with animation
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
        <div className="bg-white rounded-sm border border-gray-100 p-3 md:p-4 h-full transform transition-transform duration-200">
          <div className="relative">
            <Image
              src={item.img}
              alt={item.name}
              className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-sm mb-3 md:mb-4"
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
                className="p-1 md:p-1.5 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.2, backgroundColor: "#EBF5FF" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <IoHeart className="text-black text-sm md:text-base" />
              </motion.button>
              <motion.button
                className="p-1 md:p-1.5 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.2, backgroundColor: "#EBF5FF" }}
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
            className="font-medium text-black mb-1 md:mb-2 text-sm md:text-base line-clamp-2"
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
              Rp{formatPrice(item.price)}
            </span>
            <span className="text-gray-400 line-through text-xs md:text-sm">
              {item.originalPrice ? `Rp${formatPrice(item.originalPrice)}` : ""}
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

  // Product collections for each section
  const products1 = [
    {
      img: Aks1,
      name: "Minimalist Silver Frame Glasses",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "minimalist-silver-frame-glasses",
    },
    {
      img: Aks2,
      name: "Black Velvet Choker Necklace",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "black-velvet-choker-necklace",
    },
    {
      img: Aks3,
      name: "Luxury Rose Gold Makeup Brush",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "luxury-rose-gold-makeup-brush",
    },
    {
      img: Aks4,
      name: "Elegant Silver Star Bracelet Set",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "elegant-silver-star-bracelet-set",
    },
    {
      img: Aks5,
      name: "Luxury Silver Heart Ring",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "luxury-silver-heart-ring",
    },
  ];

  const products2 = [
    {
      img: Aks6,
      name: "Silver Heart Pink Gemstone Ring",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "silver-heart-pink-gemstone-ring",
    },
    {
      img: Aks7,
      name: "Luxury Rose Gold Pen with Crown Top",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "luxury-rose-gold-pen-with-crown-top",
    },
    {
      img: Aks8,
      name: "Light Blue Vintage Baseball Cap",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "light-blue-vintage-baseball-cap",
    },
    {
      img: Aks9,
      name: "Gothic Black Bat Ring",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "gothic-black-bat-ring",
    },
    {
      img: Aks10,
      name: "Cartier Love Gold Bracelet",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "cartier-love-gold-bracelet",
    },
  ];

  const products3 = [
    {
      img: Aks11,
      name: "Elegant Silver Charm Bracelet",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "elegant-silver-charm-bracelet",
    },
    {
      img: Aks12,
      name: "Chunky Chain Ring",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "chunky-chain-ring",
    },
    {
      img: Aks13,
      name: "Adjustable Minimalist Open Ring",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "adjustable-minimalist-open-ring",
    },
    {
      img: Aks14,
      name: "Beaded Butterfly Bracelet",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "beaded-butterfly-bracelet",
    },
    {
      img: Aks15,
      name: "Silver Butterfly Stud Earrings",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "silver-butterfly-stud-earrings",
    },
  ];

  const products4 = [
    {
      img: Aks16,
      name: "Minimalist Silver Bead Bracelet",
      price: 399,
      originalPrice: 665,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "minimalist-silver-bead-bracelet",
    },
    {
      img: Aks17,
      name: "Elegant Black Clover Ring",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "elegant-black-clover-ring",
    },
    {
      img: Aks18,
      name: "Gold Eiffel Tower Pendant Necklace",
      price: 399,
      originalPrice: 570,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "gold-eiffel-tower-pendant-necklace",
    },
    {
      img: Aks19,
      name: "Silver Heart Ruby Gemstone Ring",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "silver-heart-ruby-gemstone-ring",
    },
    {
      img: Aks20,
      name: "Delicate Silver Leaf Bracelet",
      price: 399,
      originalPrice: 532,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "delicate-silver-leaf-bracelet",
    },
  ];

  const products5 = [
    {
      img: Aks21,
      name: "Rockstar Guitar Keychain Set",
      price: 399,
      originalPrice: 320,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "rockstar-guitar-keychain-set",
    },
    {
      img: Aks22,
      name: "Celestial Star Charm Keychain",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "celestial-star-charm-keychain",
    },
    {
      img: Aks23,
      name: "Elegant Blue Sapphire Ring",
      price: 399,
      originalPrice: 370,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "elegant-blue-sapphire-ring",
    },
    {
      img: Aks24,
      name: "Gold Heart Pearl Earrings",
      price: 399,
      originalPrice: 375,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "gold-heart-pearl-earrings",
    },
    {
      img: Aks25,
      name: "Minimalist Black Rose Temporary Tattoo",
      price: 399,
      originalPrice: 375,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "minimalist-black-rose-temporary-tattoo",
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
            src={aks}
            alt="Accessories banner"
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
            <h2 className="text-base text-[#315CEA]">Jewelry & Watches</h2>
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
            <h2 className="text-base text-[#315CEA]">Fashion Accessories</h2>
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
            <h2 className="text-base text-[#315CEA]">Bracelets & Rings</h2>
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
            <h2 className="text-base text-[#315CEA]">Necklaces & Pendants</h2>
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
            <h2 className="text-base text-[#315CEA]">
              Keychains & Small Accessories
            </h2>
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

export default Aksesoris;
