import { useState, useEffect, useMemo } from "react";
import { Heart, Users, Sparkles, Lock, Clock, MapPin, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { COUPLES_DATA, FIRST_UNLOCK_DATE, getCoupleUnlockDate } from "../lib/data/couples";
import { useCountdown } from "../lib/hooks/useCountdown";
import { DestinationPin } from "./couple/DestinationPin";
import { CountdownDisplay } from "./couple/CountdownDisplay";

interface Couple {
  person1: string;
  person2: string;
  revealed: boolean;
}

export function CoupleReveal() {
  const [couples, setCouples] = useState<Couple[]>(
    COUPLES_DATA.map(c => ({ person1: c.person1, person2: c.person2, revealed: false }))
  );

  const [allRevealed, setAllRevealed] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(0);

  // Verifică câte cupluri sunt deblocate
  useEffect(() => {
    const checkUnlockedCouples = () => {
      const now = new Date();
      let unlockedCouples = 0;
      
      COUPLES_DATA.forEach((coupleData) => {
        const unlockDate = getCoupleUnlockDate(coupleData.dayOffset);
        if (now >= unlockDate) {
          unlockedCouples++;
        }
      });
      
      setUnlockedCount(prevCount => {
        // Only update if the count actually changed
        if (prevCount !== unlockedCouples) {
          return unlockedCouples;
        }
        return prevCount;
      });
    };

    checkUnlockedCouples();
    const interval = setInterval(checkUnlockedCouples, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculăm următoarea dată de unlock - MEMOIZAT pentru a preveni re-crearea obiectului Date
  const nextUnlockDate = useMemo(() => getCoupleUnlockDate(unlockedCount), [unlockedCount]);
  const { timeRemaining } = useCountdown(nextUnlockDate);

  // Verifică dacă un cuplu specific este deblocat
  const isCoupleUnlocked = (index: number) => {
    return index < unlockedCount;
  };

  const revealCouple = (index: number) => {
    if (!isCoupleUnlocked(index)) return;
    const newCouples = [...couples];
    newCouples[index].revealed = true;
    setCouples(newCouples);
  };

  const revealAll = () => {
    const newCouples = couples.map((couple, index) => ({
      ...couple,
      revealed: isCoupleUnlocked(index) ? true : couple.revealed
    }));
    setCouples(newCouples);
    if (unlockedCount >= COUPLES_DATA.length) {
      setAllRevealed(true);
    }
  };

  const revealedCount = couples.filter(c => c.revealed).length;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Floating travel elements */}
      <FloatingElements />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <HeaderSection 
          unlockedCount={unlockedCount}
          totalCount={COUPLES_DATA.length}
          revealedCount={revealedCount}
          timeRemaining={timeRemaining}
          showCountdown={unlockedCount < COUPLES_DATA.length}
        />

        {/* Road Map - Travel Journey */}
        <RoadMapSection 
          isCoupleUnlocked={isCoupleUnlocked}
          couples={couples}
        />

        {/* Couples Grid */}
        <CouplesGrid
          couples={couples}
          isCoupleUnlocked={isCoupleUnlocked}
          revealCouple={revealCouple}
        />

        {/* Reveal All Button */}
        {unlockedCount > 0 && !allRevealed && revealedCount < unlockedCount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              onClick={revealAll}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 shadow-lg shadow-cyan-500/20"
            >
              <Plane className="w-5 h-5 mr-2" />
              Dezvăluie Toate Destinațiile Deblocate
            </Button>
          </motion.div>
        )}

        {/* All revealed message */}
        {unlockedCount >= COUPLES_DATA.length && revealedCount >= COUPLES_DATA.length && (
          <AllRevealedMessage />
        )}

        {/* Info Box */}
        <InfoBox />
      </div>
    </section>
  );
}

// Sub-components for better organization

function FloatingElements() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <Plane className="absolute top-20 left-10 w-12 h-12 text-cyan-500 animate-pulse" />
      <MapPin className="absolute top-40 right-20 w-8 h-8 text-blue-500 animate-pulse delay-300" />
      <Heart className="absolute bottom-32 left-1/4 w-10 h-10 text-cyan-500 animate-pulse delay-700" />
      <Plane className="absolute bottom-20 right-1/3 w-12 h-12 text-blue-400 animate-pulse delay-500" />
    </div>
  );
}

function HeaderSection({ unlockedCount, totalCount, revealedCount, timeRemaining, showCountdown }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-full mb-6 border-2 border-cyan-500/30">
        {unlockedCount === 0 ? (
          <Lock className="w-10 h-10 text-cyan-400" />
        ) : (
          <Heart className="w-10 h-10 text-cyan-400" />
        )}
      </div>
      
      <h2 className="text-white text-4xl md:text-5xl mb-4">
        Călătoria Cuplurilor 💕
      </h2>
      <p className="text-blue-200 max-w-2xl mx-auto mb-6">
        Fiecare cuplu pornește într-o aventură unică prin lume! Urmărește călătoria lor pe harta dezvăluirilor.
      </p>
      
      <div className="flex flex-col gap-4 items-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400">
            {unlockedCount} din {totalCount} destinații deblocate • {revealedCount} dezvăluite
          </span>
        </div>
        
        {showCountdown && (
          <div className="inline-block bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 max-w-md backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400">Următoarea destinație în</span>
            </div>
            
            <CountdownDisplay timeRemaining={timeRemaining} variant="compact" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RoadMapSection({ isCoupleUnlocked, couples }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 hidden md:block" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {COUPLES_DATA.map((coupleData, index) => {
            const isUnlocked = isCoupleUnlocked(index);
            const isRevealed = couples[index].revealed;
            const unlockDate = getCoupleUnlockDate(coupleData.dayOffset);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <DestinationPin
                  destination={coupleData.destination}
                  emoji={coupleData.emoji}
                  isUnlocked={isUnlocked}
                  isRevealed={isRevealed}
                  unlockDate={unlockDate}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function CouplesGrid({ couples, isCoupleUnlocked, revealCouple }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {couples.map((couple: Couple, index: number) => {
        const isUnlocked = isCoupleUnlocked(index);
        const unlockDate = getCoupleUnlockDate(COUPLES_DATA[index].dayOffset);
        const destination = COUPLES_DATA[index];
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative bg-gradient-to-br from-blue-900/30 to-blue-800/20 border rounded-2xl p-6 transition-all duration-500 backdrop-blur-sm ${
              couple.revealed
                ? "border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                : !isUnlocked
                ? "border-gray-700/50 opacity-60"
                : "border-cyan-500/30 hover:border-cyan-400/60"
            }`}
          >
            {!couple.revealed ? (
              <LockedCoupleCard
                destination={destination}
                index={index}
                isUnlocked={isUnlocked}
                unlockDate={unlockDate}
                revealCouple={revealCouple}
              />
            ) : (
              <RevealedCoupleCard
                couple={couple}
                destination={destination}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function LockedCoupleCard({ destination, index, isUnlocked, unlockDate, revealCouple }: any) {
  return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">{destination.emoji}</div>
      
      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-500/30">
        {!isUnlocked ? (
          <Lock className="w-12 h-12 text-gray-600" />
        ) : (
          <MapPin className="w-12 h-12 text-cyan-400" />
        )}
      </div>
      <h3 className="text-cyan-400 mb-1">{destination.destination}</h3>
      <p className="text-white text-sm mb-2">Cuplu #{index + 1}</p>
      {!isUnlocked ? (
        <>
          <p className="text-blue-200 text-sm mb-2">Destinație blocată până pe</p>
          <p className="text-cyan-400 mb-6">
            {unlockDate.toLocaleDateString('ro-RO', { 
              day: 'numeric', 
              month: 'long'
            })}
          </p>
        </>
      ) : (
        <p className="text-blue-200 text-sm mb-6">
          Gata de decolare! Click pentru a dezvălui
        </p>
      )}
      <Button
        onClick={() => revealCouple(index)}
        variant="outline"
        disabled={!isUnlocked}
        className={`${
          !isUnlocked
            ? "border-gray-700 text-gray-600 cursor-not-allowed"
            : "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500"
        }`}
      >
        {!isUnlocked ? (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Blocat
          </>
        ) : (
          <>
            <Plane className="w-4 h-4 mr-2" />
            Dezvăluie
          </>
        )}
      </Button>
    </div>
  );
}

function RevealedCoupleCard({ couple, destination }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-4"
    >
      <div className="text-5xl mb-4">{destination.emoji}</div>
      
      <div className="relative mb-6">
        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Users className="w-8 h-8 text-white" />
          </div>
          <Heart className="w-8 h-8 text-cyan-400 animate-pulse" />
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      
      <div className="inline-block bg-cyan-500/10 border border-cyan-400/30 rounded-lg px-4 py-2 mb-4">
        <p className="text-cyan-400 text-sm">{destination.destination}</p>
      </div>
      
      <div className="space-y-2">
        <p className="text-white">{couple.person1}</p>
        <p className="text-cyan-400">✈️ ❤️ ✈️</p>
        <p className="text-white">{couple.person2}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-cyan-700/30">
        <p className="text-blue-200 text-sm">
          Bon voyage! 🌍
        </p>
      </div>
    </motion.div>
  );
}

function AllRevealedMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm"
    >
      <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
      <h3 className="text-white text-2xl mb-3">
        Toate Destinațiile Au Fost Dezvăluite! 🌍
      </h3>
      <p className="text-blue-200">
        Călătoria cuplurilor este completă! Vă dorim tuturor o seară magică Around the World! ✈️💕
      </p>
    </motion.div>
  );
}

function InfoBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-cyan-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center border-2 border-cyan-500/30">
            <Heart className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <div className="flex-grow">
          <h4 className="text-white mb-2 flex items-center gap-2">
            Despre Tradiția Cuplurilor 
            <span className="text-2xl">✈️</span>
          </h4>
          <p className="text-blue-200 text-sm">
            Fiecare boboc pornește într-o călătorie simbolică alături de un partener special. 
            În noaptea balului, cuplurile vor deschide dansul într-o ambianță magică Around the World!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
