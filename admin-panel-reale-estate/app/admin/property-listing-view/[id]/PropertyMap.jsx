"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function PropertyMap({ lat, lng, title, address, price }) {
  const position = [lat, lng];

  return (
    <div className="h-[320px] overflow-hidden rounded-2xl">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div className="space-y-1">
              <h4 className="font-bold">{title}</h4>
              <p>{address}</p>
              <p className="font-semibold text-green-600">
                ₹{Number(price || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}