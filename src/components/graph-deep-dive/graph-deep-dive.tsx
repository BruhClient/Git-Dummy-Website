"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  deepDiveNodes,
  deepDiveEdges,
  computeSpinePath,
  computeElbowPath,
  computeArrowPoints,
  getElbowCorner,
  classifyEdge,
  type GraphNode,
} from "@/lib/graph-data";
import { laneColor, COLORS } from "@/lib/colors";
import OrientationToggle from "./orientation-toggle";

const NODE_R = 10;
const START_R = 14;
const FLAG_HEIGHT = 18;

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

function getFlagPolePoints(
  cx: number,
  cy: number,
  r: number,
  orient: string
): { x1: number; y1: number; x2: number; y2: number; flagPoints: string } {
  if (orient === "LR" || orient === "RL") {
    const bottom = cy - r - 2;
    const top = bottom - FLAG_HEIGHT;
    return {
      x1: cx, y1: bottom, x2: cx, y2: top,
      flagPoints: `${cx},${top} ${cx + 9},${top + 8} ${cx},${top + 15}`,
    };
  } else if (orient === "TB") {
    const right = cx - r - 2;
    const left = right - FLAG_HEIGHT;
    return {
      x1: right, y1: cy, x2: left, y2: cy,
      flagPoints: `${left},${cy} ${left + 8},${cy + 9} ${left + 15},${cy}`,
    };
  } else {
    const left = cx + r + 2;
    const right = left + FLAG_HEIGHT;
    return {
      x1: left, y1: cy, x2: right, y2: cy,
      flagPoints: `${right},${cy} ${right - 8},${cy - 9} ${right - 15},${cy}`,
    };
  }
}

export default function GraphDeepDive() {
  const [orientation, setOrientation] = useState("LR");

  const nodeMap = new Map<string, GraphNode>();
  deepDiveNodes.forEach((n) => {
    const pos = n.positions[orientation];
    nodeMap.set(n.id, { ...n, x: pos.x, y: pos.y });
  });

  return (
    <section className="py-12 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gd-text-primary mb-4">
            Four ways to view your graph
          </h2>
          <p className="text-gd-text-secondary max-w-lg mx-auto">
            Switch between orientations to find the layout that fits your
            workflow.
          </p>
        </div>

        <OrientationToggle
          options={["LR", "RL", "TB", "BT"]}
          value={orientation}
          onChange={setOrientation}
        />

        <div className="bg-gd-bg-card border border-gd-border rounded-xl p-6 mt-6 overflow-hidden">
          <svg
            viewBox="0 0 600 400"
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Edges */}
            {deepDiveEdges.map((edge) => {
              const fromNode = deepDiveNodes.find((n) => n.id === edge.from);
              const toNode = deepDiveNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              const from = fromNode.positions[orientation];
              const to = toNode.positions[orientation];

              const edgeType = classifyEdge(edge, nodeMap);

              if (edgeType === "spine") {
                return (
                  <motion.path
                    key={`${edge.from}-${edge.to}`}
                    stroke={laneColor(edge.lane)}
                    strokeWidth={2}
                    strokeOpacity={0.63}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ d: computeSpinePath(from, to) }}
                    transition={spring}
                  />
                );
              }

              if (edgeType === "branch-off") {
                return (
                  <motion.path
                    key={`${edge.from}-${edge.to}`}
                    stroke={laneColor(edge.lane)}
                    strokeWidth={1.5}
                    strokeOpacity={0.55}
                    strokeDasharray="6 4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ d: computeElbowPath(from, to, orientation) }}
                    transition={spring}
                  />
                );
              }

              if (edgeType === "merge") {
                const corner = getElbowCorner(from, to, orientation);
                const arrowPts = computeArrowPoints(to, corner, 7);
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <motion.path
                      stroke="white"
                      strokeWidth={1.5}
                      strokeOpacity={0.55}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={{ d: computeElbowPath(from, to, orientation) }}
                      transition={spring}
                    />
                    {arrowPts && (
                      <motion.polygon
                        fill={laneColor(edge.lane)}
                        initial={false}
                        animate={{ points: arrowPts }}
                        transition={spring}
                      />
                    )}
                  </g>
                );
              }

              return null;
            })}

            {/* Nodes */}
            {deepDiveNodes.map((node) => {
              const pos = node.positions[orientation];
              const r = node.isStart ? START_R : NODE_R;
              const color = laneColor(node.lane);

              return (
                <g key={node.id}>
                  {/* Flag pole for start nodes */}
                  {node.isStart && (() => {
                    const fp = getFlagPolePoints(pos.x, pos.y, r, orientation);
                    return (
                      <>
                        <motion.line
                          stroke={color}
                          strokeWidth={2}
                          initial={false}
                          animate={{ x1: fp.x1, y1: fp.y1, x2: fp.x2, y2: fp.y2 }}
                          transition={spring}
                        />
                        <motion.polygon
                          fill={color}
                          initial={false}
                          animate={{ points: fp.flagPoints }}
                          transition={spring}
                        />
                      </>
                    );
                  })()}

                  {/* HEAD ring — red */}
                  {node.isHead && (
                    <motion.circle
                      r={NODE_R + 5}
                      fill="none"
                      stroke={COLORS.danger}
                      strokeWidth={2.5}
                      initial={false}
                      animate={{ cx: pos.x, cy: pos.y }}
                      transition={spring}
                    />
                  )}

                  {/* Node circle with white border */}
                  <motion.circle
                    r={r}
                    fill={color}
                    stroke="white"
                    strokeWidth={1.5}
                    strokeOpacity={0.47}
                    initial={false}
                    animate={{ cx: pos.x, cy: pos.y }}
                    transition={spring}
                  />

                  {/* Branch label pill — right of node */}
                  {node.label && (() => {
                    const pillW = node.label.length * 7 + 20;
                    const pillH = 22;
                    const isHorizontal = orientation === "LR" || orientation === "RL";
                    const offsetX = isHorizontal ? r + 8 : -pillW / 2;
                    const offsetY = isHorizontal ? -pillH / 2 : -(r + 8 + pillH);
                    return (
                      <motion.g
                        initial={false}
                        animate={{ x: pos.x + offsetX, y: pos.y + offsetY }}
                        transition={spring}
                      >
                        <rect
                          x={0}
                          y={0}
                          width={pillW}
                          height={pillH}
                          rx={pillH / 2}
                          fill={color}
                          fillOpacity={0.11}
                          stroke={color}
                          strokeOpacity={0.63}
                          strokeWidth={1}
                        />
                        <text
                          x={pillW / 2}
                          y={pillH / 2}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={color}
                          fontSize={11}
                          fontWeight={500}
                          fontFamily="var(--font-body)"
                        >
                          {node.label}
                        </text>
                      </motion.g>
                    );
                  })()}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
