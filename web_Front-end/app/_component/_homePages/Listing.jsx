
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
// import { motion } from "framer-motion";

// const BASE_URL = "https://localhost:5000";

// export default function Listing() {
//   // const listings = [
//   //   {
//   //     id: 1,
//   //     price: 250000,
//   //     address: "Chennai, Tamil Nadu",
//   //     bedroom: 3,
//   //     bathroom: 2,
//   //     area: "1200 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 2,
//   //     price: 180000,
//   //     address: "Coimbatore, Tamil Nadu",
//   //     bedroom: 2,
//   //     bathroom: 2,
//   //     area: "950 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 3,
//   //     price: 320000,
//   //     address: "Madurai, Tamil Nadu",
//   //     bedroom: 4,
//   //     bathroom: 3,
//   //     area: "1500 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 4,
//   //     price: 210000,
//   //     address: "Trichy, Tamil Nadu",
//   //     bedroom: 3,
//   //     bathroom: 2,
//   //     area: "1100 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 5,
//   //     price: 400000,
//   //     address: "Salem, Tamil Nadu",
//   //     bedroom: 5,
//   //     bathroom: 4,
//   //     area: "2000 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 6,
//   //     price: 150000,
//   //     address: "Erode, Tamil Nadu",
//   //     bedroom: 2,
//   //     bathroom: 1,
//   //     area: "800 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 7,
//   //     price: 250000,
//   //     address: "Chennai, Tamil Nadu",
//   //     bedroom: 3,
//   //     bathroom: 2,
//   //     area: "1200 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 8,
//   //     price: 180000,
//   //     address: "Coimbatore, Tamil Nadu",
//   //     bedroom: 2,
//   //     bathroom: 2,
//   //     area: "950 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   //   {
//   //     id: 9,
//   //     price: 320000,
//   //     address: "Madurai, Tamil Nadu",
//   //     bedroom: 4,
//   //     bathroom: 3,
//   //     area: "1500 sqft",
//   //     listingImages: [
//   //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   //     ],
//   //   },
//   // ];

//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {

//     const fetchLisings = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch(`${BASE_URL}/api/listings`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch listings");
//         }

//         const listingData = await response.json();

//         if (!listingData.success) {
//           throw new Error(listingData.message || "Failed to fetch listings");
//         }

//         const mapped = listingData.data.map((item) => ({
//           id: item._id,
//           image: `${BASE_URL}${item.images?.[0] || ""}`,
//           status: item.type === "Sale" ? "For sale" : "For Rent",
//           price: `$${item.price.toLocaleString()}`,
//           title: `${item.bedroom}BHK ${item.propertytype}, ${item.address}`,
//           address: item.address,
//           description: item.description,
//           area: String(item.area),
//           beds: String(item.bedroom),
//           parking: String(item.parking),
//           garage: String(item.builtln),
//         }));

//         setProperties(mapped);

//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchLisings();
//   }, [])

//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//     },
//     visible: (index) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         delay: index * 0.15,
//       },
//     }),
//   };


//   return (
//     <div>
//       {/* <div className="p-6 md:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {listings.map((item, index) => (
//             <motion.div
//               key={item.id}
//               className="p-3 hover:border hover:border-purple-500 cursor-pointer rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white"
//               variants={cardVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: false, amount: 0.2 }}
//               custom={index}
//             >
//               <Link href={`/view-listing/${item.id}`}>
//                 <div className="grid grid-cols-1 gap-2">
//                   {item.listingImages?.map((image, imgIndex) => (
//                     <div key={imgIndex}>
//                       <Image
//                         src={image.url}
//                         alt="Listing Image"
//                         width={800}
//                         height={200}
//                         className="rounded-lg object-cover h-[180px] w-full"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex mt-3 flex-col gap-2">
//                   <h2 className="font-bold text-xl text-primary">
//                     ${item.price}
//                   </h2>

//                   <h2 className="flex gap-2 text-gray-500 text-sm items-center">
//                     <MapPin className="h-4 w-4" />
//                     {item.address}
//                   </h2>

//                   <div className="flex gap-2 mt-2">
//                     <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
//                       <BedDouble className="h-4 w-4" />
//                       {item.bedroom}
//                     </div>

//                     <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
//                       <Bath className="h-4 w-4" />
//                       {item.bathroom}
//                     </div>

//                     <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
//                       <Ruler className="h-4 w-4" />
//                       {item.area}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div> */}
//       <div className="p-6 md:px-10">
//         {
//           loading && (
//             <div className="flex items-center justify-center py-20 text-slate-500">
//               <span className="text-sm">Loading properties....</span>
//             </div>
//           )
//         }

//         {
//           error && (
//             <div className="rounded-2x1 border border-red-200 bg-red-50 p-5 text-sm text-red-600">
//               Failed to load properties: {error}
//             </div>
//           )
//         }

//         {
//           !loading && !error && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {properties.map((item, index) => (
//                 <motion.div
//                   key={item._id}
//                   className="p-3 hover:border hover:border-purple-500 cursor-pointer rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white"
//                   variants={cardVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: false, amount: 0.2 }}
//                   custom={index}
//                 >
//                   <Link href={`/view-listing/${item.id}`}>
//                     <div className="grid grid-cols-1 gap-2">
//                       {item.listingImages?.map((image, imgIndex) => (
//                         <div key={imgIndex}>
//                           <img
//                             src={image.url}
//                             alt="Listing Image"
//                             width={800}
//                             height={200}
//                             className="rounded-lg object-cover h-[180px] w-full"
//                           />
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex mt-3 flex-col gap-2">
//                       <h2 className="font-bold text-xl text-primary">
//                         ${item.price}
//                       </h2>

//                       <h2 className="flex gap-2 text-gray-500 text-sm items-center">
//                         <MapPin className="h-4 w-4" />
//                         {item.address}
//                       </h2>

//                       <div className="flex gap-2 mt-2">
//                         <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
//                           <BedDouble className="h-4 w-4" />
//                           {item.bedroom}
//                         </div>

//                         <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
//                           <Bath className="h-4 w-4" />
//                           {item.bathroom}
//                         </div>

//                         <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
//                           <Ruler className="h-4 w-4" />
//                           {item.area}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           )
//         }

//       </div>
//     </div>

//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:5000";

export default function Listing({ filters }) {
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleProductClick = (id) => {
    const token = localStorage.getItem("token");
    const path = `/view-listing/${id}`;

    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(path)}`);
      return;
    }

    router.push(path);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/api/listings`);
        const listingData = await response.json();

        if (!response.ok || !listingData.success) {
          throw new Error(listingData.message || "Failed to fetch listings");
        }

        const apiList = listingData.data || listingData.listing || [];

        const mapped = apiList.map((item) => ({
          id: item._id,
          image: item.images?.[0]
            ? `${BASE_URL}${item.images[0]}`
            : "/assets/images/no-image.jpg",
          status: item.type === "Sale" ? "For Sale" : "For Rent",
          type: item.type,
          price: item.price,
          title: `${item.bedroom}BHK ${item.propertytype}`,
          propertytype: item.propertytype,
          address: item.address,
          description: item.description,
          area: item.area,
          bedroom: item.bedroom,
          bathroom: item.bathroom,
          parking: item.parking,
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

  const filteredProperties = useMemo(() => {
    if (!filters) return properties;

    return properties.filter((item) => {
      const matchType = filters.type ? item.type === filters.type : true;

      const matchAddress = filters.address
        ? item.address?.toLowerCase().includes(filters.address.toLowerCase())
        : true;

      const matchBed = filters.bed
        ? Number(item.bedroom) >= Number(filters.bed)
        : true;

      const matchBath = filters.bath
        ? Number(item.bathroom) >= Number(filters.bath)
        : true;

      const matchParking = filters.parking
        ? Number(item.parking) >= Number(filters.parking)
        : true;

      const matchHomeType =
        filters.homeType && filters.homeType !== "All"
          ? item.propertytype?.toLowerCase() === filters.homeType.toLowerCase()
          : true;

      return (
        matchType &&
        matchAddress &&
        matchBed &&
        matchBath &&
        matchParking &&
        matchHomeType
      );
    });
  }, [properties, filters]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
      },
    }),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        Failed to load properties: {error}
      </div>
    );
  }

  return (
    <div id="listing-section" className="p-6 md:px-10 scroll-mt-24">
      <h2 className="text-2xl font-bold mb-6 w-max border-b-2 border-dashed border-red-500">
        {filters ? "Search Results" : "Latest Properties"}
      </h2>

      {filteredProperties.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No matching properties found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => handleProductClick(item.id)}
              className="p-3 hover:border hover:border-purple-500 cursor-pointer rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={index}
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg object-cover h-[180px] w-full"
              />

              <div className="flex mt-3 flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl text-purple-600">
                    ₹{Number(item.price).toLocaleString()}
                  </h2>

                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800">{item.title}</h3>

                <h2 className="flex gap-2 text-gray-500 text-sm items-center">
                  <MapPin className="h-4 w-4" />
                  {item.address}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex gap-2 mt-2">
                  <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
                    <BedDouble className="h-4 w-4" />
                    {item.bedroom}
                  </div>

                  <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
                    <Bath className="h-4 w-4" />
                    {item.bathroom}
                  </div>

                  <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
                    <Ruler className="h-4 w-4" />
                    {item.area} sqft
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}