"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Baju from "@/app/aset/Benner/Fashion.png";
import Navbar from "../Components/Navbar/Page";
import Frooter from "../Components/Frooter/Page";
import { motion } from "framer-motion";

import jaket1 from "@/app/aset/asetFashion/jaket1.png";
import jaket2 from "@/app/aset/asetFashion/jaket2.png";
import jaket3 from "@/app/aset/asetFashion/jaket3.png";
import jaket4 from "@/app/aset/asetFashion/jaket4.png";
import jaket5 from "@/app/aset/asetFashion/jaket5.png";

import kaos1 from "@/app/aset/asetFashion/kaos1.png";
import kaos2 from "@/app/aset/asetFashion/kaos2.png";
import kaos3 from "@/app/aset/asetFashion/kaos3.png";
import kaos4 from "@/app/aset/asetFashion/kaos4.png";
import kaos5 from "@/app/aset/asetFashion/kaos5.png";

import ohraga1 from "@/app/aset/asetFashion/olhraga1.png";
import ohraga2 from "@/app/aset/asetFashion/olhraga2.png";
import ohraga3 from "@/app/aset/asetFashion/olhraga3.png";
import ohraga4 from "@/app/aset/asetFashion/olhraga4.png";
import ohraga5 from "@/app/aset/asetFashion/olhraga5.png";

import sendal1 from "@/app/aset/asetFashion/sendal1.png";
import sendal2 from "@/app/aset/asetFashion/sendal2.png";
import sendal3 from "@/app/aset/asetFashion/sendal3.png";
import sendal4 from "@/app/aset/asetFashion/sendal4.png";
import sendal5 from "@/app/aset/asetFashion/sendal5.png";

import tas1 from "@/app/aset/asetFashion/tas1.png";
import tas2 from "@/app/aset/asetFashion/tas2.png";
import tas3 from "@/app/aset/asetFashion/tas3.png";
import tas4 from "@/app/aset/asetFashion/tas4.png";
import tas5 from "@/app/aset/asetFashion/tas5.png";

import { IoHeart, IoEye } from "react-icons/io5";
import Link from "next/link";

// Define the Fashion component
function Fashion() {
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
        staggerChildren: 0.1,
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
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  // Fungsi untuk memformat harga ke dalam bentuk rupiah
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("id-ID").format(
      Math.round(Number(price) * 15000)
    );
  };

  // Product card component for reuse
  const ProductCard = ({ item, index }) => (
    <motion.div
      variants={itemVariants}
      className="h-full"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <Link href={`/Detail/${item.slug || "detail"}`} className="block h-full">
        <div className="bg-white rounded-sm border border-gray-100 p-3 md:p-4 h-full transform transition-transform duration-200 hover:shadow-lg">
          <div className="relative">
            <Image
              src={item.img}
              alt={item.name}
              className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-sm mb-3 md:mb-4"
              width={200}
              height={200}
            />
            <span className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
              -{item.discount}%
            </span>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button className="p-1 md:p-1.5 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors">
                <IoHeart className="text-black text-sm md:text-base" />
              </button>
              <button className="p-1 md:p-1.5 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors">
                <IoEye className="text-black text-sm md:text-base" />
              </button>
            </div>
          </div>
          <h3 className="font-medium text-black mb-1 md:mb-2 text-sm md:text-base line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <span className="text-[#DB4444] font-medium text-sm md:text-base">
              Rp{formatPrice(item.price)}
            </span>
            <span className="text-gray-400 line-through text-xs md:text-sm">
              {item.originalPrice ? `Rp${formatPrice(item.originalPrice)}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-xs md:text-sm">
              {"★".repeat(Math.floor(item.rating))}
            </div>
            <span className="text-xs md:text-sm text-gray-500">
              ({item.reviews})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  // Product collections
  const tShirts = [
    {
      img: kaos1,
      name: "Urban Wave Tee",
      price: 12,
      originalPrice: 19,
      discount: 10,
      rating: 4.8,
      reviews: 88,
      slug: "urban-wave-tee",
    },
    // ... other t-shirts
    {
      img: kaos2,
      name: "Star Motion Tee",
      price: 9,
      originalPrice: 15,
      discount: 15,
      rating: 4.2,
      reviews: 75,
      slug: "star-motion-tee",
    },
    {
      img: kaos3,
      name: "Neon Graffiti Tee",
      price: 13,
      originalPrice: 18,
      discount: 9,
      rating: 4.9,
      reviews: 99,
      slug: "neon-graffiti-tee",
    },
    {
      img: kaos4,
      name: "Essential Dark Tee",
      price: 10,
      originalPrice: 16,
      discount: 20,
      rating: 4.5,
      reviews: 99,
      slug: "essential-dark-tee",
    },
    {
      img: kaos5,
      name: "Basic Sand Tee",
      price: 15,
      originalPrice: 22,
      discount: 15,
      rating: 4.7,
      reviews: 99,
      slug: "basic-sand-tee",
    },
  ];

  const hoodies = [
    {
      img: jaket1,
      name: "Cozy Winter Hoodie",
      price: 15,
      originalPrice: 25,
      discount: 12,
      rating: 4.8,
      reviews: 88,
      slug: "cozy-winter-hoodie",
    },
    // ... other hoodies
    {
      img: jaket2,
      name: "Street Style Sweater",
      price: 18,
      originalPrice: 35,
      discount: 15,
      rating: 4.2,
      reviews: 75,
      slug: "street-style-sweater",
    },
    {
      img: jaket3,
      name: "Dark Cloud Jacket",
      price: 12,
      originalPrice: 28,
      discount: 10,
      rating: 4.9,
      reviews: 99,
      slug: "dark-cloud-jacket",
    },
    {
      img: jaket4,
      name: "Worker Basic Jacket",
      price: 16,
      originalPrice: 32,
      rating: 4.5,
      discount: 14,
      reviews: 99,
      slug: "worker-basic-jacket",
    },
    {
      img: jaket5,
      name: "Checker Pattern Coat",
      price: 14,
      originalPrice: 30,
      discount: 13,
      rating: 4.7,
      reviews: 99,
      slug: "checker-pattern-coat",
    },
  ];

  const sportswear = [
    {
      img: ohraga1,
      name: "Nike Pro Elite Jersey",
      price: 15,
      originalPrice: 25,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "nike-pro-elite-jersey",
    },
    // ... other sportswear
    {
      img: ohraga2,
      name: "Sport Performance Tee",
      price: 18,
      originalPrice: 27,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "sport-performance-tee",
    },
    {
      img: ohraga3,
      name: "Urban Camo Training Shirt",
      price: 13,
      originalPrice: 19,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "urban-camo-training-shirt",
    },
    {
      img: ohraga4,
      name: "Under Armour Training Tee",
      price: 16,
      originalPrice: 21,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "under-armour-training-tee",
    },
    {
      img: ohraga5,
      name: "Adidas Basic Sport Tee",
      price: 14,
      originalPrice: 19,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "adidas-basic-sport-tee",
    },
  ];

  const bags = [
    {
      img: tas1,
      name: "Black Backpack",
      price: 120,
      originalPrice: 200,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "black-backpack",
    },
    // ... other bags
    {
      img: tas2,
      name: "Ruched Black Handbag",
      price: 130,
      originalPrice: 200,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "ruched-black-handbag",
    },
    {
      img: tas3,
      name: "Pink Ruched Shoulder Bag",
      price: 140,
      originalPrice: 200,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "pink-ruched-shoulder-bag",
    },
    {
      img: tas4,
      name: "Black Shoulder Bag",
      price: 150,
      originalPrice: 200,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "black-shoulder-bag",
    },
    {
      img: tas5,
      name: "Floral Plush Shoulder Bag",
      price: 160,
      originalPrice: 200,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "floral-plush-shoulder-bag",
    },
  ];

  const sandals = [
    {
      img: sendal1,
      name: "Pink Minimalist Sandals",
      price: 90,
      originalPrice: 150,
      discount: 40,
      rating: 5,
      reviews: 88,
      slug: "pink-minimalist-sandals",
    },
    // ... other sandals
    {
      img: sendal2,
      name: "Black Flip Flops",
      price: 130,
      originalPrice: 200,
      discount: 35,
      rating: 4,
      reviews: 75,
      slug: "black-flip-flops",
    },
    {
      img: sendal3,
      name: "Beige Bow Sandals",
      price: 140,
      originalPrice: 200,
      discount: 30,
      rating: 5,
      reviews: 99,
      slug: "beige-bow-sandals",
    },
    {
      img: sendal4,
      name: "Black Triple Strap Sandals",
      price: 150,
      originalPrice: 200,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "black-triple-strap-sandals",
    },
    {
      img: sendal5,
      name: "Brown Bow Sandals",
      price: 160,
      originalPrice: 200,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      slug: "brown-bow-sandals",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
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
            src={Baju}
            alt="Fashion banner"
            className="w-full h-[200px] md:h-[400px] object-cover"
            width={1200}
            height={400}
          />
        </motion.div>

        {/* T-Shirts Section */}
        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Kaos</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {tShirts.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        {/* Hoodies Section */}
        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Hoodie</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {hoodies.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        {/* Sportswear Section */}
        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Sport</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {sportswear.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        {/* Bags Section */}
        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Tas</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {bags.map((item, index) => (
              <ProductCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </section>

        {/* Sandals Section */}
        <section className="mb-8 md:mb-12">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-6"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <h2 className="text-base text-[#315CEA]">Sendal</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {sandals.map((item, index) => (
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

export default Fashion;
