import { image } from "framer-motion/client";
import Image from "next/image";

const newsData = [
  {
    id: 1,
    image: "/assets/images/latest_news/home_1.jfif",
    title:
      "Downsizing windfalls revealed: Aussies can pocket $2m by dropping a bedroom",
  },
  {
    id: 2,
    image: "/assets/images/latest_news/home_2.jfif",
    title:
      "Coral carpet was the catalyst for this stylist's colourful home makeover",
  },
  {
    id: 3,
    image: "/assets/images/latest_news/home_3.jpg",
    title:
      "Doing it differently: The young people who bought a home for their parents",
  },
  {
    id: 4,
    image: "/assets/images/latest_news/home_4.jpg",
    
    title:
      "What it’s like coming home to Gold Coast beachfront luxury",
  },
];

export default function LatestNews() {
  return (
    <section className="w-full bg-[#f3f4f6] py-10 md:py-14">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="text-[34px] md:text-[38px] font-bold text-[#2f4a72] mb-8 leading-tight">
          Latest News
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-9 gap-y-10">
          {newsData.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={320}
                  className="w-full h-[230px] object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-5 text-[22px] leading-[1.6] font-normal text-[#2f4a72] group-hover:underline">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}