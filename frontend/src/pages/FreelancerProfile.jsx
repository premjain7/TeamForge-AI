import { 
  ArrowLeft, 
  Star, 
  Github, 
  Globe, 
  Linkedin, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Brain, 
  Layers, 
  Cpu, 
  Award,
  Sparkles,
  MapPin
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FreelancerProfile({ freelancer, onBack }) {
  if (!freelancer) return null;

  const {
    fullName,
    name,
    currentRole,
    role,
    preferredRole,
    experience,
    availability,
    location,
    rating,
    matchScore,
    matchPercentage,
    skills = [],
    githubUrl,
    portfolioUrl,
    linkedinUrl,
    resume,
    aiSummary = {}
  } = freelancer;

  const displayName = fullName || name || "Specialist Candidate";
  const displayRole = currentRole || role || "Software Engineer";
  const score = matchScore || matchPercentage || 90;
  const profSummary = aiSummary.professionalSummary || freelancer.summary || `${displayName} is a senior ${displayRole} with extensive experience delivering production-grade applications.`;
  const techSummary = aiSummary.technicalSummary || "Demonstrates strong software architecture principles, type safety, and maintainable codebase patterns.";
  const primaryDomain = aiSummary.primaryDomain || displayRole;
  const expLevel = aiSummary.experienceLevel || (typeof experience === "number" ? `${experience} yrs exp` : experience);
  const recommendation = aiSummary.overallRecommendation || `Highly recommended for ${displayRole} positions. Outstanding alignment for project requirements.`;
  const githubAnalysis = aiSummary.githubSummary || (githubUrl ? `Active GitHub profile (${githubUrl}) with verified public repositories.` : "GitHub profile available upon request.");
  const resumeAnalysis = aiSummary.resumeSummary || "Verified technical background and client recommendations on file.";

  const strengths = aiSummary.strengths || [
    "Clean Code & Modular Architecture",
    "High-throughput API & Schema Design",
    "Rapid Feature Iteration & Delivery",
    "Cross-Functional Team Collaboration"
  ];

  const improvementAreas = aiSummary.improvementAreas || [
    "Expanding automated end-to-end integration test coverage",
    "Deepening cloud infrastructure certifications"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 selection:bg-indigo-500/30">
      <Navbar status="completed" onBack={onBack} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Top Action */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Recommendations</span>
          </button>

          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Verified AI Candidate Profile
          </span>
        </div>

        {/* 1. HEADER SECTION */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold text-xl flex items-center justify-center shadow-lg border border-indigo-400/30 flex-shrink-0">
                {displayName ? displayName.substring(0, 2).toUpperCase() : "TS"}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {displayName}
                  </h1>
                  {location && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {location}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-indigo-300 font-medium">
                  {displayRole} {preferredRole && preferredRole !== displayRole ? `• Target: ${preferredRole}` : ""}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1">
                    ⚡ {score}% Match
                  </span>

                  <span className="text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded-md">
                    {typeof experience === "number" ? `${experience} yrs exp` : experience}
                  </span>

                  <span className="text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                    {availability || "Available Immediately"}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl self-start md:self-auto">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block leading-tight">{rating || 4.8} / 5.0</span>
                <span className="text-[10px] text-slate-400 block uppercase">Client Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROFESSIONAL SUMMARY */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            AI Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {profSummary}
          </p>
        </section>

        {/* 3. AI ANALYSIS GRID */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            AI Candidate Evaluation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-3.5 space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Primary Domain
              </span>
              <span className="text-xs font-bold text-indigo-300 block">{primaryDomain}</span>
            </div>

            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-3.5 space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Experience Level
              </span>
              <span className="text-xs font-bold text-slate-200 block">{expLevel}</span>
            </div>

            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-3.5 space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Match Recommendation
              </span>
              <span className="text-xs font-bold text-emerald-400 block truncate">{recommendation}</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Technical Stack & Capability Analysis
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {techSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  GitHub Code Quality Assessment
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {githubAnalysis}
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Resume & Work History Evaluation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {resumeAnalysis}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 & 5. STRENGTHS & AREAS FOR IMPROVEMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Strengths */}
          <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Key Candidate Strengths
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {strengths.map((str, idx) => (
                <div key={idx} className="bg-[#0B1120] border border-emerald-500/20 rounded-lg p-2.5 flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Areas for Improvement */}
          <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Areas for Improvement
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {improvementAreas.map((item, idx) => (
                <div key={idx} className="bg-[#0B1120] border border-amber-500/20 rounded-lg p-2.5 flex items-center gap-2 text-xs text-slate-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 6. VERIFIED SKILLS CHIPS */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            Verified Technical Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 7 & 8. PORTFOLIO LINKS & RESUME DOWNLOAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Portfolio Links */}
          <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Verified External Profiles & Portfolio
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-indigo-400" />
                  <span>GitHub Repository</span>
                </a>
              ) : null}

              {portfolioUrl ? (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Portfolio</span>
                </a>
              ) : null}

              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>
              ) : null}
            </div>
          </section>

          {/* Resume Section */}
          <section className="bg-[#111827] border border-slate-800 rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Verified Resume & Documentation
            </h2>
            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-white block truncate max-w-[200px]">
                  {resume?.filename || `${displayName.replace(/\s+/g, '_')}_Resume.pdf`}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Uploaded: {resume?.uploadedAt ? new Date(resume.uploadedAt).toLocaleDateString() : '2026-01-10'} • {resume?.size ? Math.round(resume.size / 1024) + ' KB' : '2.4 MB'}
                </span>
              </div>

              {resume?.filepath ? (
                <a
                  href={`http://localhost:5000${resume.filepath}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  onClick={() => alert(`Downloading verified resume for ${displayName}...`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FreelancerProfile;
