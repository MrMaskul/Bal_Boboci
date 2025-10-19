import { motion } from "motion/react";
import { Heart, MapPin, Lock, Plane } from "lucide-react";

interface DestinationPinProps {
  destination: string;
  emoji: string;
  isUnlocked: boolean;
  isRevealed: boolean;
  unlockDate: Date;
}

export function DestinationPin({
  destination,
  emoji,
  isUnlocked,
  isRevealed,
  unlockDate,
}: DestinationPinProps) {
  return (
    <div className="relative text-center">
      {/* Flying plane animation for unlocked */}
      {isUnlocked && !isRevealed && (
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
        >
          <Plane className="w-6 h-6 text-cyan-400" />
        </motion.div>
      )}
      
      {/* Destination Pin */}
      <motion.div
        whileHover={isUnlocked ? { scale: 1.1 } : {}}
        className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-3 transition-all duration-300 ${
          isRevealed
            ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50"
            : isUnlocked
            ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50"
            : "bg-gray-800/50 border-2 border-gray-700"
        }`}
      >
        {isRevealed ? (
          <Heart className="w-10 h-10 text-white animate-pulse" />
        ) : isUnlocked ? (
          <MapPin className="w-10 h-10 text-cyan-400" />
        ) : (
          <Lock className="w-10 h-10 text-gray-600" />
        )}
        
        {/* Progress indicator */}
        {isUnlocked && !isRevealed && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-cyan-400/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>
      
      {/* Destination info */}
      <div className="text-4xl mb-2">{emoji}</div>
      <p className={`text-sm mb-1 ${isUnlocked ? "text-cyan-400" : "text-gray-500"}`}>
        {destination}
      </p>
      <p className={`text-xs ${isUnlocked ? "text-blue-200" : "text-gray-600"}`}>
        {unlockDate.toLocaleDateString('ro-RO', { 
          day: 'numeric', 
          month: 'short'
        })}
      </p>
      
      {/* Status badge */}
      {isRevealed ? (
        <div className="mt-2 inline-block bg-cyan-500/20 border border-cyan-400/50 rounded-full px-3 py-1">
          <span className="text-cyan-400 text-xs">✓ Dezvăluit</span>
        </div>
      ) : isUnlocked ? (
        <div className="mt-2 inline-block bg-cyan-500/10 border border-cyan-400/30 rounded-full px-3 py-1">
          <span className="text-cyan-400 text-xs">Disponibil</span>
        </div>
      ) : (
        <div className="mt-2 inline-block bg-gray-800/50 border border-gray-700 rounded-full px-3 py-1">
          <span className="text-gray-500 text-xs">Blocat</span>
        </div>
      )}
    </div>
  );
}
