"use client";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaShoppingCart,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";
import BCA from "@/app/aset/bca.jpg";
import Mandiri from "@/app/aset/mandiri.webp";
import Visa from "@/app/aset/visa.webp";
import speaker from "@/app/aset/speaker.png";
import Navbar from "../../Components/Navbar/Page";
import Frooter from "../../Components/Frooter/Page";
import Link from "next/link";
import { motion } from "framer-motion";

// Animasi untuk Footer
const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 200 },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      className="bg-white text-black py-10 border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Tentang Grip.com */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Tentang Grip.com
            </h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Tentang Kami
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/karir"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Karir
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/blog"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Blog
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/press"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Press
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Promo & Layanan */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Promo & Layanan
            </h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/promo"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Promo
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/layanan"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Layanan
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/syarat-ketentuan"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Syarat & Ketentuan
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/kebijakan-privasi"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Kebijakan Privasi
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Pusat Bantuan */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Pusat Bantuan
            </h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/faq"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  FAQ
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/kontak"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Kontak
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/pengembalian"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Pengembalian
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/pengiriman"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Pengiriman
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Social Media Icons */}
        <motion.div
          className="mt-8 flex justify-center sm:justify-end space-x-6"
          variants={itemVariants}
        >
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-600 bg-gray-100 p-3 rounded-full"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <FaFacebookF size={20} />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-400 bg-gray-100 p-3 rounded-full"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <FaTwitter size={20} />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-600 bg-gray-100 p-3 rounded-full"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <FaInstagram size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-800 bg-gray-100 p-3 rounded-full"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <FaLinkedinIn size={20} />
          </motion.a>
        </motion.div>

        {/* Copyright Notice */}
        <motion.div
          className="mt-8 text-center text-sm"
          variants={itemVariants}
        >
          <p>&copy; 2025 Grip.com. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    phone: "",
    message: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading halaman
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cek kelengkapan form setiap kali formData berubah
    const { name, address, postalCode, phone } = formData;
    setIsFormComplete(
      name !== "" && address !== "" && postalCode !== "" && phone !== ""
    );

    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const formSteps = ["Informasi Pembeli", "Metode Pembayaran"];

  const handleNextStep = () => {
    if (activeStep < formSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  // Loader animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent"
        ></motion.div>
      </div>
    );
  }

  // Tambahkan fungsi formatPrice untuk rupiah
  const formatPrice = (price: number | string) => {
    return (
      "Rp" +
      new Intl.NumberFormat("id-ID").format(Math.round(Number(price) * 15000))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Include the Navbar component */}
      <Navbar />

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <div className="flex justify-between mb-8">
          {formSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === activeStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {index + 1}
              </motion.div>
              <p className="mt-2 text-xs sm:text-sm text-center text-black">
                {step}
              </p>
              {/* Modified to not show line under step 1 */}
              {index === 1 && (
                <div className="h-1 w-full hidden sm:block mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 flex-1">
        <motion.div
          key={activeStep}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {activeStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Form Checkout */}
              <div className="md:col-span-2 space-y-4">
                <motion.h2
                  className="text-2xl font-semibold text-black mb-6"
                  variants={itemVariants}
                >
                  Detail Pesanan
                </motion.h2>

                <motion.div
                  className="bg-white rounded-lg shadow-lg p-6 space-y-4"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nama pemesan"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Alamat pengiriman"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Kode pos"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nomor handphone"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 text-black"
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-5 text-black" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Pesan (opsional)"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 text-black  "
                      rows="3"
                    ></textarea>
                  </div>

                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      type="checkbox"
                      id="save-info"
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label
                      htmlFor="save-info"
                      className="text-sm text-gray-400"
                    >
                      Simpan informasi untuk checkout berikutnya
                    </label>
                  </motion.div>
                </motion.div>
              </div>

              {/* Ringkasan Pesanan */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <h2 className="text-xl font-semibold text-black mb-4">
                  Ringkasan Pesanan
                </h2>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div
                    className="flex items-center justify-between py-3 border-b"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>

                  <motion.div
                    className="flex items-center justify-between py-3 border-b"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative overflow-hidden rounded-md">
                        <Image
                          src={speaker}
                          alt="Jbl Speaker"
                          width={60}
                          height={60}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-black">Jbl Speaker</p>
                        <p className="text-sm text-black">
                          1 x {formatPrice(112)}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-black ">
                      {formatPrice(112)}
                    </span>
                  </motion.div>

                  <div className="py-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-black">Subtotal</span>
                      <span className="text-black">{formatPrice(112)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-black">Pengiriman</span>
                      <span className="text-black">{formatPrice(13)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-bold text-lg text-black">
                      <span>Total</span>
                      <motion.span
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        {formatPrice(125)}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  onClick={handleNextStep}
                  disabled={!isFormComplete}
                  className={`bg-blue-600 text-white px-6 py-3 rounded-md w-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    !isFormComplete
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                  whileHover={isFormComplete ? { scale: 1.02 } : {}}
                  whileTap={isFormComplete ? { scale: 0.98 } : {}}
                >
                  <span>Lanjutkan ke Pembayaran</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <motion.h2
                  className="text-2xl font-semibold text-black mb-6"
                  variants={itemVariants}
                >
                  Metode Pembayaran
                </motion.h2>

                <motion.div
                  className="bg-white rounded-lg shadow-lg p-6 space-y-4"
                  variants={itemVariants}
                >
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      className={`border ${
                        paymentMethod === "Bank"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300"
                      } p-4 rounded-lg cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod("Bank")}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <input
                          type="radio"
                          id="bank"
                          name="payment"
                          value="Bank"
                          checked={paymentMethod === "Bank"}
                          onChange={() => setPaymentMethod("Bank")}
                          className="accent-blue-600 w-5 h-5"
                        />
                        <label
                          htmlFor="bank"
                          className="font-medium flex-1 text-black"
                        >
                          Transfer Bank
                        </label>
                        <FaCreditCard className="text-blue-600" size={24} />
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <Image
                          src={BCA}
                          alt="BCA"
                          width={60}
                          height={40}
                          className="object-contain"
                        />
                        <Image
                          src={Mandiri}
                          alt="Mandiri"
                          width={60}
                          height={40}
                          className="object-contain"
                        />
                        <Image
                          src={Visa}
                          alt="Visa"
                          width={60}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className={`border ${
                        paymentMethod === "COD"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300"
                      } p-4 rounded-lg cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod("COD")}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="accent-blue-600 w-5 h-5"
                        />
                        <label
                          htmlFor="cod"
                          className="font-medium flex-1 text-black"
                        >
                          EWallet
                        </label>
                        <FaShoppingCart className="text-blue-600" size={24} />
                      </div>
                    </motion.div>
                  </motion.div>

                  {paymentMethod === "Bank" && (
                    <motion.div
                      className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-medium mb-2 text-black">
                        Instruksi Pembayaran:
                      </h4>
                      <ol className="list-decimal list-inside text-sm  text-black">
                        <li>Pilih bank dari pilihan yang tersedia</li>
                        <li>Transfer ke rekening yang ditampilkan</li>
                        <li>Simpan bukti pembayaran</li>
                        <li>
                          Konfirmasi pembayaran melalui halaman konfirmasi
                        </li>
                      </ol>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Ringkasan Pesanan di step 2 */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <h2 className="text-xl font-semibold text-black mb-4">
                  Ringkasan Pesanan
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="py-3">
                    <div className="flex justify-between items-center py-2 text-black">
                      <span className="text-black">Subtotal</span>
                      <span>{formatPrice(112)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-black">Pengiriman</span>
                      <span className="text-black">{formatPrice(13)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-bold text-lg text-black">
                      <span>Total</span>
                      <motion.span
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        {formatPrice(125)}
                      </motion.span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    onClick={handlePrevStep}
                    className="bg-gray-200 text-black px-6 py-3 rounded-md font-medium transition-all duration-300 flex-1 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Kembali
                  </motion.button>
                  <motion.button
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex-1 font-medium transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/completepay">Konfirmasi Pesan</Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Frooter />
    </div>
  );
}
