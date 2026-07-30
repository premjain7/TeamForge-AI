import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="text-center max-w-3xl mx-auto pt-6 pb-4 px-4">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Autonomous Project Scope & Team Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-3 leading-tight">
        Architect your project & assemble specialist teams in seconds
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Turn high-level application briefs into actionable technical requirements, budget allocations, sprint milestones, and candidate match fit.
      </p>
    </section>
  );
}

export default Hero;
