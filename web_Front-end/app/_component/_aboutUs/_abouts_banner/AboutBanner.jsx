import React from 'react'
import Link from "next/link";

export default function AboutBanner({
  title = "About Us",
  backgroundImage = "/assets/images/banner/about_page_banner.jpg",
}) {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-[80px] md:py-[123px]"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-[#1d2534]/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-white font-bold text-[40px] leading-[50px] md:text-[55px] md:leading-[60px] mb-3">
          {title}
        </h1>

        <ul className="flex items-center justify-center flex-wrap gap-2 text-white text-[18px] md:text-[20px] leading-[30px]">
          <li>
            <Link href="/" className="hover:text-[#2dbe6c] transition duration-300">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>{title}</li>
        </ul>
      </div>
    </section>
  );
}