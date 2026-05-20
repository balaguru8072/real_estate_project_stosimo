import { Home, Landmark, MapPinned, Gavel } from "lucide-react";

const items = [
  {
    id: 1,
    title: "See what your home may be worth",
    icon: Home,
  },
  {
    id: 2,
    title: "Looking to sell?",
    icon: Landmark,
  },
  {
    id: 3,
    title: "Where can I afford to buy?",
    icon: MapPinned,
  },
  {
    id: 4,
    title: "See auction results",
    icon: Gavel,
  },
];

export default function WhileYouAreHere() {
  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[22px] md:text-[26px] font-semibold items-center text-center text-slate-800 mb-5">
          While you're here
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-md overflow-hidden bg-white">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group flex flex-col items-center justify-center text-center px-6 py-8 min-h-[150px] transition-all duration-300 cursor-pointer bg-white hover:bg-slate-50 ${
                  index !== items.length - 1
                    ? "border-b sm:border-b-0 lg:border-r border-slate-200"
                    : ""
                } ${index === 0 ? "sm:border-r lg:border-r" : ""}`}
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-#3628a0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.8} />
                </div>

                <p className="text-[15px] md:text-[16px] font-medium text-slate-800 leading-6 max-w-[180px]">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}