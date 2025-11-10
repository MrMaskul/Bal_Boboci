import { Button } from "./ui/button";
import { Calendar, MapPin, Clock, Plane } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

export function Hero() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const floats = useMemo(() => Array.from({ length: 6 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  })), []);
  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            srcSet="/images/hero_mobil.webp"
            media="(max-width: 768px)"
          />
          <img
            src="/images/fundal_hero.webp"
            alt="LSAC Balul Bobocilor Banner"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </picture>
        {/** Overlay removed to show only the banner image */}
      </div>

      {/* Top-centered LSAC logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-20"
      >
        <img
          src="/images/logo_w.png"
          alt="LSAC Logo"
          className="h-12 md:h-14 w-auto"
          loading="eager"
          decoding="async"
        />
      </motion.div>


      {/* Bottom-centered event meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 transform z-10 w-full px-4"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 35px)' }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-[3px] shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            <Button
              size="lg"
              className="bg-slate-900/80 hover:bg-slate-900/90 text-white px-10 py-6 shadow-2xl font-extrabold uppercase tracking-wide text-lg md:text-xl transition-transform transform hover:scale-[1.04] rounded-full"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => scrollToSection(e, '#ticket-cta')}
            >
              <Plane className="w-5 h-5 mr-2" />
              Cumpără Bilete
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-2 bg-blue-900/50 p-[50px] rounded-full backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>29 Noiembrie 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-900/50 p-[50px] rounded-full backdrop-blur-sm">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>19:00 - 04:00</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-900/50 p-[50px] rounded-full backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Vivid Lounge and Club</span>
            </div>
          </div>
        </div>
      </motion.div>



      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">






        {/* Center title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6"
        >
          <div className="inline-block">
            <img
              src="/images/balul_bobocilor-150h.png"
              alt="Balul Bobocilor"
              className="h-[150px] w-auto"
              height={150}
              loading="eager"
              decoding="async"
              onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = "/images/balul_bobocilor.png"; }}
            />
          </div>
        </motion.div>

      </div>


    </div>
  );
}
