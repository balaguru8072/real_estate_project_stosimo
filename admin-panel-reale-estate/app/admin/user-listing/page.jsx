"use client";

import Image from "next/image";
import {
    Search,
    PlusCircle,
    Archive,
    Trash2,
    Edit,
    Phone,
    Mail,
    ChevronLeft,
    ChevronRight,
    Tag,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api/users/admin/all-users"; // change if your API is different

export default function ContactListPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await fetch(API_URL, {
                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
                credentials: "include",
            });

            const data = await res.json();

            // supports both: data.users OR data.user OR direct array
            const userList = data.users || data.user || data.data || data || [];

            setUsers(Array.isArray(userList) ? userList : []);
        } catch (error) {
            // console.log("Fetch users error:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) return users;

        return users.filter((item) => {
            const name = item.name?.toLowerCase() || "";
            const email = item.email?.toLowerCase() || "";
            const mobile = item.mobile_number?.toString().toLowerCase() || "";

            return (
                name.includes(keyword) ||
                email.includes(keyword) ||
                mobile.includes(keyword)
            );
        });
    }, [users, search]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredUsers, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const allSelected =
        paginatedUsers.length > 0 &&
        paginatedUsers.every((item) => selected.includes(item._id || item.id));

    const toggleAll = () => {
        if (allSelected) {
            setSelected([]);
        } else {
            setSelected(paginatedUsers.map((item) => item._id || item.id));
        }
    };

    const toggleOne = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setUsers((prev) =>
                    prev.filter((item) => (item._id || item.id) !== id)
                );
                setSelected((prev) => prev.filter((item) => item !== id));
            }
        } catch (error) {
            // console.log("Delete error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Action Bar */}
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-600 md:col-span-2 lg:col-span-1">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleAll}
                                className="h-4 w-4 rounded border-slate-300"
                            />
                            All
                        </label>

                        <div className="relative md:col-span-5">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-4 pr-11 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                            />
                            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        </div>

                        {/* <div className="flex items-center gap-2 md:col-span-5 md:justify-end lg:col-span-6">
              <button className="hidden h-10 w-10 items-center justify-center rounded-full border text-slate-600 transition hover:bg-slate-100 sm:flex">
                <Tag size={18} />
              </button>

              <button className="hidden h-10 w-10 items-center justify-center rounded-full border text-slate-600 transition hover:bg-slate-100 sm:flex">
                <PlusCircle size={18} />
              </button>

              <button className="hidden h-10 w-10 items-center justify-center rounded-full border text-slate-600 transition hover:bg-slate-100 sm:flex">
                <Archive size={18} />
              </button>

              <button className="ml-auto h-10 w-10 rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 md:ml-0">
                <Trash2 size={18} className="mx-auto" />
              </button>
            </div> */}
                    </div>
                </div>

                {/* User Table */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[750px] text-left">
                            <thead className="border-b bg-slate-50 text-sm text-slate-500">
                                <tr>
                                    <th className="px-5 py-4">#</th>
                                    <th className="px-5 py-4">Name</th>
                                    <th className="px-5 py-4">Phone</th>
                                    <th className="px-5 py-4">Email</th>
                                    <th className="px-5 py-4">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {loading && (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-10 text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                )}

                                {!loading &&
                                    paginatedUsers.map((item) => {
                                        const id = item._id || item.id;

                                        return (
                                            <tr key={id} className="transition hover:bg-slate-50">
                                                <td className="px-5 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(id)}
                                                        onChange={() => toggleOne(id)}
                                                        className="h-4 w-4 rounded border-slate-300"
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src="/download.png"
                                                            //   src={item.avatar || "/download.png"}
                                                            alt={item.name || "User"}
                                                            width={44}
                                                            height={44}
                                                            className="rounded-full object-cover"
                                                        />


                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {item.name || "No Name"}
                                                            </p>

                                                            {item.role && (
                                                                <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                                    {item.role}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 text-sm text-slate-600">
                                                    <span className="flex items-center gap-2">
                                                        <Phone size={16} />
                                                        {item.mobile_number || "N/A"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-sm text-slate-600">
                                                    <span className="flex items-center gap-2">
                                                        <Mail size={16} />
                                                        {item.email || "N/A"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex gap-2">
                                                        <button className="h-9 w-9 rounded-full border text-slate-500 transition hover:bg-blue-50 hover:text-blue-600">
                                                            <Edit size={16} className="mx-auto" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(id)}
                                                            className="h-9 w-9 rounded-full border text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 size={16} className="mx-auto" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                {!loading && paginatedUsers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-5 py-10 text-center text-slate-500"
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`h-9 w-9 rounded-lg border text-sm ${page === currentPage
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}