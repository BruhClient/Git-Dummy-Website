export const COLORS = {
  bg_primary: "#141414",
  bg_secondary: "#1c1c1c",
  bg_card: "#202020",
  bg_hover: "#2a2a2a",
  border: "#303030",
  accent: "#d4775c",
  accent_hover: "#c06a52",
  accent_dim: "#2e1f1a",
  text_primary: "#e8e6e3",
  text_secondary: "#a3a09c",
  text_muted: "#6b6865",
  danger: "#d65d5d",
  warning: "#c9a044",
  info: "#5a9fd4",
} as const;

export const PALETTE = [
  "#7c83db",
  "#d4a24e",
  "#c86a6a",
  "#9a7fd1",
  "#4fb8c9",
  "#d48a54",
  "#c97ba3",
  "#54b09e",
  "#8fb85c",
  "#a994d4",
];

export function laneColor(laneIndex: number): string {
  return laneIndex === 0
    ? COLORS.accent
    : PALETTE[(laneIndex - 1) % PALETTE.length];
}
