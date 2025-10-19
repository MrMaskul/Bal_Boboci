import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Heart, Lock, Vote, Plane, Sparkles, AlertCircle, CheckCircle, Clock, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { COUPLES_DATA } from "../lib/data/couples";
import { useCountdown } from "../lib/hooks/useCountdown";
import { CountdownDisplay } from "./couple/CountdownDisplay";
import { VotingCoupleCard } from "./couple/VotingCoupleCard";

export function CoupleVoting() {
  // Data dezblocării votării - 15 noiembrie 2025, ora 00:00 (miezul nopții)
  // TEMPORAR: Setată în trecut pentru testare - schimbă înapoi la "2025-11-15T00:00:00" pentru producție
  const unlockDate = new Date("2020-11-15T00:00:00");
  
  const [isOpen, setIsOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [selectedCouple, setSelectedCouple] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeError, setCodeError] = useState("");

  const { timeRemaining, isExpired: isUnlocked } = useCountdown(unlockDate);

  const handleSubmitVote = async () => {
    // Validare
    if (!accessCode.trim()) {
      setCodeError("Te rugăm să introduci codul de acces!");
      return;
    }

    if (selectedCouple === null) {
      toast.error("Te rugăm să selectezi un cuplu!");
      return;
    }

    setIsSubmitting(true);
    setCodeError("");

    try {
      // TODO: Integrare MongoDB API
      // Vezi /MONGODB_INTEGRATION.md pentru detalii complete
      
      // Simulare pentru development - ȘTERGE ACEST BLOC în producție
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulare eroare pentru cod invalid (pentru testare)
      if (accessCode.trim().length < 4) {
        setCodeError("Cod invalid! Te rugăm să verifici codul introdus.");
        setIsSubmitting(false);
        return;
      }

      // Success - arată mesaj și resetează formul
      const votedCouple = COUPLES_DATA.find(c => c.id === selectedCouple);
      
      toast.success("Votul tău a fost înregistrat! 🎉", {
        description: `Ai votat pentru ${votedCouple?.person1} & ${votedCouple?.person2} (${votedCouple?.destination})`
      });

      // Închide dialog-ul și resetează
      setTimeout(() => {
        setIsOpen(false);
        setAccessCode("");
        setSelectedCouple(null);
        setCodeError("");
      }, 1500);

    } catch (error) {
      setCodeError("A apărut o eroare. Te rugăm să încerci din nou.");
      console.error('Vote error:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Heart className="w-4 h-4 text-cyan-400" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-full mb-6 border-2 border-cyan-500/30">
            <Vote className="w-10 h-10 text-cyan-400" />
          </div>
          
          <h2 className="text-white text-4xl md:text-5xl mb-4">
            Votează Cuplul Favorit 💕
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            Cine merită să câștige titlul de "Cel Mai Frumos Cuplu Around the World"? 
            Tu decizi!
          </p>

          {/* Main Vote Button */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-8 text-2xl shadow-2xl shadow-cyan-500/30"
                >
                  {!isUnlocked ? (
                    <>
                      <Lock className="w-8 h-8 mr-3" />
                      Votarea se Deschide în Curând
                      <Clock className="w-8 h-8 ml-3" />
                    </>
                  ) : (
                    <>
                      <Vote className="w-8 h-8 mr-3" />
                      Votează Acum
                      <Sparkles className="w-8 h-8 ml-3" />
                    </>
                  )}
                </Button>
              </motion.div>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] w-full max-h-[95vh] overflow-y-auto bg-gradient-to-br from-blue-950/98 to-blue-900/98 border-4 border-cyan-500/40 text-white backdrop-blur-xl shadow-2xl shadow-cyan-500/20">
              <DialogHeader>
                <DialogTitle className="text-4xl text-cyan-400 flex items-center gap-3">
                  {!isUnlocked ? (
                    <>
                      <Lock className="w-10 h-10" />
                      Votarea Este Blocată
                    </>
                  ) : (
                    <>
                      <Vote className="w-10 h-10" />
                      Votează Cuplul Favorit
                    </>
                  )}
                </DialogTitle>
                <DialogDescription className="text-blue-200 text-xl">
                  {!isUnlocked 
                    ? "Votarea se va deschide în ziua balului"
                    : "Introdu codul de acces și selectează cuplul preferat"
                  }
                </DialogDescription>
              </DialogHeader>

              {!isUnlocked ? (
                /* Locked State with Countdown */
                <LockedVotingState 
                  timeRemaining={timeRemaining} 
                  unlockDate={unlockDate}
                />
              ) : (
                /* Unlocked State - Voting Interface */
                <div className="space-y-8 mt-8">
                  {/* Section 1 - Code Input */}
                  <CodeInputSection
                    accessCode={accessCode}
                    setAccessCode={setAccessCode}
                    codeError={codeError}
                    setCodeError={setCodeError}
                    isSubmitting={isSubmitting}
                  />

                  {/* Section 2 - Couple Selection */}
                  <CoupleSelectionSection
                    selectedCouple={selectedCouple}
                    setSelectedCouple={setSelectedCouple}
                  />

                  {/* Section 3 - Submit Button */}
                  <SubmitSection
                    handleSubmitVote={handleSubmitVote}
                    accessCode={accessCode}
                    selectedCouple={selectedCouple}
                    isSubmitting={isSubmitting}
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Info Box */}
        <InfoBox />
      </div>
    </section>
  );
}

// Sub-components for better organization

function LockedVotingState({ timeRemaining, unlockDate }: { timeRemaining: any; unlockDate: Date }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border-2 border-cyan-500/30 rounded-3xl p-12 text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-cyan-400/40 rounded-full blur-2xl"
            />
            <div className="relative w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-8 border-cyan-400/50">
              <Lock className="w-20 h-20 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        <h3 className="text-white text-4xl mb-6">
          Votarea se Deschide în Ziua Balului! 🌍
        </h3>

        <CountdownDisplay timeRemaining={timeRemaining} />

        <p className="text-blue-200 text-xl mt-8">
          Votarea se deschide pe {unlockDate.toLocaleDateString('ro-RO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {['🌍 Around the World', '💕 Cel Mai Frumos Cuplu', '🎭 Balul Bobocilor 2025'].map((tag, i) => (
            <span
              key={i}
              className="bg-cyan-500/20 border border-cyan-400/50 px-6 py-3 rounded-full text-cyan-400 text-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CodeInputSection({ accessCode, setAccessCode, codeError, setCodeError, isSubmitting }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/40 border-2 border-cyan-500/30 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400/50">
            <CheckCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-2xl text-white">1. Cod de Acces</h3>
        </div>

        <p className="text-blue-200 text-lg mb-6">
          Introdu codul unic primit de la organizatori
        </p>

        <Input
          type="text"
          placeholder="Introdu codul..."
          value={accessCode}
          onChange={(e) => {
            setAccessCode(e.target.value);
            setCodeError("");
          }}
          className="w-full bg-blue-900/50 border-cyan-500/30 text-white placeholder:text-blue-300/50 px-6 py-8 text-xl rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          disabled={isSubmitting}
        />

        {/* Error Message */}
        <AnimatePresence>
          {codeError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 mt-6"
            >
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200">{codeError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 pt-6 border-t border-cyan-700/30">
          <p className="text-blue-300 text-sm">
            ⚠️ Fiecare cod poate fi folosit o singură dată
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CoupleSelectionSection({ selectedCouple, setSelectedCouple }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/40 border-2 border-cyan-500/30 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400/50">
            <Heart className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl text-white">2. Selectează Cuplul</h3>
        </div>

        <p className="text-blue-200 mb-4">
          Alege cuplul care merită să câștige ✨
        </p>

        {/* Couples Grid */}
        <div className="space-y-3">
          {COUPLES_DATA.map((couple) => (
            <VotingCoupleCard
              key={couple.id}
              couple={couple}
              isSelected={selectedCouple === couple.id}
              onSelect={setSelectedCouple}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SubmitSection({ handleSubmitVote, accessCode, selectedCouple, isSubmitting }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      <Button
        onClick={handleSubmitVote}
        disabled={!accessCode.trim() || selectedCouple === null || isSubmitting}
        size="lg"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-16 py-8 text-2xl shadow-2xl shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-3"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
            Se verifică și trimite...
          </>
        ) : (
          <>
            <CheckCircle className="w-8 h-8 mr-3" />
            Trimite Votul
          </>
        )}
      </Button>

      {(!accessCode.trim() || selectedCouple === null) && (
        <p className="text-blue-300 text-lg text-center">
          {!accessCode.trim() && !selectedCouple 
            ? "Introdu codul și selectează un cuplu pentru a vota"
            : !accessCode.trim()
            ? "Introdu codul de acces"
            : "Selectează un cuplu"}
        </p>
      )}
    </motion.div>
  );
}

function InfoBox() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm text-center"
    >
      <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
        <Plane className="w-5 h-5" />
        <p>Cum funcționează votarea?</p>
      </div>
      <p className="text-blue-200 text-sm">
        Fiecare participant primește un cod unic care poate fi folosit o singură dată pentru a vota cuplul favorit. 
        Cuplul cu cele mai multe voturi va câștiga premiul special! 🏆
      </p>
    </motion.div>
  );
}
