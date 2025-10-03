"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoChevronForward,
  IoReceipt,
  IoCard,
  IoShieldCheckmark,
  IoTime,
  IoDownload,
} from "react-icons/io5";

const PaymentCompletedPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [orderNumber] = useState(
    `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    setShowConfetti(true);

    // Simulating order details loading
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    // Hide confetti after some time
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity },
  };

  const shimmer = {
    hidden: { backgroundPosition: "200% 0" },
    visible: {
      backgroundPosition: "0 0",
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  const confettiVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Function to generate random confetti pieces
  const renderConfetti = () => {
    const confettiPieces = [];
    const colors = ["#FF4B91", "#FFB100", "#39A7FF", "#38E54D", "#FF90BC"];

    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 10 + 5;
      confettiPieces.push(
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            opacity: 1,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: window.innerHeight + 50,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            width: size,
            height: size,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            zIndex: 50,
          }}
        />
      );
    }
    return confettiPieces;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Decoration - Fixed the overflow issue */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10"></div>
        <motion.div
          className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-20"
          initial={{ x: -20, y: -20 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-60 h-60 bg-purple-200 rounded-full opacity-20"
          initial={{ x: 20, y: 20 }}
          animate={{ x: 0, y: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <motion.div
          variants={confettiVariants}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 pointer-events-none z-50"
        >
          {renderConfetti()}
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative z-10"
      >
        {/* Success Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 px-6 text-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 0.2 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full opacity-10"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
            className="mx-auto mb-6 bg-white rounded-full p-4 w-24 h-24 flex items-center justify-center shadow-md"
          >
            <motion.div animate={pulseAnimation}>
              <IoCheckmarkCircle className="text-green-500 text-6xl" />
            </motion.div>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-3"
          >
            Pembayaran Berhasil!
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-blue-100 text-lg">
            Pesanan Anda telah dikonfirmasi dan sedang diproses
          </motion.p>

          {/* Animated Line */}
          <motion.div
            className="h-1 bg-white opacity-30 rounded-full w-20 mx-auto mt-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 0.3 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </div>

        {/* Order Details */}
        <div className="p-6 sm:p-8 bg-white">
          {/* Order Info */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-medium text-gray-800 flex items-center">
                  <IoReceipt className="mr-2 text-indigo-600" />
                  Detail Pesanan
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-50 text-indigo-700 font-medium py-2 px-4 rounded-full text-sm border border-indigo-100 shadow-sm flex items-center"
              >
                <motion.span
                  animate={{
                    color: ["#4338ca", "#6366f1", "#4338ca"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {orderNumber}
                </motion.span>
              </motion.div>
            </div>

            <motion.div
              className="border border-gray-100 rounded-xl py-5 px-6 mb-6 shadow-sm bg-gradient-to-r from-white to-gray-50"
              whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <div className="mr-3 bg-indigo-100 p-2 rounded-full">
                    <IoCard className="text-indigo-600 text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Metode Pembayaran
                  </span>
                </div>
                <span className="font-medium text-black">
                  Transfer Bank BCA
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <IoShieldCheckmark className="text-green-600 text-lg" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    Status Pembayaran
                  </span>
                </div>
                <motion.span
                  className="text-green-600 font-medium flex items-center"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(22, 163, 74, 0)",
                      "0 0 5px rgba(22, 163, 74, 0.5)",
                      "0 0 0px rgba(22, 163, 74, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IoCheckmarkCircle className="mr-1" /> Lunas
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Products Summary */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <IoReceipt className="mr-2 text-indigo-600" />
              Ringkasan Pesanan
            </h3>
            <div className="space-y-4">
              <motion.div
                className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-white shadow-sm"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#f9fafb",
                }}
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl mr-4 flex-shrink-0 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"
                      initial="hidden"
                      animate="visible"
                      variants={shimmer}
                      style={{
                        backgroundSize: "200% 100%",
                        backgroundImage:
                          "linear-gradient(to right, #e5e7eb 0%, #f3f4f6 40%, #e5e7eb 100%)",
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">
                      Stick Controller
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Qty: 1</p>
                  </div>
                </div>
                <span className="font-medium text-indigo-700">
                  Rp 1.500.000
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Total */}
          <motion.div variants={fadeInUp} className="mb-8">
            <motion.div
              className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">Rp 6.900.000</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Pengiriman</span>
                <span className="text-gray-800">Rp 225.000</span>
              </div>
              <motion.div
                className="flex justify-between font-medium text-lg pt-3 border-t border-gray-200 mt-3"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <span className="text-gray-800">Total</span>
                <motion.span
                  className="text-indigo-700 font-bold"
                  animate={{
                    color: ["#4f46e5", "#6366f1", "#4f46e5"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Rp 7.125.000
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Delivery Timeline */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <IoTime className="mr-2 text-indigo-600" />
              Status Pengiriman
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-indigo-100"></div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative z-10">
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-green-500 rounded-full p-1.5 mr-4 flex-shrink-0 shadow-sm">
                    <IoCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Pembayaran Berhasil
                    </h4>
                    <p className="text-xs text-gray-500">
                      19 April 2025, 10:30
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-indigo-100 rounded-full p-1.5 mr-4 flex-shrink-0">
                    <motion.div
                      animate={{
                        backgroundColor: ["#c7d2fe", "#818cf8", "#c7d2fe"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="rounded-full p-1.5"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">
                      Pesanan Sedang Diproses
                    </h4>
                    <p className="text-xs text-gray-500">
                      Estimasi 19 April 2025
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-gray-200 rounded-full p-1.5 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">
                      Pesanan Dikirim
                    </h4>
                    <p className="text-xs text-gray-500">
                      Estimasi 21 April 2025
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-gray-200 rounded-full p-1.5 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">
                      Pesanan Diterima
                    </h4>
                    <p className="text-xs text-gray-500">
                      Estimasi 23 April 2025
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/Home" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors w-full shadow-lg shadow-indigo-200"
              >
                <span>Kembali Berbelanja</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <IoChevronForward className="text-lg" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>

          {/* Tracking Info */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center"
          >
            <motion.div
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <p className="text-sm text-blue-600 mb-1">
                Informasi pengiriman akan dikirim melalui email
              </p>
              <p className="text-sm text-blue-800 font-medium">
                Jika ada pertanyaan, hubungi customer service kami
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCompletedPage;
