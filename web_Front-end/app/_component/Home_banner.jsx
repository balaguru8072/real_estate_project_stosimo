"use client";

import React, { useState } from "react";
import { Search, BedDouble, Bath, CarFront } from "lucide-react";
import LocationSearch from "./_mapLocationSearch/LocationSearch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Home_banner({ onSearch }) {
  const [activeTab, setActiveTab] = useState("buy");
  const [selectAddress, setSelectAddress] = useState(null);

  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [parking, setParking] = useState("");
  const [homeType, setHomeType] = useState("");

  const handleSelectAddress = (data) => {
    setSelectAddress(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      type: activeTab === "buy" ? "Sale" : "Rent",
      address: selectAddress?.address || "",
      bed,
      bath,
      parking,
      homeType,
    });

    // clear form
    setSelectAddress(null);
    setBed("");
    setBath("");
    setParking("");
    setHomeType("");

    setTimeout(() => {
      document.getElementById("listing-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/images/banner/banner-1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center mt-2 py-16">
        <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          Create Lasting Wealth Through Realshed
        </h1>

        <p className="text-white/90 mt-4 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          Amet consectetur adipisicing elit sed do eiusmod.
        </p>

        <div className="mt-10 max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="inline-flex rounded-t-xl overflow-hidden shadow-md">
              <button
                type="button"
                onClick={() => setActiveTab("buy")}
                className={`px-8 py-4 font-semibold ${activeTab === "buy"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
                  }`}
              >
                BUY
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("rent")}
                className={`px-8 py-4 font-semibold ${activeTab === "rent"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
                  }`}
              >
                RENT
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-visible">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">
              <div className="p-5 border-b lg:border-b-0 lg:border-r text-left lg:col-span-4 overflow-visible">
                <label className="font-semibold mb-2 block">
                  Search Property
                </label>
                <div className="relative z-30">
                  <LocationSearch selectedAddress={selectAddress} onSelectAddress={handleSelectAddress} />
                </div>
              </div>

              <div className="p-5 border-b lg:border-b-0 lg:border-r lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select value={bed} onValueChange={setBed}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Bed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            <div className="flex items-center gap-2">
                              <BedDouble className="h-5 w-5 text-primary" />
                              {num}+
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={bath} onValueChange={setBath}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Bath" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            <div className="flex items-center gap-2">
                              <Bath className="h-5 w-5 text-primary" />
                              {num}+
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={parking} onValueChange={setParking}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Parking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[1, 2, 3].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            <div className="flex items-center gap-2">
                              <CarFront className="h-5 w-5 text-primary" />
                              {num}+
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={homeType} onValueChange={setHomeType}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Home Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary text-white flex items-center justify-center gap-2 text-lg font-semibold min-h-[80px] lg:min-h-full lg:col-span-2 rounded-b-2xl lg:rounded-none lg:rounded-r-2xl"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home_banner;