import { Cpu } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 mt-auto py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-300">TeamForge AI</span>
          <span>— Autonomous Project Architect</span>
        </div>
        <div>
          © 2026 TeamForge AI. Built for modern engineering teams.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
