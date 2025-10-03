// File: AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserType = "buyer" | "seller" | "admin";

interface User {
  id: number;
  name: string;
  email: string;
  type: UserType;
  storeName?: string | null;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    role?: UserType,
    storeName?: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const path = window.location.pathname.toLowerCase();

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Gagal parse user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        router.push("/Pages/login");
      }
    } else {
      if (path !== "/pages/signup" && path !== "/pages/login") {
        router.push("/Pages/login");
      }
    }

    setLoading(false);
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserType = "buyer",
    storeName?: string
  ) => {
    setLoading(true);
    try {
      if (role === "seller" && (!storeName || storeName.trim() === "")) {
        throw new Error("Nama toko harus diisi untuk pendaftaran sebagai penjual.");
      }

      const payload: any = {
        name,
        email,
        password,
        role: role === "seller" ? "penjual" : role === "admin" ? "admin" : "pembeli",
      };

      if (role === "seller") {
        payload.nama_tokoh = storeName;
      }

      await axios.post("http://localhost:8000/api/register", payload);

      // Langsung login setelah register
      const loginResponse = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = loginResponse.data;

      const userWithType: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        storeName: user.nama_toko ?? null,
        type:
          user.role === "penjual"
            ? "seller"
            : user.role === "admin"
            ? "admin"
            : "buyer",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithType));
      setUser(userWithType);

      // Redirect sesuai role
      if (userWithType.type === "admin") {
        router.push("/Admin/H1");
      } else if (userWithType.type === "seller") {
        router.push("/Dashboad/Produk");
      } else {
        router.push("/Home");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
          .join("\n");
        alert("Validasi gagal:\n" + errorMessages);
      } else {
        alert(error.response?.data?.message || error.message || "Registrasi gagal.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      const userWithType: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        storeName: user.nama_toko ?? null,
        type:
          user.role === "penjual"
            ? "seller"
            : user.role === "admin"
            ? "admin"
            : "buyer",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithType));
      setUser(userWithType);

      // Redirect sesuai role
      if (userWithType.type === "admin") {
        router.push("/Admin/H1");
      } else if (userWithType.type === "seller") {
        router.push("/Dashboad/Produk");
      } else {
        router.push("/Home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login gagal. Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/Pages/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
