"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUploader from "@/app/_component/FileUploader";

const BASE_URL = "http://localhost:5000";
const API_BASE = "http://localhost:5000/api/listings";

export default function EditProductListing() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: "",
    propertytype: "",
    bedroom: "",
    bathroom: "",
    builtln: "",
    parking: "",
    lotsize: "",
    area: "",
    price: "",
    hoa: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(API_BASE);
        const json = await res.json();

        const list = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.listings)
          ? json.listings
          : [];

        const selected = list.find((item) => item._id === id);

        if (!selected) throw new Error("Listing not found");

        const coordinates = selected.location?.coordinates || [];

        setFormData({
          type: selected.type === "Sale" ? "Sell" : selected.type || "",
          propertytype: selected.propertytype || "",
          bedroom: selected.bedroom || "",
          bathroom: selected.bathroom || "",
          builtln: selected.builtln || "",
          parking: selected.parking || "",
          lotsize: selected.lotsize || "",
          area: selected.area || "",
          price: selected.price || "",
          hoa: selected.hoa || 0,
          description: selected.description || "",
          address: selected.address || "",
          lat: coordinates[1] || "",
          lng: coordinates[0] || "",
        });

        setQuery(selected.address || "");
        setOldImages(selected.images || []);
      } catch (err) {
        setError(err.message || "Failed to fetch listing");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  const search = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`
    );

    const data = await res.json();
    setResults(data.features || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildFormPayload = () => {
    const fd = new FormData();

    fd.append("type", formData.type === "Sell" ? "Sale" : formData.type);
    fd.append("propertytype", formData.propertytype);
    fd.append("bedroom", formData.bedroom);
    fd.append("bathroom", formData.bathroom);
    fd.append("builtln", formData.builtln);
    fd.append("parking", formData.parking);
    fd.append("lotsize", formData.lotsize);
    fd.append("area", formData.area);
    fd.append("price", formData.price);
    fd.append("hoa", formData.hoa);
    fd.append("description", formData.description);
    fd.append("address", formData.address);
    fd.append("lat", formData.lat);
    fd.append("lng", formData.lng);

    images.forEach((file) => {
      fd.append("images", file);
    });

    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const payload = buildFormPayload();

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      router.push(`/admin/property-listing-view/${id}`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-10 text-center">Loading listing...</div>;
  }

  return (
    <div className="my-10 px-4 md:px-10 lg:px-36">
      <h2 className="text-2xl font-bold">Edit Listing</h2>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mt-5 rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-3">
              <h2 className="mb-2 font-bold text-gray-500">Location</h2>

              <div className="relative w-full">
                <div className="flex items-center">
                  <MapPin className="h-10 w-10 rounded-l-lg bg-purple-200 p-2 text-primary" />

                  <input
                    value={query}
                    onChange={(e) => search(e.target.value)}
                    placeholder="Search location..."
                    className="w-full rounded-r-lg border p-2 outline-none"
                  />
                </div>

                {results.length > 0 && (
                  <ul className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
                    {results.map((item, i) => (
                      <li
                        key={i}
                        className="cursor-pointer p-3 text-sm hover:bg-gray-100"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            address: item.properties.name || "",
                            lat: item.geometry.coordinates[1],
                            lng: item.geometry.coordinates[0],
                          }));

                          setQuery(
                            `${item.properties.name || ""}, ${
                              item.properties.city || ""
                            }`
                          );

                          setResults([]);
                        }}
                      >
                        <p className="font-medium">
                          {item.properties.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.properties.city}, {item.properties.country}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-slate-500">Rent or Sale</h2>

              <RadioGroup
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Rent" id="Rent" />
                  <Label htmlFor="Rent">Rent</Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Sell" id="Sell" />
                  <Label htmlFor="Sell">Sell</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-slate-500">Property Type</h2>

              <Select
                value={formData.propertytype}
                onValueChange={(value) =>
                  handleSelectChange("propertytype", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div />

            {[
              { label: "Bedroom", name: "bedroom" },
              { label: "Bathroom", name: "bathroom" },
              { label: "Built In", name: "builtln" },
              { label: "Parking", name: "parking" },
              { label: "Lot Size", name: "lotsize" },
              { label: "Area", name: "area" },
              { label: "Selling Price", name: "price" },
              { label: "HOA", name: "hoa" },
            ].map((field) => (
              <div key={field.name}>
                <h2 className="font-bold text-gray-500">{field.label}</h2>

                <Input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={0}
                />
              </div>
            ))}

            <div className="md:col-span-3">
              <h2 className="font-bold text-gray-500">Description</h2>

              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {oldImages.length > 0 && (
              <div className="md:col-span-3">
                <h2 className="mb-2 font-bold text-gray-500">
                  Current Images
                </h2>

                <div className="flex flex-wrap gap-3">
                  {oldImages.map((img, index) => (
                    <img
                      key={index}
                      src={`${BASE_URL}${img}`}
                      alt="property"
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm text-red-500">
                  Note: If you upload new images, these old images will be
                  replaced.
                </p>
              </div>
            )}

            <div className="md:col-span-3">
              <h2 className="mb-2 font-bold text-gray-500">
                Upload New Images
              </h2>

              <FileUploader setImages={setImages} />
            </div>

            <div className="mt-4 flex justify-end gap-4 md:col-span-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Listing"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}