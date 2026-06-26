const ARROWS: Record<string, string> = {
  LR: "→",
  RL: "←",
  TB: "↓",
  BT: "↑",
};

export default function OrientationToggle({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-1 bg-gd-bg-card border border-gd-border rounded-lg px-2 py-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
              value === opt
                ? "bg-gd-accent text-white"
                : "text-gd-text-muted hover:text-gd-text-primary"
            }`}
          >
            {ARROWS[opt] || opt}
          </button>
        ))}
      </div>
    </div>
  );
}
