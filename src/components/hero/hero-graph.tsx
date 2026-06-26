"use client";

import { motion } from "framer-motion";
import {
  heroNodes,
  heroEdges,
  computeSpinePath,
  computeElbowPath,
  computeArrowPoints,
  getElbowCorner,
  classifyEdge,
} from "@/lib/graph-data";
import { laneColor, COLORS } from "@/lib/colors";

const NODE_R = 10;
const START_R = 14;
const FLAG_HEIGHT = 18;

export default function HeroGraph() {
  const nodeMap = new Map(heroNodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 620 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full max-w-[620px]"
      role="img"
      aria-label="Animated commit graph showing branches and merges"
    >
      {/* Edges */}
      {heroEdges.map((edge, index) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;

        const edgeType = classifyEdge(edge, nodeMap);

        if (edgeType === "spine") {
          return (
            <motion.path
              key={`${edge.from}-${edge.to}`}
              d={computeSpinePath(from, to)}
              stroke={laneColor(edge.lane)}
              strokeWidth={2}
              strokeOpacity={0.63}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            />
          );
        }

        if (edgeType === "branch-off") {
          return (
            <motion.path
              key={`${edge.from}-${edge.to}`}
              d={computeElbowPath(from, to, "LR")}
              stroke={laneColor(edge.lane)}
              strokeWidth={1.5}
              strokeOpacity={0.55}
              strokeDasharray="6 4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            />
          );
        }

        if (edgeType === "merge") {
          const corner = getElbowCorner(from, to, "LR");
          const arrowPts = computeArrowPoints(to, corner, 7);
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <motion.path
                d={computeElbowPath(from, to, "LR")}
                stroke="white"
                strokeWidth={1.5}
                strokeOpacity={0.55}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              />
              {arrowPts && (
                <motion.polygon
                  points={arrowPts}
                  fill={laneColor(edge.lane)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.4 }}
                />
              )}
            </g>
          );
        }

        return null;
      })}

      {/* Nodes */}
      {heroNodes.map((node, index) => {
        const r = node.isStart ? START_R : NODE_R;
        const color = laneColor(node.lane);

        return (
          <g key={node.id}>
            {/* Flag pole + flag for start nodes */}
            {node.isStart && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.06 }}
              >
                <line
                  x1={node.x}
                  y1={node.y - r - 2}
                  x2={node.x}
                  y2={node.y - r - 2 - FLAG_HEIGHT}
                  stroke={color}
                  strokeWidth={2}
                />
                <polygon
                  points={`${node.x},${node.y - r - 2 - FLAG_HEIGHT} ${node.x + 9},${node.y - r - 2 - FLAG_HEIGHT + 8} ${node.x},${node.y - r - 2 - FLAG_HEIGHT + 15}`}
                  fill={color}
                />
              </motion.g>
            )}

            {/* HEAD ring — red danger color */}
            {node.isHead && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={NODE_R + 5}
                fill="none"
                stroke={COLORS.danger}
                strokeWidth={2.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3 + index * 0.06,
                  type: "spring",
                  stiffness: 300,
                }}
              />
            )}

            {/* Main node circle with white border */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={color}
              stroke="white"
              strokeWidth={1.5}
              strokeOpacity={0.47}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.3 + index * 0.06,
                type: "spring",
                stiffness: 300,
              }}
            />
          </g>
        );
      })}

      {/* Branch labels — positioned to the right of tip nodes */}
      {heroNodes
        .filter((node) => node.label)
        .map((node, index) => {
          const color = laneColor(node.lane);
          const labelText = node.label!;
          const charWidth = 6.6;
          const paddingX = 10;
          const pillWidth = labelText.length * charWidth + paddingX * 2;
          const pillHeight = 22;
          const r = node.isStart ? START_R : NODE_R;
          const offsetX = r + 8;

          return (
            <motion.g
              key={`label-${node.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6 + index * 0.12,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <rect
                x={node.x + offsetX}
                y={node.y - pillHeight / 2}
                width={pillWidth}
                height={pillHeight}
                rx={pillHeight / 2}
                fill={color}
                fillOpacity={0.11}
                stroke={color}
                strokeOpacity={0.63}
                strokeWidth={1}
              />
              <text
                x={node.x + offsetX + pillWidth / 2}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={color}
                fontSize={11}
                fontWeight={500}
                fontFamily="var(--font-body)"
              >
                {labelText}
              </text>
            </motion.g>
          );
        })}
    </svg>
  );
}
