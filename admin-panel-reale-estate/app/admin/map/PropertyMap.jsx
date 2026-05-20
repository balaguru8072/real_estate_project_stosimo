"use client";

import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const API_URL = "http://localhost:5000/api/listings";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function PropertyMap() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/listings")
            .then((res) => res.json())
            .then((data) => {
                // console.log("API DATA:", data);

                let listings = [];

                if (Array.isArray(data)) {
                    listings = data;
                } else if (Array.isArray(data.listings)) {
                    listings = data.listings;
                } else if (Array.isArray(data.properties)) {
                    listings = data.properties;
                } else if (Array.isArray(data.data)) {
                    listings = data.data;
                } else {
                    listings = [];
                }

                const validListings = listings.filter((item) => {
                    return (
                        item?.location?.coordinates &&
                        Array.isArray(item.location.coordinates) &&
                        item.location.coordinates.length === 2
                    );
                });

                setProperties(validListings);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="mb-5 text-2xl font-bold">Property Map</h1>

            <div className="h-[75vh] w-full overflow-hidden rounded-xl border shadow-md">
                <MapContainer
                    center={[11.1271, 78.6569]}
                    zoom={7}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution="OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {properties.map((item) => {
                        const lng = item.location.coordinates[0];
                        const lat = item.location.coordinates[1];

                        return (
                            <Marker
                                key={item._id}
                                position={[lat, lng]}
                                icon={icon}
                            >
                                <Popup>
                                    <div className="w-[220px]">
                                        {item.images?.[0] && (
                                            <img
                                                src={`http://localhost:5000${item.images[0]}`}
                                                alt="property"
                                                className="mb-2 h-[120px] w-full rounded-md object-cover"
                                            />
                                        )}

                                        <h2 className="font-bold">
                                            {item.propertytype}
                                        </h2>

                                        <p className="text-sm">{item.address}</p>

                                        <p className="text-sm">
                                            <b>Type:</b> {item.type}
                                        </p>

                                        <p className="text-sm">
                                            <b>Price:</b> ₹{item.price}
                                        </p>

                                        <p className="text-sm">
                                            <b>Bed:</b> {item.bedroom} |{" "}
                                            <b>Bath:</b> {item.bathroom}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}