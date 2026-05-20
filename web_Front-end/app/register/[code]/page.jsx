"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/users/register`, formData);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Register successful");
      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="w-full bg-purple-600 text-white p-3 rounded-lg">
          Register
        </button>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}