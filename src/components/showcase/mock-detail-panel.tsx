const FILES = [
  { name: "auth_flow.py", additions: 124, deletions: 3, bars: 6 },
  { name: "utils.py", additions: 45, deletions: 12, bars: 4 },
];

export default function MockDetailPanel() {
  return (
    <div className="w-72 bg-gd-bg-primary border-l border-gd-border p-4 flex flex-col overflow-hidden">
      {/* Close button */}
      <div className="flex justify-end mb-2">
        <span className="text-gd-text-muted text-xs cursor-default">✕</span>
      </div>

      {/* Author header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-[#54b09e] flex items-center justify-center text-white text-sm font-bold">
          T
        </div>
        <div>
          <div className="text-sm font-semibold text-gd-text-primary">Travis</div>
          <div className="text-[11px] text-gd-text-muted">main</div>
        </div>
      </div>

      {/* Field rows — label above, value below, separated by lines */}
      <div className="flex flex-col">
        <div className="py-2 border-t border-gd-border">
          <div className="text-[10px] text-gd-text-muted mb-0.5">Committed on</div>
          <div className="text-xs text-gd-text-primary">19 Mar 2026 13:50</div>
        </div>
        <div className="py-2 border-t border-gd-border">
          <div className="text-[10px] text-gd-text-muted mb-0.5">Branch</div>
          <div className="text-xs text-gd-text-primary font-medium">main</div>
        </div>
        <div className="py-2 border-t border-gd-border">
          <div className="text-[10px] text-gd-text-muted mb-0.5">Made by</div>
          <div className="text-xs text-gd-text-primary">Travis</div>
        </div>
        <div className="py-2 border-t border-gd-border">
          <div className="text-[10px] text-gd-text-muted mb-0.5">Description</div>
          <div className="text-xs text-gd-text-primary">Add auth flow</div>
        </div>
      </div>

      {/* Action buttons — full width, stacked */}
      <div className="flex flex-col gap-1.5 mt-3">
        <div className="bg-gd-accent text-white text-[11px] font-medium text-center py-2 rounded-lg">
          → Go to this snapshot
        </div>
        <div className="border border-gd-border text-gd-text-primary text-[11px] font-medium text-center py-2 rounded-lg">
          ✦ Create new branch
        </div>
        <div className="border border-gd-border text-gd-danger text-[11px] font-medium text-center py-2 rounded-lg">
          Hard Revert
        </div>
        <div className="border border-gd-border text-gd-text-secondary text-[11px] font-medium text-center py-2 rounded-lg">
          Soft Revert
        </div>
        <div className="border border-gd-border text-gd-text-secondary text-[11px] font-medium text-center py-2 rounded-lg">
          Merge into...
        </div>
      </div>

      {/* Changed files */}
      <div className="mt-3 border-t border-gd-border pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gd-text-muted">Changes | {FILES.length} files</span>
          <span className="text-[10px] text-gd-accent">View all →</span>
        </div>
        {FILES.map((f) => (
          <div key={f.name} className="flex items-center gap-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gd-info" />
            <span className="text-[10px] text-gd-text-secondary font-mono flex-1 truncate">
              {f.name}
            </span>
            <span className="text-[9px] text-green-400">+{f.additions}</span>
            <span className="text-[9px] text-gd-danger">-{f.deletions}</span>
            {/* Mini bar */}
            <div className="flex gap-px">
              {Array.from({ length: f.bars }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-2.5 rounded-sm ${
                    i < Math.ceil(f.bars * (f.additions / (f.additions + f.deletions)))
                      ? "bg-green-400"
                      : "bg-gd-danger"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
