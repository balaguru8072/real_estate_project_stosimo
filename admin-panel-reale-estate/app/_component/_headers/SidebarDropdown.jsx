"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function SidebarDropdown({
  icon,
  label,
  sidebarOpen,
  open,
  onClick,
  items,
}) {
  const pathname = usePathname();

  // 🔥 check if any child is active
  const isParentActive = items.some((item) =>
    pathname.startsWith(item.href)
  );

  return (
    <div>
      {/* Parent */}
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition
          ${
            isParentActive
              ? "bg-blue-500 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          {sidebarOpen && <span>{label}</span>}
        </div>

        {sidebarOpen && (
          <ChevronDown
            className={`h-4 w-4 transition ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Children */}
      {open && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm transition
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}