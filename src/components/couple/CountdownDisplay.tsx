import { motion } from "motion/react";
import { Clock, Globe2, Plane, Heart, Sparkles, LucideIcon } from "lucide-react";
import { CountdownTime } from "../../lib/hooks/useCountdown";

interface CountdownDisplayProps {
  timeRemaining: CountdownTime;
  title?: string;
  variant?: "default" | "compact";
}

const timeUnits: Array<{
  key: keyof CountdownTime;
  label: string;
  icon: LucideIcon;
}> = [
  { key: "days", label: "Zile", icon: Globe2 },
  { key: "hours", label: "Ore", icon: Plane },
  { key: "minutes", label: "Minute", icon: Heart },
  { key: "seconds", label: "Secunde", icon: Sparkles },
];

export function CountdownDisplay({ 
  timeRemaining, 
  title = "Countdown până la deschidere",
  variant = "default" 
}: CountdownDisplayProps) {
  if (variant === "compact") {
    return (
      <div className="grid grid-cols-4 gap-3">
        {timeUnits.map((unit) => (
          <div key={unit.key} className="bg-blue-900/50 rounded-lg p-3">
            <div className="text-2xl text-cyan-400">{timeRemaining[unit.key]}</div>
            <div className="text-xs text-blue-200 mt-1">{unit.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border-2 border-cyan-500/40 rounded-2xl p-10">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Clock className="w-8 h-8 text-cyan-400" />
        <p className="text-cyan-400 text-2xl">{title}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: unit.key === "seconds" ? [1, 1.05, 1] : [1],
              }}
              transition={{
                duration: 1,
                repeat: unit.key === "seconds" ? Infinity : 0,
              }}
              className="bg-gradient-to-br from-blue-900/70 to-blue-800/50 rounded-2xl p-8 border-2 border-cyan-500/30 backdrop-blur-sm"
            >
              <unit.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-6xl text-cyan-400 mb-3 font-mono tabular-nums">
                {String(timeRemaining[unit.key]).padStart(2, '0')}
              </div>
              <div className="text-blue-200 text-lg">
                {unit.label}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
