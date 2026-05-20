import Home_banner from "./_component/Home_banner";
import Listing from "./_component/_homePages/Listing";
import WhileYouAreHere from "./_component/_homePages/WhileYouAreHere";
import LatestNews from "./_component/_homePages/LatestNews";
import ContactSection from "./_component/_contact/_contactUs/ContactSection";
import HomeClient from "./HomeClient";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return true;
}

export default async function HomePage() {
  await getData();
  return (
    <div className="">
      {/* <Home_banner />
      <Listing />
      <WhileYouAreHere />
      <LatestNews />
      <ContactSection /> */}
      <HomeClient />
    </div>
  );
}