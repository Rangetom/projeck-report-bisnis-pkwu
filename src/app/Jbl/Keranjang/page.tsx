"use client";
import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaRegHeart,
  FaHeart,
  FaTruck,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "../../Components/Navbar/Page";
import Frooter from "../../Components/Frooter/Page";
import speaker from "@/app/aset/speaker.png";
import Link from "next/link";

const formatPrice = (price: number | string) => {
  return (
    "Rp" +
    new Intl.NumberFormat("id-ID").format(Math.round(Number(price) * 15000))
  );
};

const Keranjang = () => {
  // Animation states
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Cart item with quantity state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Jbl Speaker",
      price: 112,
      quantity: 1,
      isFavorite: false,
      image: speaker,
    },
  ]);

  // Coupon state
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Apply discount if coupon applied
  const finalTotal = subtotal - discount;

  // Increment quantity
  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity
  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon.toLowerCase() === "discount10") {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
    } else if (coupon.toLowerCase() === "discount20") {
      setDiscount(subtotal * 0.2);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  // Animation on mount
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {/* Header and Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
              <div className="text-sm text-gray-500">
                <Link
                  href="/Home"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>{" "}
                / <span className="text-gray-800 font-medium">Cart</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items - Takes 2/3 of the space on desktop */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-4 md:p-6 shadow-sm rounded-xl"
              >
                <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link href="/Home">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                        >
                          {/* Product Image and Details */}
                          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="relative">
                              <div className="w-20 h-20 md:w-24 md:h-24 relative overflow-hidden rounded-lg">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover transition-transform hover:scale-110 duration-300"
                                />
                              </div>
                              <button
                                onClick={() => toggleFavorite(item.id)}
                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                              >
                                {item.isFavorite ? (
                                  <FaHeart className="text-red-500" />
                                ) : (
                                  <FaRegHeart className="text-gray-400" />
                                )}
                              </button>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-blue-600 text-lg font-semibold">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>

                          {/* Quantity and Remove */}
                          <div className="flex items-center space-x-4 self-end sm:self-auto">
                            <div className="flex items-center border border-gray-200 rounded-full">
                              <button
                                onClick={() => decrementQuantity(item.id)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => incrementQuantity(item.id)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Continue Shopping Button */}
                <div className="mt-6">
                  <Link href="/Home">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <FaArrowLeft className="mr-2" /> Continue Shopping
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Order Summary - Takes 1/3 of the space on desktop */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-4 md:p-6 shadow-sm rounded-xl sticky top-4"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                {/* Order Calculations */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Have a coupon?</p>
                  <div className="flex">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-[#315CEA] hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <div className="flex items-center mt-2 text-green-600 text-sm">
                      <span className="mr-2">Coupon applied!</span>
                      <button
                        onClick={() => {
                          setCouponApplied(false);
                          setDiscount(0);
                          setCoupon("");
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <IoClose />
                      </button>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <Link href="Checkout/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#315CEA] text-white w-full py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                {/* Shipping Info */}
                <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaTruck className="mr-2 text-gray-400" />
                    <span>Free shipping on all orders</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <Frooter />
    </div>
  );
};

export default Keranjang;
