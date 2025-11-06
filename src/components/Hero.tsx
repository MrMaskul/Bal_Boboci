import { Button } from "./ui/button";
import { Calendar, MapPin, Clock, Plane } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
  e.preventDefault();
  const element = document.querySelector(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/banner.png"
          alt="LSAC Balul Bobocilor Banner"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-blue-950/90"></div>
      </div>

      {/* Floating travel elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Plane className="w-8 h-8 text-cyan-400/20" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <img
            src="/images/logo/lsac-logo.png"
            alt="LSAC Logo"
            className="h-12 w-auto mx-auto"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-cyan-400 tracking-widest mb-4 text-lg">LSAC PREZINTĂ</p>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white text-5xl md:text-7xl mb-4 tracking-tight"
        >
          Balul Bobocilor
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-full mb-6"
        >
          <h2 className="text-white text-2xl md:text-4xl">
            🌍 Around the World 🌏
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-blue-200 text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
        >
          O călătorie magică prin destinațiile lumii într-o singură seară de neuitat
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-12 text-white"
        >
          <div className="flex items-center gap-2 bg-blue-900/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span>29 Noiembrie 2025</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-900/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>19:00 - 04:00</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-900/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span>Vivid Lounge and Club</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 shadow-2xl shadow-cyan-500/30"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => scrollToSection(e, '#ticket-cta')}
          >
            <Plane className="w-5 h-5 mr-2" />
            Cumpără Bilete
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-10 py-6 backdrop-blur-sm" onClick={(e: React.MouseEvent<HTMLButtonElement>) => scrollToSection(e, '#event-details')}
          >
            Explorează Evenimentul
          </Button>
        </motion.div>

        {/* Decorative world icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex justify-center gap-12 text-4xl"
        >
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🗼
          </motion.span>
          <motion.span
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            🗽
          </motion.span>
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            🗿
          </motion.span>
          <motion.span
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >
            🏛️
          </motion.span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-cyan-400/50 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
