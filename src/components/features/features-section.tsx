"use client";

import {
  GitBranch,
  GitMerge,
  Archive,
  GitPullRequest,
  FileDiff,
  Users,
  Eye,
  Palette,
} from "lucide-react";
import SectionWrapper from "@/components/section-wrapper";
import FeatureCard from "./feature-card";

const features = [
  {
    icon: GitBranch,
    title: "Visual Commit Graph",
    description:
      "See your entire project history as an interactive, color-coded graph with branches, merges, and lane-based layout.",
  },
  {
    icon: GitMerge,
    title: "Branch Management",
    description:
      "Create, checkout, merge, and delete branches with a click. No more memorising commands.",
  },
  {
    icon: Archive,
    title: "Smart Stash",
    description:
      "Auto-stash on checkout, save and apply stashes visually. Never lose uncommitted work again.",
  },
  {
    icon: GitPullRequest,
    title: "Pull Requests",
    description:
      "Open, review, and merge PRs directly from the app. Built-in conflict detection.",
  },
  {
    icon: FileDiff,
    title: "Diff Viewer",
    description:
      "See exactly what changed in every commit with color-coded additions, deletions, and modifications.",
  },
  {
    icon: Users,
    title: "Multi-Account",
    description:
      "Connect multiple GitHub accounts and switch between them instantly.",
  },
  {
    icon: Eye,
    title: "Collaborator View",
    description:
      "See who committed what with color-coded avatars and contribution tracking.",
  },
  {
    icon: Palette,
    title: "Warm Dark Theme",
    description:
      "A carefully crafted dark interface with warm terracotta accents that's easy on the eyes.",
  },
];

export default function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-gd-text-primary mb-4">
          Everything you need to master Git
        </h2>
        <p className="text-gd-text-secondary text-lg max-w-2xl mx-auto">
          A visual toolkit that makes Git approachable for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
