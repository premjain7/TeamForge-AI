import { 
  Sparkles, 
  Printer, 
  RotateCcw, 
  Users, 
  DollarSign, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Brain, 
  Terminal, 
  Layers, 
  Check, 
  AlertTriangle 
} from "lucide-react";
import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";
import BudgetCard from "../components/BudgetCard";
import TimelineCard from "../components/TimelineCard";
import Footer from "../components/Footer";

function Dashboard({ data, onReset }) {
  if (!data) return null;

const {
  project = {},
  requirements = {},
} = data;

const executiveSummary = data.executiveSummary || {
  overview: "Executive summary will be generated after all AI agents are implemented.",
  complexity: project.complexity || "Medium",
  estimatedTeamSize: requirements.roles?.length || 0,
  estimatedBudget: "Not Available",
  estimatedTimeline: project.estimatedDuration || "Not Available",
  keyRecommendation: "Requirement analysis completed successfully.",
  biggestRisk: "Budget, timeline and risk analysis are not available yet."
};

const recommendedTeam = data.recommendedTeam || [];

const budget = data.budget || {
  total: "Not Available",
  breakdown: []
};

const timeline = data.timeline || {
  phases: []
};

const reasoning = data.reasoning || [
  "Requirement analysis completed.",
  "Budget agent not implemented yet.",
  "Timeline agent not implemented yet.",
  "Matching agent not implemented yet."
];

const risks = data.risks || [];

const safeRequirements = {
  roles: requirements.roles || [],
  skills: requirements.skills || [],
  technologies: requirements.technologies || []
};

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 selection:bg-indigo-500/30">
      <Navbar status="completed" onReset={onReset} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Report Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Project Blueprint
              </span>
              <span className="text-xs text-slate-500">• Confidential</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {project.title}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        {/* 1. EXECUTIVE SUMMARY (Visual Highlight Banner) */}
        <section className="bg-[#111827] border border-indigo-500/30 rounded-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Brain className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-200">
                AI Executive Summary
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full font-mono">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Confidence: 98.4%</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
            {executiveSummary.overview}
          </p>

          {/* Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#0B1120] border border-slate-800 rounded-lg mb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Complexity
              </span>
              <span className="text-sm font-bold text-rose-400 mt-0.5 block">
                {executiveSummary.complexity}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Team Size
              </span>
              <span className="text-sm font-bold text-slate-100 mt-0.5 block">
                {executiveSummary.estimatedTeamSize}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Est. Budget
              </span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                {executiveSummary.estimatedBudget}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Timeline
              </span>
              <span className="text-sm font-bold text-blue-400 mt-0.5 block">
                {executiveSummary.estimatedTimeline}
              </span>
            </div>
          </div>

          {/* Key Recommendation & Primary Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-900/80 border border-indigo-500/20 rounded-lg p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Key Recommendation
              </span>
              <p className="text-xs text-slate-300 leading-snug">
                {executiveSummary.keyRecommendation}
              </p>
            </div>
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-lg p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Primary Risk Factor
              </span>
              <p className="text-xs text-slate-300 leading-snug">
                {executiveSummary.biggestRisk}
              </p>
            </div>
          </div>
        </section>

        {/* 2. PROJECT OVERVIEW */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Project Scope Overview
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="text-slate-500 font-medium w-28">Project Type:</span>
              <span className="text-slate-200 font-semibold">{project.type}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="text-slate-500 font-medium w-28">Complexity Level:</span>
              <span className="text-slate-200 font-semibold">{project.complexity}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 pt-1">
              <span className="text-slate-500 font-medium w-28 flex-shrink-0">Parsed Scope:</span>
              <p className="text-slate-300 leading-relaxed">{project.summary}</p>
            </div>
          </div>
        </section>

        {/* 3 & 4. REQUIRED TEAM + TECH STACK (Two-column grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Required Team Roles */}
          <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Required Specialist Roles
            </h2>
            <div className="flex flex-wrap gap-2">
              {safeRequirements.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-md"
                >
                  {role}
                </span>
              ))}
            </div>
          </section>

          {/* Technology Stack & Skills */}
          <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Technology Stack & Competencies
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1.5">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {safeRequirements.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs font-mono bg-slate-900 text-slate-200 border border-slate-800 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1.5">
                  Core Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {safeRequirements.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Recommended Team Composition */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Recommended Team Profiles
            </h2>
            <span className="text-[11px] text-slate-500">4 Specialists Curated</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* 5 & 6. BUDGET + TIMELINE (Two-column grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <BudgetCard budget={budget} />
          <TimelineCard timeline={timeline} />
        </div>

        {/* 7. AI REASONING */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            AI Architectural Reasoning
          </h2>
          <div className="space-y-2">
            {reasoning.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8. RISKS & RECOMMENDATIONS */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Risk Assessment & Mitigation Strategies
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-2.5 pr-4">Risk Factor</th>
                  <th className="pb-2.5 px-4">Severity</th>
                  <th className="pb-2.5 px-4">Impact</th>
                  <th className="pb-2.5 pl-4">Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {risks.map((item, idx) => (
                  <tr key={idx} className="text-slate-300">
                    <td className="py-3 pr-4 font-semibold text-white">{item.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.severity === "High"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : item.severity === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{item.impact}</td>
                    <td className="py-3 pl-4 text-slate-300">{item.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
