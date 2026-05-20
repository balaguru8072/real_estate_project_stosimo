
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import Listing from "../../_homePages/Listing";

export default function Preparatory() {
  // const listings = [
  //   {
  //     id: 1,
  //     price: 250000,
  //     address: "Chennai, Tamil Nadu",
  //     bedroom: 3,
  //     bathroom: 2,
  //     area: "1200 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     price: 180000,
  //     address: "Coimbatore, Tamil Nadu",
  //     bedroom: 2,
  //     bathroom: 2,
  //     area: "950 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     price: 320000,
  //     address: "Madurai, Tamil Nadu",
  //     bedroom: 4,
  //     bathroom: 3,
  //     area: "1500 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     price: 210000,
  //     address: "Trichy, Tamil Nadu",
  //     bedroom: 3,
  //     bathroom: 2,
  //     area: "1100 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     price: 400000,
  //     address: "Salem, Tamil Nadu",
  //     bedroom: 5,
  //     bathroom: 4,
  //     area: "2000 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     price: 150000,
  //     address: "Erode, Tamil Nadu",
  //     bedroom: 2,
  //     bathroom: 1,
  //     area: "800 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     price: 250000,
  //     address: "Chennai, Tamil Nadu",
  //     bedroom: 3,
  //     bathroom: 2,
  //     area: "1200 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     price: 180000,
  //     address: "Coimbatore, Tamil Nadu",
  //     bedroom: 2,
  //     bathroom: 2,
  //     area: "950 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  //   {
  //     id: 9,
  //     price: 320000,
  //     address: "Madurai, Tamil Nadu",
  //     bedroom: 4,
  //     bathroom: 3,
  //     area: "1500 sqft",
  //     listingImages: [
  //       { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  //     ],
  //   },
  // ];

  // const cardVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 50,
  //   },
  //   visible: (index) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       delay: index * 0.15,
  //     },
  //   }),
  // };


  return (
    // <div className="p-6 md:px-10">
    //     <h6 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Preparatory</h6>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {listings.map((item, index) => (
    //      <motion.div
    //         key={item.id}
    //         className="p-3 hover:border hover:border-purple-500 cursor-pointer rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white"
    //         variants={cardVariants}
    //         initial="hidden"
    //         whileInView="visible"
    //         viewport={{ once: false, amount: 0.2 }}
    //         custom={index}
    //       >
    //         <Link href={`/view-listing/${item.id}`}>
    //           <div className="grid grid-cols-1 gap-2">
    //             {item.listingImages?.map((image, imgIndex) => (
    //               <div key={imgIndex}>
    //                 <Image
    //                   src={image.url}
    //                   alt="Listing Image"
    //                   width={800}
    //                   height={200}
    //                   className="rounded-lg object-cover h-[180px] w-full"
    //                 />
    //               </div>
    //             ))}
    //           </div>

    //           <div className="flex mt-3 flex-col gap-2">
    //             <h2 className="font-bold text-xl text-primary">
    //               ${item.price}
    //             </h2>

    //             <h2 className="flex gap-2 text-gray-500 text-sm items-center">
    //               <MapPin className="h-4 w-4" />
    //               {item.address}
    //             </h2>

    //             <div className="flex gap-2 mt-2">
    //               <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
    //                 <BedDouble className="h-4 w-4" />
    //                 {item.bedroom}
    //               </div>

    //               <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
    //                 <Bath className="h-4 w-4" />
    //                 {item.bathroom}
    //               </div>

    //               <div className="flex gap-2 w-full bg-gray-100 rounded-md p-2 text-gray-600 justify-center items-center text-sm">
    //                 <Ruler className="h-4 w-4" />
    //                 {item.area}
    //               </div>
    //             </div>
    //           </div>
    //         </Link>
    //       </motion.div>
    //     ))}
    //   </div>
    // </div>
    <div className="p-6 md:px-10">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-5">Preparatory Page</h1>
      <div>
        <Listing />
      </div>
    </div>
  );
}