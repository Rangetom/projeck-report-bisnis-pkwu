"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import {
  IoCartOutline,
  IoClose,
  IoArrowForward,
  IoStar,
  IoStarHalf,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../Components/Navbar/Page";
import Footer from "../../Components/Frooter/Page";

// Instead of using imports, use direct URL paths or public folder paths
const productImages = {
  foto2: "/images/products/2.png", // Update with your actual public paths
  foto3: "/images/products/3.png",
  foto4: "/images/products/4.png",
  foto5: "/images/products/5.png",
  foto6: "/images/products/6.png",
  foto7: "/images/products/7.png",
  foto8: "/images/products/8.png",
  foto9: "/images/products/9.png",
};

const EcommercePage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gucci duffle bag",
      price: 960,
      discountedPrice: 1160,
      image: productImages.foto2,
      discount: "-35%",
      rating: 4.8,
      isFavorite: true,
      reviews: 124,
      isHovered: false,
    },
    {
      id: 2,
      name: "RGB liquid CPU Cooler",
      price: 1960,
      image: productImages.foto3,
      rating: 4.2,
      isFavorite: true,
      reviews: 89,
      isHovered: false,
    },
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      price: 550,
      image: productImages.foto4,
      rating: 4.5,
      isFavorite: true,
      reviews: 56,
      isHovered: false,
    },
    {
      id: 4,
      name: "Quilted Satin Jacket",
      price: 750,
      image: productImages.foto5,
      rating: 4.0,
      isFavorite: true,
      reviews: 102,
      isHovered: false,
    },
  ]);

  const recommendedProducts = [
    {
      id: 5,
      name: "Silver Heart Pink Gemstone Ring",
      price: 399,
      originalPrice: 665,
      discount: 40,
      image: productImages.foto2,
      rating: 5,
      reviews: 88,
      slug: "silver-heart-pink-gemstone-ring",
    },
    {
      id: 6,
      name: "Luxury Rose Gold Pen with Crown Top",
      price: 399,
      originalPrice: 1960,
      discount: 35,
      image: productImages.foto4,
      rating: 4,
      reviews: 75,
      slug: "luxury-rose-gold-pen-with-crown-top",
    },
    {
      id: 7,
      name: "Light Blue Vintage Baseball Cap",
      price: 399,
      originalPrice: 570,
      discount: 30,
      image: productImages.foto5,
      rating: 5,
      reviews: 99,
      slug: "light-blue-vintage-baseball-cap",
    },
    {
      id: 8,
      name: "Gothic Black Bat Ring",
      price: 399,
      originalPrice: 532,
      discount: 25,
      image: productImages.foto6,
      rating: 4.5,
      reviews: 99,
      slug: "gothic-black-bat-ring",
    },
    {
      id: 9,
      name: "Cartier Love Gold Bracelet",
      price: 399,
      originalPrice: 532,
      discount: 25,
      image: productImages.foto7,
      rating: 4.5,
      reviews: 99,
      slug: "cartier-love-gold-bracelet",
    },
  ];

  const [removedProducts, setRemovedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveProduct = (productId) => {
    const productToRemove = products.find((p) => p.id === productId);
    setRemovedProducts([...removedProducts, productToRemove]);
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleProductHover = (productId, isHovered) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, isHovered } : product
      )
    );
  };

  const handleProductUndoRemove = (productId) => {
    const productToRestore = removedProducts.find((p) => p.id === productId);
    setProducts([...products, productToRestore]);
    setRemovedProducts(
      removedProducts.filter((product) => product.id !== productId)
    );
  };

  // Loading animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Render star ratings
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalf key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-xl font-bold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Favorit ({products.length})
          </motion.h2>

          {removedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-black">
                {removedProducts.length} item removed
              </span>
              <button
                onClick={() => {
                  setProducts([...products, ...removedProducts]);
                  setRemovedProducts([]);
                }}
                className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-300"
              >
                Undo All
              </button>
            </motion.div>
          )}
        </div>

        {/* Favorite Products Grid - MODIFIED TO 4x4 GRID */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => handleProductHover(product.id, true)}
                onMouseLeave={() => handleProductHover(product.id, false)}
                whileHover={{ y: -3 }}
              >
                <div className="bg-gray-50 p-3 relative mb-0">
                  {product.discount && (
                    <motion.span
                      className="absolute top-1 left-1 bg-red-500 text-white px-2 py-0.5 text-xs rounded-full font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {product.discount}
                    </motion.span>
                  )}
                  <motion.button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <IoClose size={14} />
                  </motion.button>
                  <div className="flex justify-center items-center h-32 relative">
                    {/* Fallback image with error handling */}
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="h-32 w-32 object-contain"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />

                    {product.isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.button
                          className="bg-white text-blue-500 py-1 px-2 text-xs rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Quick View
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex">
                      {renderRatingStars(product.rating).map((star, i) => (
                        <span key={i} className="text-xs">
                          {star}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-black ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-800 text-sm">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.discountedPrice && (
                      <span className="text-black line-through text-xs opacity-60">
                        ${product.discountedPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <motion.button
                    className="w-full bg-blue-500 text-white py-1.5 rounded text-xs hover:bg-blue-600 flex items-center justify-center gap-1 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IoCartOutline size={14} />
                    Masukkan keranjang
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Recently removed products */}
        {removedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 bg-gray-50 rounded-lg p-4"
          >
            <h3 className="text-md font-medium mb-3 text-black">
              Recently Removed Items
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {removedProducts.map((product, index) => (
                  <motion.div
                    key={`removed-${product.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center bg-white p-2 rounded-lg shadow-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain mr-2"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium truncate text-black">
                        {product.name}
                      </h4>
                      <p className="text-blue-500 font-medium text-xs">
                        ${product.price}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => handleProductUndoRemove(product.id)}
                      className="text-blue-500 hover:text-blue-700 text-xs"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Restore
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Recommended Products - MODIFIED TO 4x4 GRID */}
        <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
          Recommended
        </h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <div className="bg-gray-50 p-3 relative">
                <div className="absolute top-1 right-1 z-10">
                  <motion.button
                    className="bg-white rounded-full p-1 shadow-md transition-colors duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: "#f8f8f8" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaRegHeart
                      size={14}
                      className="text-black hover:text-red-500 transition-colors duration-300"
                    />
                  </motion.button>
                </div>
                <div className="flex justify-center items-center h-32">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-32 object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex">
                    {renderRatingStars(product.rating).map((star, i) => (
                      <span key={i} className="text-xs">
                        {star}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-black ml-1">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800 text-sm">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <motion.button
                  className="w-full bg-blue-500 text-white py-1.5 rounded text-xs hover:bg-blue-600 flex items-center justify-center gap-1 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IoCartOutline size={14} />
                  Tambah ke keranjang
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default EcommercePage;
