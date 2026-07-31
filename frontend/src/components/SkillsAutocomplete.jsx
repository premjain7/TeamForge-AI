import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import SKILLS_LIST from "../data/skillsList";

const MAX_SKILLS = 15;

export default function SkillsAutocomplete({ skills, onChange, error, onBlur }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = SKILLS_LIST.filter(
    (s) =>
      s.toLowerCase().includes(query.toLowerCase()) &&
      !skills.includes(s) &&
      query.trim().length > 0
  ).slice(0, 8);

  function addSkill(skill) {
    if (skills.includes(skill) || skills.length >= MAX_SKILLS) return;
    onChange([...skills, skill]);
    setQuery("");
    setOpen(false);
  }

  function removeSkill(skill) {
    onChange(skills.filter((s) => s !== skill));
  }

  return (
    <div ref={containerRef} className="relative">
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

      <input
        type="text"
        value={query}
        disabled={skills.length >= MAX_SKILLS}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 150);
          onBlur && onBlur();
        }}
        placeholder={
          skills.length >= MAX_SKILLS
            ? "Maximum 15 skills reached"
            : "Start typing a skill (e.g. React)"
        }
        className={`w-full bg-[#0B1120] border rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors disabled:opacity-50 ${
          error ? "border-red-500/60 focus:border-red-500" : "border-slate-800 focus:border-indigo-500/60"
        }`}
      />

      {open && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-[#111827] border border-slate-700 rounded-lg shadow-xl overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                addSkill(s);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-200 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <p className="text-[10px] text-slate-600 mt-1.5">
        Only recognized technical skills can be added · {skills.length}/{MAX_SKILLS}
      </p>
    </div>
  );
}