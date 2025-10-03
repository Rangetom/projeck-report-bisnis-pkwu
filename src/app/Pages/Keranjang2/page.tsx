"use client";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Page";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline, IoCheckmarkCircle } from "react-icons/io5";
import speaker from "@/app/aset/speaker.png";
import sps5 from "@/app/aset/PlayStation 5  Wireless Controller.jpg";
import parfum from "@/app/aset/assetHome/2.png";
import ps5 from "@/app/aset/assetHome/3.png";

const Keranjang = () => {
  const [selectedAll, setSelectedAll] = useState(true);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Paket Velg Dan Ban r16 Type Racing",
      price: 12100000,
      originalPrice: 12100000,
      image: sps5,
      quantity: 1,
      selected: true,
      shop: "Toko Racing Official",
      location: "Jakarta Selatan",
    },
    {
      id: 2,
      name: "TP-link Tapo P115 Mini Smart Wi-Fi Socket",
      price: 150000,
      originalPrice: 190000,
      image: speaker,
      quantity: 1,
      selected: true,
      shop: "TP-Link Official",
      location: "Jakarta Pusat",
    },
    {
      id: 3,
      name: "FUEL PUMP - POMPA BENSIN RACING TOYOTA",
      price: 79500,
      originalPrice: 87500,
      image: ps5,
      quantity: 1,
      selected: true,
      shop: "Auto Parts Store",
      location: "Bandung",
    },
    {
      id: 4,
      name: "SOARFLY [COD] Mesin Blower Tangan 1588VF-Baterai*2",
      price: 288624,
      originalPrice: 699000,
      image: parfum,
      quantity: 1,
      selected: true,
      shop: "SOARFLY Official",
      location: "Jakarta Barat",
    },
  ]);

  // Calculate total price
  const calculateTotal = () => {
    return products
      .filter((product) => product.selected)
      .reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Calculate total items
  const calculateTotalItems = () => {
    return products
      .filter((product) => product.selected)
      .reduce((total, product) => total + product.quantity, 0);
  };

  // Toggle select all products
  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setProducts(
      products.map((product) => ({ ...product, selected: !selectedAll }))
    );
  };

  // Toggle select individual product
  const handleSelectProduct = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, selected: !product.selected } : product
    );
    setProducts(updatedProducts);
    setSelectedAll(updatedProducts.every((product) => product.selected));
  };

  // Change quantity
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // Remove product
  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  // Get discount percentage
  const getDiscountPercentage = (original, current) => {
    if (original <= current) return null;
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-bold text-black mb-4">
          Keranjang ({calculateTotalItems()})
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Products */}
          <div className="w-full md:w-8/12">
            {/* Select all header */}
            <div className="bg-white rounded-t-lg shadow-sm p-4 flex items-center gap-3 border-b">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600"
                  checked={selectedAll}
                  onChange={handleSelectAll}
                />
                <span className="ml-3 text-black font-medium">Pilih Semua</span>
              </div>
              <button className="text-gray-500 ml-auto">
                <IoTrashOutline className="text-xl" />
              </button>
            </div>

            {/* Products list */}
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-sm mb-3 border-t border-gray-100"
              >
                {/* Shop info */}
                <div className="p-4 border-b flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600 mr-3"
                    checked={product.selected}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                  <div className="flex items-center">
                    <span className="text-black font-medium">
                      {product.shop}
                    </span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-500 text-sm">
                      {product.location}
                    </span>
                  </div>
                </div>

                {/* Product details */}
                <div className="p-4 flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600 mr-3 invisible"
                  />
                  <div className="flex flex-col md:flex-row items-start w-full">
                    <div className="flex gap-3 md:w-7/12">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-black font-medium line-clamp-2">
                          {product.name}
                        </p>
                        <div className="mt-auto">
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold text-black">
                              Rp{formatPrice(product.price)}
                            </span>
                            {getDiscountPercentage(
                              product.originalPrice,
                              product.price
                            ) && (
                              <>
                                <span className="text-sm text-gray-400 line-through">
                                  Rp{formatPrice(product.originalPrice)}
                                </span>
                                <span className="text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                                  {getDiscountPercentage(
                                    product.originalPrice,
                                    product.price
                                  )}
                                  %
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-3 md:mt-0 w-full md:w-5/12">
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center text-gray-500"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                          {product.quantity}
                        </div>
                        <button
                          className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center text-gray-500"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-gray-500"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <IoTrashOutline className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Summary */}
          <div className="w-full md:w-4/12">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-bold text-black mb-4">
                Ringkasan Belanja
              </h2>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">
                  Total Harga ({calculateTotalItems()} barang)
                </span>
                <span className="text-black font-medium">
                  Rp{formatPrice(calculateTotal())}
                </span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Total Diskon</span>
                <span className="text-green-600">
                  -Rp
                  {formatPrice(
                    products
                      .filter(
                        (product) =>
                          product.selected &&
                          product.originalPrice > product.price
                      )
                      .reduce(
                        (total, product) =>
                          total +
                          (product.originalPrice - product.price) *
                            product.quantity,
                        0
                      )
                  )}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-black font-bold">Total Harga</span>
                  <span className="text-black font-bold">
                    Rp{formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <Link href="/Checkout">
                <button className="w-full bg-[#315CEA] hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                  Beli ({calculateTotalItems()})
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <div className="flex items-start gap-2">
                <div className="text-blue-500 mt-1">
                  <IoCheckmarkCircle className="text-xl" />
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-black mb-1">
                    Gratis Ongkir dengan Minimum Belanja Rp30.000
                  </p>
                  <p>Gunakan voucher sebelum checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Keranjang;
