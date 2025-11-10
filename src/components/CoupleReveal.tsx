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
    COUPLES_DATA.map(c => ({ person1: c.person1, person2: c.person2, revealed: true }))
  );

  const [allRevealed, setAllRevealed] = useState(true);
  const [unlockedCount, setUnlockedCount] = useState(COUPLES_DATA.length);

  // VerificÄ cĂ˘te cupluri sunt deblocate
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
    const interval = setInterval(checkUnlockedCouples, 30000);

    return () => clearInterval(interval);
  }, []);

  // CalculÄm urmÄtoarea datÄ de unlock - MEMOIZAT pentru a preveni re-crearea obiectului Date
  const nextUnlockDate = useMemo(() => getCoupleUnlockDate(unlockedCount), [unlockedCount]);
  const { timeRemaining } = useCountdown(nextUnlockDate);

  // VerificÄ dacÄ un cuplu specific este deblocat
  const isCoupleUnlocked = (_index: number) => true;

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

  // Fixed mapping of couple images in the same order as COUPLES_DATA
  const COUPLE_IMAGES: string[] = [
    "/images/boboci/giulia+david.png",
    "/images/boboci/taisia+matei.png",
    "/images/boboci/denisa+mina.png",
    "/images/boboci/anastasia+darius.png",
    "/images/boboci/denisa+horia.png",
    "/images/boboci/bianca+alejandro.png",
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Floating travel elements */}
      <FloatingElements />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header removed */}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-white text-3xl md:text-5xl font-akira-expanded tracking-wide">
            ȚĂRILE PREZENTE ANUL ACEASTA
          </h2>
        </motion.div>

        {/* Couples Grid */}
        <CouplesGrid couples={couples} images={COUPLE_IMAGES} />

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

function HeaderSection(_: any) { return null; }

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

function CouplesGrid({ couples, images }: { couples: Couple[]; images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {couples.map((couple: Couple, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative border border-cyan-500/30 rounded-2xl overflow-hidden bg-black/20"
        >
          <img
            src={images[index]}
            alt={`${couple.person1} & ${couple.person2}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: "3 / 4" }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = "/images/logo/lsac-logo.png";
            }}
          />
        </motion.div>
      ))}
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
          <p className="text-blue-200 text-sm mb-2">DestinaČ›ie blocatÄ pĂ˘nÄ pe</p>
          <p className="text-cyan-400 mb-6">
            {unlockDate.toLocaleDateString('ro-RO', { 
              day: 'numeric', 
              month: 'long'
            })}
          </p>
        </>
      ) : (
        <p className="text-blue-200 text-sm mb-6">
          Gata de decolare! Click pentru a dezvÄlui
        </p>
      )}
      <Button
        onClick={() => revealCouple(index)}
        variant="outline"
        disabled={!isUnlocked}
        className={`${
          !isUnlocked
            ? "bg-gray-700/60 text-white/90 border-gray-500 cursor-not-allowed"
            : "bg-cyan-600/90 text-white font-semibold border-cyan-500 hover:bg-cyan-600 hover:border-cyan-400 shadow-md shadow-black/20"
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
            DezvÄluie
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
        <p className="text-cyan-400">împreună cu</p>
        <p className="text-white">{couple.person2}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-cyan-700/30">
        <p className="text-blue-200 text-sm">
          Bon voyage! 
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
        Toate DestinaČ›iile Au Fost DezvÄluite! đźŚŤ
      </h3>
      <p className="text-blue-200">
        CÄlÄtoria cuplurilor este completÄ! VÄ dorim tuturor o searÄ magicÄ Around the World! âśď¸Źđź’•
      </p>
    </motion.div>
  );
}


