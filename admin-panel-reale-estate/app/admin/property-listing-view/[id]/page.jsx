"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { Edit } from "lucide-react";
import {
    ArrowLeft,
    Bath,
    BedDouble,
    Car,
    Home,
    LayoutDashboard,
    MapPin,
    Ruler,
} from "lucide-react";

const BASE_URL = "http://localhost:5000";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
    ssr: false,
});

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const imageUrl = useMemo(() => {
        if (!property?.images?.length) return "/assets/no-image.png";
        return `${BASE_URL}${property.images[0]}`;
    }, [property]);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${BASE_URL}/api/listings`);

                if (!res.ok) {
                    throw new Error("Failed to fetch property");
                }

                const json = await res.json();

                const list = Array.isArray(json)
                    ? json
                    : Array.isArray(json.data)
                        ? json.data
                        : Array.isArray(json.listings)
                            ? json.listings
                            : [];

                const selected = list.find((item) => item._id === id);

                if (!selected) {
                    throw new Error("Property not found");
                }

                setProperty(selected);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 p-6">
                <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                    Loading property details...
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-slate-100 p-6">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    const coordinates = property.location?.coordinates || [];
    const lng = coordinates[0];
    const lat = coordinates[1];

    return (
        <section className="min-h-screen bg-slate-100 p-4 md:p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <h1 className="text-2xl font-bold text-slate-900">
                        {property.bedroom}BHK {property.propertytype}
                    </h1>

                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        {property.address}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/property-list/edit/${property._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        <Edit size={16} />
                        Edit
                    </Link>

                    <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${property.type === "Sale" ? "bg-red-500" : "bg-amber-500"
                            }`}
                    >
                        For {property.type}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="xl:col-span-8">
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        <img
                            src={imageUrl}
                            alt={property.address}
                            className="h-[420px] w-full object-cover"
                        />

                        <div className="p-6">
                            <h2 className="text-3xl font-bold text-green-600">
                                ₹{Number(property.price || 0).toLocaleString("en-IN")}
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                {property.description || "No description available."}
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <InfoCard icon={<BedDouble />} label="Bedrooms" value={property.bedroom} />
                                <InfoCard icon={<Bath />} label="Bathrooms" value={property.bathroom} />
                                <InfoCard icon={<Car />} label="Parking" value={property.parking} />
                                <InfoCard icon={<Ruler />} label="Area" value={`${property.area} sqft`} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                        <h3 className="mb-4 text-lg font-bold text-slate-900">
                            Property Details
                        </h3>

                        <div className="space-y-3 text-sm">
                            <Detail label="Property Type" value={property.propertytype} />
                            <Detail label="Purpose" value={property.type} />
                            <Detail label="Built In" value={property.builtln} />
                            <Detail label="Lot Size" value={property.lotsize} />
                            <Detail label="HOA" value={property.hoa || 0} />
                            <Detail label="Address" value={property.address} />
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-3xl bg-white p-5 shadow-sm">
                        <h3 className="mb-4 text-lg font-bold text-slate-900">
                            Location Map
                        </h3>

                        {lat && lng ? (
                            <PropertyMap
                                lat={lat}
                                lng={lng}
                                title={`${property.bedroom}BHK ${property.propertytype}`}
                                address={property.address}
                                price={property.price}
                            />
                        ) : (
                            <div className="rounded-xl bg-slate-100 p-5 text-sm text-slate-500">
                                Location coordinates not available.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="rounded-2xl border bg-slate-50 p-4">
            <div className="mb-3 text-blue-600">{icon}</div>
            <p className="text-xs text-slate-500">{label}</p>
            <h4 className="mt-1 font-bold text-slate-800">{value || "-"}</h4>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex justify-between gap-4 border-b pb-3">
            <span className="text-slate-500">{label}</span>
            <span className="text-right font-semibold text-slate-800">
                {value || "-"}
            </span>
        </div>
    );
}