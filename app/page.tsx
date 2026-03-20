import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EconomySimulator } from "@/components/home/EconomySimulator";
import { CaseMaicon } from "@/components/home/CaseMaicon";
import { CoverageMap } from "@/components/home/CoverageMap";
import { EnvironmentalImpact } from "@/components/home/EnvironmentalImpact";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd type="webSite" />
      <JsonLd type="organization" />
      <JsonLd type="faqPage" />

      <Hero />
      <HowItWorks />
      <EconomySimulator />
      <CoverageMap />
      <CaseMaicon />
      <EnvironmentalImpact />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
