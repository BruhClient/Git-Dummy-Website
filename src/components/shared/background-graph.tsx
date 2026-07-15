import { COLORS, PALETTE } from "@/lib/colors";

const BG_COLORS = [COLORS.accent, PALETTE[0], PALETTE[4], PALETTE[3]];

interface BgNode {
  id: number;
  x: number;
  y: number;
  r: number;
  color: string;
  delay: number;
  duration: number;
}

interface Cluster {
  drift: "a" | "b" | "c";
  duration: number;
  nodes: BgNode[];
  edges: [number, number][];
}

const clusters: Cluster[] = [
  {
    drift: "a",
    duration: 16,
    nodes: [
      { id: 1, x: 80, y: 120, r: 3, color: BG_COLORS[0], delay: 0, duration: 3.5 },
      { id: 2, x: 180, y: 60, r: 2, color: BG_COLORS[1], delay: 1.2, duration: 4 },
      { id: 3, x: 50, y: 300, r: 2.5, color: BG_COLORS[2], delay: 2.4, duration: 4.5 },
      { id: 15, x: 300, y: 150, r: 2, color: BG_COLORS[0], delay: 0.6, duration: 3 },
      { id: 19, x: 220, y: 280, r: 2, color: BG_COLORS[3], delay: 1.8, duration: 5 },
    ],
    edges: [
      [1, 2],
      [2, 15],
      [1, 3],
      [15, 19],
    ],
  },
  {
    drift: "b",
    duration: 18,
    nodes: [
      { id: 4, x: 920, y: 150, r: 3, color: BG_COLORS[3], delay: 0.8, duration: 4 },
      { id: 5, x: 850, y: 80, r: 2, color: BG_COLORS[0], delay: 2, duration: 3.5 },
      { id: 6, x: 960, y: 320, r: 2.5, color: BG_COLORS[1], delay: 1.4, duration: 4.5 },
      { id: 13, x: 500, y: 50, r: 2, color: BG_COLORS[3], delay: 0.3, duration: 3 },
      { id: 16, x: 700, y: 150, r: 2.5, color: BG_COLORS[2], delay: 1.8, duration: 5 },
      { id: 20, x: 780, y: 280, r: 2, color: BG_COLORS[1], delay: 0.5, duration: 3.5 },
    ],
    edges: [
      [4, 5],
      [4, 6],
      [13, 16],
      [16, 20],
    ],
  },
  {
    drift: "c",
    duration: 17,
    nodes: [
      { id: 7, x: 60, y: 650, r: 2, color: BG_COLORS[2], delay: 1, duration: 4 },
      { id: 8, x: 140, y: 780, r: 3, color: BG_COLORS[0], delay: 2.2, duration: 3.5 },
      { id: 9, x: 40, y: 900, r: 2, color: BG_COLORS[3], delay: 0.4, duration: 5 },
      { id: 17, x: 250, y: 850, r: 2, color: BG_COLORS[1], delay: 1.6, duration: 3 },
      { id: 21, x: 200, y: 700, r: 2, color: BG_COLORS[2], delay: 0.9, duration: 4.5 },
    ],
    edges: [
      [7, 8],
      [8, 9],
      [8, 17],
      [17, 21],
    ],
  },
  {
    drift: "a",
    duration: 19,
    nodes: [
      { id: 10, x: 900, y: 700, r: 2.5, color: BG_COLORS[1], delay: 0.9, duration: 4 },
      { id: 11, x: 960, y: 850, r: 2, color: BG_COLORS[0], delay: 2.1, duration: 3.5 },
      { id: 12, x: 820, y: 940, r: 3, color: BG_COLORS[2], delay: 0.5, duration: 5 },
      { id: 14, x: 500, y: 950, r: 2, color: BG_COLORS[3], delay: 1.3, duration: 3 },
      { id: 18, x: 750, y: 880, r: 2.5, color: BG_COLORS[0], delay: 1.9, duration: 4.5 },
      { id: 22, x: 680, y: 750, r: 2, color: BG_COLORS[3], delay: 0.2, duration: 3.5 },
    ],
    edges: [
      [10, 11],
      [11, 12],
      [18, 14],
      [18, 22],
    ],
  },
  {
    drift: "b",
    duration: 15,
    nodes: [
      { id: 23, x: 30, y: 480, r: 2, color: BG_COLORS[1], delay: 0.7, duration: 4 },
      { id: 24, x: 150, y: 420, r: 2.5, color: BG_COLORS[0], delay: 1.5, duration: 3.5 },
      { id: 25, x: 90, y: 560, r: 2, color: BG_COLORS[2], delay: 2.3, duration: 4.5 },
    ],
    edges: [
      [23, 24],
      [23, 25],
    ],
  },
  {
    drift: "c",
    duration: 20,
    nodes: [
      { id: 26, x: 970, y: 480, r: 2, color: BG_COLORS[3], delay: 1.1, duration: 3.5 },
      { id: 27, x: 850, y: 420, r: 2.5, color: BG_COLORS[1], delay: 0.4, duration: 4 },
      { id: 28, x: 920, y: 570, r: 2, color: BG_COLORS[0], delay: 1.9, duration: 5 },
    ],
    edges: [
      [26, 27],
      [26, 28],
    ],
  },
];

export default function BackgroundGraph() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="gd-bg-drift absolute rounded-full"
        style={{
          top: "-12%",
          right: "2%",
          width: "620px",
          height: "620px",
          background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 70%)`,
          opacity: 0.1,
          filter: "blur(80px)",
          animationName: "gd-drift-b",
          animationDuration: "34s",
        }}
      />
      <div
        className="gd-bg-drift absolute rounded-full"
        style={{
          bottom: "-15%",
          left: "6%",
          width: "560px",
          height: "560px",
          background: `radial-gradient(circle, ${PALETTE[0]} 0%, transparent 70%)`,
          opacity: 0.08,
          filter: "blur(90px)",
          animationName: "gd-drift-c",
          animationDuration: "38s",
        }}
      />
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        {clusters.map((cluster, i) => {
          const nodeById = new Map(cluster.nodes.map((n) => [n.id, n]));
          return (
            <g
              key={i}
              className="gd-bg-drift"
              style={{
                animationName: `gd-drift-${cluster.drift}`,
                animationDuration: `${cluster.duration}s`,
              }}
            >
              {cluster.edges.map(([fromId, toId], j) => {
                const from = nodeById.get(fromId);
                const to = nodeById.get(toId);
                if (!from || !to) return null;
                return (
                  <line
                    key={`line-${j}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={from.color}
                    strokeWidth={1}
                    opacity={0.2}
                  />
                );
              })}
              {cluster.edges.map(([fromId, toId], j) => {
                const from = nodeById.get(fromId);
                const to = nodeById.get(toId);
                if (!from || !to) return null;
                return (
                  <circle
                    key={`flow-${j}`}
                    className="gd-bg-flow"
                    r={1.6}
                    fill={from.color}
                    style={{
                      offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')`,
                      animationDuration: `${2.5 + (j % 4) * 0.5}s`,
                      animationDelay: `${(j * 0.4) % 3}s`,
                    }}
                  />
                );
              })}
              {cluster.nodes.map((node) => (
                <circle
                  key={node.id}
                  className="gd-bg-node"
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.color}
                  style={{
                    animationDelay: `${node.delay}s`,
                    animationDuration: `${node.duration}s`,
                  }}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
