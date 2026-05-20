import Image from "next/image";
import AdminLayout from "./_component/_headers/AdminLayout"
import PropertyListPage from "./_pages/property-listing-pages/PropertyListPage"
import DashboardPage from "./_pages/Dashboad-pages/Dashboad";

export default function Home() {
  return (
    <div >
      <DashboardPage />
    </div>
  );
}
