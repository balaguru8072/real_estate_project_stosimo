"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Plus,
  Home,
  MapPin,
  LayoutDashboard,
  BedDouble,
  Car,
  House,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BASE_URL = "http://localhost:5000";

export default function PropertyListPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5000/api/listings");

        if (!response.ok) {
          throw new Error(`Failed to fetch listings: ${response.status}`);
        }

        const json = await response.json();

        if (!json.success) {
          throw new Error("API returned unsuccessful response");
        }

        const mapped = json.data.map((item) => ({
          id: item._id,
          image: `${BASE_URL}${item.images?.[0] || ""}`,
          status: item.type === "Sale" ? "For Sale" : "For Rent",
          statusColor: item.type === "Sale" ? "bg-red-500" : "bg-amber-500",
          price: `$${item.price.toLocaleString()}`,
          title: `${item.bedroom}BHK ${item.propertytype}, ${item.address}`,
          address: item.address,
          description: item.description,
          area: String(item.area),
          beds: String(item.bedroom),
          parking: String(item.parking),
          garage: String(item.builtln),
        }));

        setProperties(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <section className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Property List</h1>
          <p className="text-sm text-slate-500">Welcome to Compass</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
             onClick={() => router.push("/admin/edit-listing")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
              <Home className="h-4 w-4" />
              <span>Compass</span>
            </Link>
            <span>/</span>
            <span>Property</span>
            <span>/</span>
            <span className="font-medium text-slate-700">List</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-slate-500">
            <span className="text-sm">Loading properties...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            Failed to load listings: {error}
          </div>
        )}

        {/* Property List */}
        {!loading && !error && (
          <div className="space-y-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="rounded-2xl border bg-white shadow-sm"
              >
                <div className="p-5">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                    {/* Image */}
                    <div className="lg:col-span-4">
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={property.image}
                          alt={property.title}
                          width={600}
                          height={400}
                          className="h-[250px] w-full rounded-xl object-cover"
                        />
                        <span
                          className={`absolute left-3 top-3 rounded-md px-3 py-1 text-xs font-semibold text-white ${property.statusColor}`}
                        >
                          {property.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-8">
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <h5 className="mb-1 text-lg font-semibold text-green-600">
                            {property.price}
                          </h5>

                          <h4 className="text-xl font-bold text-slate-800">
                            <Link href={`/admin/property-listing-view/${property.id}`} className="hover:text-blue-600">
                              {property.title}
                            </Link>
                          </h4>

                          <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{property.address}</span>
                          </p>

                          <p className="mt-3 text-sm leading-6 text-slate-500">
                            {property.description}
                          </p>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-4 border-t pt-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <LayoutDashboard className="h-4 w-4 text-slate-500" />
                            <span>{property.area}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <BedDouble className="h-4 w-4 text-slate-500" />
                            <span>{property.beds}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Car className="h-4 w-4 text-slate-500" />
                            <span>{property.parking}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <House className="h-4 w-4 text-slate-500" />
                            <span>{property.garage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}