export default function MockSidebar() {
  return (
    <div className="w-44 border-r border-gd-border p-3 flex flex-col gap-3">
      {/* "Where you are now" card */}
      <div className="bg-gd-bg-card border border-gd-border rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-gd-accent" />
          <span className="text-[10px] text-gd-text-secondary font-medium">Where you are now</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#54b09e] flex items-center justify-center text-[8px] text-white font-bold">
            T
          </div>
          <div>
            <div className="text-[9px] text-gd-text-muted">Made by</div>
            <div className="text-[10px] text-gd-text-primary font-medium">Travis</div>
          </div>
        </div>

        <div className="mb-1.5">
          <div className="text-[9px] text-gd-text-muted">Description</div>
          <div className="text-[10px] text-gd-text-primary font-semibold">Initial commit</div>
        </div>

        <div className="mb-1.5">
          <div className="text-[9px] text-gd-text-muted">Branch</div>
          <div className="text-[10px] text-gd-text-primary">main</div>
        </div>

        <div className="mb-3">
          <div className="text-[9px] text-gd-text-muted">ID</div>
          <div className="text-[10px] text-gd-text-primary font-mono">ede829f</div>
        </div>

        <div className="bg-gd-accent text-white text-[10px] font-medium text-center py-1.5 rounded-md">
          Find on timeline →
        </div>
      </div>
    </div>
  );
}
