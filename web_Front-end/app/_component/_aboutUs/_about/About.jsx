import Image from "next/image";
import Link from "next/link";
import { withRandomPath } from "@/lib/randomPath";

export default function AboutSection() {
  return (
    <section className="relative py-[70px] md:py-[120px]">
      
      {/* Container */}
      <div className="container mx-auto px-4">
        
        <div className="relative pb-[70px] md:pb-[120px] border-b border-[#e5e7ec]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            
            {/* Image Section */}
            <div>
              <div className="relative block pl-0 lg:pl-[130px]">
                
                {/* Image */}
                <div className="relative overflow-hidden rounded-[10px] group">
                  <Image
                    src="/assets/images/banner/about_part.jpg"
                    alt="About"
                    width={600}
                    height={700}
                    className="w-full rounded-[10px]"
                  />

                  {/* Shine Effect */}
                  <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent to-white/30 skew-x-[-25deg] group-hover:animate-shine" />
                </div>

                {/* Experience Box */}
                <div className="relative lg:absolute lg:left-0 lg:bottom-[75px] w-full lg:w-[250px] text-center bg-[#1b1d21] rounded-[10px] px-[15px] py-[60px] mt-[30px] lg:mt-0 z-10">
                  <h2 className="text-[55px] leading-[60px] font-bold text-[#2dbe6c] mb-2">
                    20
                  </h2>
                  <h4 className="text-[20px] leading-[30px] text-white font-medium">
                    Years of <br /> Experience
                  </h4>
                </div>

              </div>
            </div>

            {/* Content Section */}
            <div>
              <div>
                <div className="mb-4">
                  <h5 className="text-primary font-semibold">About</h5>
                  <h2 className="text-2xl md:text-4xl font-bold">
                    Hi, I’m Jessica Blake
                  </h2>
                </div>

                <div className="text-gray-600 space-y-4">
                  <p>
                    Dolor sit amet consectetur elit sed do eiusmod tempor
                    incididunt labore et dolore magna aliqua enim ad minim veniam.
                  </p>
                  <p>
                    Dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur excepteur sint occaecat.
                  </p>
                </div>

                <ul className="mt-4 space-y-2">
                  <li>✔ consectetur elit sed do eius</li>
                  <li>✔ consectetur elit sed</li>
                </ul>

                <div className="mt-6">
                  <Link
                    href={withRandomPath("/ContactPages")}
                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Contact With Me
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}