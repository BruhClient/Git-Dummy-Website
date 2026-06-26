// Caller: app-showcase.tsx. No API. No schema. User: "on smaller screens, i want a phone mock up"
export default function MockPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[280px] sm:w-[320px]">
      <div className="rounded-[2rem] border-[3px] border-[#3a3a3a] bg-black overflow-hidden shadow-2xl shadow-black/50">
        {/* Status bar */}
        <div className="h-7 bg-[#1a1a1a] flex items-center justify-between px-5">
          <span className="text-[9px] text-gd-text-muted font-medium">9:41</span>
          <div className="w-20 h-5 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2 border border-gd-text-muted rounded-sm relative">
              <div className="absolute inset-0.5 bg-gd-text-muted rounded-[1px]" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="bg-gd-bg-primary min-h-120">{children}</div>
        {/* Home indicator */}
        <div className="h-5 bg-[#1a1a1a] flex items-center justify-center">
          <div className="w-28 h-1 bg-gd-text-muted/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
