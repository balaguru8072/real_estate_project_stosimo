"use client";

import { useState } from "react";
import Home_banner from "./_component/Home_banner";
import Listing from "./_component/_homePages/Listing";
import WhileYouAreHere from "./_component/_homePages/WhileYouAreHere";
import LatestNews from "./_component/_homePages/LatestNews";
import ContactSection from "./_component/_contact/_contactUs/ContactSection";

export default function HomeClient() {
  const [filters, setFilters] = useState(null);

  return (
    <div>
      <Home_banner onSearch={setFilters} />
      <Listing filters={filters} />
      <WhileYouAreHere />
      <LatestNews />
      <ContactSection />
    </div>
  );
}