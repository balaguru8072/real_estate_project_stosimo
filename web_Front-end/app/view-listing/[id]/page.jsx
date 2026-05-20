"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ContactSection from "../../_component/_contact/_contactUs/ContactSection";

const BASE_URL = "http://localhost:5000";

export default function ViewListingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(
        `/login?redirect=${encodeURIComponent(`/view-listing/${id}`)}`
      );
      return;
    }

    const fetchSingleListing = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setListing(res.data.listing || res.data.data);
      } catch (error) {
        console.log(error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.replace(
            `/login?redirect=${encodeURIComponent(`/view-listing/${id}`)}`
          );
          return;
        }

        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleListing();
  }, [id, router]);

  if (loading) return <div className="p-10">Loading...</div>;

  if (!listing) return <div className="p-10">Listing not found</div>;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <img
        src={
          listing.images?.[0]
            ? `${BASE_URL}${listing.images[0]}`
            : "/assets/images/no-image.jpg"
        }
        alt={listing.propertytype}
        className="w-full h-[350px] object-cover rounded-2xl"
      />

      <div className="mt-6">
        <h1 className="text-3xl font-bold">
          {listing.bedroom}BHK {listing.propertytype}
        </h1>

        <p className="text-gray-500 mt-2">{listing.address}</p>

        <h2 className="text-2xl font-bold text-purple-600 mt-4">
          ₹{Number(listing.price).toLocaleString()}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-xl">
            Bedroom: {listing.bedroom}
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            Bathroom: {listing.bathroom}
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            Area: {listing.area} sqft
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            Type: {listing.type}
          </div>
        </div>

        <p className="mt-6 text-gray-700 leading-7">
          {listing.description}
        </p>
      </div>

      <div className="mt-5">
        <ContactSection />
      </div>
    </div>
  );
}