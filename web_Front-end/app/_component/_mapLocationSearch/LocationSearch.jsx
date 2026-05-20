"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function LocationSearch({ onSelectAddress, selectedAddress }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // parent selectedAddress null ஆனதும் input clear ஆகும்
  useEffect(() => {
    if (selectedAddress === null) {
      setQuery("");
      setResults([]);
    }
  }, [selectedAddress]);

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

  return (
    <div className="w-full relative">
      <div className="flex items-center">
        <div className="h-12 w-12 flex items-center justify-center bg-purple-200 rounded-l-lg border border-r-0">
          <MapPin className="h-5 w-5 text-primary" />
        </div>

        <input
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="Search location..."
          className="w-full h-12 px-3 border rounded-r-lg outline-none"
        />
      </div>

      {results.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {results.map((item, i) => (
            <li
              key={i}
              className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                const selectedData = {
                  address: item.properties.name || "",
                  city: item.properties.city || "",
                  country: item.properties.country || "",
                  lat: item.geometry.coordinates[1],
                  lng: item.geometry.coordinates[0],
                };

                onSelectAddress?.(selectedData);

                setQuery(
                  `${item.properties.name || ""}${
                    item.properties.city ? ", " + item.properties.city : ""
                  }`
                );

                setResults([]);
              }}
            >
              {item.properties.name || "Unknown place"}
              {item.properties.city ? `, ${item.properties.city}` : ""}
              {item.properties.country ? `, ${item.properties.country}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}