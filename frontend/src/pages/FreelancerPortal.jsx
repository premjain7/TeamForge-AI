import { useState, useEffect } from "react";
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Github,
  Globe,
  Linkedin,
  Sparkles,
  X,
  User,
  Briefcase,
  FileText,
  AlertCircle,
  FileCheck2,
  Award,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  ShieldCheck,
  BarChart3,
  Loader2,
} from "lucide-react";
import Footer from "../components/Footer";

const AVAILABILITY_OPTIONS = [
  "Available Immediately",
  "Within 2 Weeks",
  "Within 1 Month",
  "Not Available",
];

const ROLE_OPTIONS = [
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Mobile Developer",
  "AI Engineer",
  "DevOps Engineer",
  "Data Scientist",
];

const ANALYZE_CARDS = [
  { icon: FileText, title: "Resume Analysis" },
  { icon: Github, title: "GitHub Repository Analysis" },
  { icon: ShieldCheck, title: "Skill Verification" },
  { icon: Briefcase, title: "Project Experience" },
  { icon: TrendingUp, title: "Technical Strengths" },
  { icon: Target, title: "Recommended Roles" },
  { icon: Globe, title: "Portfolio Review" },
  { icon: Award, title: "Experience Validation" },
  { icon: BarChart3, title: "Confidence Score" },
];

const VERIFICATION_STEPS = [
  "Uploading Resume",
  "Reading Resume",
  "Extracting Skills",
  "Analyzing GitHub",
  "Comparing Experience",
  "Building Technical Profile",
  "Generating AI Summary",
];

// Placeholder generator — swap this out for the real API response later.
// Keeping it as a pure function (not inline JSX) keeps the component
// ready for API integration: replace the call site with a fetch().
function generateVerificationResult({ formData, skills }) {
  return {
    status: "AI VERIFIED",
    confidenceScore: 92,
    overallRating: 4.6,
    technicalSummary:
      "Strong full-stack profile with consistent hands-on experience across modern web technologies. Demonstrates solid project delivery history and active open-source engagement.",
    verifiedSkills: skills.length ? skills : ["React", "Node.js"],
    experienceLevel:
      Number(formData.yearsExperience) >= 5
        ? "Senior"
        : Number(formData.yearsExperience) >= 2
        ? "Mid-Level"
        : "Junior",
    recommendedRoles: [formData.currentRole || "Full Stack Developer", "Frontend Developer"],
    topStrengths: ["Clean code practices", "Strong problem solving", "Fast delivery"],
    areasForImprovement: ["Test coverage", "Documentation depth"],
    githubSummary:
      "Active repository history with consistent commit activity and readable project structure.",
    resumeSummary:
      "Resume clearly outlines relevant experience, technologies used, and measurable project outcomes.",
    overallRecommendation:
      "Strong candidate for mid-to-senior level engineering roles on cross-functional teams.",
  };
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-indigo-400" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function RequiredMark() {
  return <span className="text-red-400 ml-0.5">*</span>;
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {message}
    </p>
  );
}

function Field({ label, required, error, ...props }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
        {label}
        {required && <RequiredMark />}
      </label>
      <input
        {...props}
        className={`w-full bg-[#0B1120] border rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-slate-800 focus:border-indigo-500/60"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function FreelancerPortal({ onBack }) {
  const [stage, setStage] = useState("form"); // 'form' | 'verifying' | 'result'

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    yearsExperience: "",
    currentRole: "",
    hourlyRate: "",
    availability: AVAILABILITY_OPTIONS[0],
    preferredRole: ROLE_OPTIONS[0],
    github: "",
    portfolio: "",
    linkedin: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [touched, setTouched] = useState({});
  const [verificationResult, setVerificationResult] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  function updateField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(key) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function addSkill() {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
    markTouched("skills");
  }

  function removeSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleFile(file) {
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    }
    markTouched("resume");
  }

  function removeResume() {
    setResumeFile(null);
  }

  // ---- Validation ----
  const errors = {
    fullName: !formData.fullName.trim() ? "Full name is required" : "",
    email: !formData.email.trim()
      ? "Email is required"
      : !/^\S+@\S+\.\S+$/.test(formData.email)
      ? "Enter a valid email"
      : "",
    yearsExperience: !formData.yearsExperience
      ? "Years of experience is required"
      : "",
    currentRole: !formData.currentRole.trim() ? "Current role is required" : "",
    skills: skills.length === 0 ? "Add at least one skill" : "",
    resume: !resumeFile ? "Resume upload is required" : "",
    github: !formData.github.trim() ? "GitHub profile URL is required" : "",
  };

  const isFormValid = Object.values(errors).every((e) => !e);

  function shownError(key) {
    return touched[key] ? errors[key] : "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      yearsExperience: true,
      currentRole: true,
      skills: true,
      resume: true,
      github: true,
    });
    if (!isFormValid) return;

    setStage("verifying");
    setStepIndex(0);
  }

  // Animate through verification steps, then produce the result.
  useEffect(() => {
    if (stage !== "verifying") return;

    if (stepIndex >= VERIFICATION_STEPS.length) {
      const result = generateVerificationResult({ formData, skills });
      setVerificationResult(result);
      setStage("result");
      return;
    }

    const timer = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, 450);

    return () => clearTimeout(timer);
  }, [stage, stepIndex]);

  // ---- Stage: Verifying ----
  if (stage === "verifying") {
    return (
      <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100">
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">
              Verifying Your Profile
            </h1>
            <p className="text-xs text-slate-500 mb-8">
              Our AI is analyzing your submission
            </p>

            <div className="space-y-2.5 text-left">
              {VERIFICATION_STEPS.map((step, i) => {
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <div
                    key={step}
                    className={`flex items-center gap-2.5 text-xs px-3 py-2 rounded-lg border transition-all ${
                      done
                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
                        : active
                        ? "border-indigo-500/30 bg-indigo-500/5 text-indigo-200"
                        : "border-slate-800/60 text-slate-600"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : active ? (
                      <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin flex-shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex-shrink-0" />
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ---- Stage: Result ----
  if (stage === "result" && verificationResult) {
    const r = verificationResult;
    return (
      <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100">
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/85 border-b border-slate-800/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2 py-1.5 rounded-lg transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="text-sm font-semibold text-white">TeamForge AI</span>
          </div>
        </header>

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-5">
          {/* Status header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              🟢 {r.status}
            </span>
            <h1 className="text-2xl font-bold text-white">AI Verified Profile</h1>
          </div>

          {/* Score row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 text-center">
              <p className="text-[11px] text-slate-500 mb-1">Confidence Score</p>
              <p className="text-3xl font-bold text-emerald-400">{r.confidenceScore}%</p>
            </div>
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 text-center">
              <p className="text-[11px] text-slate-500 mb-1">Overall Rating</p>
              <p className="text-3xl font-bold text-indigo-400">{r.overallRating} / 5</p>
            </div>
          </div>

          <Section icon={FileText} title="Technical Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{r.technicalSummary}</p>
          </Section>

          <Section icon={ShieldCheck} title="Verified Skills">
            <div className="flex flex-wrap gap-1.5">
              {r.verifiedSkills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Section icon={Briefcase} title="Experience Level">
              <p className="text-sm font-semibold text-white">{r.experienceLevel}</p>
            </Section>
            <Section icon={Target} title="Recommended Roles">
              <div className="flex flex-wrap gap-1.5">
                {r.recommendedRoles.map((role) => (
                  <span
                    key={role}
                    className="text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-1 rounded-md"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Section icon={TrendingUp} title="Top Strengths">
              <ul className="space-y-1.5">
                {r.topStrengths.map((s) => (
                  <li key={s} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
            <Section icon={BookOpen} title="Areas for Improvement">
              <ul className="space-y-1.5">
                {r.areasForImprovement.map((s) => (
                  <li key={s} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <Section icon={Github} title="GitHub Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{r.githubSummary}</p>
          </Section>

          <Section icon={FileCheck2} title="Resume Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{r.resumeSummary}</p>
          </Section>

          <section className="bg-[#111827] border border-indigo-500/30 rounded-xl p-5 sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Overall Recommendation
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">{r.overallRecommendation}</p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  // ---- Stage: Form ----
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 selection:bg-emerald-500/30">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/85 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2 py-1.5 rounded-lg transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-sm font-semibold text-white">TeamForge AI</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="text-center mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3 h-3" />
            AI-Powered Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Freelancer Verification Portal
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Create your AI-powered verified technical profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Basic Information */}
          <Section icon={User} title="Basic Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                required
                type="text"
                placeholder="e.g. Priya Sharma"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                onBlur={() => markTouched("fullName")}
                error={shownError("fullName")}
              />
              <Field
                label="Email"
                required
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => markTouched("email")}
                error={shownError("email")}
              />
              <Field
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <Field
                label="Location"
                type="text"
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
              <Field
                label="Years of Experience"
                required
                type="number"
                min="0"
                placeholder="e.g. 4"
                value={formData.yearsExperience}
                onChange={(e) => updateField("yearsExperience", e.target.value)}
                onBlur={() => markTouched("yearsExperience")}
                error={shownError("yearsExperience")}
              />
              <Field
                label="Current Role"
                required
                type="text"
                placeholder="e.g. Backend Developer"
                value={formData.currentRole}
                onChange={(e) => updateField("currentRole", e.target.value)}
                onBlur={() => markTouched("currentRole")}
                error={shownError("currentRole")}
              />
              <Field
                label="Hourly Rate ($)"
                type="number"
                min="0"
                placeholder="e.g. 25"
                value={formData.hourlyRate}
                onChange={(e) => updateField("hourlyRate", e.target.value)}
              />
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => updateField("availability", e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500/60 transition-colors"
                >
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          {/* Professional Information */}
          <Section icon={Briefcase} title="Professional Information">
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Skills
                  <RequiredMark />
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-emerald-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    onBlur={() => markTouched("skills")}
                    placeholder="Type a skill and press Enter"
                    className={`flex-1 bg-[#0B1120] border rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors ${
                      shownError("skills")
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-slate-800 focus:border-indigo-500/60"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
                  >
                    Add
                  </button>
                </div>
                <FieldError message={shownError("skills")} />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
                  Preferred Role
                </label>
                <select
                  value={formData.preferredRole}
                  onChange={(e) => updateField("preferredRole", e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500/60 transition-colors"
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          {/* Resume */}
          <Section icon={FileText} title="Resume">
            <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
              Resume Upload
              <RequiredMark />
            </label>

            {resumeFile ? (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <FileCheck2 className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-emerald-300">
                      ✓ Resume Uploaded Successfully
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {resumeFile.name} · {formatBytes(resumeFile.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <label className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200 cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-500/10 transition-all">
                    Replace
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="text-[11px] font-medium text-red-400 hover:text-red-300 px-2 py-1 rounded-md hover:bg-red-500/10 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  handleFile(e.dataTransfer.files[0]);
                }}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? "border-emerald-500/60 bg-emerald-500/5"
                    : shownError("resume")
                    ? "border-red-500/40"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFile(e.target.files[0])}
                  onBlur={() => markTouched("resume")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className="w-8 h-8 text-slate-500" />
                  <span className="text-xs font-medium text-slate-300">
                    Upload Resume (PDF)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    or drag & drop your resume here
                  </span>
                  <span className="text-[10px] text-slate-600 mt-1">Supported format: PDF only</span>
                </div>
              </div>
            )}
            <FieldError message={shownError("resume")} />
          </Section>

          {/* GitHub */}
          <Section icon={Github} title="GitHub">
            <Field
              label="GitHub Profile URL"
              required
              type="url"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={(e) => updateField("github", e.target.value)}
              onBlur={() => markTouched("github")}
              error={shownError("github")}
            />
            <div className="mt-3 text-[11px] text-slate-500 space-y-1">
              <p className="text-slate-400">
                Our AI will analyze your GitHub profile to identify:
              </p>
              <ul className="space-y-0.5 pl-3">
                <li>• Technologies used</li>
                <li>• Project complexity</li>
                <li>• Open source contributions</li>
                <li>• Development consistency</li>
                <li>• Areas of expertise</li>
              </ul>
            </div>
          </Section>

          {/* Portfolio */}
          <Section icon={Globe} title="Portfolio">
            <p className="text-[11px] text-slate-500 mb-3">Optional but recommended.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Portfolio Website"
                type="url"
                placeholder="https://yourdomain.com"
                value={formData.portfolio}
                onChange={(e) => updateField("portfolio", e.target.value)}
              />
              <Field
                label="LinkedIn Profile"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
              />
            </div>
          </Section>

          {/* What AI Will Analyze */}
          <section className="bg-[#111827] border border-indigo-500/30 rounded-xl p-5 sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              What AI Will Analyze
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ANALYZE_CARDS.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="bg-[#0B1120] border border-slate-800 rounded-lg p-3 flex flex-col items-start gap-2 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 leading-tight">
                    {title}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-4 text-center">
              This process usually takes less than 30 seconds.
            </p>
          </section>

          {/* Verify Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all ${
                isFormValid
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/10"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Verify with AI
            </button>
            <p className="text-[11px] text-slate-500 mt-3">
              Your information is securely processed and used only to generate your AI profile.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}