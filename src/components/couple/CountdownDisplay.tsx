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
    <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-500/40">
      <div className="rounded-3xl bg-gradient-to-br from-blue-950/70 to-blue-900/60 p-10 border border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ boxShadow: '0 0 24px rgba(34, 211, 238, 0.35)' }}
            />
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
              <Clock className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
            {title}
          </p>
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
                  scale: unit.key === "seconds" ? [1, 1.04, 1] : [1],
                }}
                transition={{
                  duration: 1,
                  repeat: unit.key === "seconds" ? Infinity : 0,
                }}
                className="rounded-2xl p-8 border-2 border-cyan-500/30 bg-gradient-to-br from-blue-900/70 to-blue-800/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center mx-auto mb-4">
                  <unit.icon className="w-7 h-7 text-cyan-300" />
                </div>
                <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500 mb-2 font-mono tabular-nums drop-shadow-[0_4px_12px_rgba(34,211,238,0.25)]">
                  {String(timeRemaining[unit.key]).padStart(2, '0')}
                </div>
                <div className="text-blue-200/90 text-sm tracking-widest uppercase">
                  {unit.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
