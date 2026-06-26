export default function DiffIllustration() {
  return (
    <div className="rounded-lg bg-gd-bg-primary p-3 font-mono text-xs leading-5 select-none">
      <div className="text-gd-text-muted">{"  const app = new App();"}</div>
      <div className="bg-red-900/20 text-gd-danger px-1 -mx-1 rounded-sm">
        {"- app.init(false);"}
      </div>
      <div className="bg-green-900/20 text-green-400 px-1 -mx-1 rounded-sm">
        {"+ app.init(true);"}
      </div>
      <div className="text-gd-text-muted">{"  app.start();"}</div>
    </div>
  );
}
