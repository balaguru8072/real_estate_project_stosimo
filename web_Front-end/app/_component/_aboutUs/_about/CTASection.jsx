import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative w-full py-[120px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/banner/cta-1.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h2 className="text-white text-[40px] md:text-[50px] font-bold leading-[55px] md:leading-[65px]">
          Looking to Buy a New Property or <br />
          Sell an Existing One?
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/property-details"
            className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
          >
            Rent Properties
          </Link>

          <Link
            href="/"
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Buy Properties
          </Link>
        </div>
      </div>
    </section>
  );
}