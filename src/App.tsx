import { Hero } from "./components/Hero";
import { EventDetails } from "./components/EventDetails";
import { Gallery } from "./components/Gallery";
import { CoupleReveal } from "./components/CoupleReveal";
import { CoupleVoting } from "./components/CoupleVoting";
import { SecretArtist } from "./components/SecretArtist";
import { Sponsors } from "./components/Sponsors";
import { TicketCTA } from "./components/TicketCTA";
import { Footer } from "./components/Footer";
import { FadeInSection } from "./components/FadeInSection";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          linear-gradient(to bottom,
            rgb(10, 25, 47) 0px,
            rgb(10, 25, 47) 850px,
            rgb(15, 35, 60) 950px,
            rgb(20, 50, 80) 1050px,
            rgb(20, 50, 80) 1900px,
            rgb(15, 35, 60) 2000px,
            rgb(10, 25, 47) 2100px,
            rgb(10, 25, 47) 2950px,
            rgb(30, 60, 90) 3050px,
            rgb(45, 85, 120) 3150px,
            rgb(45, 85, 120) 4000px,
            rgb(30, 60, 90) 4100px,
            rgb(10, 25, 47) 4200px,
            rgb(10, 25, 47) 5050px,
            rgb(25, 45, 70) 5150px,
            rgb(35, 65, 95) 5250px,
            rgb(35, 65, 95) 6100px,
            rgb(25, 45, 70) 6200px,
            rgb(35, 65, 95) 6300px,
            rgb(35, 65, 95) 7150px,
            rgb(20, 40, 65) 7250px,
            rgb(10, 25, 47) 7350px,
            rgb(10, 25, 47) 8200px,
            rgb(25, 45, 70) 8300px,
            rgb(35, 65, 95) 8400px,
            rgb(35, 65, 95) 9250px,
            rgb(20, 40, 65) 9350px,
            rgb(10, 25, 47) 9450px,
            rgb(10, 25, 47) 100%
          )
        `,
      }}
    >
      <Toaster />
      <Hero />
      <FadeInSection>
        <EventDetails />
      </FadeInSection>
      <FadeInSection>
        <Gallery />
      </FadeInSection>
      <FadeInSection>
        <CoupleReveal />
      </FadeInSection>
      <FadeInSection>
        <CoupleVoting />
      </FadeInSection>
      <FadeInSection>
        <SecretArtist />
      </FadeInSection>
      <FadeInSection>
        <Sponsors />
      </FadeInSection>
      <FadeInSection>
        <TicketCTA />
      </FadeInSection>
      <FadeInSection>
        <Footer />
      </FadeInSection>
    </div>
  );
}