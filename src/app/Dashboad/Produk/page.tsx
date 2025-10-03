"use client";

import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import Siderbar from "../SiderSeller/page";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TambahProduk() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Tambah Produk Baru");
  const [savedProducts, setSavedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    size: "",
    price: "",
    stock: "",
    weight: "",
    condition: "Baru",
    brand: "",
    sku: "",
    minimumOrder: "1",
    discount: "",
    tags: "",
    shippingInfo: "",
    warrantyInfo: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Produk berhasil disimpan!"
  );

  useEffect(() => {
    setIsLoaded(true);
    fetchProducts(); // ← ambil produk dari API
  }, []);

  // Set isLoaded to true after component mounts
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:8000/api/produks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mapping image path untuk preview
      const mapped = res.data.map((item) => ({
        ...item,
        images: item.foto ? JSON.parse(item.foto).map((path) => `http://localhost:8000/storage/${path}`) : [],
      }));

      setSavedProducts(mapped);
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && selectedFiles.length < 3) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setSelectedFiles((prev) => [...prev, ...newFiles].slice(0, 3));
    }
  };
  const handleProduct = (product: any) => {
    setProductData({
      name: product.nama_produk,
      description: product.deskripsi,
      category: product.kategori,
      size: product.ukuran,
      price: product.harga,
      stock: product.stok,
      weight: product.berat,
      condition: product.kondisi,
      brand: product.merek_produk,
      sku: product.kode_produk,
      minimumOrder: product.minimum_pemesanan,
      discount: product.diskon,
      tags: product.tag_produk,
      shippingInfo: product.informasi_pengiriman,
      warrantyInfo: product.informasi_garansi,
    });

    setEditingProductId(product.id);
    setIsEditing(true);

    // Optional: set selected file previews if kamu mau tampilkan preview foto
    const parsedFotos = product.foto ? JSON.parse(product.foto) : [];
    const filePreviews = parsedFotos.map((path: string) => ({
      preview: `http://localhost:8000/storage/${path}`,
      file: null, // karena file asli tidak bisa diambil ulang
    }));
    setSelectedFiles(filePreviews);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProductId(null);

    setProductData({
      name: "",
      description: "",
      category: "",
      size: "",
      price: "",
      stock: "",
      weight: "",
      condition: "Baru",
      brand: "",
      sku: "",
      minimumOrder: "1",
      discount: "",
      tags: "",
      shippingInfo: "",
      warrantyInfo: "",
    });
    setSelectedFiles([]);
  };

  // Function to save product
  const handleSaveProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum login!");
      return;
    }

    // Validasi kategori tidak boleh kosong
    if (!productData.category) {
      alert("Kategori produk wajib dipilih!");
      return;
    }

    if (!productData.price || isNaN(Number(productData.price))) {
      alert("Harga wajib diisi dan berupa angka bulat!");
      return;
    }

    const formData = new FormData();
    formData.append("nama_produk", productData.name || "");
    formData.append("deskripsi", productData.description || "");
    formData.append("kategori", mapKategori(productData.category || ""));
    formData.append("merek_produk", productData.brand || "");
    formData.append("kode_produk", productData.sku || "");
    formData.append("tag_produk", productData.tags || "");
    formData.append("ukuran", productData.size || "");
    formData.append("berat", productData.weight || "");
    formData.append("kondisi", productData.condition || "");
    formData.append("informasi_garansi", productData.warrantyInfo !== undefined && productData.warrantyInfo !== null ? productData.warrantyInfo : "");
    formData.append("informasi_pengiriman", productData.shippingInfo || "");
    
    let harga = parseInt(productData.price, 10);
    if (harga < 1000) harga = harga * 1000;
    formData.append("harga", harga.toString());
    
    formData.append("stok", productData.stock || "0");
    formData.append("minimum_pemesanan", productData.minimumOrder || "1");

    selectedFiles.forEach((fileObj) => {
      if (fileObj.file) {  // Pastikan file asli ada
        formData.append("foto[]", fileObj.file);
      }
    });

    try {
      if (isEditing && editingProductId) {
        await axios.post(
          `http://localhost:8000/api/produks/${editingProductId}?_method=PUT`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Produk berhasil diperbarui.");
        setIsEditing(false);
        setEditingProductId(null);
      } else {
        await axios.post("http://localhost:8000/api/produks", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setSuccessMessage("Produk berhasil ditambahkan!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 1500);

        // Redirect ke halaman Home penjual setelah upload sukses
        setTimeout(() => {
          router.push("/Home");
        }, 1600);
      }

      // Reset form dan files
      setProductData({
        name: "",
        description: "",
        category: "",
        size: "",
        price: "",
        stock: "",
        weight: "",
        condition: "Baru",
        brand: "",
        sku: "",
        minimumOrder: "1",
        discount: "",
        tags: "",
        shippingInfo: "",
        warrantyInfo: "",
      });
      setSelectedFiles([]);

      fetchProducts(); // refresh produk list
    } catch (error: any) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        alert("Gagal menyimpan produk: " + (error.response.data.message || JSON.stringify(error.response.data)));
      } else {
        console.error("Error:", error.message);
        alert("Gagal menyimpan produk: " + error.message);
      }
    }
  };

  // HapusProdukct
  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:8000/api/produks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Produk berhasil dihapus.");
      // Refresh list produk
      fetchProducts();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk.");
    }
  };

  // EditProduck
  const handleEditProduct = (product: any) => {
    setProductData({
      name: product.nama_produk,
      description: product.deskripsi,
      category: product.kategori,
      size: product.ukuran,
      price: product.harga,
      stock: product.stok,
      weight: product.berat,
      condition: product.kondisi,
      brand: product.merek_produk,
      sku: product.kode_produk,
      minimumOrder: product.minimum_pemesanan,
      discount: product.diskon,
      tags: product.tag_produk,
      shippingInfo: product.informasi_pengiriman,
      warrantyInfo: product.informasi_garansi,
      
    });
    setEditingProductId(product.id);
    setIsEditing(true);
    if (product.foto) {
    const parsedPhotos = JSON.parse(product.foto);
    const files = parsedPhotos.map((fotoPath: string) => ({
      preview: `http://localhost:8000/storage/${fotoPath}`,
      isExisting: true,
    }));
    setSelectedFiles(files);
  }
};

  // Animation variants
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
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const sidebarVariants = {
    open: {
      width: "240px",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      width: "0px",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const formItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const successMessageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  // Available categories for the product
  const categories = [
    "Pilih Kategori",
    "Elektronik",
    "Pakaian",
    "Makanan & Minuman",
    "Perabotan Rumah",
    "Kesehatan & Kecantikan",
    "Hobi & Olahraga",
    "Buku & Alat Tulis",
    "Otomotif",
    "Lainnya",
  ];

  function mapKategori(kategori: string) {
    if (kategori === "Pakaian") return "Fashion";
    if (kategori === "Kesehatan & Kecantikan") return "Aksesoris";
    return kategori;
  }

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="flex h-screen bg-gray-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Sidebar */}
          <Siderbar />

          {/* Main Content */}
          <motion.div className="flex-1 overflow-y-auto pb-12">
            {/* Success Message */}
            <AnimatePresence>
              {showSuccessMessage && (
                <motion.div
                  className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50"
                  variants={successMessageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">
              {/* Form Section */}
              <motion.div
                className="lg:col-span-7"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="bg-white p-6 shadow-md rounded-lg"
                  variants={containerVariants}
                >
                  <motion.h2
                    className="text-xl font-semibold mb-4 text-black"
                    variants={itemVariants}
                  >
                    {isEditing ? "Edit Produk" : "Informasi Produk"}
                  </motion.h2>

                  {/* Form */}
                  <motion.div
                    className="bg-gray-50 p-6 rounded-lg shadow-md"
                    variants={itemVariants}
                  >
                    {/* Basic Information Section */}
                    <motion.div className="mb-6 border-b pb-6">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-4"
                        variants={formItemVariants}
                        custom={0}
                        initial="hidden"
                        animate="visible"
                      >
                        Informasi Dasar
                      </motion.h3>

                      <div className="space-y-4 text-black">
                        <motion.input
                          type="text"
                          name="name"
                          value={productData.name}
                          onChange={handleChange}
                          placeholder="Nama Produk"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={1}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.textarea
                          name="description"
                          value={productData.description}
                          onChange={handleChange}
                          placeholder="Deskripsi Produk"
                          className="w-full p-2 border rounded-md h-24"
                          variants={formItemVariants}
                          custom={2}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.select
                          name="category"
                          value={productData.category}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={3}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {categories.map((category, index) => (
                            <option
                              key={index}
                              value={
                                category !== "Pilih Kategori" ? category : ""
                              }
                            >
                              {category}
                            </option>
                          ))}
                        </motion.select>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.input
                            type="text"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                            placeholder="Merek Produk"
                            className="w-full p-2 border rounded-md"
                            variants={formItemVariants}
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            whileFocus={{
                              boxShadow: "0 0 0 2px #315CEA",
                              scale: 1.01,
                            }}
                            transition={{ duration: 0.2 }}
                          />

                          <motion.input
                            type="text"
                            name="sku"
                            value={productData.sku}
                            onChange={handleChange}
                            placeholder="SKU / Kode Produk"
                            className="w-full p-2 border rounded-md"
                            variants={formItemVariants}
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            whileFocus={{
                              boxShadow: "0 0 0 2px #315CEA",
                              scale: 1.01,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>

                        <motion.input
                          type="text"
                          name="tags"
                          value={productData.tags}
                          onChange={handleChange}
                          placeholder="Tag Produk (pisahkan dengan koma)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={6}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Specifications Section */}
                    <motion.div className="mb-6 border-b pb-6 text-black">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-4"
                        variants={formItemVariants}
                        custom={7}
                        initial="hidden"
                        animate="visible"
                      >
                        Spesifikasi Produk
                      </motion.h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.input
                          type="text"
                          name="size"
                          value={productData.size}
                          onChange={handleChange}
                          placeholder="Size / Ukuran (Opsional)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={8}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.input
                          type="text"
                          name="weight"
                          value={productData.weight}
                          onChange={handleChange}
                          placeholder="Berat (gram)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={9}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="mt-4">
                        <motion.select
                          name="condition"
                          value={productData.condition}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={10}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <option value="Baru">Baru</option>
                          <option value="Bekas">Bekas</option>
                          <option value="Refurbished">Refurbished</option>
                        </motion.select>
                      </div>

                      <div className="mt-4">
                        <motion.textarea
                          name="warrantyInfo"
                          value={productData.warrantyInfo}
                          onChange={handleChange}
                          placeholder="Informasi Garansi (Opsional)"
                          className="w-full p-2 border rounded-md h-20"
                          variants={formItemVariants}
                          custom={11}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Images Section */}
                    <motion.div className="mb-6 border-b pb-6">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-2"
                        variants={formItemVariants}
                        custom={12}
                        initial="hidden"
                        animate="visible"
                      >
                        Foto atau Video Produk
                      </motion.h3>

                      <motion.div
                        className="flex space-x-2"
                        variants={formItemVariants}
                        custom={13}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* File upload button */}
                        <motion.label
                          variants={imageHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 flex items-center justify-center border rounded-md cursor-pointer bg-gray-200 overflow-hidden"
                        >
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                          <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{
                              repeat: Infinity,
                              duration: 10,
                              ease: "linear",
                              repeatDelay: 0,
                            }}
                          >
                            <IoAddOutline className="text-gray-500 text-3xl" />
                          </motion.div>
                        </motion.label>

                        {/* Preview boxes */}
                        {selectedFiles.map((fileObj, index) => (
                          <motion.div
                            key={index}
                            className="w-20 h-20 border rounded-md bg-gray-100 relative overflow-hidden"
                            variants={imageHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            style={{
                              backgroundImage: `url(${fileObj.preview})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <motion.button
                              className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-bl-md"
                              onClick={() => {
                                if (!fileObj.isExisting) {
                                  URL.revokeObjectURL(fileObj.preview);
                                }
                                setSelectedFiles(
                                  selectedFiles.filter((_, i) => i !== index)
                                );
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ×
                            </motion.button>
                          </motion.div>
                        ))}

                        {/* Empty preview boxes */}
                        {Array.from({
                          length: Math.max(0, 2 - selectedFiles.length),
                        }).map((_, index) => (
                          <motion.div
                            key={`empty-${index}`}
                            className="w-20 h-20 border rounded-md bg-gray-100"
                            variants={imageHoverVariants}
                            initial="rest"
                            whileHover="hover"
                          />
                        ))}
                      </motion.div>

                      <motion.p
                        className="text-sm text-gray-500 mt-2"
                        variants={formItemVariants}
                        custom={14}
                        initial="hidden"
                        animate="visible"
                      >
                        * Foto atau video produk promosi akan tampil di halaman
                        promosi, hasil pencarian, dan rekomendasi.
                      </motion.p>
                    </motion.div>

                    {/* Pricing and Inventory Section */}
                    <motion.div className="mb-6 text-black">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-4"
                        variants={formItemVariants}
                        custom={15}
                        initial="hidden"
                        animate="visible"
                      >
                        Harga dan Persediaan
                      </motion.h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.input
                          type="text"
                          name="price"
                          value={productData.price}
                          onChange={handleChange}
                          placeholder="Harga (Rp)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={16}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.input
                          type="text"
                          name="discount"
                          value={productData.discount}
                          onChange={handleChange}
                          placeholder="Diskon (%)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={17}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <motion.input
                          type="text"
                          name="stock"
                          value={productData.stock}
                          onChange={handleChange}
                          placeholder="Stok Tersedia"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={18}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.input
                          type="text"
                          name="minimumOrder"
                          value={productData.minimumOrder}
                          onChange={handleChange}
                          placeholder="Minimum Pemesanan"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={19}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="mt-4">
                        <motion.textarea
                          name="shippingInfo"
                          value={productData.shippingInfo}
                          onChange={handleChange}
                          placeholder="Informasi Pengiriman (Opsional)"
                          className="w-full p-2 border rounded-md h-20"
                          variants={formItemVariants}
                          custom={20}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    className="flex justify-end space-x-2 mt-6"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8 }}
                  >
                    {isEditing ? (
                      <>
                        <motion.button
                          className="px-4 py-2 bg-gray-300 rounded-md text-black"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                          onClick={handleCancelEdit}
                        >
                          Batal
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-[#315CEA] text-white rounded-md"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                          onClick={handleSaveProduct}
                          animate={{
                            boxShadow: [
                              "0px 0px 0px rgba(49, 92, 234, 0)",
                              "0px 2px 10px rgba(49, 92, 234, 0.4)",
                              "0px 0px 0px rgba(49, 92, 234, 0)",
                            ],
                          }}
                          transition={{
                            boxShadow: {
                              repeat: Infinity,
                              duration: 2,
                              repeatDelay: 1,
                            },
                          }}
                        >
                          Simpan Perubahan
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        className="px-4 py-2 bg-[#315CEA] text-white rounded-md"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleSaveProduct}
                        animate={{
                          boxShadow: [
                            "0px 0px 0px rgba(49, 92, 234, 0)",
                            "0px 2px 10px rgba(49, 92, 234, 0.4)",
                            "0px 0px 0px rgba(49, 92, 234, 0)",
                          ],
                        }}
                        transition={{
                          boxShadow: {
                            repeat: Infinity,
                            duration: 2,
                            repeatDelay: 1,
                          },
                        }}
                      >
                        Simpan Produk
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
              {/* Product List Section */}
              <motion.div
                className="lg:col-span-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="bg-white p-6 shadow-md rounded-lg sticky top-4"
                  variants={itemVariants}
                >
                  <motion.h2
                    className="text-xl font-semibold mb-4 flex items-center text-black"
                    variants={itemVariants}
                  >
                    <span>Produk Terdaftar</span>
                    <motion.span
                      className="ml-2 bg-[#315CEA] text-white text-sm py-0.5 px-2 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {savedProducts.length}
                    </motion.span>
                  </motion.h2>

                  {savedProducts.length === 0 ? (
                    <motion.div
                      className="text-center py-12 text-gray-500"
                      variants={fadeInVariants}
                    >
                      <motion.div
                        className="text-5xl mb-4 text-gray-300 mx-auto"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <IoAddOutline className="mx-auto" />
                      </motion.div>
                      Belum ada produk terdaftar
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2"
                      variants={itemVariants}
                    >
                      <AnimatePresence>
                        {savedProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                              isEditing && editingProductId === product.id
                                ? "border-[#315CEA] bg-blue-50"
                                : ""
                            }`}
                            variants={productCardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                          >
                            <div className="flex items-start">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                {product.images && product.images.length > 0 ? (
                                  <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url(${product.images[0]})`,
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No img
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-800 truncate">
                                  {product.name}
                                </h3>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <span className="truncate">
                                    {product.category || "Tanpa Kategori"} •{" "}
                                    {product.condition}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="text-[#315CEA] font-semibold">
                                    {product.price
                                      ? `Rp ${product.price}`
                                      : "Tanpa Harga"}
                                    {product.discount && (
                                      <span className="text-xs text-green-500 ml-1">
                                        -{product.discount}%
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Stok: {product.stock || "0"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-3 pt-3 border-t">
                              <motion.button
                                className={`p-1.5 rounded-md ${
                                  isEditing && editingProductId === product.id
                                    ? "text-blue-600 bg-blue-100"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                title="Edit Produk"
                                onClick={() => handleEditProduct(product)} // ← Kirim seluruh data produk
                              >
                                <FaEdit size={16} />
                              </motion.button>
                              <motion.button
                                className="p-1.5 text-red-500 rounded-md hover:bg-red-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Hapus Produk"
                                disabled={
                                  isEditing && editingProductId === product.id
                                }
                              >
                                <FaTrash size={16} />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {savedProducts.length > 0 && (
                    <motion.div
                      className="mt-6 border-t pt-4"
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href="/all-products">
                        <motion.button
                          className="w-full py-2 bg-[#315CEA] bg-opacity-10 text-[#315CEA] rounded-md font-medium"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Lihat Semua Produk
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
