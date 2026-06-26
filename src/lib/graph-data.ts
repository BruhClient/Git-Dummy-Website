export interface GraphNode {
  id: string;
  x: number;
  y: number;
  lane: number;
  label?: string;
  isHead?: boolean;
  isStart?: boolean;
  isMerge?: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
  lane: number;
}

export type EdgeType = "spine" | "branch-off" | "merge";

export function computeSpinePath(
  from: { x: number; y: number },
  to: { x: number; y: number }
): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

export function computeElbowPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  orientation: string = "LR"
): string {
  if (orientation === "LR" || orientation === "RL") {
    return `M ${from.x} ${from.y} L ${to.x} ${from.y} L ${to.x} ${to.y}`;
  } else {
    return `M ${from.x} ${from.y} L ${from.x} ${to.y} L ${to.x} ${to.y}`;
  }
}

export function classifyEdge(
  edge: GraphEdge,
  nodeMap: Map<string, GraphNode> | Record<string, GraphNode>
): EdgeType {
  const fromNode = nodeMap instanceof Map ? nodeMap.get(edge.from) : nodeMap[edge.from];
  const toNode = nodeMap instanceof Map ? nodeMap.get(edge.to) : nodeMap[edge.to];
  if (!fromNode || !toNode) return "spine";
  if (fromNode.lane === toNode.lane) return "spine";
  if (toNode.isStart) return "branch-off";
  return "merge";
}

export function computeArrowPoints(
  target: { x: number; y: number },
  corner: { x: number; y: number },
  size: number = 7
): string {
  const dx = target.x - corner.x;
  const dy = target.y - corner.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return "";
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const tipX = target.x;
  const tipY = target.y;
  const baseX = target.x - ux * size;
  const baseY = target.y - uy * size;
  const halfW = size * 0.5;
  return `${tipX},${tipY} ${baseX + px * halfW},${baseY + py * halfW} ${baseX - px * halfW},${baseY - py * halfW}`;
}

export function getElbowCorner(
  from: { x: number; y: number },
  to: { x: number; y: number },
  orientation: string = "LR"
): { x: number; y: number } {
  if (orientation === "LR" || orientation === "RL") {
    return { x: to.x, y: from.y };
  } else {
    return { x: from.x, y: to.y };
  }
}

export const heroNodes: GraphNode[] = [
  { id: "h1", x: 60, y: 150, lane: 0 },
  { id: "h2", x: 160, y: 150, lane: 0 },
  { id: "h3", x: 260, y: 150, lane: 0 },
  { id: "h4", x: 360, y: 150, lane: 0, isMerge: true },
  { id: "h5", x: 460, y: 150, lane: 0, isMerge: true },
  { id: "h6", x: 560, y: 150, lane: 0, isHead: true, label: "main" },
  { id: "f1", x: 210, y: 60, lane: 1, isStart: true },
  { id: "f2", x: 310, y: 60, lane: 1 },
  { id: "f3", x: 410, y: 60, lane: 1, label: "feature/auth" },
  { id: "t1", x: 310, y: 240, lane: 2, isStart: true, label: "fix/typo" },
];

export const heroEdges: GraphEdge[] = [
  { from: "h1", to: "h2", lane: 0 },
  { from: "h2", to: "h3", lane: 0 },
  { from: "h3", to: "h4", lane: 0 },
  { from: "h4", to: "h5", lane: 0 },
  { from: "h5", to: "h6", lane: 0 },
  { from: "h2", to: "f1", lane: 1 },
  { from: "f1", to: "f2", lane: 1 },
  { from: "f2", to: "f3", lane: 1 },
  { from: "f3", to: "h5", lane: 1 },
  { from: "h3", to: "t1", lane: 2 },
  { from: "t1", to: "h4", lane: 2 },
];

export const showcaseNodes: GraphNode[] = [
  { id: "s1", x: 40, y: 200, lane: 0 },
  { id: "s2", x: 120, y: 200, lane: 0 },
  { id: "s3", x: 200, y: 200, lane: 0 },
  { id: "s4", x: 280, y: 200, lane: 0, isMerge: true },
  { id: "s5", x: 360, y: 200, lane: 0 },
  { id: "s6", x: 440, y: 200, lane: 0, isMerge: true },
  { id: "s7", x: 520, y: 200, lane: 0, isHead: true, label: "main" },
  { id: "b1", x: 160, y: 120, lane: 1, isStart: true },
  { id: "b2", x: 240, y: 120, lane: 1, label: "feature/ui" },
  { id: "x1", x: 320, y: 290, lane: 2, isStart: true },
  { id: "x2", x: 400, y: 290, lane: 2, label: "hotfix" },
  { id: "d1", x: 200, y: 40, lane: 3, isStart: true },
  { id: "d2", x: 280, y: 40, lane: 3 },
  { id: "d3", x: 360, y: 40, lane: 3, label: "dev" },
];

export const showcaseEdges: GraphEdge[] = [
  { from: "s1", to: "s2", lane: 0 },
  { from: "s2", to: "s3", lane: 0 },
  { from: "s3", to: "s4", lane: 0 },
  { from: "s4", to: "s5", lane: 0 },
  { from: "s5", to: "s6", lane: 0 },
  { from: "s6", to: "s7", lane: 0 },
  { from: "s2", to: "b1", lane: 1 },
  { from: "b1", to: "b2", lane: 1 },
  { from: "b2", to: "s4", lane: 1 },
  { from: "s4", to: "x1", lane: 2 },
  { from: "x1", to: "x2", lane: 2 },
  { from: "x2", to: "s6", lane: 2 },
  { from: "s2", to: "d1", lane: 3 },
  { from: "d1", to: "d2", lane: 3 },
  { from: "d2", to: "d3", lane: 3 },
];

export interface OrientedNode extends Omit<GraphNode, "x" | "y"> {
  positions: Record<string, { x: number; y: number }>;
}

export const deepDiveNodes: OrientedNode[] = [
  { id: "dd1", lane: 0, positions: { LR: { x: 60, y: 150 }, RL: { x: 540, y: 150 }, TB: { x: 300, y: 40 }, BT: { x: 300, y: 360 } } },
  { id: "dd2", lane: 0, positions: { LR: { x: 160, y: 150 }, RL: { x: 440, y: 150 }, TB: { x: 300, y: 110 }, BT: { x: 300, y: 290 } } },
  { id: "dd3", lane: 0, positions: { LR: { x: 260, y: 150 }, RL: { x: 340, y: 150 }, TB: { x: 300, y: 180 }, BT: { x: 300, y: 220 } } },
  { id: "dd4", lane: 0, isMerge: true, positions: { LR: { x: 360, y: 150 }, RL: { x: 240, y: 150 }, TB: { x: 300, y: 250 }, BT: { x: 300, y: 150 } } },
  { id: "dd5", lane: 0, isHead: true, label: "main", positions: { LR: { x: 460, y: 150 }, RL: { x: 140, y: 150 }, TB: { x: 300, y: 320 }, BT: { x: 300, y: 80 } } },
  { id: "dd6", lane: 1, isStart: true, positions: { LR: { x: 210, y: 60 }, RL: { x: 390, y: 60 }, TB: { x: 180, y: 140 }, BT: { x: 420, y: 260 } } },
  { id: "dd7", lane: 1, label: "feature", positions: { LR: { x: 310, y: 60 }, RL: { x: 290, y: 60 }, TB: { x: 180, y: 210 }, BT: { x: 420, y: 190 } } },
  { id: "dd8", lane: 2, isStart: true, label: "bugfix", positions: { LR: { x: 310, y: 240 }, RL: { x: 290, y: 240 }, TB: { x: 420, y: 210 }, BT: { x: 180, y: 190 } } },
];

export const deepDiveEdges: GraphEdge[] = [
  { from: "dd1", to: "dd2", lane: 0 },
  { from: "dd2", to: "dd3", lane: 0 },
  { from: "dd3", to: "dd4", lane: 0 },
  { from: "dd4", to: "dd5", lane: 0 },
  { from: "dd2", to: "dd6", lane: 1 },
  { from: "dd6", to: "dd7", lane: 1 },
  { from: "dd7", to: "dd4", lane: 1 },
  { from: "dd3", to: "dd8", lane: 2 },
  { from: "dd8", to: "dd4", lane: 2 },
];
