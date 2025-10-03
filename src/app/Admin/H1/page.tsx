"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoTrendingUp,
  IoTrendingDown,
  IoEllipsisHorizontal,
  IoFilter,
  IoSearch,
  IoNotifications,
  IoChevronForward,
  IoStar,
} from "react-icons/io5";

// Animation variants (ambil dari Home)
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

const AdminDashboard = () => {
  const [isVisible, setIsVisible] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Total Sales",
      value: "Rp 34.456.000",
      change: 14,
      isPositive: true,
      subtitle: "bulan ini",
    },
    {
      id: 2,
      title: "Total Order",
      value: "3.456",
      change: 17,
      isPositive: false,
      subtitle: "bulan ini",
    },
    {
      id: 3,
      title: "Total Revenue",
      value: "Rp 1.456.000",
      change: 14,
      isPositive: true,
      subtitle: "bulan ini",
    },
    {
      id: 4,
      title: "Total Customer",
      value: "42.456",
      change: 11,
      isPositive: false,
      subtitle: "bulan ini",
    },
  ]);
  const [editingStat, setEditingStat] = useState(null);
  const [showAddStat, setShowAddStat] = useState(false);
  const [reviews, setReviews] = useState([
    {
      nama_pembeli: "Andi",
      nama_produk: "Laptop Asus ROG",
      rating: 5,
      komentar:
        "Barang original, pengiriman cepat, sangat puas dengan pelayanannya!",
    },
    {
      nama_pembeli: "Budi",
      nama_produk: "HP Laptop",
      rating: 4,
      komentar: "Kualitas bagus, cuma box sedikit penyok. Overall recommended.",
    },
    {
      nama_pembeli: "Citra",
      nama_produk: "Playstation 5",
      rating: 5,
      komentar: "Playstation 5-nya mantap, sesuai deskripsi. Terima kasih!",
    },
  ]);
  const [sellers, setSellers] = useState([
    {
      id: 1,
      nama_toko: "Toko Andi",
      email: "andi@mail.com",
    },
    {
      id: 2,
      nama_toko: "Toko Budi",
      email: "budi@mail.com",
    },
    {
      id: 3,
      nama_toko: "Toko Citra",
      email: "citra@mail.com",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/produks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        alert("Gagal mengambil data produk");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch reviews
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        // Optional: alert("Gagal mengambil data review");
      }
    };
    fetchReviews();
  }, []);

 

  // Scroll animation observer (ambil dari Home)
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

  const handleEdit = (product) => {
    // Implementasi logika edit
    console.log("Edit product:", product);
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/produks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      console.log("Delete response:", res.status, data);

      if (!res.ok) {
        alert(data.message || "Gagal menghapus produk (server error)");
        return;
      }
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Gagal menghapus produk (network error)");
    }
  };

  const handleEditStat = (stat) => {
    setEditingStat(stat);
  };

  const handleDeleteStat = (id) => {
    setStats(stats.filter((s) => s.id !== id));
  };

  const handleSaveEditStat = (updatedStat) => {
    setStats(stats.map((s) => (s.id === updatedStat.id ? updatedStat : s)));
    setEditingStat(null);
  };

  const handleAddStat = (newStat) => {
    setStats([...stats, { ...newStat, id: Date.now() }]);
    setShowAddStat(false);
  };

  const handleDeleteSeller = async (id) => {
    if (!confirm("Yakin hapus seller ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8000/api/sellers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSellers(sellers.filter((s) => s.id !== id));
    } catch {
      alert("Gagal menghapus seller");
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900"
          >
            Admin Dashboard
          </motion.h1>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-gray-600 relative"
          >
            <IoNotifications className="text-xl" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          id="statsCards"
          data-animate
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={itemFade}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group"
            >
              {/* Animated background elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-200 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <IoEllipsisHorizontal className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="mb-3"
              >
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-center gap-1 text-sm ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.isPositive ? <IoTrendingUp /> : <IoTrendingDown />}
                  {stat.change}%
                </motion.div>
                <span className="text-sm text-gray-500">{stat.subtitle}</span>
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEditStat(stat)}
                  className="text-blue-500 text-xs hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStat(stat.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Top Selling Products */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8"
          id="topProducts"
          data-animate
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-semibold text-gray-900"
            >
              Produk Seller
            </motion.h3>
            <div className="flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                <IoFilter />
                Filter
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Lihat Semua
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Nama Produk",
                    "Harga",
                    "Kategori",
                    "Jumlah",
                    "Total",
                    "Rating",
                    "Aksi",
                  ].map((header, index) => (
                    <motion.th
                      key={header}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {product.nama_produk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rp {parseInt(product.harga).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.kategori}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stok}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {/* Total/amount bisa diisi harga x stok atau sesuai kebutuhan */}
                      Rp{" "}
                      {(
                        parseInt(product.harga) * parseInt(product.stok)
                      ).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex text-yellow-400">
                        {/* Jika ada rating di produk, tampilkan, jika tidak bisa 0 */}
                        {Array.from({ length: product.rating ?? 0 }).map(
                          (_, i) => <IoStar key={i} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-500 hover:underline text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Daftar Nama Toko Seller */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 mt-8"
          id="sellerList"
          data-animate
        >
          <div className="p-6 border-b border-gray-100">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-semibold text-gray-900"
            >
              Daftar Seller
            </motion.h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Toko
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellers.length > 0 ? (
                  sellers.map((seller) => (
                    <tr key={seller.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {seller.nama_toko}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {seller.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteSeller(seller.id)}
                          className="text-red-500 hover:underline text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-400">
                      Belum ada seller.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Review Pembeli */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 mt-8"
          id="buyerReviews"
          data-animate
        >
          <div className="p-6 border-b border-gray-100">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-semibold text-gray-900"
            >
              Review Pembeli
            </motion.h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Komentar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.length > 0 ? (
                  reviews.map((review, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {review.nama_pembeli || review.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {review.nama_produk || review.product_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: review.rating ?? 0 }).map((_, i) => (
                            <IoStar key={i} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {review.komentar || review.comment}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      Belum ada review pembeli.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Button Tambah Stat */}
        <button
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowAddStat(true);
            setEditingStat({ title: "", value: "" });
          }}
        >
          + Tambah Stat
        </button>

        {/* Modal Edit */}
        {editingStat && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <h3 className="font-semibold mb-2">Edit Stat</h3>
              <input
                className="border p-2 w-full mb-2"
                value={editingStat.value}
                onChange={(e) =>
                  setEditingStat({ ...editingStat, value: e.target.value })
                }
              />
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                onClick={() => handleSaveEditStat(editingStat)}
              >
                Simpan
              </button>
              <button
                className="bg-gray-300 px-4 py-1 rounded"
                onClick={() => setEditingStat(null)}
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Modal Add */}
        {showAddStat && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <h3 className="font-semibold mb-2">Tambah Stat</h3>
              <input
                className="border p-2 w-full mb-2"
                placeholder="Judul"
                onChange={(e) =>
                  setEditingStat({ ...editingStat, title: e.target.value })
                }
              />
              <input
                className="border p-2 w-full mb-2"
                placeholder="Nilai"
                onChange={(e) =>
                  setEditingStat({ ...editingStat, value: e.target.value })
                }
              />
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                onClick={() => {
                  handleAddStat(editingStat);
                  setEditingStat(null);
                }}
              >
                Tambah
              </button>
              <button
                className="bg-gray-300 px-4 py-1 rounded"
                onClick={() => setShowAddStat(false)}
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Product Grid (New Section) */}
        {/* 
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Semua Produk
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.length > 0 ? (
              products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  {item.foto && (
                    <img
                      src={`http://localhost:8000/storage/${
                        Array.isArray(item.foto)
                          ? item.foto[0]
                          : JSON.parse(item.foto)[0]
                      }`}
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
        </div>
        */}
      </main>
    </div>
  );
};

export default AdminDashboard;
