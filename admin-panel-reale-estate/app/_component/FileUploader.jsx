"use client";

import Image from "next/image";
import React, { useState } from "react";

function FileUploader({ setImages, imageList = [] }) {
  const [imagePreview, setImagePreview] = useState([]);
  const [filesData, setFilesData] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);

    setFilesData(files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // ✅ Remove selected image
  const handleRemoveImage = (index) => {
    const updatedFiles = [...filesData];
    const updatedPreview = [...imagePreview];

    updatedFiles.splice(index, 1);
    updatedPreview.splice(index, 1);

    setFilesData(updatedFiles);
    setImagePreview(updatedPreview);
    setImages(updatedFiles);
  };

  return (
    <div>
      {/* Upload Box */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16V4m0 0-4 4m4-4 4 4M4 20h16"
              />
            </svg>

            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, GIF (MAX. 800x400px)
            </p>
          </div>

          <input
            id="dropzone-file"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/gif"
          />
        </label>
      </div>

      {/* ✅ New Image Preview with Remove Button */}
      {imagePreview.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3">
          {imagePreview.map((image, index) => (
            <div key={index} className="relative group">
              
              {/* Image */}
              <Image
                src={image}
                width={100}
                height={100}
                alt={`preview-${index}`}
                className="rounded-lg object-cover"
              />

              {/* ❌ Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

            </div>
          ))}
        </div>
      )}

      {/* Existing Images */}
      {imageList.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3">
          {imageList.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image?.url}
                width={100}
                height={100}
                alt={`saved-${index}`}
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUploader;