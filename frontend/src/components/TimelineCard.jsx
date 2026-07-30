import { Clock, Layers } from "lucide-react";

function TimelineCard({ timeline }) {
  if (!timeline) return null;

  const { duration, totalSprints, milestones = [] } = timeline;

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 hover:border-slate-700/80 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Estimated Duration
            </span>
            <div className="flex items-center gap-2 text-2xl font-bold text-blue-400">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>{duration}</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full">
            <Layers className="w-3 h-3" />
            {totalSprints} Sprints
          </span>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-200 block border-b border-slate-800/80 pb-2">
            Milestone Phases
          </span>

          <div className="space-y-3">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-indigo-500/40 text-indigo-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-semibold text-white truncate">{m.phase}</h5>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                      {m.weeks}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {m.deliverables.join(" • ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineCard;
