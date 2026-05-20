"use client";

import React, { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
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

const API_BASE = "http://localhost:5000/api/listings";

function EditListing() {
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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // ── Location autocomplete ───────────────────────────────────────────────────
  const search = async (value) => {
    setQuery(value);
    if (value.length < 3) { setResults([]); return; }

    const res = await fetch(`https://photon.komoot.io/api/?q=${value}&limit=5`);
    const data = await res.json();
    setResults(data.features);
  };

  // ── Generic field handlers ──────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Build payload matching your Mongoose schema ─────────────────────────────
  const buildFormPayload = () => {
    const fd = new FormData();

    fd.append("type", formData.type === "Sell" ? "Sale" : formData.type);
    fd.append("propertytype", formData.propertytype);
    fd.append("description", formData.description);
    fd.append("address", formData.address);

    const numericFields = [
      "bedroom",
      "bathroom",
      "builtln",
      "parking",
      "lotsize",
      "area",
      "price",
      "hoa",
    ];

    numericFields.forEach((key) => {
      if (formData[key] !== "") {
        fd.append(key, Number(formData[key]));
      }
    });

    if (formData.lat !== "" && formData.lng !== "") {
      fd.append("lat", formData.lat);
      fd.append("lng", formData.lng);
    }

    images.forEach((file) => fd.append("images", file));

    return fd;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const submitListing = async (publish = false) => {
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const payload = buildFormPayload();
      if (publish) payload.append("published", "true"); // extend schema if needed

      const res = await fetch("http://localhost:5000/api/listings/createlisting", {
        method: "POST",
        // ⚠️  Do NOT set Content-Type manually — browser sets multipart boundary
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        // Surface validation messages from the server
        throw new Error(data?.message || `Server error: ${res.status}`);
      }

      setSuccessMsg(
        publish
          ? "Listing published successfully! 🎉"
          : "Listing saved as draft."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => submitListing(false);
  const handleSubmit = (e) => { e.preventDefault(); submitListing(true); };

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="my-10 px-4 md:px-10 lg:px-36">
      <h2 className="text-2xl font-bold">
        Enter some more details about your listing
      </h2>

      {/* Feedback banners */}
      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mt-5 rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* ── Location ── */}
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
                          setQuery(`${item.properties.name}, ${item.properties.city}`);
                          setResults([]);
                        }}
                      >
                        <p className="font-medium">{item.properties.name || "Unknown"}</p>
                        <p className="text-xs text-gray-500">
                          {item.properties.city}, {item.properties.country}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Show resolved coordinates as confirmation */}
              {formData.lat && formData.lng && (
                <p className="mt-1 text-xs text-gray-400">
                  📍 Coordinates: {Number(formData.lat).toFixed(5)}, {Number(formData.lng).toFixed(5)}
                </p>
              )}
            </div>

            {/* ── Rent or Sale ── */}
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
                  {/* Value is "Sell" in UI but mapped to "Sale" before sending */}
                  <RadioGroupItem value="Sell" id="Sell" />
                  <Label htmlFor="Sell">Sell</Label>
                </div>
              </RadioGroup>
            </div>

            {/* ── Property Type ── */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-slate-500">Property Type</h2>
              <Select
                value={formData.propertytype}
                onValueChange={(value) => handleSelectChange("propertytype", value)}
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

            {/* ── Numeric fields ── */}
            {[
              { label: "Bedroom", name: "bedroom" },
              { label: "Bathroom", name: "bathroom" },
              { label: "Built In", name: "builtln" },
              { label: "Parking", name: "parking" },
              { label: "Lot Size", name: "lotsize" },
              { label: "Area", name: "area" },
              { label: "Selling Price ($)", name: "price" },
              { label: "HOA ($)", name: "hoa" },
            ].map((field) => (
              <div key={field.name}>
                <h2 className="font-bold text-gray-500">{field.label}</h2>
                <Input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                  min={0}
                />
              </div>
            ))}

            {/* ── Description ── */}
            <div className="md:col-span-3">
              <h2 className="font-bold text-gray-500">Description</h2>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter property description"
              />
            </div>

            {/* ── Images ── */}
            <div className="md:col-span-3">
              <h2 className="mb-2 font-bold text-gray-500">Upload Property Images</h2>
              <FileUploader setImages={setImages} />
            </div>

            {/* ── Actions ── */}
            <div className="mt-4 flex justify-end gap-4 md:col-span-3">
              <Button
                variant="outline"
                className="border-primary font-bold text-primary"
                type="button"
                disabled={isLoading}
                onClick={handleSave}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save
              </Button>

              <Button className="font-bold" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  "Save & Publish"
                )}
              </Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default EditListing;