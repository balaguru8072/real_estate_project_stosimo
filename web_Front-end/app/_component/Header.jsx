"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronUp, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { withRandomPath } from "@/lib/randomPath";

const BASE_URL = "http://localhost:5000";

function Header() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/profile`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token :",token);

        if (!token) {
          setUser(null);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error.response?.data);
        setUser(null);
      }
    };

    getProfile();
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      setProfileOpen(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const generateRandomPath = (path) => {
    return path;
  };

  return (
    <>
      <div
        className={`main-header px-6 md:px-10 flex justify-between items-center w-full z-50 transition-all duration-300 ${isFixed
          ? "fixed top-0 left-0 bg-white shadow-md py-4"
          : "fixed top-0 left-0 bg-white py-6 shadow-sm"
          }`}
      >
        <div className="flex gap-6 md:gap-12 items-center">
          <Link href={generateRandomPath("/")}>
            <Image src="/logo.svg" alt="Logo" width={150} height={150} />
          </Link>

          <ul className="hidden md:flex gap-10 text-[16px] font-medium text-slate-700">
            <li>
              <Link href={generateRandomPath("/")}>Home</Link>
            </li>
            <li>
              <Link href={withRandomPath("/aboutPages")}>About Us</Link>
            </li>
            <li>
              <Link href={withRandomPath("/preparatoryPages")}>Preparatory</Link>
            </li>
            <li>
              <Link href={withRandomPath("/ContactPages")}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 items-center">
          <div className="hidden md:flex gap-2 items-center">
            {!user ? (
              <Link href={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-2 z-[999]">
                    <div className="px-3 py-2 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-[76px] left-0 w-full bg-white shadow-lg z-40 p-5 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <Link href={withRandomPath("/aboutPages")} onClick={() => setIsOpen(false)}>
            About Us
          </Link>

          <Link href={withRandomPath("/preparatoryPages")} onClick={() => setIsOpen(false)}>
            Preparatory
          </Link>

          <Link href={withRandomPath("/ContactPages")} onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>

          {!user ? (
            <Link href={withRandomPath("/login")} onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          ) : (
            <div className="border rounded-xl p-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500 mb-3">{user.email}</p>

              <Button
                onClick={logoutHandler}
                variant="outline"
                className="w-full text-red-600"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}

      <button
        onClick={scrollToTop}
        className={`scroll-top fixed right-5 bottom-5 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 ${showScrollTop
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-4"
          }`}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  );
}

export default Header;