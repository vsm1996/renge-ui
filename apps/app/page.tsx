import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { TokenShowcase } from "@/components/sections/TokenShowcase";
import { TokenExplorer } from "@/components/TokenExplorer";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Frameworks } from "@/components/sections/Frameworks";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <ProfileProvider>
      <Nav />
      <main id="main">
        <Hero />
        <Philosophy />
        <TokenShowcase />
        <TokenExplorer />
        <GettingStarted />
        <ComingSoon />
        <Frameworks />
      </main>
      <Footer />
    </ProfileProvider>
  );
}
