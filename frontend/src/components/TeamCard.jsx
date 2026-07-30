import { Star } from "lucide-react";

function TeamCard({ member }) {
  if (!member) return null;

  const { name, role, experience, hourlyRate, rating, availability, reason } = member;

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all">
      <div>
        {/* Member Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center justify-center">
              {name ? name.substring(0, 2).toUpperCase() : "TS"}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white leading-tight">{name}</h4>
              <span className="text-[11px] text-slate-400 block">{role}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
            {experience}
          </span>
          <span className="text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded">
            {hourlyRate}
          </span>
          <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
            {availability}
          </span>
        </div>

        {/* AI Rationale */}
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
            Match Rationale
          </span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
