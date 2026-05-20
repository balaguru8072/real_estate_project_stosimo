"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Trash2, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MailInboxPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/contacts");
                const data = await res.json();

                if (data.success) {
                    setContacts(data.contacts);
                }
            } catch (error) {
                // console.log("Inbox fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        getContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = confirm("Are you sure to delete?");
            if (!confirmDelete) return;

            const res = await fetch(
                `http://localhost:5000/api/contacts/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.success) {
                setContacts((prev) => prev.filter((item) => item._id !== id));

                // ✅ SUCCESS TOAST
                toast.success("Message deleted successfully 🗑️");
            } else {
                toast.error(data.message || "Delete failed");
            }
        } catch (error) {
            toast.error("Server error");
        }
    };

    if (loading) return <div className="p-6">Loading inbox...</div>;

    return (
        <div className="min-h-screen bg-[#f4f7fb] p-6">
            <ToastContainer position="top-right" autoClose={1500} />
            <h1 className="mb-6 text-2xl font-bold text-[#1d2534]">Inbox</h1>

            <div className="overflow-hidden rounded-2xl bg-white shadow">
                {contacts.length === 0 ? (
                    <p className="p-6 text-gray-500">No messages found</p>
                ) : (
                    contacts.map((item) => {
                        const isReplied = item.isReplied === true;
                        const isRead = item.isRead === true;

                        return (
                            <Link
                                key={item._id}
                                href={`/mail-inbox/${item._id}`}
                                className={`block border-b p-5 transition ${isReplied
                                    ? "bg-gray-100"
                                    : isRead
                                        ? "bg-blue-50"
                                        : "bg-yellow-50"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4 flex-1">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-full text-white ${isReplied
                                                ? "bg-green-600"
                                                : isRead
                                                    ? "bg-blue-600"
                                                    : "bg-orange-500"
                                                }`}
                                        >
                                            <User size={20} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-[#1d2534]">
                                                {item.username}
                                            </h3>

                                            <p className="flex items-center gap-1 text-sm text-gray-500">
                                                <Mail size={14} />
                                                {item.email}
                                            </p>

                                            <p className="mt-1 truncate font-medium text-gray-700">
                                                {item.subject}
                                            </p>

                                            <p className="mt-1 truncate text-sm text-gray-500">
                                                {item.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // ❗ stop navigation
                                            handleDelete(item._id);
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}