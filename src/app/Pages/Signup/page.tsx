"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/app/aset/logo.png";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

const Sign = () => {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<"buyer" | "seller">("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "seller") {
      if (!name.trim()) {
        alert("Nama toko wajib diisi untuk penjual");
        return;
      }
      await register(name, email, password, type, name);
    } else {
      await register(name, email, password, type);
    }
    // Redirect jika admin
    if (type === "admin") {
      router.push("/Admin/H1");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-black">
      <motion.header
        className="bg-white shadow-sm p-4 sm:p-6 w-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1
            className="text-xl sm:text-2xl font-bold tracking-tight text-black"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Grab & Ship
          </motion.h1>
        </div>
      </motion.header>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="bg-white max-w-4xl w-full p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-lg rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hidden md:flex justify-center items-center">
            <motion.div
              className="relative"
              initial={{ rotateY: 45, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={300}
                height={300}
                className="w-3/4 h-auto rounded-lg shadow-md"
              />
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-pink-100 rounded-full z-[-1]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full z-[-1]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold">Create an account</h2>
              <p className="mt-2 text-base sm:text-lg text-black">Enter your details below</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* User Type */}
              <div className="flex space-x-4 mb-2">
                {["buyer", "seller", "admin"].map((role) => (
                  <label key={role} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value={role}
                      checked={type === role}
                      onChange={() => setType(role as "buyer" | "seller" | "admin")}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium capitalize">{role}</span>
                  </label>
                ))}
              </div>

              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-black mb-1">
                  {type === "buyer"
                    ? "Full Name"
                    : type === "seller"
                    ? "Store Name"
                    : "Admin Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-base text-black"
                  placeholder={
                    type === "buyer"
                      ? "Enter your name"
                      : type === "seller"
                      ? "Enter your store name"
                      : "Enter admin name"
                  }
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-black mb-1">
                  Email or Phone Number
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-base text-black"
                  placeholder="Enter your email or phone number"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-black mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-base text-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg font-semibold text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? "Creating..." : "Create Account"}
              </motion.button>
            </motion.form>

            <motion.p
              className="text-center text-sm sm:text-base text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.4 }}
            >
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline font-medium">
                <motion.span whileHover={{ scale: 1.05, color: "#2563EB" }}>Log In</motion.span>
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>

      <motion.footer
        className="bg-gradient-to-r from-blue-50 to-purple-50 text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <p className="text-sm text-gray-600">© 2025 Grab & Ship. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default Sign;
