interface GradientDividerProps {
  fromColor: string;
  toColor: string;
}

export function GradientDivider({ fromColor, toColor }: GradientDividerProps) {
  return (
    <div 
      className="h-32 w-full"
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`
      }}
    />
  );
}
