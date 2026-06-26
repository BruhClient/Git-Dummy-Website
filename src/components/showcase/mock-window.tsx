export default function MockWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gd-border overflow-hidden shadow-2xl shadow-black/40">
      {/* OS title bar */}
      <div className="h-7 bg-[#1a1a1a] flex items-center px-3 border-b border-gd-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gd-accent opacity-80" />
        </div>
        <span className="flex-1 text-center text-[10px] text-gd-text-muted">
          Git Dummy v1.0.0
        </span>
        <div className="flex gap-3 text-gd-text-muted">
          <span className="text-[10px]">—</span>
          <span className="text-[10px]">□</span>
          <span className="text-[10px]">✕</span>
        </div>
      </div>
      <div className="bg-gd-bg-primary">{children}</div>
    </div>
  );
}
