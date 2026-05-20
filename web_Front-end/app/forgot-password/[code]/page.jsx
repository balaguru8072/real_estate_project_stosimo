"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/users/forgot-password`, {
        email,
      });

      alert("Password reset link sent to your email");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleForgotPassword}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-bold mb-3 text-center">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email. We will send password reset link.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-purple-600 text-white p-3 rounded-lg">
          Send Reset Link
        </button>

        <p className="text-center mt-5 text-sm">
          Back to{" "}
          <Link href="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}