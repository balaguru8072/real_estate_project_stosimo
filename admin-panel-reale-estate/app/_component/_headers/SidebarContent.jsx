import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Mail,
  MessageCircle,
  Contact,
  Power,
  MapPin,
  FileText,
  Home,
  Building2,
  Users,
  AppWindow,
  Lock,
  Copy,
  Settings,
} from "lucide-react";

import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";
import ProgressCard from "./ProgressCard";

export default function SidebarContent({
  sidebarOpen,
  openMenus,
  toggleMenu,
}) {
  return (
    <div className="h-full overflow-y-auto p-4">
      {/* User */}
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Main
      </p>

      <SidebarLink
        href="/"
        icon={<Home className="h-4 w-4" />}
        label="Dashboard"
        sidebarOpen={sidebarOpen}
      />

      <SidebarDropdown
        icon={<Building2 className="h-4 w-4" />}
        label="Property"
        sidebarOpen={sidebarOpen}
        open={openMenus.property}
        onClick={() => toggleMenu("property")}
        items={[
          { href: "/admin/property-list", label: "Property List" },
          { href: "/admin/edit-listing", label: "Add Property" },
          // { href: "/property-detail", label: "Property Detail" },
        ]}
      />

      {/* <SidebarDropdown
        icon={<Building2 className="h-4 w-4" />}
        label="Types"
        sidebarOpen={sidebarOpen}
        open={openMenus.types}
        onClick={() => toggleMenu("types")}
        items={[
          { href: "/apartment", label: "Apartment" },
          { href: "/office", label: "Office" },
          { href: "/shop", label: "Shop" },
          { href: "/villa", label: "Villa" },
        ]}
      /> */}

      <SidebarDropdown
        icon={<Users className="h-4 w-4" />}
        label="Users"
        sidebarOpen={sidebarOpen}
        open={openMenus.users}
        onClick={() => toggleMenu("users")}
        items={[
          { href: "/admin/user-listing", label: "All Users" }, 
          // { href: "/add-user", label: "Add User" },
          // { href: "/profile", label: "User Profile" },
          // { href: "/invoices", label: "User Invoice" },
        ]}
      />

      <SidebarLink
        href="/admin/map"
        icon={<MapPin className="h-4 w-4" />}
        label="Map"
        sidebarOpen={sidebarOpen}
      />

      <SidebarLink
        href="/reports"
        icon={<FileText className="h-4 w-4" />}
        label="Reports"
        sidebarOpen={sidebarOpen}
      />

      <SidebarDropdown
        icon={<AppWindow className="h-4 w-4" />}
        label="App"
        sidebarOpen={sidebarOpen}
        open={openMenus.app}
        onClick={() => toggleMenu("app")}
        items={[
          { href: "/mail-inbox", label: "Inbox" },
          // { href: "/chat", label: "Chat" },
          // { href: "/events", label: "Calendar" },
          // { href: "/file-dashboard", label: "File Manager" },
          { href: "/contact", label: "Contact List" },
          // { href: "/blog-dashboard", label: "Blog" },
        ]}
      />

      {/* <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Extra Components
      </p>

      <SidebarDropdown
        icon={<Settings className="h-4 w-4" />}
        label="Widgets"
        sidebarOpen={sidebarOpen}
        open={openMenus.widgets}
        onClick={() => toggleMenu("widgets")}
        items={[
          { href: "/widgets-app", label: "Apps Widgets" },
          { href: "/widgets-data", label: "Data Widgets" },
        ]}
      />

      <SidebarDropdown
        icon={<Lock className="h-4 w-4" />}
        label="Authentication"
        sidebarOpen={sidebarOpen}
        open={openMenus.auth}
        onClick={() => toggleMenu("auth")}
        items={[
          { href: "/sign-in", label: "Sign In" },
          { href: "/sign-up", label: "Sign Up" },
          { href: "/forgot-password", label: "Forgot Password" },
          { href: "/404", label: "Page 404" },
          { href: "/500", label: "Page 500" },
          { href: "/page-offline", label: "Page Offline" },
          { href: "/locked", label: "Locked Screen" },
        ]}
      />

      <SidebarDropdown
        icon={<Copy className="h-4 w-4" />}
        label="Sample Pages"
        sidebarOpen={sidebarOpen}
        open={openMenus.sample}
        onClick={() => toggleMenu("sample")}
        items={[
          { href: "/blank", label: "Blank Page" },
          { href: "/image-gallery", label: "Image Gallery" },
          { href: "/profile", label: "Profile" },
          { href: "/timeline", label: "Timeline" },
          { href: "/pricing", label: "Pricing" },
          { href: "/invoices", label: "Invoices" },
          { href: "/search-results", label: "Search Results" },
        ]}
      /> */}

      {/* {sidebarOpen && (
        <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-4">
          <ProgressCard title="Traffic this Month" percent={67} />
          <ProgressCard title="Server Load" percent={86} />
        </div>
      )} */}
    </div>
  );
}