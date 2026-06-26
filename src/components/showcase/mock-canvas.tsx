import { laneColor, COLORS } from "@/lib/colors";

const NODE_R = 10;
const START_R = 14;
const FLAG_H = 18;

interface Node {
  id: string;
  x: number;
  y: number;
  lane: number;
  contributor?: string;
  isHead?: boolean;
  isStart?: boolean;
  selected?: boolean;
  label?: string;
}

interface Edge {
  from: string;
  to: string;
  lane: number;
  type: "spine" | "branch-off" | "merge" | "branch-spine";
}

const nodes: Node[] = [
  { id: "m1", x: 30, y: 75, lane: 0 },
  { id: "m2", x: 70, y: 75, lane: 0, contributor: "Travis" },
  { id: "m3", x: 110, y: 75, lane: 0 },
  { id: "m4", x: 150, y: 75, lane: 0 },
  { id: "m5", x: 250, y: 75, lane: 0 },
  { id: "m6", x: 290, y: 75, lane: 0, contributor: "Vikas" },
  { id: "m7", x: 330, y: 75, lane: 0, contributor: "Vikas" },
  { id: "m8", x: 370, y: 75, lane: 0, contributor: "Travis" },
  { id: "m9", x: 410, y: 75, lane: 0, contributor: "Travis" },
  { id: "m10", x: 460, y: 75, lane: 0, isHead: true, label: "main" },
  { id: "f1", x: 170, y: 135, lane: 1, isStart: true, contributor: "Travis" },
  { id: "f2", x: 210, y: 135, lane: 1, selected: true, label: "feature" },
  { id: "d1", x: 190, y: 195, lane: 2, isStart: true, contributor: "Vikas" },
  { id: "d2", x: 370, y: 195, lane: 2, contributor: "Vikas V..." },
  { id: "p1", x: 250, y: 255, lane: 3, isStart: true, contributor: "Kamaldce" },
  { id: "p2", x: 290, y: 255, lane: 3, contributor: "Kamaldce" },
  { id: "p3", x: 330, y: 255, lane: 3 },
  { id: "p4", x: 380, y: 255, lane: 3, contributor: "Kamaldci" },
  { id: "p5", x: 420, y: 255, lane: 3, contributor: "Kamaldce", label: "fix" },
];

const edges: Edge[] = [
  { from: "m1", to: "m2", lane: 0, type: "spine" },
  { from: "m2", to: "m3", lane: 0, type: "spine" },
  { from: "m3", to: "m4", lane: 0, type: "spine" },
  { from: "m4", to: "m5", lane: 0, type: "spine" },
  { from: "m5", to: "m6", lane: 0, type: "spine" },
  { from: "m6", to: "m7", lane: 0, type: "spine" },
  { from: "m7", to: "m8", lane: 0, type: "spine" },
  { from: "m8", to: "m9", lane: 0, type: "spine" },
  { from: "m9", to: "m10", lane: 0, type: "spine" },
  { from: "m4", to: "f1", lane: 1, type: "branch-off" },
  { from: "f1", to: "f2", lane: 1, type: "branch-spine" },
  { from: "f2", to: "m5", lane: 1, type: "merge" },
  { from: "m4", to: "d1", lane: 2, type: "branch-off" },
  { from: "d1", to: "d2", lane: 2, type: "branch-spine" },
  { from: "m5", to: "p1", lane: 3, type: "branch-off" },
  { from: "p1", to: "p2", lane: 3, type: "branch-spine" },
  { from: "p2", to: "p3", lane: 3, type: "branch-spine" },
  { from: "p3", to: "p4", lane: 3, type: "branch-spine" },
  { from: "p4", to: "p5", lane: 3, type: "branch-spine" },
];

function renderEdge(edge: Edge, from: Node, to: Node, i: number) {
  const color = laneColor(edge.lane);

  if (edge.type === "spine" || edge.type === "branch-spine") {
    return (
      <line
        key={i}
        x1={from.x} y1={from.y}
        x2={to.x} y2={to.y}
        stroke={color}
        strokeWidth={2}
        opacity={0.63}
        strokeLinecap="round"
      />
    );
  }

  if (edge.type === "branch-off") {
    const dropX = from.x;
    return (
      <g key={i}>
        <path
          d={`M ${dropX} ${from.y} L ${dropX} ${to.y} L ${to.x} ${to.y}`}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="6 4"
          opacity={0.55}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  }

  if (edge.type === "merge") {
    const mergeX = to.x;
    const arrowSize = 7;
    const dy = to.y - from.y;
    const dirY = dy > 0 ? 1 : -1;
    return (
      <g key={i}>
        {from.x !== mergeX && (
          <line
            x1={from.x} y1={from.y}
            x2={mergeX} y2={from.y}
            stroke="white"
            strokeWidth={1.5}
            opacity={0.55}
            strokeLinecap="round"
          />
        )}
        <line
          x1={mergeX} y1={from.y}
          x2={mergeX} y2={to.y}
          stroke="white"
          strokeWidth={1.5}
          opacity={0.55}
          strokeLinecap="round"
        />
        <polygon
          points={`${mergeX},${to.y} ${mergeX - arrowSize * 0.5},${to.y + dirY * -arrowSize} ${mergeX + arrowSize * 0.5},${to.y + dirY * -arrowSize}`}
          fill={color}
        />
      </g>
    );
  }

  return null;
}

export default function MockCanvas() {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="flex-1 relative">
      <svg viewBox="0 0 500 290" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#303030" strokeWidth="1" opacity="0.31" />
          </pattern>
        </defs>
        <rect width="500" height="290" fill="url(#grid)" />

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodeMap[edge.from];
          const to = nodeMap[edge.to];
          if (!from || !to) return null;
          return renderEdge(edge, from, to, i);
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const color = laneColor(node.lane);
          const r = node.isStart ? START_R : node.selected ? NODE_R + 2 : NODE_R;

          return (
            <g key={node.id}>
              {/* Flag pole + flag for start nodes */}
              {node.isStart && (
                <>
                  <line
                    x1={node.x} y1={node.y - r - 2}
                    x2={node.x} y2={node.y - r - 2 - FLAG_H}
                    stroke={color} strokeWidth={2}
                  />
                  <polygon
                    points={`${node.x},${node.y - r - 2 - FLAG_H} ${node.x + 7},${node.y - r - 2 - FLAG_H + 6} ${node.x},${node.y - r - 2 - FLAG_H + 12}`}
                    fill={color}
                  />
                </>
              )}

              {/* Selected: white ring */}
              {node.selected && (
                <>
                  <circle
                    cx={node.x} cy={node.y}
                    r={NODE_R + 4}
                    fill="none" stroke="#ffffff" strokeWidth={2}
                  />
                  <polygon
                    points={`${node.x + NODE_R + 6},${node.y} ${node.x + NODE_R + 1},${node.y - 3} ${node.x + NODE_R + 1},${node.y + 3}`}
                    fill="#ffffff"
                  />
                </>
              )}

              {/* HEAD ring — red danger */}
              {node.isHead && (
                <circle
                  cx={node.x} cy={node.y}
                  r={NODE_R + 5}
                  fill="none"
                  stroke={COLORS.danger}
                  strokeWidth={2.5}
                />
              )}

              {/* Node circle with white border */}
              <circle
                cx={node.x} cy={node.y}
                r={node.selected ? NODE_R + 2 : node.isStart ? START_R : NODE_R}
                fill={color}
                stroke="white"
                strokeWidth={1.5}
                strokeOpacity={0.47}
              />

              {/* Contributor name — muted gray below node */}
              {node.contributor && (
                <text
                  x={node.x} y={node.y + r + 12}
                  textAnchor="middle"
                  fill={COLORS.text_muted}
                  fontSize={6}
                  fontWeight={400}
                  fontFamily="var(--font-body)"
                >
                  {node.contributor}
                </text>
              )}
            </g>
          );
        })}

        {/* Branch label pills */}
        {nodes.filter((n) => n.label).map((node) => {
          const color = laneColor(node.lane);
          const text = node.label!;
          const pillW = text.length * 5.5 + 14;
          const pillH = 14;
          const r = node.isStart ? START_R : NODE_R;
          const px = node.x + r + 6;
          const py = node.y - pillH / 2;
          return (
            <g key={`label-${node.id}`}>
              <rect
                x={px} y={py}
                width={pillW} height={pillH}
                rx={pillH / 2}
                fill={color} fillOpacity={0.11}
                stroke={color} strokeOpacity={0.63} strokeWidth={0.8}
              />
              <text
                x={px + pillW / 2} y={py + pillH / 2}
                textAnchor="middle" dominantBaseline="central"
                fill={color} fontSize={7} fontWeight={500}
                fontFamily="var(--font-body)"
              >
                {text}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Minimap — bottom left, shows dots for each commit */}
      <div className="absolute bottom-8 left-2 w-24 h-20 bg-gd-bg-card/90 border border-gd-border rounded-lg overflow-hidden">
        <svg viewBox="0 0 500 290" className="w-full h-full">
          {nodes.map((node) => (
            <circle
              key={`mini-${node.id}`}
              cx={node.x} cy={node.y}
              r={3}
              fill={laneColor(node.lane)}
              opacity={0.78}
            />
          ))}
          <rect x="80" y="40" width="200" height="160" fill="white" fillOpacity={0.07} stroke="white" strokeWidth={2} rx={2} />
        </svg>
      </div>

      {/* Bottom bar — zoom + orient + filter */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gd-bg-card border border-gd-border rounded-lg px-2.5 py-1.5">
        <span className="text-[9px] text-gd-text-muted font-medium">−</span>
        <span className="text-[9px] text-gd-text-secondary mx-0.5">75%</span>
        <span className="text-[9px] text-gd-text-muted font-medium">+</span>
        <div className="w-px h-3.5 bg-gd-border mx-1" />
        <span className="text-[9px] text-gd-text-muted">↓</span>
        <span className="text-[9px] text-gd-text-muted">↑</span>
        <div className="w-5 h-5 rounded-md bg-gd-accent flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">→</span>
        </div>
        <span className="text-[9px] text-gd-text-muted">←</span>
        <div className="w-px h-3.5 bg-gd-border mx-1" />
        <span className="text-[9px] text-gd-text-muted">⊞ Filter</span>
      </div>
    </div>
  );
}
