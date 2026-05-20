import Link from "next/link";

export default function SidebarLink({
  href,
  icon,
  label,
  sidebarOpen,
  active = false,
}) {
  return (
    <Link
      href={href}
      className={`mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      {sidebarOpen && <span>{label}</span>}
    </Link>
  );
}