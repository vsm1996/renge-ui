import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { TokenShowcase } from "@/components/sections/TokenShowcase";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <ProfileProvider>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <TokenShowcase />
        <GettingStarted />
        <ComingSoon />
      </main>
      <Footer />
    </ProfileProvider>
  );
}
