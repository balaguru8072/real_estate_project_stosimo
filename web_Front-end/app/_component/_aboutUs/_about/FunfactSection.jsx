"use client";

import { useEffect, useState } from "react";

const Counter = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className="font-bold">{count}</span>;
};

export default function FunfactSection() {
  const data = [
    { value: 1270, label: "Total Professionals" },
    { value: 2350, label: "Total Property Sell" },
    { value: 2540, label: "Total Property Rent" },
    { value: 8270, label: "Total Customers" },
  ];

  return (
    <section className="relative">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="relative bg-white rounded-md shadow-lg -mt-[90px] z-10 py-10 px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center">
            
            {data.map((item, index) => (
              <div key={index} className="relative py-6">
                
                {/* Border line (like your before) */}
                {index !== data.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-0 h-full w-[1px] bg-gray-200"></div>
                )}

                <div className="text-[40px] leading-[50px] font-medium mb-2">
                  <Counter end={item.value} />
                </div>

                <p className="text-sm text-gray-600">
                  {item.label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}