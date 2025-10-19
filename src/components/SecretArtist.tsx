import { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Lock, Unlock, Star, Music, Sparkles, PartyPopper, Plane, Globe2, Mic2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCountdown } from "../lib/hooks/useCountdown";
import { CountdownDisplay } from "./couple/CountdownDisplay";

export function SecretArtist() {
  // Data dezvăluirii artistului - 1 noiembrie 2025, ora 18:00
  const revealDate = useMemo(() => new Date("2025-11-01T18:00:00"), []);

  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);

  const { timeRemaining, isExpired: isUnlocked } = useCountdown(revealDate);

  const handleReveal = () => {
    if (isUnlocked) {
      setCurtainsOpen(true);
      setTimeout(() => {
        setRevealed(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }, 1500);
    }
  };

  return (
    <section id="special-artist">
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Simplified Background Effects */}
        <BackgroundEffects isUnlocked={isUnlocked} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Title */}
          <HeaderSection />

          <AnimatePresence mode="wait">
            {!revealed ? (
              <LockedOrUnlockedState
                isUnlocked={isUnlocked}
                timeRemaining={timeRemaining}
                revealDate={revealDate}
                curtainsOpen={curtainsOpen}
                handleReveal={handleReveal}
              />
            ) : (
              <RevealedState showConfetti={showConfetti} />
            )}
          </AnimatePresence>
        </div>
      </section>
    </section>
  );
}

// Sub-components

function BackgroundEffects({ isUnlocked }: { isUnlocked: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Rotating Globe */}
      <motion.div
        className="absolute top-10 right-10 opacity-10"
        animate={{ rotateY: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Globe2 className="w-48 h-48 text-cyan-400" />
      </motion.div>

      {/* Flying Planes - Reduced from 3 to 2 */}
      {[0, 1].map((i) => (
        <motion.div
          key={`plane-${i}`}
          className="absolute"
          initial={{ x: '-10%', y: `${30 + i * 40}%` }}
          animate={{ x: '110%' }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 10,
          }}
        >
          <Plane className="w-10 h-10 text-cyan-400/20" />
        </motion.div>
      ))}

      {/* Floating Stars - Reduced from 50 to 15 */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <Star className="w-2 h-2 text-cyan-400" />
        </motion.div>
      ))}

      {/* Spotlight Effect - Only when unlocked */}
      {isUnlocked && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function HeaderSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-white text-5xl md:text-7xl mb-4 flex items-center justify-center gap-4 drop-shadow-2xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Music className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" />
        </motion.div>
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          ARTIST SPECIAL
        </span>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Mic2 className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" />
        </motion.div>
      </h2>

      <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto flex items-center justify-center gap-2">
        <Globe2 className="w-5 h-5 text-cyan-400" />
        Un artist internațional pentru călătoria Around the World!
        <Plane className="w-5 h-5 text-cyan-400" />
      </p>
    </motion.div>
  );
}

function LockedOrUnlockedState({ isUnlocked, timeRemaining, revealDate, curtainsOpen, handleReveal }: any) {
  return (
    <motion.div
      key="locked"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative bg-gradient-to-br from-blue-950/60 via-cyan-900/40 to-blue-950/60 border-4 border-cyan-500/50 rounded-3xl p-8 md:p-16 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-500/30">
        {/* Curtains - Only when unlocked and about to reveal */}
        <AnimatePresence>
          {isUnlocked && !curtainsOpen && (
            <>
              <motion.div
                exit={{ x: '-100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/2 z-50"
                style={{
                  backgroundImage: 'linear-gradient(to right, #7c2d12 0%, #991b1b 50%, #7c2d12 100%)',
                  boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.5)',
                }}
              />
              <motion.div
                exit={{ x: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 right-0 w-1/2 z-50"
                style={{
                  backgroundImage: 'linear-gradient(to left, #7c2d12 0%, #991b1b 50%, #7c2d12 100%)',
                  boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.5)',
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Pulsing Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 30px rgba(6, 182, 212, 0.3)",
              "inset 0 0 50px rgba(6, 182, 212, 0.5)",
              "inset 0 0 30px rgba(6, 182, 212, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sound Waves - Reduced from 6 to 3 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [0, 2.5],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            >
              <div className="w-48 h-48 border-4 border-cyan-400/30 rounded-full" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10">
          {!isUnlocked ? (
            <LockedContent timeRemaining={timeRemaining} revealDate={revealDate} />
          ) : (
            <UnlockedContent handleReveal={handleReveal} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LockedContent({ timeRemaining, revealDate }: any) {
  return (
    <>
      {/* Lock Icon */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex justify-center mb-12"
      >
        <div className="relative">
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl"
          />

          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center border-8 border-cyan-400/60 shadow-2xl shadow-cyan-500/50">
            <Lock className="w-16 h-16 md:w-20 md:h-20 text-cyan-400" />
          </div>
        </div>
      </motion.div>

      <h3 className="text-white text-2xl md:text-4xl mb-8 text-center">
        Artistul va fi dezvăluit în curând! 🌍✨
      </h3>

      {/* Countdown Display */}
      <CountdownDisplay timeRemaining={timeRemaining} />

      <p className="text-blue-200 text-center text-base md:text-lg mt-8">
        Dezvăluirea: {revealDate.toLocaleDateString('ro-RO', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </>
  );
}

function UnlockedContent({ handleReveal }: any) {
  return (
    <>
      {/* Unlock Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex justify-center mb-12"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/60 to-blue-400/60 rounded-full blur-3xl"
          />
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-8 border-white shadow-2xl shadow-cyan-500/70">
            <Unlock className="w-16 h-16 md:w-20 md:h-20 text-white animate-pulse" />
          </div>
        </div>
      </motion.div>

      <h3 className="text-white text-2xl md:text-4xl mb-10 text-center">
        🎤 ARTISTUL ESTE GATA SĂ FIE DEZVĂLUIT! 🎤
      </h3>

      {/* Reveal Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(6, 182, 212, 0.5)",
            "0 0 60px rgba(6, 182, 212, 0.8)",
            "0 0 30px rgba(6, 182, 212, 0.5)",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Button
          onClick={handleReveal}
          size="lg"
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-600 hover:via-blue-700 hover:to-cyan-600 text-white py-8 md:py-12 text-xl md:text-3xl shadow-2xl border-4 border-white relative overflow-hidden"
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <PartyPopper className="w-8 h-8 md:w-12 md:h-12 mr-3 md:mr-4 relative z-10" />
          <span className="relative z-10">DEZVĂLUIE ARTISTUL!</span>
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 ml-3 md:ml-4 relative z-10" />
        </Button>
      </motion.div>
    </>
  );
}

function RevealedState({ showConfetti }: { showConfetti: boolean }) {
  return (
    <motion.div
      key="revealed"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      {/* Confetti - Reduced from 100 to 50 */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: -50,
              }}
              initial={{ y: -50, rotate: 0, scale: 0 }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                rotate: Math.random() * 720 - 360,
                x: (Math.random() - 0.5) * 300,
                scale: [0, 1, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeOut",
              }}
            >
              <div
                className="w-3 h-3 rounded-full shadow-lg"
                style={{
                  backgroundColor: [
                    '#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6',
                    '#ec4899', '#f59e0b', '#10b981',
                  ][Math.floor(Math.random() * 7)],
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Revealed Card */}
      <div className="relative bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/30 border-8 border-cyan-400 rounded-3xl p-8 md:p-16 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-500/70">
        {/* Animated shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Music className="w-20 h-20 md:w-32 md:h-32 text-cyan-400 mx-auto mb-8" />
          </motion.div>

          <h2 className="text-white text-4xl md:text-6xl mb-6 drop-shadow-2xl">
            🎉 ARTIST SPECIAL 🎉
          </h2>

          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 md:p-8 mb-8">
            <p className="text-white text-3xl md:text-5xl tracking-wide drop-shadow-lg">
              [NUMELE ARTISTULUI]
            </p>
          </div>

          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto">
            Pregătește-te pentru o seară de neuitat alături de acest artist extraordinar!
            🌍✨🎤
          </p>
        </div>
      </div>
    </motion.div>
  );
}
