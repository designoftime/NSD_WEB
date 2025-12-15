import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { WhyNSD } from "@/components/sections/WhyNSD";
import { Safety } from "@/components/sections/Safety";
import { AppPreview } from "@/components/sections/AppPreview";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Waitlist } from "@/components/sections/Waitlist";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <WhyNSD />
      <Safety />
      <AppPreview />
      <WhoItsFor />
      <Waitlist />
      <FAQ />
    </>
  );
}
