import { useState, useEffect } from "react";
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Github,
  Globe,
  Sparkles,
  User,
  Briefcase,
  FileText,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Loader2,
} from "lucide-react";
import Footer from "../components/Footer";
import SkillsAutocomplete from "../components/SkillsAutocomplete";
import { registerFreelancer, summarizeFreelancer } from "../services/freelancerApi";

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

const SUMMARY_STEPS = [
  "Reading Resume",
  "Extracting Skills",
  "Analyzing GitHub",
  "Comparing Experience",
  "Building Professional Summary",
  "Generating Recommendation",
];

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
          error ? "border-red-500/60 focus:border-red-500" : "border-slate-800 focus:border-indigo-500/60"
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
  // 'form' | 'submitting' | 'submitted' | 'summarizing' | 'summary'
  const [stage, setStage] = useState("form");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    currentRole: "",
    availability: AVAILABILITY_OPTIONS[0],
    preferredRole: ROLE_OPTIONS[0],
    githubUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
  });

  const [skills, setSkills] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [savedFreelancer, setSavedFreelancer] = useState(null);
  const [summary, setSummary] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function updateField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(key) {
    setTouched((prev) => ({ ...prev, [key]: true }));
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

  const errors = {
    fullName: !formData.fullName.trim() ? "Full name is required" : "",
    email: !formData.email.trim()
      ? "Email is required"
      : !/^\S+@\S+\.\S+$/.test(formData.email)
      ? "Enter a valid email"
      : "",
    experience: !formData.experience ? "Years of experience is required" : "",
    currentRole: !formData.currentRole.trim() ? "Current role is required" : "",
    skills: skills.length === 0 ? "Add at least one skill" : "",
    resume: !resumeFile ? "Resume upload is required" : "",
    githubUrl: !formData.githubUrl.trim() ? "GitHub profile URL is required" : "",
  };

  const isFormValid = Object.values(errors).every((e) => !e);

  function shownError(key) {
    return touched[key] ? errors[key] : "";
  }

async function handleSubmitProfile(e) {
    e.preventDefault();
    setTouched({
      fullName: true, email: true, experience: true, currentRole: true,
      skills: true, resume: true, githubUrl: true,
    });
    if (!isFormValid) return;

    setSubmitError("");
    setStage("submitting");

    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("location", formData.location);
      fd.append("experience", formData.experience);
      fd.append("currentRole", formData.currentRole);
      fd.append("availability", formData.availability);
      fd.append("preferredRole", formData.preferredRole);
      fd.append("githubUrl", formData.githubUrl);
      fd.append("portfolioUrl", formData.portfolioUrl);
      fd.append("linkedinUrl", formData.linkedinUrl);
      fd.append("skills", skills.join(","));
      fd.append("resume", resumeFile);

      const res = await registerFreelancer(fd);
      setSavedFreelancer(res.freelancer);
      setSubmitSuccess(true);
      setStage("form");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
      setStage("form");
    }
  }

  function handleSummarizeClick() {
    setStage("summarizing");
    setStepIndex(0);
  }

  useEffect(() => {
    if (stage !== "summarizing") return;

    if (stepIndex >= SUMMARY_STEPS.length) {
      (async () => {
        try {
          const res = await summarizeFreelancer({
            fullName: formData.fullName,
            currentRole: formData.currentRole,
            experience: formData.experience,
            skills,
            githubUrl: formData.githubUrl,
          });
          setSummary(res.summary);
          setStage("summary");
        } catch (err) {
          setSubmitError(err.message || "Summarization failed. Please try again.");
          setStage("submitted");
        }
      })();
      return;
    }

    const timer = setTimeout(() => setStepIndex((i) => i + 1), 450);
    return () => clearTimeout(timer);
  }, [stage, stepIndex]);

  // ---- Stage: Submitting ----
  if (stage === "submitting") {
    return (
      <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100">
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Saving Your Profile</h1>
            <p className="text-xs text-slate-500">Uploading resume and creating your record</p>
          </div>
        </main>
      </div>
    );
  }

  // ---- Stage: Summarizing ----
  if (stage === "summarizing") {
    return (
      <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100">
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Generating AI Summary</h1>
            <p className="text-xs text-slate-500 mb-8">This usually takes a few seconds</p>

            <div className="space-y-2.5 text-left">
              {SUMMARY_STEPS.map((step, i) => {
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

  // ---- Stage: Summary ----
  if (stage === "summary" && summary) {
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
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              🟢 AI Verified
            </span>
            <h1 className="text-2xl font-bold text-white">AI Professional Summary</h1>
          </div>

          <Section icon={FileText} title="Professional Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{summary.professionalSummary}</p>
          </Section>

          <Section icon={FileText} title="Technical Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{summary.technicalSummary}</p>
          </Section>

          <Section icon={CheckCircle2} title="Verified Skills">
            <div className="flex flex-wrap gap-1.5">
              {summary.verifiedSkills.map((s) => (
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
            <Section icon={Target} title="Primary Domain">
              <p className="text-sm font-semibold text-white">{summary.primaryDomain}</p>
            </Section>
            <Section icon={Briefcase} title="Experience Level">
              <p className="text-sm font-semibold text-white">{summary.experienceLevel}</p>
            </Section>
          </div>

          <Section icon={Target} title="Recommended Roles">
            <div className="flex flex-wrap gap-1.5">
              {summary.recommendedRoles.map((role) => (
                <span
                  key={role}
                  className="text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-1 rounded-md"
                >
                  {role}
                </span>
              ))}
            </div>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Section icon={TrendingUp} title="Strengths">
              <ul className="space-y-1.5">
                {summary.strengths.map((s) => (
                  <li key={s} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
            <Section icon={BookOpen} title="Improvement Areas">
              <ul className="space-y-1.5">
                {summary.improvementAreas.map((s) => (
                  <li key={s} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <Section icon={Github} title="GitHub Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{summary.githubSummary}</p>
          </Section>

          <Section icon={FileCheck2} title="Resume Summary">
            <p className="text-xs text-slate-300 leading-relaxed">{summary.resumeSummary}</p>
          </Section>

          <section className="bg-[#111827] border border-indigo-500/30 rounded-xl p-5 sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Overall AI Recommendation
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">{summary.overallRecommendation}</p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  // ---- Stage: Submitted (profile saved, waiting for Summarize click) ----
  if (stage === "submitted" && savedFreelancer) {
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
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Profile Saved
            </span>
            <h1 className="text-2xl font-bold text-white">{savedFreelancer.fullName}</h1>
            <p className="text-sm text-slate-400 mt-1">{savedFreelancer.currentRole}</p>
          </div>

          <Section icon={CheckCircle2} title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {savedFreelancer.skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {savedFreelancer.resume && (
            <Section icon={FileCheck2} title="Resume">
              <p className="text-xs text-slate-300">
                ✓ Resume Uploaded Successfully — {savedFreelancer.resume.filename} ·{" "}
                {formatBytes(savedFreelancer.resume.size)} ·{" "}
                {new Date(savedFreelancer.resume.uploadedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </Section>
          )}

          {submitError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-lg px-4 py-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {submitError}
            </div>
          )}

          <div className="text-center pt-2">
            <button
              onClick={handleSummarizeClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/10 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Summarize with AI
            </button>
          </div>
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

        {submitError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-lg px-4 py-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmitProfile} className="space-y-5" noValidate>
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
                value={formData.experience}
                onChange={(e) => updateField("experience", e.target.value)}
                onBlur={() => markTouched("experience")}
                error={shownError("experience")}
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

          <Section icon={Briefcase} title="Skills">
            <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
              Skills
              <RequiredMark />
            </label>
            <SkillsAutocomplete
              skills={skills}
              onChange={setSkills}
              error={shownError("skills")}
              onBlur={() => markTouched("skills")}
            />
          </Section>

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
                      {resumeFile.name} · {formatBytes(resumeFile.size)} · Uploaded at{" "}
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <label className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200 cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-500/10 transition-all">
                    Replace Resume
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
                    Remove Resume
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
                  <span className="text-xs font-medium text-slate-300">Upload Resume</span>
                  <span className="text-[11px] text-slate-500">or drag & drop your resume here</span>
                  <span className="text-[10px] text-slate-600 mt-1">PDF only</span>
                </div>
              </div>
            )}
            <FieldError message={shownError("resume")} />
          </Section>

          <Section icon={Github} title="GitHub">
            <Field
              label="GitHub Profile URL"
              required
              type="url"
              placeholder="https://github.com/username"
              value={formData.githubUrl}
              onChange={(e) => updateField("githubUrl", e.target.value)}
              onBlur={() => markTouched("githubUrl")}
              error={shownError("githubUrl")}
            />
          </Section>

          <Section icon={Globe} title="Portfolio">
            <p className="text-[11px] text-slate-500 mb-3">Optional but recommended.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Portfolio Website"
                type="url"
                placeholder="https://yourdomain.com"
                value={formData.portfolioUrl}
                onChange={(e) => updateField("portfolioUrl", e.target.value)}
              />
              <Field
                label="LinkedIn Profile"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedinUrl}
                onChange={(e) => updateField("linkedinUrl", e.target.value)}
              />
            </div>
          </Section>

          <div className="text-center pt-2 space-y-3">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all ${
                isFormValid
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/10"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
              }`}
            >
              Submit Profile
            </button>
            <p className="text-[11px] text-slate-500">
              Submit your profile first — "Summarize with AI" unlocks after your profile is saved.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}