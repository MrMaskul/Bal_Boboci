import { motion, AnimatePresence } from "motion/react";
import { Heart, MapPin, Check } from "lucide-react";
import { CoupleData } from "../../lib/data/couples";

interface VotingCoupleCardProps {
  couple: CoupleData;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export function VotingCoupleCard({ couple, isSelected, onSelect }: VotingCoupleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (couple.id - 1) * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(couple.id)}
      className={`relative cursor-pointer rounded-xl p-3 border-2 transition-all duration-300 ${
        isSelected
          ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-cyan-400 shadow-xl shadow-cyan-500/30"
          : "bg-gradient-to-br from-blue-900/40 to-blue-800/30 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
      }`}
    >
      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full p-1.5 border-2 border-blue-950 shadow-lg z-10"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Number badge */}
      <div className="absolute top-2 left-2 bg-blue-900/60 backdrop-blur-sm border border-cyan-500/30 rounded-full px-2 py-0.5">
        <span className="text-cyan-400 text-xs">#{couple.id}</span>
      </div>

      <div className="flex items-center gap-3 mt-1">
        {/* Left side - Destination Icon */}
        <div className="flex-shrink-0">
          <motion.div
            animate={isSelected ? {
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl drop-shadow-lg"
          >
            {couple.emoji}
          </motion.div>
          <div className="mt-1 flex items-center justify-center gap-1 bg-cyan-500/20 border border-cyan-400/40 rounded px-1.5 py-0.5">
            <MapPin className="w-2.5 h-2.5 text-cyan-400" />
            <span className="text-cyan-400 text-xs">{couple.destination}</span>
          </div>
        </div>

        {/* Right side - Names */}
        <div className="flex-1 space-y-4">
          {/* Person 1 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center border-2 border-cyan-400/50 flex-shrink-0">
              <span className="text-white text-xl">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-lg leading-tight">{couple.person1}</p>
            </div>
          </div>

          {/* Heart Divider */}
          <div className="flex items-center justify-center">
            <motion.div
              animate={isSelected ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0, repeatDelay: 1 }}
            >
              <Heart className={`w-6 h-6 ${
                isSelected 
                  ? 'text-cyan-400 fill-cyan-400' 
                  : 'text-blue-300'
              }`} />
            </motion.div>
          </div>

          {/* Person 2 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border-2 border-cyan-400/50 flex-shrink-0">
              <span className="text-white text-xl">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-lg leading-tight">{couple.person2}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration when selected */}
      {isSelected && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-b-xl"
        />
      )}
    </motion.div>
  );
}
