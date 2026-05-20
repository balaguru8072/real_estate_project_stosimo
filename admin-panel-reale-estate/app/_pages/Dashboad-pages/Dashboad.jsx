"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Plus,
    Building2,
    Home,
    BarChart3,
    IndianRupee,
    RefreshCw,
    CalendarDays,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

import {
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function StatCard({ title, value, progress, change, icon: Icon, trend }) {
    return (
        <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                </div>

                <div className="mt-4">
                    <Progress value={progress} className="h-2" />

                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        {trend === "up" ? (
                            <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                            <ArrowDownRight className="h-3.5 w-3.5 text-red-600" />
                        )}
                        {change}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));

    const fetchListings = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/api/listings", {
                cache: "no-store",
            });

            const result = await res.json();

            // Your backend response: { success: true, data: listings }
            setListings(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            // console.log("Dashboard API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const filteredListings = useMemo(() => {
        return listings.filter((item) => {
            const date = new Date(item.createdAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            const matchYear = selectedYear === "all" || year === Number(selectedYear);
            const matchMonth = selectedMonth === "all" || month === Number(selectedMonth);

            return matchYear && matchMonth;
        });
    }, [listings, selectedMonth, selectedYear]);

    const dashboardStats = useMemo(() => {
        const now = new Date();

        const last7Days = new Date();
        last7Days.setDate(now.getDate() - 7);

        const previous7DaysStart = new Date();
        previous7DaysStart.setDate(now.getDate() - 14);

        const totalProjects = filteredListings.length;

        const newProjects = filteredListings.filter((item) => {
            const createdDate = new Date(item.createdAt);
            return createdDate >= last7Days;
        }).length;

        const previousWeekProjects = filteredListings.filter((item) => {
            const createdDate = new Date(item.createdAt);
            return createdDate >= previous7DaysStart && createdDate < last7Days;
        }).length;

        const rentProjects = filteredListings.filter(
            (item) => item.type?.toLowerCase() === "rent"
        ).length;

        const saleProjects = filteredListings.filter(
            (item) => item.type?.toLowerCase() === "sale"
        ).length;

        const totalPrice = filteredListings.reduce(
            (sum, item) => sum + Number(item.price || 0),
            0
        );

        const rentPercentage =
            totalProjects > 0 ? Math.round((rentProjects / totalProjects) * 100) : 0;

        const salePercentage =
            totalProjects > 0 ? Math.round((saleProjects / totalProjects) * 100) : 0;

        const newProjectChange =
            previousWeekProjects > 0
                ? Math.round(((newProjects - previousWeekProjects) / previousWeekProjects) * 100)
                : newProjects > 0
                    ? 100
                    : 0;

        return [
            {
                title: "New Projects",
                value: newProjects,
                progress: Math.min(newProjects * 10, 100),
                change: `${newProjectChange}% from previous week`,
                icon: Building2,
                trend: newProjectChange >= 0 ? "up" : "down",
            },
            {
                title: "Total Projects",
                value: totalProjects,
                progress: 100,
                change: "Total filtered properties",
                icon: BarChart3,
                trend: "up",
            },
            {
                title: "Properties for Rent",
                value: rentProjects,
                progress: rentPercentage,
                change: `${rentPercentage}% of total`,
                icon: Home,
                trend: "up",
            },
            {
                title: "Total Property Value",
                value: `₹${totalPrice.toLocaleString("en-IN")}`,
                progress: salePercentage,
                change: `${saleProjects} sale properties`,
                icon: IndianRupee,
                trend: "up",
            },
        ];
    }, [filteredListings]);

    const weeklyGrowthData = useMemo(() => {
        const days = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            const label = date.toLocaleDateString("en-US", { weekday: "short" });

            const count = filteredListings.filter((item) => {
                const created = new Date(item.createdAt);
                return created.toDateString() === date.toDateString();
            }).length;

            days.push({
                day: label,
                projects: count,
            });
        }

        return days;
    }, [filteredListings]);

    const monthlyData = useMemo(() => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        return months.map((month, index) => {
            const monthListings = listings.filter((item) => {
                const date = new Date(item.createdAt);
                return (
                    date.getFullYear() === Number(selectedYear) &&
                    date.getMonth() === index
                );
            });

            return {
                month,
                rent: monthListings.filter((item) => item.type?.toLowerCase() === "rent").length,
                sale: monthListings.filter((item) => item.type?.toLowerCase() === "sale").length,
            };
        });
    }, [listings, selectedYear]);

    const rentSaleData = useMemo(() => {
        const rent = filteredListings.filter(
            (item) => item.type?.toLowerCase() === "rent"
        ).length;

        const sale = filteredListings.filter(
            (item) => item.type?.toLowerCase() === "sale"
        ).length;

        return [
            { name: "Rent", value: rent },
            { name: "Sale", value: sale },
        ];
    }, [filteredListings]);

    const propertyTypeData = useMemo(() => {
        const groups = {};

        filteredListings.forEach((item) => {
            const type = item.propertytype || "Other";
            groups[type] = (groups[type] || 0) + 1;
        });

        return Object.keys(groups).map((key) => ({
            name: key,
            value: groups[key],
        }));
    }, [filteredListings]);

    const years = useMemo(() => {
        const yearSet = new Set(
            listings.map((item) => new Date(item.createdAt).getFullYear())
        );

        return Array.from(yearSet).sort((a, b) => b - a);
    }, [listings]);

    const recentListings = filteredListings.slice(0, 6);

    return (
        <section className="min-h-screen bg-slate-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Real Estate Dashboard
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Track projects, rent, sale, weekly growth and property performance.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[150px] rounded-xl bg-white">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Months</SelectItem>
                                <SelectItem value="1">January</SelectItem>
                                <SelectItem value="2">February</SelectItem>
                                <SelectItem value="3">March</SelectItem>
                                <SelectItem value="4">April</SelectItem>
                                <SelectItem value="5">May</SelectItem>
                                <SelectItem value="6">June</SelectItem>
                                <SelectItem value="7">July</SelectItem>
                                <SelectItem value="8">August</SelectItem>
                                <SelectItem value="9">September</SelectItem>
                                <SelectItem value="10">October</SelectItem>
                                <SelectItem value="11">November</SelectItem>
                                <SelectItem value="12">December</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-[130px] rounded-xl bg-white">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Years</SelectItem>
                                {years.map((year) => (
                                    <SelectItem key={year} value={String(year)}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button variant="outline" className="rounded-xl" onClick={fetchListings}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>

                        <Button className="rounded-xl">
                            <Plus className="mr-2 h-4 w-4" />
                            <Link href={"/admin/edit-listing"}>

                                Add Property
                            </Link>
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                        Loading dashboard...
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {dashboardStats.map((item) => (
                                <StatCard key={item.title} {...item} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <Card className="rounded-2xl border-0 shadow-sm xl:col-span-8">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CalendarDays className="h-5 w-5 text-primary" />
                                        Weekly Growth
                                    </CardTitle>
                                    <CardDescription>
                                        New properties added in the last 7 days
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="h-[320px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={weeklyGrowthData}>
                                                <defs>
                                                    <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                                <XAxis dataKey="day" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Area
                                                    type="monotone"
                                                    dataKey="projects"
                                                    stroke="#2563eb"
                                                    fill="url(#growthFill)"
                                                    strokeWidth={3}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border-0 shadow-sm xl:col-span-4">
                                <CardHeader>
                                    <CardTitle>Rent vs Sale</CardTitle>
                                    <CardDescription>Property type comparison</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="h-[320px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={rentSaleData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    innerRadius={70}
                                                    outerRadius={105}
                                                    paddingAngle={4}
                                                >
                                                    <Cell fill="#2563eb" />
                                                    <Cell fill="#22c55e" />
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {rentSaleData.map((item) => (
                                            <div key={item.name} className="rounded-xl bg-slate-50 p-3 text-center">
                                                <p className="text-xl font-bold">{item.value}</p>
                                                <p className="text-sm text-muted-foreground">{item.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                            <Card className="rounded-2xl border-0 shadow-sm xl:col-span-8">
                                <CardHeader>
                                    <CardTitle>Monthly Rent & Sale Report</CardTitle>
                                    <CardDescription>
                                        Monthly property count based on selected year
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="h-[320px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={monthlyData}>
                                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Bar dataKey="rent" radius={[8, 8, 0, 0]} fill="#2563eb" />
                                                <Bar dataKey="sale" radius={[8, 8, 0, 0]} fill="#22c55e" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border-0 shadow-sm xl:col-span-4">
                                <CardHeader>
                                    <CardTitle>Property Types</CardTitle>
                                    <CardDescription>Apartment, House, Land etc.</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {propertyTypeData.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">No property type data</p>
                                    ) : (
                                        propertyTypeData.map((item) => {
                                            const percent =
                                                filteredListings.length > 0
                                                    ? Math.round((item.value / filteredListings.length) * 100)
                                                    : 0;

                                            return (
                                                <div key={item.name}>
                                                    <div className="mb-2 flex items-center justify-between text-sm">
                                                        <span className="font-medium">{item.name}</span>
                                                        <span className="text-muted-foreground">
                                                            {item.value} / {percent}%
                                                        </span>
                                                    </div>
                                                    <Progress value={percent} className="h-2.5" />
                                                </div>
                                            );
                                        })
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="rounded-2xl border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Properties</CardTitle>
                                <CardDescription>Latest added property listings</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[800px] text-sm">
                                        <thead>
                                            <tr className="border-b text-left text-muted-foreground">
                                                <th className="py-3">Property</th>
                                                <th className="py-3">Type</th>
                                                <th className="py-3">Property Type</th>
                                                <th className="py-3">Price</th>
                                                <th className="py-3">Address</th>
                                                <th className="py-3">Created</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {recentListings.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="py-6 text-center text-muted-foreground">
                                                        No listings found
                                                    </td>
                                                </tr>
                                            ) : (
                                                recentListings.map((item) => (
                                                    <tr key={item._id} className="border-b last:border-0">
                                                        <td className="py-3 font-medium">
                                                            {item.description?.slice(0, 35) || "Property"}
                                                        </td>
                                                        <td className="py-3">
                                                            <Badge variant={item.type === "Rent" ? "secondary" : "default"}>
                                                                {item.type}
                                                            </Badge>
                                                        </td>
                                                        <td className="py-3">{item.propertytype}</td>
                                                        <td className="py-3 font-semibold">
                                                            ₹{Number(item.price || 0).toLocaleString("en-IN")}
                                                        </td>
                                                        <td className="py-3 max-w-[250px] truncate">{item.address}</td>
                                                        <td className="py-3">
                                                            {new Date(item.createdAt).toLocaleDateString("en-IN")}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </section>
    );
}