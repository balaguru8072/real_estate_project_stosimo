"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Award,
  Users,
  Handshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Excellent Reputation",
    description:
      "Lorem ipsum dolor sit consectetur sed eiusm tempor incididunt dolore magna.",
    icon: Award,
    color: "text-[#8e44ad] bg-[#f3e8ff]",
  },
  {
    id: 2,
    title: "Best Local Agents",
    description:
      "Lorem ipsum dolor sit consectetur sed eiusm tempor incididunt dolore magna.",
    icon: Users,
    color: "text-[#17c7d2] bg-[#e6fbfd]",
  },
  {
    id: 3,
    title: "Personalized Service",
    description:
      "Lorem ipsum dolor sit consectetur sed eiusm tempor incididunt dolore magna.",
    icon: Handshake,
    color: "text-[#f95757] bg-[#ffe9e9]",
  },
  {
    id: 4,
    title: "Excellent Reputation",
    description:
      "Lorem ipsum dolor sit consectetur sed eiusm tempor incididunt dolore magna.",
    icon: Award,
    color: "text-[#1398ff] bg-[#e8f4ff]",
  },
  {
    id: 5,
    title: "Best Local Agents",
    description:
      "Lorem ipsum dolor sit consectetur sed eiusm tempor incididunt dolore magna.",
    icon: Users,
    color: "text-[#d74eff] bg-[#fbe8ff]",
  },
  {
    id: 6,
    title: "Personalized Service",
    description:
      "Lorem ipsum dolor sit consectetur sed eiusm tempor incididunt dolore magna.",
    icon: Handshake,
    color: "text-[#17c7d2] bg-[#e6fbfd]",
  },
];

export default function PropertyServices() {
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative pt-[70px] md:pt-[115px] pb-[40px] md:pb-[110px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 md:mb-14">
          <h5 className="text-primary text-sm md:text-base font-semibold uppercase tracking-[2px] mb-3">
            Our Services
          </h5>
          <h2 className="text-[#1d2534] text-3xl sm:text-4xl md:text-5xl font-bold">
            Property Services
          </h2>
        </div>

        <div className="relative">
          {/* Prev */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <ChevronLeft className="h-5 w-5 text-[#1d2534]" />
          </button>

          {/* Next */}
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <ChevronRight className="h-5 w-5 text-[#1d2534]" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.id}
                    className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-3"
                  >
                    <div className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                      <div
                        className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${service.color}`}
                      >
                        <Icon className="h-9 w-9" />
                      </div>

                      <h4 className="text-xl font-semibold text-[#1d2534] mb-3">
                        {service.title}
                      </h4>

                      <p className="text-gray-600 leading-7 text-sm md:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-3 mt-8 md:mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}