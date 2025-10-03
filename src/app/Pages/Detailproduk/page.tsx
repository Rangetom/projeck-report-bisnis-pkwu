"use client";
import React, { useState } from "react";
import { FaTruck, FaCreditCard } from "react-icons/fa";
import { IoCartOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import Navbar from "../../Components/Navbar/Page";
import Frooter from "../../Components/Frooter/Page";
import Image from "next/image";
import Link from "next/link";
import sps5 from "@/app/aset/PlayStation 5  Wireless Controller.jpg";
import props5 from "@/app/aset/ps5 pro controller.webp";
import ps6 from "@/app/aset/ps6controller.webp";
import chs6 from "@/app/aset/charger.jpg";
import LCDMonitor from "@/app/aset/monitor.png";
import parfum from "@/app/aset/assetHome/2.png";
import ps5 from "@/app/aset/assetHome/3.png";

// Tambahkan fungsi formatPrice untuk rupiah
const formatPrice = (price: number | string) => {
  return (
    "Rp" +
    new Intl.NumberFormat("id-ID").format(Math.round(Number(price) * 15000))
  );
};

const Detail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(sps5);

  const colors = [
    { name: "Black", value: "black" },
    { name: "Beige", value: "beige" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Include the Navbar component */}
      <Navbar />
      <main className="container mx-auto p-4 sm:p-6 bg-white shadow-md mt-4 sm:mt-6">
        {/* Product detail section - Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product images - With touch-friendly gallery */}
          <div className="px-2 sm:px-0">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={currentImage}
                alt="Gamepad"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 snap-x">
              <div
                className="snap-center shrink-0 cursor-pointer"
                onClick={() => setCurrentImage(sps5)}
              >
                <Image
                  src={sps5}
                  alt="Gamepad Main"
                  width={80}
                  height={80}
                  className={`rounded-md border-2 ${
                    currentImage === sps5
                      ? "border-blue-500"
                      : "border-transparent hover:border-blue-300"
                  }`}
                />
              </div>
              <div
                className="snap-center shrink-0 cursor-pointer"
                onClick={() => setCurrentImage(props5)}
              >
                <Image
                  src={props5}
                  alt="Gamepad Side 1"
                  width={80}
                  height={80}
                  className={`rounded-md border-2 ${
                    currentImage === props5
                      ? "border-blue-500"
                      : "border-transparent hover:border-blue-300"
                  }`}
                />
              </div>
              <div
                className="snap-center shrink-0 cursor-pointer"
                onClick={() => setCurrentImage(ps6)}
              >
                <Image
                  src={ps6}
                  alt="Gamepad Side 2"
                  width={80}
                  height={80}
                  className={`rounded-md border-2 ${
                    currentImage === ps6
                      ? "border-blue-500"
                      : "border-transparent hover:border-blue-300"
                  }`}
                />
              </div>
              <div
                className="snap-center shrink-0 cursor-pointer"
                onClick={() => setCurrentImage(chs6)}
              >
                <Image
                  src={chs6}
                  alt="Gamepad Side 3"
                  width={80}
                  height={80}
                  className={`rounded-md border-2 ${
                    currentImage === chs6
                      ? "border-blue-500"
                      : "border-transparent hover:border-blue-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Product details - Better spacing and typography for mobile */}
          <div className="px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-black">
              Stick Controller
            </h2>
            <p className="text-yellow-500 flex items-center text-sm sm:text-base my-2">
              ⭐⭐⭐⭐ <span className="ml-1">4.5 (120 reviews)</span>
            </p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {formatPrice(462)}
              </p>
              <span className="line-through text-black text-sm">
                {formatPrice(600)}
              </span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                -23%
              </span>
            </div>
            <p className="text-black mt-4 text-sm sm:text-base">
              Wireless gaming controller with high-speed response and ergonomic
              design.
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-4"></div>

            {/* Quantity Selector - Modern and touch-friendly */}
            <div className="mt-6">
              <label className="font-semibold text-black block mb-2">
                Quantity:
              </label>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 bg-gray-200 text-black rounded-l-md flex items-center justify-center text-xl"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span className="bg-white h-10 px-4 flex items-center justify-center text-base border-t border-b min-w-[60px] text-black font-medium">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 bg-blue-600 text-white rounded-r-md flex items-center justify-center text-xl"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons - Full width on mobile */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="Keranjang2/">
                <button className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-6 py-3 rounded-md transition-colors flex-1 flex items-center justify-center">
                  <IoCartOutline className="mr-2" /> Keranjang
                </button>
              </Link>
              <Link href="Keranjang/" className="flex-1">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md w-full font-medium transition-colors">
                  Pesan Sekarang
                </button>
              </Link>
            </div>

            {/* Additional Features - Better organized for mobile */}
            <div className="mt-6 border p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-4 text-sm">
                <FaTruck className="text-blue-600 text-lg flex-shrink-0" />
                <div>
                  <p className="font-bold text-black">Pengiriman Gratis</p>
                  <p className="text-black">untuk pembelian di atas $50</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <FaCreditCard className="text-blue-600 text-lg flex-shrink-0" />
                <div>
                  <p className="font-bold text-black">Metode Pembayaran</p>
                  <p className="text-black">
                    Transfer Bank, E-Wallet, Credit Card
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Updated for better mobile scrolling */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-black">
              You may also like
            </h3>
            <button className="text-blue-600 font-medium text-sm">
              Lihat Semua
            </button>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 snap-x text-black">
            {[
              {
                name: "Gaming Monitor",
                price: 159.84,
                original: 199.99,
                image: LCDMonitor,
              },
              {
                name: "Mac Pro 2023",
                price: 99.0,
                original: 129.0,
                image: parfum,
              },
              {
                name: "Laptop Hewlett-Packard",
                price: 463.67,
                original: 499.99,
                image: ps5,
              },
              {
                name: "Controller Ps 5",
                price: 70.0,
                original: 85.0,
                image: props5,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm flex flex-col items-center bg-white snap-start min-w-[160px] sm:min-w-[200px]"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <h4 className="mt-2 font-medium text-center text-sm sm:text-base line-clamp-1">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-blue-600 font-semibold">
                    {formatPrice(item.price)}
                  </p>
                  <p className="text-black text-xs line-through">
                    {formatPrice(item.original)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer - Simplified and more responsive */}
      <Frooter />
    </div>
  );
};
// Accordion-style footer section component for mobile
const FooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="col-span-1">
      {/* Section title with toggle on mobile */}
      <div
        className="flex justify-between items-center cursor-pointer sm:cursor-default mb-2 sm:mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        <button className="sm:hidden">
          {isOpen ? <IoChevronUp /> : <IoChevronDown />}
        </button>
      </div>

      {/* Links - Collapsed on mobile if closed */}
      <ul
        className={`space-y-2 overflow-hidden transition-all duration-300 
          ${
            isOpen
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0 sm:max-h-48 sm:opacity-100"
          }`}
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-black hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
