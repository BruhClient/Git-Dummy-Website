import { PALETTE, COLORS } from "@/lib/colors";

export default function GraphIllustration() {
  return (
    <svg
      width={80}
      height={50}
      viewBox="0 0 80 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Edges */}
      <line x1="12" y1="38" x2="30" y2="25" stroke={COLORS.border} strokeWidth="1.5" />
      <line x1="30" y1="25" x2="50" y2="12" stroke={COLORS.border} strokeWidth="1.5" />
      <line x1="30" y1="25" x2="50" y2="38" stroke={COLORS.border} strokeWidth="1.5" />
      <line x1="50" y1="12" x2="68" y2="25" stroke={COLORS.border} strokeWidth="1.5" />
      <line x1="50" y1="38" x2="68" y2="25" stroke={COLORS.border} strokeWidth="1.5" />

      {/* Nodes */}
      <circle cx="12" cy="38" r="5" fill={COLORS.accent} />
      <circle cx="30" cy="25" r="5" fill={PALETTE[0]} />
      <circle cx="50" cy="12" r="5" fill={PALETTE[1]} />
      <circle cx="50" cy="38" r="5" fill={PALETTE[4]} />
      <circle cx="68" cy="25" r="5" fill={PALETTE[2]} />
    </svg>
  );
}
