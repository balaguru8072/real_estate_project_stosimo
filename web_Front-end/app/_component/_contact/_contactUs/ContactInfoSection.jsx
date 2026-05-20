import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section className="relative py-[70px] md:py-[120px] text-center">
      <div className="auto-container">
        {/* Section Title */}
        <div className="mb-12 md:mb-16">
          <h5 className="text-[18px] font-semibold text-[#f2b241] mb-2">
            Contact us
          </h5>
          <h2 className="text-[32px] md:text-[42px] leading-[42px] md:leading-[52px] font-bold text-[#1d2534]">
            Get In Touch
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Address */}
          <div className="group">
            <div className="relative block bg-white rounded-[10px] overflow-hidden shadow-[0_10px_30px_0_rgba(0,0,0,0.10)] px-[30px] md:px-[55px] pt-[96px] pb-[65px] transition-all duration-500 hover:-translate-y-[10px]">
              <div className="relative inline-block mb-[26px] z-[1] text-[#f2b241]">
                <div className="absolute top-[-24px] right-[-33px] w-[65px] h-[65px] rounded-full bg-[#f2b241] opacity-20 z-[-1] transition-all duration-500 group-hover:scale-150 group-hover:opacity-5"></div>
                <Mail className="w-[50px] h-[50px]" strokeWidth={1.5} />
              </div>

              <h4 className="text-[20px] leading-[30px] font-medium mb-[21px] text-[#1d2534]">
                Email Address
              </h4>

              <p className="text-[16px] leading-[26px] text-[#a0a1a8]">
                <Link
                  href="mailto:info@example.com"
                  className="text-[#a0a1a8] hover:text-[#f2b241] transition-colors duration-300"
                >
                  info@example.com
                </Link>
                <br />
                <Link
                  href="mailto:info@example.com"
                  className="text-[#a0a1a8] hover:text-[#f2b241] transition-colors duration-300"
                >
                  info@example.com
                </Link>
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="group">
            <div className="relative block bg-white rounded-[10px] overflow-hidden shadow-[0_10px_30px_0_rgba(0,0,0,0.10)] px-[30px] md:px-[55px] pt-[96px] pb-[65px] transition-all duration-500 hover:-translate-y-[10px]">
              <div className="relative inline-block mb-[26px] z-[1] text-[#43a047]">
                <div className="absolute top-[-24px] right-[-33px] w-[65px] h-[65px] rounded-full bg-[#43a047] opacity-20 z-[-1] transition-all duration-500 group-hover:scale-150 group-hover:opacity-5"></div>
                <Phone className="w-[50px] h-[50px]" strokeWidth={1.5} />
              </div>

              <h4 className="text-[20px] leading-[30px] font-medium mb-[21px] text-[#1d2534]">
                Phone Number
              </h4>

              <p className="text-[16px] leading-[26px] text-[#a0a1a8]">
                <Link
                  href="tel:+23055873407"
                  className="text-[#a0a1a8] hover:text-[#43a047] transition-colors duration-300"
                >
                  +2(305) 587-3407
                </Link>
                <br />
                <Link
                  href="tel:+23055873408"
                  className="text-[#a0a1a8] hover:text-[#43a047] transition-colors duration-300"
                >
                  +2(305) 587-3408
                </Link>
              </p>
            </div>
          </div>

          {/* Office Address */}
          <div className="group">
            <div className="relative block bg-white rounded-[10px] overflow-hidden shadow-[0_10px_30px_0_rgba(0,0,0,0.10)] px-[30px] md:px-[55px] pt-[96px] pb-[65px] transition-all duration-500 hover:-translate-y-[10px]">
              <div className="relative inline-block mb-[26px] z-[1] text-[#f94c4c]">
                <div className="absolute top-[-24px] right-[-33px] w-[65px] h-[65px] rounded-full bg-[#f94c4c] opacity-20 z-[-1] transition-all duration-500 group-hover:scale-150 group-hover:opacity-5"></div>
                <MapPin className="w-[50px] h-[50px]" strokeWidth={1.5} />
              </div>

              <h4 className="text-[20px] leading-[30px] font-medium mb-[21px] text-[#1d2534]">
                Office Address
              </h4>

              <p className="text-[16px] leading-[26px] text-[#a0a1a8]">
                214 West Arnold St. New York, <br />
                NY 10002
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}