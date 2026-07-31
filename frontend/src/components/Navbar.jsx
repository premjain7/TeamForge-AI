import { Cpu, Plus, Sparkles, ArrowLeft } from "lucide-react";

function Navbar({ status, onReset, onBack, hideLinks = false }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2 py-1.5 rounded-lg transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <div
            onClick={status === "completed" ? onReset : undefined}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/30 transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                  TeamForge AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Ready
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                AI Project Architect
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links — hidden on Landing */}
        {!hideLinks && (
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#home" className="text-slate-200 hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#about" className="hover:text-slate-200 transition-colors">About</a>
          </nav>
        )}

        {/* Right Action */}
        <div className="flex items-center gap-3">
          {status === "completed" ? (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 px-2.5 py-1.5 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Engine v2.5</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;