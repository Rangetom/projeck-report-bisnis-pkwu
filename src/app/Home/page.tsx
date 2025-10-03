"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar/Page";
import Frooter from "../Components/Frooter/Page";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
// icons
import {
  IoCaretBackOutline,
  IoCaretForwardOutline,
  IoHeart,
  IoEye,
  IoChevronForward,
  IoFlame,
  IoTrendingUp,
  IoStar,
} from "react-icons/io5";

// images
import Nike from "@/app/aset/Bghome.png";
import speaker from "@/app/aset/speaker.png";
import stik from "@/app/aset/PlayStation 5  Wireless Controller.jpg";
import Playstation from "@/app/aset/Keranjang/Playstation5.png";
import Jamputih from "@/app/aset/Keranjang/JamTanganputih.png";
import Parfume from "@/app/aset/Keranjang/parfum.png";
import Parfume2 from "@/app/aset/Keranjang/parfum2.png";
import foto2 from "@/app/aset/assetHome/2.png";
import foto3 from "@/app/aset/assetHome/3.png";
import foto4 from "@/app/aset/assetHome/4.png";
import foto5 from "@/app/aset/assetHome/5.png";
import foto6 from "@/app/aset/assetHome/6.png";
import foto7 from "@/app/aset/assetHome/7.png";
import foto8 from "@/app/aset/assetHome/8.png";
import foto9 from "@/app/aset/assetHome/9.png";
import foto10 from "@/app/aset/assetHome/10.png";
import foto11 from "@/app/aset/assetHome/11.png";
import foto13 from "@/app/aset/assetHome/13.png";
import foto14 from "@/app/aset/assetHome/14.png";
import foto15 from "@/app/aset/assetHome/15.png";
import foto16 from "@/app/aset/assetHome/16.png";
import foto17 from "@/app/aset/assetHome/17.png";
import benner2 from "@/app/aset/assetHome/Benner2.png";
import benner3 from "@/app/aset/assetHome/benner3.png";
import benner4 from "@/app/aset/assetHome/benner4.png";
import benner5 from "@/app/aset/assetHome/benner5.png";
import benner6 from "@/app/aset/assetHome/Benner6.png";
import benner7 from "@/app/aset/assetHome/Benner7.png";
// Add interface for isVisible state
interface IsVisibleState {
  [key: string]: boolean;
}

// Add interface for timeLeft state
interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// Add interface for musicTimer state
interface MusicTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<IsVisibleState>({});

  // Check if element is in viewport for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/produks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProdukList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      }
    };

    fetchProduk();
  }, []);

  // Flash Sales
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "03",
    hours: "23",
    minutes: "19",
    seconds: "56",
  });

  // State untuk timer
  const [musicTimer, setMusicTimer] = useState<MusicTimer>({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
  });

  useEffect(() => {
    const targetDate = new Date(
      new Date().getTime() + 3 * 24 * 60 * 60 * 1000
    );
    const timerInterval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({ days: "15", hours: "10", minutes: "20", seconds: "10" });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({
          days: days < 10 ? "0" + String(days) : String(days),
          hours: hours < 10 ? "0" + String(hours) : String(hours),
          minutes: minutes < 10 ? "0" + String(minutes) : String(minutes),
          seconds: seconds < 10 ? "0" + String(seconds) : String(seconds),
        });
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Hero Banner ---
  const banners = [Nike, benner5, benner2, benner3, benner4, benner6, benner7];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Ganti banner setiap 5 detik
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  // Refs for scrolling carousels
  const flashRef = useRef<HTMLDivElement>(null);
  const thisMonthRef = useRef<HTMLDivElement>(null);
  const ourProductsRef = useRef<HTMLDivElement>(null);

  // Scroll handlers
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const element = ref.current;
      const scrollAmount = direction === "left" ? -300 : 300;
      element.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setMusicTimer((prev) => {
        if (
          prev.days === 0 &&
          prev.hours === 0 &&
          prev.minutes === 0 &&
          prev.seconds === 0
        ) {
          clearInterval(countdown);
          return prev; // Timer sudah habis
        }

        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Tambahkan fungsi formatPrice jika belum ada
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("id-ID").format(Number(price));
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Include the Navbar component */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Hero Banner with Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-lg overflow-hidden mb-8 relative group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                src={banners[currentBannerIndex]}
                alt="Banner"
                className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover transform transition duration-700 group-hover:scale-105 "
                width={1200}
                height={450}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white"
              ></motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Banner controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentBannerIndex === index
                    ? "w-6 bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => setCurrentBannerIndex(index)}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() =>
              setCurrentBannerIndex(
                (prev) => (prev - 1 + banners.length) % banners.length
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <IoCaretBackOutline className="text-white text-xl" />
          </button>
          <button
            onClick={() =>
              setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <IoCaretForwardOutline className="text-white text-xl" />
          </button>
        </motion.div>
        {/* Flash Sales */}
        <section className="mb-8 md:mb-12" id="flashSales" data-animate>
          <motion.div
            initial="hidden"
            animate={isVisible.flashSales ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex items-center gap-2 mb-4 md:mb-6"
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-[#315CEA] flex items-center gap-1"
            >
              <IoFlame className="animate-pulse text-red-500" />
              Today's
            </motion.h2>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-0">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-bold text-black relative inline-block"
              >
                Flash Sales
                <span className="absolute -top-1 -right-6 animate-ping h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              </motion.h2>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex gap-4 mt-2 sm:mt-0 sm:ml-8"
              >
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemFade}
                    className="text-center"
                  >
                    <div className="text-base md:text-lg font-bold bg-gradient-to-r from-[#4F75FF] to-[#315CEA] text-transparent bg-clip-text relative">
                      {item.value}
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute top-0 right-0 h-1 w-1 rounded-full bg-blue-500"
                      />
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll(flashRef, "left")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoCaretBackOutline className="text-xl text-black" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll(flashRef, "right")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoCaretForwardOutline className="text-xl text-black" />
              </motion.button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate={isVisible.flashSales ? "visible" : "hidden"}
            variants={staggerContainer}
            ref={flashRef}
            className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            {[
              {
                img: stik,
                name: "Controller Playstation 5",
                price: 6930000, // $462 x 15.000
                originalPrice: 4800000, // $320 x 15.000
                discount: 40,
                rating: 5,
                reviews: 88,
              },
              {
                img: foto2,
                name: "Mac-Pro 2020",
                price: 19485000, // $1299 x 15.000
                originalPrice: 29400000, // $1960 x 15.000
                discount: 35,
                rating: 4,
                reviews: 75,
              },
              {
                img: foto3,
                name: "HP Laptop",
                price: 11985000, // $799 x 15.000
                originalPrice: 5550000, // $370 x 15.000
                discount: 30,
                rating: 5,
                reviews: 99,
              },
              {
                img: foto4,
                name: "Asus Gaming Keyboard",
                price: 5985000, // $399 x 15.000
                originalPrice: 5625000, // $375 x 15.000
                discount: 25,
                rating: 4.5,
                reviews: 99,
              },
              {
                img: foto5,
                name: "Brother Printer",
                price: 5985000, // $399 x 15.000
                originalPrice: 5625000, // $375 x 15.000
                discount: 25,
                rating: 4.5,
                reviews: 99,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemFade}
                whileHover="hover"
                className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 snap-start shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg mb-4 group-hover:scale-110 transition-transform duration-500"
                    width={200}
                    height={200}
                  />
                  <motion.span
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs px-2 py-1 rounded-full"
                  >
                    -{item.discount}%
                  </motion.span>
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
                    >
                      <IoHeart className="text-red-400 text-sm md:text-base" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
                    >
                      <IoEye className="text-black text-sm md:text-base" />
                    </motion.button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                  >
                    <Link href="Pages/Detailproduk" className="w-full">
                      <button className="w-full py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1">
                        <span>Beli Sekarang</span>
                        <IoChevronForward />
                      </button>
                    </Link>
                  </motion.div>
                </div>
                <div className="h-[110px] flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-black mb-2 text-sm md:text-base truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#DB4444] font-medium text-sm md:text-base">
                        Rp{formatPrice(item.price)}
                      </span>
                      <span className="text-gray-400 line-through text-xs md:text-sm">
                        {item.originalPrice
                          ? `Rp${formatPrice(item.originalPrice)}`
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400 text-xs md:text-sm">
                        {Array.from({ length: Math.floor(item.rating) }).map(
                          (_, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              ★
                            </motion.span>
                          )
                        )}
                      </div>
                      <span className="text-xs md:text-sm text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>
                  <Link href="Pages/Detailproduk" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-3 md:mt-4 py-1.5 md:py-2 bg-[#315CEA] text-white rounded-md text-xs md:text-sm hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                    >
                      <span>Beli Sekarang</span>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      ></motion.span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile pagination dots */}
          <div className="flex justify-center mt-4 space-x-1 md:hidden">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ width: index === 0 ? "24px" : "8px", opacity: 0.6 }}
                animate={{
                  width: index === 0 ? "24px" : "8px",
                  opacity: index === 0 ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
                className={`h-1 rounded-full ${
                  index === 0 ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>
        {/* This Month */}
        <section className="mb-8 md:mb-12" id="thisMonth" data-animate>
          <motion.div
            initial="hidden"
            animate={isVisible.thisMonth ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex items-center gap-2 mb-4 md:mb-6"
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-[#315CEA] flex items-center gap-1"
            >
              <IoTrendingUp className="text-green-500 animate-bounce" />
              This Month
            </motion.h2>
          </motion.div>

          <div className="flex items-center justify-between mb-4 md:mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-bold text-black"
            >
              <span className="relative">
                <span className="relative z-10">Produk Terbaik di Amerika</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-200 -z-10 transform -rotate-1"></span>
              </span>
            </motion.h2>
            <div className="flex gap-2 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll(thisMonthRef, "left")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoCaretBackOutline className="text-xl text-black" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll(thisMonthRef, "right")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoCaretForwardOutline className="text-xl text-black" />
              </motion.button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate={isVisible.thisMonth ? "visible" : "hidden"}
            variants={staggerContainer}
            ref={thisMonthRef}
            className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            {[
              {
                img: foto6,
                name: "The north coat",
                price: 5985000, // $399 x 15.000
                originalPrice: 5400000, // $360 x 15.000
                rating: 5,
                reviews: 65,
              },
              {
                img: foto7,
                name: "Gucci duffle bag",
                price: 5985000, // $399 x 15.000
                originalPrice: 17400000, // $1160 x 15.000
                rating: 5,
                reviews: 65,
              },
              {
                img: foto8,
                name: "RGB liquid CPU Cooler",
                price: 5985000, // $399 x 15.000
                originalPrice: 2550000, // $170 x 15.000
                rating: 5,
                reviews: 65,
              },
              {
                img: foto9,
                name: "Small BookSelf",
                price: 5985000, // $399 x 15.000
                originalPrice: null,
                rating: 5,
                reviews: 65,
              },
              {
                img: foto10,
                name: "Small BookSelf",
                price: 5985000, // $399 x 15.000
                originalPrice: null,
                rating: 5,
                reviews: 65,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemFade}
                whileHover="hover"
                className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 snap-start shadow-sm group relative overflow-hidden"
              >
                {/* Glassmorphism background elements */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-purple-200 rounded-full opacity-20 blur-xl"></div>

                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover rounded-lg mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500"
                    width={200}
                    height={200}
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                      <IoHeart className="text-red-400 text-sm md:text-base" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
                    >
                      <IoEye className="text-black text-sm md:text-base" />
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium flex items-center gap-1"
                    >
                      <span>Beli Sekarang</span>
                      <IoChevronForward />
                    </motion.button>
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.h3
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="font-medium text-black mb-1 md:mb-2 text-sm md:text-base truncate"
                  >
                    {item.name}
                  </motion.h3>

                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + 0.1 * index }}
                      className="text-[#DB4444] font-medium text-sm md:text-base"
                    >
                      Rp{formatPrice(item.price)}
                    </motion.span>

                    {item.originalPrice && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + 0.1 * index }}
                        className="text-gray-400 line-through text-xs md:text-sm"
                      >
                        Rp{formatPrice(item.originalPrice)}
                      </motion.span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3 + 0.1 * index,
                          },
                        },
                      }}
                      className="flex text-yellow-400 text-xs md:text-sm"
                    >
                      {Array.from({ length: Math.floor(item.rating) }).map(
                        (_, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0, scale: 0.5 },
                              visible: { opacity: 1, scale: 1 },
                            }}
                          >
                            <IoStar className="text-yellow-400" />
                          </motion.span>
                        )
                      )}
                    </motion.div>

                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + 0.1 * index }}
                      className="text-xs md:text-sm text-gray-500"
                    >
                      ({item.reviews})
                    </motion.span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-3 md:mt-4 py-1.5 md:py-2 bg-[#315CEA] text-white rounded-md text-xs md:text-sm hover:bg-blue-600 transition-colors relative overflow-hidden group"
                  >
                    <span className="relative z-10">Beli Sekarang</span>
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-blue-700 -z-0"
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile View All button and pagination dots */}
          <div className="flex flex-col items-center mt-4 md:hidden">
            <div className="flex justify-center space-x-1 mb-4">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    width: index === 0 ? 24 : 8,
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`h-1 rounded-full ${
                    index === 0 ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 bg-[#315CEA] text-white rounded-full hover:bg-blue-600 transition-colors text-sm w-full max-w-xs"
            >
              View All Products
            </motion.button>
          </div>
        </section>

        {/* Enhanced Music Experience Section */}
        <section className="mb-8 md:mb-12" id="musicExperience" data-animate>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible.musicExperience
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 text-black rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center min-h-[300px] md:min-h-[500px] overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-blue-300 opacity-20 blur-3xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-300 opacity-20 blur-3xl"
            />

            {/* Sound wave animation */}
            <div className="absolute top-0 left-0 right-0 flex justify-center space-x-1 overflow-hidden h-20 opacity-40">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [10, 30, 20, 40, 10],
                    backgroundColor: ["#4F75FF", "#315CEA", "#4F75FF"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    repeatType: "reverse",
                  }}
                  className="w-1 bg-blue-500 rounded-full"
                />
              ))}
            </div>

            <div className="flex-1 mb-6 md:mb-0 relative z-10">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isVisible.musicExperience
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white text-lg md:text-xl mb-1 md:mb-2 font-medium flex items-center gap-2"
              >
                <Link href="/category" className="hover:text-white">
                  <span className="inline-block">Categories</span>
                </Link>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-2 h-2 bg-white rounded-full"
                />
              </motion.p>
                
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isVisible.musicExperience
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-white drop-shadow-lg"
              >
                Enhance Your
                <br />
                <span className="relative">
                  <span className="relative z-10">Music Experience</span>
                  <motion.span
                    animate={{ width: ["0%", "100%", "100%"] }}
                    transition={{ duration: 1, delay: 0.8, times: [0, 0.8, 1] }}
                    className="absolute bottom-0 left-0 h-3 bg-yellow-300 -z-10 opacity-60"
                  />
                </span>
              </motion.h2>

              <motion.div
                initial="hidden"
                animate={isVisible.musicExperience ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                  },
                }}
                className="flex gap-4 md:gap-8 mb-6 md:mb-12 justify-center md:justify-start"
              >
                {[
                  {
                    value: musicTimer.days.toString().padStart(2, "0"),
                    label: "Days",
                  },
                  {
                    value: musicTimer.hours.toString().padStart(2, "0"),
                    label: "Hours",
                  },
                  {
                    value: musicTimer.minutes.toString().padStart(2, "0"),
                    label: "Minutes",
                  },
                  {
                    value: musicTimer.seconds.toString().padStart(2, "0"),
                    label: "Seconds",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-1 md:mb-2 shadow-lg relative"
                    >
                      <span className="text-base md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                        {item.value}
                      </span>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                        className="absolute -inset-1 border-2 border-white rounded-full"
                      />
                    </motion.div>
                    <span className="text-xs md:text-sm text-white drop-shadow-md">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible.musicExperience
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center md:text-left"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-6 md:px-8 py-2 md:py-3 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:bg-blue-50 transition-colors text-sm md:text-base group relative overflow-hidden"
                >
                  <Link href="/Jbl/JblSpeakerdetail">
                    <span className="relative z-10">Beli sekarang</span>
                  </Link>
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 25, opacity: 0.1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-600 rounded-full"
                  />
                </motion.button>
              </motion.div>
            </div>

            <div className="flex-1 flex justify-center items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 40 }}
                animate={
                  isVisible.musicExperience
                    ? { opacity: 1, y: 0, rotateY: 0 }
                    : { opacity: 0, y: 20, rotateY: 40 }
                }
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.4,
                }}
                className="relative"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotateZ: [-2, 2, -2],
                    filter: [
                      "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.4))",
                      "drop-shadow(0 30px 20px rgba(0, 0, 0, 0.35))",
                      "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.4))",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={speaker}
                    alt="JBL Speaker"
                    className="w-full max-w-xs md:max-w-full h-auto object-contain"
                    width={400}
                    height={400}
                  />
                </motion.div>

                {/* Sound wave circles */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-white"
                  />
                ))}
              </motion.div>
            </div>

            {/* Decorative particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.5,
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        </section>
        {/* Our Products Section */}
        <section className="mb-8 md:mb-12" id="ourProducts" data-animate>
          <motion.div
            initial="hidden"
            animate={isVisible.ourProducts ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex items-center gap-2 mb-4 md:mb-6"
          >
            <div className="w-1 h-6 bg-[#315CEA]"></div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-[#315CEA] flex items-center gap-1"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              ></motion.span>
              Our Products
            </motion.h2>
          </motion.div>

          <div className="flex items-center justify-between mb-4 md:mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-bold text-black relative"
            >
              <span className="relative z-10">Jelajahi produk dari Luar</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-0.5"
              />
            </motion.h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll(ourProductsRef, "left")}
                className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoCaretBackOutline className="text-lg md:text-2xl text-black" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll(ourProductsRef, "right")}
                className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <IoCaretForwardOutline className="text-lg md:text-2xl text-black" />
              </motion.button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate={isVisible.ourProducts ? "visible" : "hidden"}
            variants={staggerContainer}
            ref={ourProductsRef}
            className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%] xl:auto-cols-[20%] gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            {[
              {
                img: foto10,
                name: "Breed Dry Dog Food",
                price: 1500000, // $100 x 15.000
                rating: 4,
                reviews: 35,
                new: true,
              },
              {
                img: foto11,
                name: "CANON EOS DSLR Camera",
                price: 5400000, // $360 x 15.000
                rating: 4,
                reviews: 95,
                new: true,
              },
              {
                img: foto13,
                name: "Curology Product Set",
                price: 7500000, // $500 x 15.000
                rating: 4,
                reviews: 145,
                new: true,
              },
              {
                img: foto14,
                name: "Kids Electric Car",
                price: 14400000, // $960 x 15.000
                rating: 5,
                reviews: 65,
                new: true,
              },
              {
                img: foto15,
                name: "Jr. Zoom Soccer Cleats",
                price: 17400000, // $1160 x 15.000
                rating: 4,
                reviews: 35,
                new: true,
              },
              {
                img: foto16,
                name: "GP11 Shooter USB Gamepad",
                price: 9900000, // $660 x 15.000
                rating: 4,
                reviews: 55,
                new: true,
              },
              {
                img: foto17,
                name: "Quilted Satin Jacket",
                price: 9900000, // $660 x 15.000
                rating: 4,
                reviews: 55,
                new: true,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemFade}
                whileHover="hover"
                className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 snap-start transform transition-all duration-500 group h-full"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="w-full h-36 sm:h-40 md:h-44 lg:h-52 object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                    width={200}
                    height={200}
                  />

                  {item.new && (
                    <motion.span
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-2 left-2 bg-[#315CEA] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ✦
                      </motion.span>
                      NEW
                    </motion.span>
                  )}

                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 md:p-1.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    >
                      <IoHeart className="text-red-400 text-sm md:text-base" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: -15 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 md:p-1.5 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                    >
                      <IoEye className="text-black text-sm md:text-base" />
                    </motion.button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <button className="w-full py-2 bg-white text-black rounded-full text-xs md:text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1">
                      <span>Quick View</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <IoChevronForward />
                      </motion.span>
                    </button>
                  </motion.div>
                </div>

                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                      className="font-medium text-black mb-1 md:mb-2 text-sm md:text-base truncate"
                    >
                      {item.name}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index + 0.4 }}
                      className="flex items-center gap-2 mb-1 md:mb-2"
                    >
                      <span className="text-[#DB4444] font-medium text-sm md:text-base">
                        Rp{formatPrice(item.price)}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index + 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex text-yellow-400 text-xs md:text-sm">
                        {Array.from({ length: Math.floor(item.rating) }).map(
                          (_, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * i + 0.1 * index }}
                              className="text-yellow-400"
                            >
                              ★
                            </motion.span>
                          )
                        )}
                      </div>
                      <span className="text-xs md:text-sm text-gray-500">
                        ({item.reviews})
                      </span>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#4F75FF" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-2 md:mt-4 py-1.5 md:py-2 bg-[#315CEA] text-white rounded-md text-xs md:text-sm transition-colors relative overflow-hidden group"
                  >
                    <span className="relative z-10">Beli Sekarang</span>
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-blue-700 -z-0"
                    />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile pagination indicators and button */}
          <div className="flex flex-col items-center mt-4 md:hidden">
            <div className="flex justify-center space-x-1 mb-4">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ width: index === 0 ? 24 : 8, opacity: 0 }}
                  animate={{ width: index === 0 ? 24 : 8, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`h-1 rounded-full ${
                    index === 0 ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 bg-[#315CEA] text-white rounded-full hover:bg-blue-600 transition-colors text-sm w-full max-w-xs"
            >
              View All Products
            </motion.button>
          </div>
        </section>

        {/* Featured Products Section - Revamped for better mobile/tablet experience */}
        <section className="mb-8 md:mb-12" id="featuredProducts" data-animate>
          <motion.div
            initial="hidden"
            animate={isVisible.featuredProducts ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-1 h-6 bg-blue-600"></div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-blue-600 flex items-center gap-1"
            >
              <motion.span
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                ✨
              </motion.span>
              Produk Terbaru
            </motion.h2>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 md:mb-8"
          >
            Produk terbaru dari
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative inline-block ml-2"
            >
              <span className="relative z-10">Jepang</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute bottom-0 left-0 h-3 bg-yellow-200 -z-10"
              />
            </motion.span>
          </motion.h2>

          {/* Mobile layout - Stacked cards */}
          <div className="md:hidden space-y-4">
            {/* PlayStation 5 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.featuredProducts
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 rounded-lg overflow-hidden h-[250px] shadow-lg"
            >
              <motion.div
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                  y: [0, -5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={Playstation}
                  alt="PlayStation 5"
                  className="w-3/4 h-3/4 object-contain"
                  width={400}
                  height={400}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 text-white"
              >
                <h3 className="text-xl font-bold mb-1 drop-shadow-md">
                  PlayStation 5
                </h3>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center text-white hover:underline font-medium text-sm group"
                >
                  <Link href="Pages/Detailproduk" className="w-full">
                    <span>Shop Now</span>
                  </Link>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-1"
                  >
                    <IoChevronForward />
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Animated particles */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    bottom: `${Math.random() * 20 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                />
              ))}
            </motion.div>

            {/* Women's Watches Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.featuredProducts
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-r from-blue-400 to-gray-200 rounded-lg overflow-hidden h-[200px] shadow-lg"
            >
              <div className="absolute top-0 left-0 p-4 z-10 max-w-[60%]">
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-bold text-white mb-1"
                >
                  Women's watches
                </motion.h3>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center text-white hover:underline font-medium text-sm group"
                >
                  <span>Shop Now</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <IoChevronForward className="ml-1" />
                  </motion.span>
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={Jamputih}
                    alt="Watch"
                    className="w-2/3 h-2/3 object-contain"
                    width={300}
                    height={300}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Perfume Cards - Side by side for tablet */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isVisible.featuredProducts
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-gradient-to-r from-blue-400 to-gray-200 rounded-lg overflow-hidden h-[200px] shadow-lg"
              >
                <div className="absolute top-0 left-0 p-4 z-10 max-w-[70%]">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg font-bold text-black mb-1"
                  >
                    Women's Collections
                  </motion.h3>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-white hover:underline font-medium group"
                  >
                    <span>Shop Now</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <IoChevronForward className="ml-1" />
                    </motion.span>
                  </motion.button>
                </div>
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={Parfume}
                    alt="Parfume"
                    className="absolute bottom-2 right-2 w-1/2 h-auto"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={
                  isVisible.featuredProducts
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 30 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-gradient-to-r from-blue-400 to-gray-200 rounded-lg overflow-hidden h-[200px] shadow-lg"
              >
                <div className="absolute top-0 left-0 p-4 z-10 max-w-[70%]">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg font-bold text-black mb-1"
                  >
                    Man's Collections
                  </motion.h3>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-black hover:underline font-medium text-sm group"
                  >
                    <span>Shop Now</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <IoChevronForward className="ml-1" />
                    </motion.span>
                  </motion.button>
                </div>
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={Parfume2}
                    alt="Parfume"
                    className="absolute bottom-2 right-2 w-1/2 h-auto"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* Desktop layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isVisible.featuredProducts ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            className="hidden md:grid md:grid-cols-12 gap-6"
          >
            {/* Left Column - PS5 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isVisible.featuredProducts
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="relative bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 rounded-2xl overflow-hidden md:col-span-7 h-[400px] lg:h-[500px] xl:h-[600px] shadow-lg group"
            >
              {/* Background animated gradients */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-blue-300 opacity-20 blur-3xl"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-300 opacity-20 blur-3xl"
              />

              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [-2, 2, -2],
                  filter: [
                    "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.3))",
                    "drop-shadow(0 30px 20px rgba(0, 0, 0, 0.25))",
                    "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.3))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={Playstation}
                  alt="PlayStation 5"
                  className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 text-white"
              >
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-md">
                  PlayStation 5
                </h3>
                <motion.button
                  whileHover={{ x: 8 }}
                  className="flex items-center text-white hover:underline font-medium group"
                >
                  <Link href="/Detailprodukjapan/Ps5">
                    <span>Shop Now</span>
                  </Link>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-1"
                  >
                    <IoChevronForward />
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Animated particles */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    bottom: `${Math.random() * 30 + 10}%`,
                    left: `${Math.random() * 70 + 15}%`,
                  }}
                />
              ))}
            </motion.div>

            {/* Right Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Left Column - PS5 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isVisible.featuredProducts
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="relative bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 rounded-2xl overflow-hidden md:col-span-7 h-[400px] lg:h-[500px] xl:h-[600px] shadow-lg group"
              >
                <div className="absolute top-0 left-0 p-6 z-10 max-w-[60%]">
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-bold text-white mb-2"
                  >
                    Women's watches
                  </motion.h3>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center text-white hover:underline font-medium group"
                  >
                    <Link href="/Detailprodukjapan/Jam">
                      <span>Shop Now</span>
                    </Link>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      <IoChevronForward />
                    </motion.span>
                  </motion.button>
                </div>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={Jamputih}
                    alt="Watch"
                    className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>

                {/* Circular pulse effect */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full border-2 border-gray-400"
                  />
                ))}
              </motion.div>

              <div className="grid grid-cols-2 gap-6"></div>
            </div>
          </motion.div>
        </section>
      </main>
      <section className="mb-12 px-4 md:px-6">
  <h2 className="text-xl font-bold mb-6">Produk dari Penjual</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {produkList.length > 0 ? (
      produkList.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          {item.foto && (
            <img
              src={`http://localhost:8000/storage/${JSON.parse(item.foto)[0]}`}
              alt={item.nama_produk}
              className="w-full h-40 object-cover rounded mb-2"
            />
          )}
          <h3 className="font-semibold text-sm truncate">
            {item.nama_produk}
          </h3>
          <p className="text-blue-600 font-bold text-sm">
            Rp {parseInt(item.harga).toLocaleString("id-ID")}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 col-span-full text-center">
        Belum ada produk yang diunggah.
      </p>
    )}
  </div>
</section>

      {/* Footer - Responsive */}
      <Frooter />
    </div>
  );
}
export default Home;
