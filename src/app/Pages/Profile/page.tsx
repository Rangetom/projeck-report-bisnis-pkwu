"use client";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Page";
import Frooter from "../../Components/Frooter/Page";

// Define types for our data
interface ProfileFormData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
}

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Address {
  id: number;
  type: string;
  name: string;
  phone: string;
  address: string;
  isPrimary: boolean;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  statusText: string;
  items: OrderItem[];
  additionalItems: number;
  total: number;
}

const Profile = () => {
  const { user } = useAuth();
  // Tab state
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileFormData>(() => ({
  fullName: user?.name || "",
  username: user?.name?.toLowerCase().replace(/\s/g, "") || "",
  email: user?.email || "",
  phone: "",
  bio: "",
}));
  // Security form state
  const [securityForm, setSecurityForm] = useState<SecurityFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Addresses state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Rumah",
      name: "Ahmad Rizky",
      phone: "+62 812-3456-789",
      address:
        "Jl. Jendral Sudirman No. 123, Kecamatan Setiabudi, Jakarta Selatan, DKI Jakarta, 12190",
      isPrimary: true,
    },
    {
      id: 2,
      type: "Kantor",
      name: "Ahmad Rizky",
      phone: "+62 812-3456-789",
      address:
        "The East Tower, Jl. HR Rasuna Said Kav. C-11, Kecamatan Setiabudi, Jakarta Selatan, DKI Jakarta, 12940",
      isPrimary: false,
    },
  ]);

  // Orders filter state
  const [orderFilter, setOrderFilter] = useState("all");

  // Orders state
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "INV/20250323/MPL/12345678",
      date: "23 Mar 2025",
      status: "shipping",
      statusText: "Dalam Pengiriman",
      items: [
        {
          name: "Headphone Bluetooth Noise Cancelling",
          price: 1200000,
          quantity: 1,
          image: "/api/placeholder/64/64",
        },
      ],
      additionalItems: 2,
      total: 1850000,
    },
    {
      id: "INV/20250315/MPL/87654321",
      date: "15 Mar 2025",
      status: "completed",
      statusText: "Selesai",
      items: [
        {
          name: "Smartphone Android 5G 8/128GB",
          price: 4299000,
          quantity: 1,
          image: "/api/placeholder/64/64",
        },
      ],
      additionalItems: 0,
      total: 4299000,
    },
  ]);

  // Show/hide new address form
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState<
    Omit<Address, "id" | "isPrimary">
  >({
    type: "",
    name: "",
    phone: "",
    address: "",
  });

  // Handlers for profile form
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate saving profile data
    alert("Profil berhasil diperbarui!");
  };

  // Handlers for security form
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecuritySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password
    if (!securityForm.currentPassword) {
      alert("Password saat ini harus diisi");
      return;
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak sama");
      return;
    }

    // Simulate password update
    alert("Password berhasil diperbarui!");

    // Reset form
    setSecurityForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Address handlers
  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate address form
    if (
      !newAddressForm.type ||
      !newAddressForm.name ||
      !newAddressForm.phone ||
      !newAddressForm.address
    ) {
      alert("Semua kolom harus diisi");
      return;
    }

    // Add new address
    const newAddress: Address = {
      id: addresses.length + 1,
      ...newAddressForm,
      isPrimary: addresses.length === 0, // Make primary if first address
    };

    setAddresses((prev) => [...prev, newAddress]);
    setShowNewAddressForm(false);
    setNewAddressForm({
      type: "",
      name: "",
      phone: "",
      address: "",
    });

    alert("Alamat baru berhasil ditambahkan!");
  };

  const handleDeleteAddress = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      const deletedAddress = addresses.find((addr) => addr.id === id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));

      // If deleted address was primary, make the first remaining address primary
      if (deletedAddress && deletedAddress.isPrimary && addresses.length > 1) {
        setAddresses((prev) =>
          prev.map((addr, index) =>
            index === 0 ? { ...addr, isPrimary: true } : addr
          )
        );
      }
    }
  };

  const handleSetPrimaryAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isPrimary: addr.id === id,
      }))
    );

    alert("Alamat utama berhasil diubah!");
  };

  // Order handlers
  const handleOrderFilter = (filter: string) => {
    setOrderFilter(filter);
  };

  const handleTrackOrder = (id: string) => {
    alert(`Melacak pesanan: ${id}`);
  };

  const handleViewOrderDetail = (id: string) => {
    alert(`Melihat detail pesanan: ${id}`);
  };

  const handleBuyAgain = (id: string) => {
    alert(`Membeli kembali dari pesanan: ${id}`);
  };

  // New address form handlers
  const handleNewAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Use the Navbar component */}
      <Navbar />
      {/* Main Blue Banner */}
      <div className="bg-[#315CEA] h-32">
        <div className="container mx-auto px-4 h-full relative">
          {/* Content will be positioned below the banner */}
        </div>
      </div>
      {/* Profile info positioned on top of the banner */}
      <div className="container mx-auto px-4 relative mt-[-40px]">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden">
            <img
              src="/api/placeholder/80/80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-2 text-center md:text-left">
            <h1 className="text-xl font-bold text-black">
              {profileForm.fullName}
            </h1>
            <p className="text-black text-sm">
              @{profileForm.username} · Member sejak Jan 2025
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 mt-12 md:mt-8">
        <div className="border-b flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 text-sm whitespace-nowrap ${
              activeTab === "profile"
                ? "border-b-2 border-[#315CEA] text-[#315CEA] font-medium"
                : "text-black"
            } transition-colors`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-3 text-sm whitespace-nowrap ${
              activeTab === "security"
                ? "border-b-2 border-[#315CEA] text-[#315CEA] font-medium"
                : "text-black"
            } transition-colors`}
          >
            Keamanan
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-3 text-sm whitespace-nowrap ${
              activeTab === "orders"
                ? "border-b-2 border-[#315CEA] text-[#315CEA] font-medium"
                : "text-black"
            } transition-colors`}
          >
            Pesanan Saya
          </button>
          <Link href="/Dashboad/Profileseller" className="w-full">
            <button
              onClick={() => setActiveTab("address")}
              className={`px-4 py-3 text-sm whitespace-nowrap ${
                activeTab === "address"
                  ? "border-b-2 border-[#315CEA] text-[#315CEA] font-medium"
                  : "text-black"
              } transition-colors`}
            >
              Seller Mode
            </button>
          </Link>
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-lg font-medium text-black">
                Informasi Profil
              </h2>
              <p className="text-black text-sm">
                Update informasi profil Anda di sini
              </p>
            </div>

            <form className="p-5" onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-1 text-black">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileForm.fullName}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black "
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-black">
                    Username
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-black text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={profileForm.username}
                      onChange={handleProfileChange}
                      className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-black">
                    Nomor Telepon
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-black text-sm">
                      +62
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black  "
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-black">Bio</label>
                  <textarea
                    rows={4}
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setProfileForm({
                      fullName: "Ahmad Rizky",
                      username: "ahmadrizky",
                      email: "ahmad.rizky@example.com",
                      phone: "8123456789",
                      bio: "Saya adalah penggemar teknologi dan suka berbelanja online.",
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#315CEA] text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}
        {activeTab === "security" && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-lg font-medium text-black">
                Pengaturan Keamanan
              </h2>
              <p className="text-black text-sm">Jaga akun Anda tetap aman</p>
            </div>

            <form className="p-5" onSubmit={handleSecuritySubmit}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm mb-1 text-black">
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={securityForm.currentPassword}
                    onChange={handleSecurityChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-black">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={securityForm.newPassword}
                    onChange={handleSecurityChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-black">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={securityForm.confirmPassword}
                    onChange={handleSecurityChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setSecurityForm({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#315CEA] text-white rounded-md text-sm hover:bg-blue-700 transition-colors text-black"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-lg font-medium text-black">Pesanan Saya</h2>
              <p className="text-black text-sm">Lihat dan lacak pesanan Anda</p>
            </div>

            <div className="p-5">
              <div className="mb-5 flex flex-wrap gap-2">
                {[
                  { key: "all", label: "Semua Pesanan" },
                  { key: "unpaid", label: "Belum Bayar" },
                  { key: "packed", label: "Dikemas" },
                  { key: "shipped", label: "Dikirim" },
                  { key: "completed", label: "Selesai" },
                  { key: "canceled", label: "Dibatalkan" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => handleOrderFilter(filter.key)}
                    className={`px-4 py-2 ${
                      orderFilter === filter.key
                        ? "bg-[#315CEA] text-white"
                        : "bg-white border border-gray-300 text-black hover:bg-gray-50"
                    } rounded-md text-sm transition-colors`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Filter orders based on selected filter */}
              {orders
                .filter(
                  (order) =>
                    orderFilter === "all" || order.status === orderFilter
                )
                .map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 mb-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs text-black">{order.date}</span>
                        <span className="text-xs text-black mx-2">•</span>
                        <span className="text-xs font-medium text-[#315CEA]">
                          {order.id}
                        </span>
                      </div>
                      <span
                        className={`${
                          order.status === "shipping"
                            ? "bg-blue-100 text-[#315CEA]"
                            : order.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : order.status === "canceled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        } text-xs px-2 py-1 rounded-full`}
                      >
                        {order.statusText}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={order.items[0].image}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-black">
                          {order.items[0].name}
                        </h4>
                        <p className="text-sm text-black">
                          {order.items[0].quantity} x Rp{" "}
                          {order.items[0].price.toLocaleString("id-ID")}
                        </p>
                        {order.additionalItems > 0 && (
                          <p className="text-sm text-black mt-1">
                            + {order.additionalItems} produk lainnya
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-black">Total Belanja</p>
                        <p className="font-bold text-black">
                          Rp {order.total.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <button
                        onClick={() => handleViewOrderDetail(order.id)}
                        className="text-[#315CEA] text-sm hover:text-blue-700 transition-colors"
                      >
                        Lihat Detail
                      </button>
                      {order.status === "shipping" ? (
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          className="px-4 py-2 bg-[#315CEA] text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                        >
                          Lacak Pesanan
                        </button>
                      ) : order.status === "completed" ? (
                        <button
                          onClick={() => handleBuyAgain(order.id)}
                          className="px-4 py-2 border border-[#315CEA] text-[#315CEA] rounded-md text-sm hover:bg-blue-50 transition-colors"
                        >
                          Beli Lagi
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}

              {orders.filter(
                (order) => orderFilter === "all" || order.status === orderFilter
              ).length === 0 && (
                <div className="text-center py-10">
                  <p className="text-black">Tidak ada pesanan yang ditemukan</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Frooter />
    </div>
  );
};

export default Profile;
