import { Suspense, lazy } from "react";
const Hero = lazy(() => import("./components/Hero").then(m => ({ default: m.Hero })));
const EventDetails = lazy(() => import("./components/EventDetails").then(m => ({ default: m.EventDetails })));
const Gallery = lazy(() => import("./components/Gallery").then(m => ({ default: m.Gallery })));
const CoupleReveal = lazy(() => import("./components/CoupleReveal").then(m => ({ default: m.CoupleReveal })));
const CoupleVoting = lazy(() => import("./components/CoupleVoting").then(m => ({ default: m.CoupleVoting })));
const Sponsors = lazy(() => import("./components/Sponsors").then(m => ({ default: m.Sponsors })));
const TicketCTA = lazy(() => import("./components/TicketCTA").then(m => ({ default: m.TicketCTA })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));
import { FadeInSection } from "./components/FadeInSection";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          linear-gradient(to bottom,
            rgb(40, 130, 120) 0px,
            rgb(40, 130, 120) 850px,
            rgb(60, 160, 145) 950px,
            rgb(30, 144, 121) 1050px,
            rgb(30, 144, 121) 1900px,
            rgb(60, 160, 145) 2000px,
            rgb(40, 130, 120) 2100px,
            rgb(40, 130, 120) 2950px,
            rgb(42, 170, 154) 3050px,
            rgb(38, 179, 151) 3150px,
            rgb(38, 179, 151) 4000px,
            rgb(42, 170, 154) 4100px,
            rgb(40, 130, 120) 4200px,
            rgb(40, 130, 120) 5050px,
            rgb(38, 179, 151) 5150px,
            rgb(42, 170, 154) 5250px,
            rgb(42, 170, 154) 6100px,
            rgb(38, 179, 151) 6200px,
            rgb(42, 170, 154) 6300px,
            rgb(42, 170, 154) 7150px,
            rgb(60, 160, 145) 7250px,
            rgb(40, 130, 120) 7350px,
            rgb(40, 130, 120) 8200px,
            rgb(38, 179, 151) 8300px,
            rgb(42, 170, 154) 8400px,
            rgb(42, 170, 154) 9250px,
            rgb(60, 160, 145) 9350px,
            rgb(40, 130, 120) 9450px,
            rgb(40, 130, 120) 100%
          )
        `,
      }}
    >
      <Toaster />
      <Suspense fallback={<div style={{height: 300}} />}> 
        <Hero />
      </Suspense>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 200}} />}> 
          <EventDetails />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 200}} />}> 
          <Gallery />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 200}} />}> 
          <CoupleReveal />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 200}} />}> 
          <CoupleVoting />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 180}} />}> 
          <TicketCTA />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 160}} />}> 
          <Sponsors />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <Suspense fallback={<div style={{height: 140}} />}> 
          <Footer />
        </Suspense>
      </FadeInSection>
    </div>
  );
}
