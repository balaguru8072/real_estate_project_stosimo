import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const services = [
    { name: "About Us", href: "/aboutPages" },
    { name: "Listing", href: "/preparatory" },
    { name: "Our Services", href: "/aboutPages" },
   
    { name: "Contact Us", href: "/ContactPages" },
  ];

  const topNews = [
    {
      title: "The Added Value Social Worker",
      date: "Mar 25, 2020",
      image: "/assets/images/latest_news/home_2.jfif",
      href: "/blog-details",
    },
    {
      title: "Ways to Increase Trust",
      date: "Mar 24, 2020",
      image: "/assets/images/latest_news/home_4.jpg",
      href: "/blog-details",
    },
  ];

  return (
    <footer className="w-full">
      {/* Footer Top */}
      <div className="bg-gray-100 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* About */}
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-gray-900">About</h3>
              <div className="space-y-4 text-gray-600 leading-7">
                <p>
                  Lorem ipsum dolor amet consetetur adi pisicing elit sed eiusm
                  tempor in cididunt ut labore dolore magna aliqua enim ad minim venitam
                </p>
                <p>
                  Quis nostrud exercita laboris nisi ut aliquip commodo.
                </p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-gray-900">Services</h3>
              <ul className="space-y-3">
                {services.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-600 transition hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top News */}
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-gray-900">Top News</h3>
              <div className="space-y-5">
                {topNews.map((news, index) => (
                  <div key={index} className="flex gap-4">
                    <Link href={news.href} className="shrink-0">
                      <Image
                        src={news.image}
                        alt={news.title}
                        width={80}
                        height={70}
                        className="rounded-md object-cover"
                      />
                    </Link>
                    <div>
                      <h5 className="text-base font-semibold leading-6 text-gray-900 hover:text-primary">
                        <Link href={news.href}>{news.title}</Link>
                      </h5>
                      <p className="mt-1 text-sm text-gray-500">{news.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="mb-5 text-2xl font-semibold text-gray-900">Contacts</h3>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <span className="font-medium text-gray-900">Address: </span>
                  Flat 20, Reynolds Neck, North Helenaville, FV77 8WS
                </li>
                <li>
                  <span className="font-medium text-gray-900">Phone: </span>
                  <a href="tel:23055873407" className="hover:text-primary">
                    +2(305) 587-3407
                  </a>
                </li>
                <li>
                  <span className="font-medium text-gray-900">Email: </span>
                  <a href="mailto:info@example.com" className="hover:text-primary">
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src={"/logo.svg"}
                alt="Footer Logo"
                width={140}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-gray-600">
              <Link href="/" className="font-semibold text-gray-900 hover:text-primary">
                Stosimo
              </Link>{" "}
              &copy; 2021 All Right Reserved
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}