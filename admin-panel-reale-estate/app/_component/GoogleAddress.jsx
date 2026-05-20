"use client";
import React, { useState } from "react";
import { MapPin } from "lucide-react";

export default function LocationSearch({ onSelectAddress }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    const res = await fetch(
      `https://photon.komoot.io/api/?q=${value}&limit=5`
    );

    const data = await res.json();
    setResults(data.features);
  };

  return (
    <div className="w-full">
      {/* Input Wrapper */}
      <div className="relative w-full">
        
        {/* Input + Icon */}
        <div className="flex items-center">
          <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
          
          <input
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Search location..."
            className="w-full p-2 border rounded-r-lg outline-none"
          />
        </div>

        {/* Dropdown */}
        {results.length > 0 && (
          <ul className="absolute left-0 top-full w-full border bg-white shadow-lg rounded-md mt-1 z-50 max-h-60 overflow-y-auto">
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

                  if (onSelectAddress) {
                    onSelectAddress(selectedData);
                  }

                  setQuery(
                    `${item.properties.name || ""}, ${item.properties.city || ""}`
                  );

                  setResults([]);
                }}
              >
                <p className="font-medium">
                  {item.properties.name || "Unknown"}
                </p>
                <p className="text-gray-500 text-xs">
                  {item.properties.city}, {item.properties.country}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}