"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Bell,
    Flag,
    Menu,
    Search,
    Settings,
    Power,
    X,
    ChevronDown,
} from "lucide-react";
import SidebarContent from "./SidebarContent";

export default function AdminLayout({ children }) {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [admin, setAdmin] = useState(null);

    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/admin/profile", {
                    credentials: "include",
                });

                const data = await res.json();

                if (!res.ok) {
                    router.push("/sign-in");
                    return;
                }

                setAdmin(data.user || data.admin);
            } catch (err) {
                // console.log(err);
                router.push("/sign-in");
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/logout", {
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // ✅ clear UI + redirect
                window.location.href = "/sign-in";
            }
        } catch (err) {
            // console.log(err);
        }
    };

    const [openMenus, setOpenMenus] = useState({
        property: true,
        types: false,
        users: false,
        app: false,
        widgets: false,
        auth: false,
        sample: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    // const notifications = [
    //     { title: "8 New Members joined", time: "14 mins ago" },
    //     { title: "4 Sales made", time: "22 mins ago" },
    //     { title: "Nancy Doe Deleted account", time: "3 hours ago" },
    //     { title: "Nancy Changed name", time: "2 hours ago" },
    //     { title: "John Commented your post", time: "4 hours ago" },
    //     { title: "John Updated status", time: "3 hours ago" },
    //     { title: "Settings Updated", time: "Yesterday" },
    // ];

    const tasks = [
        { title: "Footer display issue", percent: 86 },
        { title: "Answer GitHub questions", percent: 35 },
        { title: "Solve transition issue", percent: 72 },
        { title: "Create new dashboard", percent: 45 },
        { title: "Pending Project", percent: 29 },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="rounded-md p-2 hover:bg-slate-100 lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden rounded-md p-2 hover:bg-slate-100 lg:block"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/assets/download-1.png"
                                alt="Compass"
                                width={40}
                                height={40}
                                unoptimized
                            />
                            <span className="text-lg font-bold text-slate-800">Estate</span>
                        </Link>
                    </div>

                    <div className="hidden w-full max-w-md px-6 md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                            />
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        {/* <div className="relative">
                            <button
                                onClick={() => {
                                    setNotificationOpen(!notificationOpen);
                                    setTaskOpen(false);
                                    setProfileOpen(false);
                                }}
                                className="relative rounded-lg p-2 hover:bg-slate-100"
                            >
                                <Bell className="h-5 w-5 text-slate-700" />
                                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                            </button>

                            {notificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow-xl">
                                    <div className="border-b px-4 py-3 text-sm font-semibold text-slate-700">
                                        NOTIFICATIONS
                                    </div>

                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.map((item, index) => (
                                            <div
                                                key={index}
                                                className="border-b px-4 py-3 last:border-b-0 hover:bg-slate-50"
                                            >
                                                <p className="text-sm font-medium text-slate-700">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {item.time}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="px-4 py-3 text-center text-sm font-medium text-blue-600">
                                        View All Notifications
                                    </div>
                                </div>
                            )}
                        </div> */}

                        {/* <div className="relative">
                            <button
                                onClick={() => {
                                    setTaskOpen(!taskOpen);
                                    setNotificationOpen(false);
                                    setProfileOpen(false);
                                }}
                                className="relative rounded-lg p-2 hover:bg-slate-100"
                            >
                                <Flag className="h-5 w-5 text-slate-700" />
                                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                            </button>

                            {taskOpen && (
                                <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow-xl">
                                    <div className="border-b px-4 py-3 text-sm font-semibold text-slate-700">
                                        TASKS
                                    </div>

                                    <div className="max-h-80 overflow-y-auto p-4">
                                        {tasks.map((task, index) => (
                                            <div key={index} className="mb-4 last:mb-0">
                                                <div className="mb-1 flex items-center justify-between text-sm">
                                                    <span className="font-medium text-slate-700">
                                                        {task.title}
                                                    </span>
                                                    <span className="text-slate-500">
                                                        {task.percent}%
                                                    </span>
                                                </div>

                                                <div className="h-2 w-full rounded-full bg-slate-200">
                                                    <div
                                                        className="h-2 rounded-full bg-amber-500"
                                                        style={{ width: `${task.percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="px-4 py-3 text-center text-sm font-medium text-blue-600">
                                        View All
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="hidden rounded-lg p-2 hover:bg-slate-100 md:block">
                            <Settings className="h-5 w-5 text-slate-700" />
                        </button> */}

                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => {
                                    setProfileOpen(!profileOpen);
                                    setNotificationOpen(false);
                                    setTaskOpen(false);
                                }}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                    {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                                </div>

                                <span className="hidden text-sm font-medium text-slate-700 sm:block">
                                    {admin?.name || "Admin"}
                                </span>

                                <ChevronDown className="h-4 w-4 text-slate-600" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                                    <div className="border-b px-4 py-3">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {admin?.name || "Admin"}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {admin?.email || "admin@gmail.com"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                        <Power className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                <aside
                    className={`hidden border-r bg-white transition-all duration-300 lg:block ${sidebarOpen ? "w-72" : "w-20"
                        }`}
                >
                    <SidebarContent
                        sidebarOpen={sidebarOpen}
                        openMenus={openMenus}
                        toggleMenu={toggleMenu}
                    />
                </aside>

                <aside
                    className={`fixed top-16 left-0 z-50 h-[calc(100vh-64px)] w-72 transform border-r bg-white transition-transform duration-300 lg:hidden ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <h2 className="font-semibold text-slate-800">Menu</h2>
                        <button onClick={() => setMobileSidebarOpen(false)}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <SidebarContent
                        sidebarOpen={true}
                        openMenus={openMenus}
                        toggleMenu={toggleMenu}
                    />
                </aside>

                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}