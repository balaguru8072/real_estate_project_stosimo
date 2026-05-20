import AboutBanner from "../../_component/_aboutUs/_abouts_banner/AboutBanner";
import AboutSection from "../../_component/_aboutUs/_about/About";
import PropertyServices from "../../_component/_aboutUs/_about/PropertyServices";
import CTASection from "../../_component/_aboutUs/_about/CTASection";
import FunfactSection from "../../_component/_aboutUs/_about/FunfactSection";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return true;
}

export default async function Page() {
  await getData();

  return (
    <div>
      <AboutBanner />
      <AboutSection />
      <PropertyServices />
      <CTASection />
      <FunfactSection />
    </div>
  );
}