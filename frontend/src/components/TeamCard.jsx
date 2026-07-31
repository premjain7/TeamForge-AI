import { Star, Github, Globe, CheckCircle2, UserCheck } from "lucide-react";

function TeamCard({ member, onHire, estimatedBudget, projectId, projectTitle }) {
  if (!member) return null;

  const {
    id,
    name,
    fullName,
    role,
    currentRole,
    experience,
    skills = [],
    availability,
    summary,
    reason,
    githubUrl,
    portfolioUrl,
    rating,
    matchScore,
    matchPercentage
  } = member;

  const displayName = fullName || name || "Specialist";
  const displayRole = currentRole || role || "Developer";
  const score = matchScore || matchPercentage || 85;
  const aiSummaryText = summary || reason || "Top matched freelancer for this role.";

  const handleHireClick = () => {
    const hirePayload = {
      projectId: projectId || `proj_${Date.now()}`,
      projectTitle: projectTitle || "AI Project Analysis",
      freelancerId: id,
      freelancerName: displayName,
      freelancerRole: displayRole,
      matchScore: score,
      estimatedBudget: estimatedBudget || "$28,500"
    };

    localStorage.setItem("teamforge_selected_hire", JSON.stringify(hirePayload));

    if (onHire) {
      onHire(hirePayload);
    }
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md">
      <div>
        {/* Member Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {displayName ? displayName.substring(0, 2).toUpperCase() : "TS"}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white leading-tight">{displayName}</h4>
              <span className="text-[11px] text-slate-400 block">{displayRole}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-semibold flex-shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{rating || 4.8}</span>
          </div>
        </div>

        {/* Badges: Match % & Availability & Experience */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded">
            ⚡ {score}% Match
          </span>
          <span className="text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
            {typeof experience === "number" ? `${experience} yrs exp` : experience}
          </span>
          <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
            {availability || "Available"}
          </span>
        </div>

        {/* Skills List */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Links: GitHub & Portfolio */}
        <div className="flex items-center gap-3 mb-3 text-[11px]">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          ) : null}

          {portfolioUrl ? (
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </a>
          ) : null}
        </div>

        {/* AI Summary */}
        <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg p-2.5 mb-3">
          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
            AI Summary
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {aiSummaryText}
          </p>
        </div>
      </div>

      {/* Hire Button */}
      <button
        type="button"
        onClick={handleHireClick}
        className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all cursor-pointer"
      >
        <UserCheck className="w-3.5 h-3.5" />
        <span>Hire Freelancer</span>
      </button>
    </div>
  );
}

export default TeamCard;
