import HeroSection from "@/components/SavingsCalculator/HeroSection";
import SocialProof from "@/components/SocialProof";
import ChatPipelineFeatures from "@/components/ChatPipelineFeatures";
import SavingsCalculator from "@/components/SavingsCalculator";
import FinalCTA from "@/components/FinalCTA";

export default function PlanC() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="fixed top-[-30%] left-[-15%] w-[700px] h-[700px] bg-blue-600/[0.08] rounded-full blur-[150px] pointer-events-none animate-float" />
      <div className="fixed bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-purple-600/[0.06] rounded-full blur-[130px] pointer-events-none animate-float" style={{ animationDelay: "3s" }} />
      <div className="fixed top-[40%] right-[5%] w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-950/20 to-transparent pointer-events-none" />

      {/* Hero */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-36 pb-8">
        <HeroSection />
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Plan C: Chat-based AI CFO Pipeline */}
      <ChatPipelineFeatures />

      {/* Savings Calculator */}
      <SavingsCalculator />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}
