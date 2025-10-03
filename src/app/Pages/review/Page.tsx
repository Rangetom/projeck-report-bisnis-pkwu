"use client";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Page";
import Frooter from "../../Components/Frooter/Page";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Playstation from "@/app/aset/Keranjang/Playstation5.png";

// Dummy data review
const initialReviews = [
  {
    id: 1,
    name: "Andi",
    rating: 5,
    comment:
      "Barang original, pengiriman cepat, sangat puas dengan pelayanannya!",
    date: "2025-05-01",
  },
  {
    id: 2,
    name: "Budi",
    rating: 4,
    comment: "Kualitas bagus, cuma box sedikit penyok. Overall recommended.",
    date: "2025-05-03",
  },
  {
    id: 3,
    name: "Citra",
    rating: 5,
    comment: "Playstation 5-nya mantap, sesuai deskripsi. Terima kasih!",
    date: "2025-05-05",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
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
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.08)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const ReviewPage = () => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [reviews, setReviews] = useState(initialReviews);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRating || !userComment.trim()) return;
    setReviews([
      {
        id: Date.now(),
        name: "Anonymous",
        rating: userRating,
        comment: userComment,
        date: new Date().toISOString().slice(0, 10),
      },
      ...reviews,
    ]);
    setUserRating(0);
    setUserComment("");
  };

  // Hitung rata-rata rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-4 py-8 flex-1">
        {/* Header Produk */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-20 h-20 relative">
            <Image
              src={Playstation}
              alt="Playstation 5"
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black mb-1">
              Playstation 5
            </h1>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(Number(avgRating)) ? (
                  <IoStar key={i} />
                ) : (
                  <IoStarOutline key={i} />
                )
              )}
              <span className="ml-2 text-sm text-gray-600">
                {avgRating}/5 ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Form Review */}
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-lg shadow p-4 mb-8 border"
        >
          <h2 className="font-semibold mb-2 text-black">Tulis Ulasan Anda</h2>
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setUserRating(i + 1)}
                className="focus:outline-none"
              >
                {i < userRating ? (
                  <IoStar className="text-yellow-500 text-2xl" />
                ) : (
                  <IoStarOutline className="text-gray-300 text-2xl" />
                )}
              </button>
            ))}
          </div>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mb-2 text-black"
            rows={3}
            placeholder="Tulis ulasan Anda di sini..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#315CEA] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={!userRating || !userComment.trim()}
          >
            Kirim Ulasan
          </button>
        </motion.form>

        {/* List Review */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-4"
        >
          <h2 className="font-semibold mb-2 text-black">Ulasan Pembeli</h2>
          {reviews.length === 0 && (
            <p className="text-gray-500">Belum ada ulasan.</p>
          )}
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemFade}
              whileHover="hover"
              className="bg-white rounded-lg shadow p-4 flex flex-col border"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-black">{review.name}</span>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < review.rating ? (
                    <IoStar key={i} className="text-yellow-500" />
                  ) : (
                    <IoStarOutline key={i} className="text-gray-300" />
                  )
                )}
              </div>
              <p className="text-black">{review.comment}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Frooter />
    </div>
  );
};

export default ReviewPage;
