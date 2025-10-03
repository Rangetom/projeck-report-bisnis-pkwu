"use client";

import { useState } from "react";
import Siderbar from "../SiderSeller/page";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusPengiriman() {
  // Contoh data pesanan
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-001",
      customerName: "Andi",
      shippingAddress: "Jl. Mawar No. 1",
      shippingStatus: "Menunggu",
      phoneNumber: "6281234567890", // nomor WA pembeli (format internasional, tanpa +)
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customerName: "Budi",
      shippingAddress: "Jl. Melati No. 2",
      shippingStatus: "Dikirim",
      phoneNumber: "6289876543210",
    },
  ]);

  // Fungsi ganti status
  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, shippingStatus: newStatus } : order
      )
    );
  };

  // Fungsi untuk membuat link WhatsApp
  const getWaLink = (order) => {
    const pesan = `Halo ${order.customerName}, status pengiriman untuk pesanan ${order.orderNumber} saat ini: *${order.shippingStatus}*.\nAlamat: ${order.shippingAddress}`;
    return `https://wa.me/${order.phoneNumber}?text=${encodeURIComponent(pesan)}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex h-screen bg-gray-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Siderbar />
        <motion.div className="flex-1 overflow-y-auto pb-12">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <motion.div
              className="bg-white p-6 shadow-md rounded-lg"
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-xl font-semibold mb-6 text-black">
                Daftar Pesanan & Status Pengiriman
              </h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-50 p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Order: {order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Penerima: {order.customerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Alamat: {order.shippingAddress}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Status Pengiriman
                      </label>
                      <select
                        value={order.shippingStatus}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                      <a
                        href={getWaLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition"
                      >
                        Kirim Status ke WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
