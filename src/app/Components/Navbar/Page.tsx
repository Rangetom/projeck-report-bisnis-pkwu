import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoMenu,
  IoHeartOutline,
  IoCartOutline,
  IoPersonOutline,
  IoCloseOutline,
  IoChevronForward,
  IoChatbubbleEllipsesOutline,
  IoSendSharp,
} from "react-icons/io5";

// Import sample images (update these paths to match your project structure)
// Replace these with your actual image imports
import speaker from "@/app/aset/speaker.png";
import sps5 from "@/app/aset/PlayStation 5  Wireless Controller.jpg";
import ps5 from "@/app/aset/assetHome/3.png";
import foto2 from "@/app/aset/assetHome/2.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Chat with seller states
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Halo! Saya bisa bantu Anda dengan pertanyaan seputar produk ini.",
      sender: "seller",
      time: "10:30",
    },
    {
      text: "Apakah produk ini masih tersedia?",
      sender: "user",
      time: "10:32",
    },
  ]);
  const [showTyping, setShowTyping] = useState(false);
  const chatDropdownRef = useRef(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: "Paket Velg Dan Ban r16 Type Racing",
      price: 12100000,
      image: sps5,
      quantity: 1,
      currency: "Rp",
    },
    {
      id: 2,
      name: "Controller Playstation 5",
      price: 462,
      originalPrice: 600,
      image: speaker,
      quantity: 1,
      currency: "$",
    },
    {
      id: 3,
      name: "FUEL PUMP - POMPA BENSIN RACING",
      price: 79500,
      originalPrice: 87500,
      image: ps5,
      quantity: 1,
      currency: "Rp",
    },
    {
      id: 4,
      name: "SOARFLY [COD] Mesin Blower 1588VF-Baterai*2",
      price: 288624,
      originalPrice: 699000,
      image: foto2,
      quantity: 1,
      currency: "Rp",
    },
  ];

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  // Calculate total - Convert dollar to rupiah for totaling (approximate conversion)
  const total = cartItems.reduce((sum, item) => {
    // If currency is $, convert to Rp (rough approximation, adjust as needed)
    const valueInRp = item.currency === "$" ? item.price * 15000 : item.price;
    return sum + valueInRp * item.quantity;
  }, 0);

  // Count total items
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setCartOpen(false);
      }
      if (
        chatDropdownRef.current &&
        !chatDropdownRef.current.contains(event.target)
      ) {
        setChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartInteraction = () => {
    if (isMobile) {
      // On mobile, navigate directly to cart page
      window.location.href = "Pages/Keranjang2";
    } else {
      // On desktop, toggle dropdown
      setCartOpen(!cartOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setCartOpen(true);
    }
  };

  // Chat with seller functions
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSend = () => {
    if (message.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setMessages([...messages, { text: message, sender: "user", time }]);
      setMessage("");

      // Simulate seller typing
      setShowTyping(true);

      // Simulate seller response after delay
      setTimeout(() => {
        setShowTyping(false);
        const responses = [
          "Ya, produk masih tersedia!",
          "Silakan tanyakan detail lainnya jika Anda butuh informasi tambahan.",
          "Kami bisa proses pengiriman hari ini jika order sebelum pukul 15:00.",
        ];
        const response =
          responses[Math.floor(Math.random() * responses.length)];
        setMessages((prev) => [
          ...prev,
          { text: response, sender: "seller", time },
        ]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm px-4 md:px-6 py-4 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-600 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <IoMenu className="text-2xl" />
              </button>
              <h1 className="text-xl font-bold text-black">Grab & Ship</h1>
            </div>

            {/* Category Navigation  */}
            <div className="hidden md:flex items-center space-x-4 mx-4 flex-grow justify-center">
              <Link href="/Home">
                <button className="px-6 py-2.5 bg-gray-100 rounded-full text-black hover:bg-gray-200 font-medium whitespace-nowrap">
                  Home
                </button>
              </Link>
              <Link href="/Fashion">
                <button className="px-6 py-2.5 bg-gray-100 rounded-full text-black hover:bg-gray-200 font-medium whitespace-nowrap">
                  Fashion
                </button>
              </Link>
              <Link href="/Gadget">
                <button className="px-6 py-2.5 bg-gray-100 rounded-full text-black hover:bg-gray-200 font-medium whitespace-nowrap">
                  Gadget
                </button>
              </Link>
              <Link href="/aksesoris">
                <button className="px-6 py-2.5 bg-gray-100 rounded-full text-black hover:bg-gray-200 font-medium whitespace-nowrap">
                  Aksesoris
                </button>
              </Link>
              <Link href="/Home">
                <button className="px-6 py-2.5 bg-gray-100 rounded-full text-black hover:bg-gray-200 font-medium whitespace-nowrap">
                  Lainnya
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Favorites - show only on desktop */}
              <Link href="Pages/Barangfavorite" className="hidden md:block">
                <button className="text-black">
                  <IoHeartOutline className="text-2xl" />
                </button>
              </Link>

              {/* Cart - show only on desktop */}
              <div className="relative hidden md:block" ref={cartDropdownRef}>
                <Link href={isMobile ? "Pages/Keranjang2" : "#"}>
                  <button
                    className="relative text-black p-1.5"
                    onClick={
                      !isMobile ? () => setCartOpen(!cartOpen) : undefined
                    }
                    onMouseEnter={handleMouseEnter}
                    aria-label="Shopping Cart"
                  >
                    <IoCartOutline className="text-xl md:text-2xl" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </button>
                </Link>

                {/* Cart Preview Dropdown -  desktop */}
                {cartOpen && !isMobile && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
                    <div className="p-3 md:p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-black">
                        Keranjang ({itemCount})
                      </h3>
                    </div>

                    {/* Cart items */}
                    <div className="max-h-80 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border-b border-gray-100 flex items-start gap-3"
                        >
                          <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm text-black font-medium truncate mb-1">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm font-semibold text-black">
                                {item.quantity} x {item.currency}
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  {item.currency}
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total and buttons */}
                    <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <span className="font-medium text-black text-sm md:text-base">
                          Total:
                        </span>
                        <span className="font-bold text-black text-sm md:text-base">
                          Rp{formatPrice(total)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link href="Pages/Keranjang2" className="flex-1">
                          <button className="w-full py-1.5 md:py-2 px-2 md:px-3 bg-gray-200 hover:bg-gray-300 text-black rounded-lg text-xs md:text-sm font-medium transition-colors">
                            Lihat Keranjang
                          </button>
                        </Link>
                        <Link href="Pages/Checkout" className="flex-1">
                          <button className="w-full py-1.5 md:py-2 px-2 md:px-3 bg-[#315CEA] hover:bg-blue-700 text-white rounded-lg text-xs md:text-sm font-medium transition-colors">
                            Checkout
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth buttons - show only on desktop */}
              {/* <div className="hidden md:flex space-x-2">
                <Link href="/Pages/Signup">
                  <button className="px-4 py-1.5 bg-[#315CEA] text-white rounded-full text-sm">
                    Sign Up
                  </button>
                </Link>
                <Link href="Pages/login">
                  <button className="px-4 py-1.5 bg-[#315CEA] text-white rounded-full text-sm">
                    Login
                  </button>
                </Link>
              </div> */}

              {/* Profile - show only on desktop */}
              <Link href="Pages/Profile" className="hidden md:block">
                <button className="text-black">
                  <IoPersonOutline className="text-xl md:text-2xl" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-white h-full w-3/4 max-w-xs p-4 transform animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 focus:outline-none"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Auth buttons in mobile menu */}
            <div className="flex space-x-2 mb-6">
              <Link href="/Pages/Signup" className="flex-1">
                <button className="w-full px-4 py-2 bg-[#315CEA] text-white rounded-full text-sm">
                  Sign Up
                </button>
              </Link>
              <Link href="Pages/login" className="flex-1">
                <button className="w-full px-4 py-2 bg-[#315CEA] text-white rounded-full text-sm">
                  Login
                </button>
              </Link>
            </div>

            {/* Profile section in mobile menu */}
            <div className="mb-6 border-b border-gray-100 pb-4">
              <Link href="Pages/Profile">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                  <IoPersonOutline className="text-xl text-gray-700" />
                  <span className="text-black">Profil Saya</span>
                </div>
              </Link>
            </div>

            {/* Cart section in mobile menu */}
            <div className="mb-6 border-b border-gray-100 pb-4">
              <Link href="Pages/Keranjang2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    <IoCartOutline className="text-xl text-gray-700" />
                    <span className="text-black">Keranjang</span>
                  </div>
                  {itemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Categories */}
            <h3 className="font-medium text-gray-800 mb-2">Kategori</h3>
            <ul className="space-y-2 mb-6 border-b border-gray-100 pb-4">
              <li>
                <Link href="/Home">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md text-black">
                    <span>Home</span>
                    <IoChevronForward className="text-gray-400" />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/Fashion">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md text-black">
                    <span>Fashion</span>
                    <IoChevronForward className="text-gray-400" />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/Gadget">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md text-black">
                    <span>Gadget</span>
                    <IoChevronForward className="text-gray-400" />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/aksesoris">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md text-black">
                    <span>Aksesoris</span>
                    <IoChevronForward className="text-gray-400" />
                  </div>
                </Link>
              </li>
              <li>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md text-black">
                  <span>Lainnya</span>
                  <IoChevronForward className="text-gray-400" />
                </div>
              </li>
            </ul>

            {/* Additional menu items */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">
                Bantuan & Pengaturan
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/bantuan">
                    <div className="p-2 hover:bg-gray-50 rounded-md text-gray-600">
                      Pusat Bantuan
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/Barangfavorite">
                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md text-gray-600">
                      <IoHeartOutline className="text-lg" />
                      <span>Barang Favorit</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/pesanan">
                    <div className="p-2 hover:bg-gray-50 rounded-md text-gray-600">
                      Riwayat Pesanan
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/pengaturan">
                    <div className="p-2 hover:bg-gray-50 rounded-md text-gray-600">
                      Pengaturan
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Chat with Seller - Fixed at bottom right */}
      <div
        className="fixed bottom-8 right-8 font-sans z-40"
        ref={chatDropdownRef}
      >
        {/* Chat Button */}
        <button
          onClick={toggleChat}
          className="flex items-center justify-center p-4 bg-[#315CEA] text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          style={{ backgroundColor: "#315CEA" }}
        >
          <IoChatbubbleEllipsesOutline className="text-xl" />
          <span className={`ml-2 ${chatOpen ? "hidden" : "hidden"} md:block`}>
            Chat with Seller
          </span>
        </button>

        {/* Chat Window */}
        <div
          className={`absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 transform ${
            chatOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
          style={{ height: "400px" }}
        >
          {/* Header */}
          <div
            className="p-4 border-b flex items-center bg-[#315CEA] text-white rounded-t-lg"
            style={{ backgroundColor: "#315CEA" }}
          >
            <div className="flex items-center">
              <div className="p-1 bg-white rounded-full mr-2">
                <IoPersonOutline className="text-[#315CEA] text-lg" />
              </div>
              <div>
                <h3 className="font-bold">Grab & Ship</h3>
                <p className="text-xs opacity-80">
                  Online • Responds within 5 minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="ml-auto text-white hover:text-gray-200"
            >
              <IoCloseOutline className="text-xl" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#315CEA] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                  style={
                    msg.sender === "user" ? { backgroundColor: "#315CEA" } : {}
                  }
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 opacity-70">Seller is typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t flex items-center ">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="flex-grow p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#315CEA] focus:border-transparent text-black"
            />
            <button
              onClick={handleSend}
              className="ml-2 p-2 bg-[#315CEA] text-white rounded-full hover:bg-blue-700 transition-colors"
              style={{ backgroundColor: "#315CEA" }}
            >
              <IoSendSharp className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
