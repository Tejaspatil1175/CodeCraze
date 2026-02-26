import { useState } from "react";
import Navbar from "@/components/Navbar";
import NoticeBanner from "@/components/NoticeBanner";
import HeroSection from "@/components/HeroSection";
import OrganizersSection from "@/components/OrganizersSection";
import HackathonCoordinators from "@/components/HackathonCoordinators";
// import ClubLeads from "@/components/ClubLeads";
import PrizeSection from "@/components/PrizeSection";
import TeamSection from "@/components/TeamSection";
import DomainsSection from "@/components/DomainsSection";
import HackathonFlow from "@/components/HackathonFlow";
import WhyParticipate from "@/components/WhyParticipate";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Actual pixel height of the banner — measured dynamically via ResizeObserver
  const [bannerHeight, setBannerHeight] = useState(0);

  return (
    <div className="min-h-screen bg-transparent">
      <NoticeBanner
        onDismiss={() => setBannerHeight(0)}
        onHeightChange={setBannerHeight}
      />
      <Navbar bannerHeight={bannerHeight} />
      <main>
        <HeroSection />
        <OrganizersSection />
        <PrizeSection />
        <TeamSection />
        <DomainsSection />
        <HackathonFlow />
        <WhyParticipate />
        <HackathonCoordinators />
        {/* <ClubLeads /> */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
