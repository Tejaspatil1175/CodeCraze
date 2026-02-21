import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrganizersSection from "@/components/OrganizersSection";
import ClubLeads from "@/components/ClubLeads";
import PrizeSection from "@/components/PrizeSection";
import TeamSection from "@/components/TeamSection";
import DomainsSection from "@/components/DomainsSection";
import HackathonFlow from "@/components/HackathonFlow";
import WhyParticipate from "@/components/WhyParticipate";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main>
        <HeroSection />
        <OrganizersSection />
        <PrizeSection />
        <TeamSection />
        <DomainsSection />
        <HackathonFlow />
        <WhyParticipate />
        <ClubLeads />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
