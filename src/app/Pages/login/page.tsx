"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/aset/logo.png";
import { motion } from "framer-motion";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = { role: "admin" }; // This should come from your auth context or API response
      if (user.role === "admin") {
        router.push("/Admin/H1");
      } else if (user.role === "seller") {
        router.push("/Dashboad/Profileseller");
      } else {
        router.push("/Home");
      }
    } catch (err) {
      alert("Login gagal.");
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col font-sans text-black overflow-hidden">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 px-4 sm:px-6 md:px-8">
        <motion.div
          className="bg-white max-w-4xl w-full p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-lg rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Left Image */}
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
                alt="Shopping Cart and Phone"
                width={300}
                height={300}
                className="w-3/4 h-auto rounded-lg shadow-md"
              />
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col justify-center space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-black">Welcome Back</h2>
              <p className="mt-2 text-base sm:text-lg text-gray-600">
                Please enter your details to log in
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleLogin}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Button - Login */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg font-medium text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? "Loading..." : "Login"}
              </motion.button>
            </motion.form>

            {/* Sign up link */}
            <motion.p
              className="text-center text-sm sm:text-base text-gray-600 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.8 }}
            >
              Don't have an account?{" "}
              <Link href="/Signup" className="text-blue-500 hover:underline font-medium">
                <motion.span whileHover={{ scale: 1.05, color: "#2563EB" }}>
                  Sign up
                </motion.span>
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-blue-50 to-purple-50 text-center py-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <p className="text-sm text-gray-600">© 2025 Grab & Ship. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}

export default Login;
