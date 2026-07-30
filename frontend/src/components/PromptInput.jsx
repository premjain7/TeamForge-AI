import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { samplePrompts } from "../utils/mockData";

function PromptInput({ prompt, setPrompt, onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("✅ PromptInput: Submit button clicked");

    if (prompt && prompt.trim() && !loading) {
      console.log("📨 Prompt being submitted:", prompt);
      onSubmit(prompt);
    } else {
      console.log("❌ Submission blocked", {
        prompt,
        loading,
      });
    }
  };

  const handleChipClick = (sample) => {
    setPrompt(sample);
  };

  const isFormEmpty = !prompt || !prompt.trim();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl transition-all"
      >
        {/* Input Header */}
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="prompt-input"
            className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Project Specification Brief
          </label>

          <span className="text-[11px] text-slate-500 font-mono">
            {prompt ? prompt.length : 0} chars
          </span>
        </div>

        {/* Textarea */}
        <textarea
          id="prompt-input"
          rows={4}
          className="w-full bg-[#0B1120] text-slate-100 placeholder-slate-500 text-sm rounded-lg p-3.5 border border-slate-800 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/40 resize-none transition-all"
          placeholder="e.g. Build a launch-ready fintech web and mobile platform with bank-grade security, real-time transaction processing, and analytics dashboards..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />

        {/* Sample Prompt Chips */}
        <div className="mt-3">
          <span className="text-[11px] font-medium text-slate-400 block mb-2">
            Or select an example specification:
          </span>

          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                className="text-left text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-md px-2.5 py-1.5 transition-all truncate max-w-full"
                onClick={() => handleChipClick(sample)}
                disabled={loading}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
          <span className="text-[11px] text-slate-500">
            Press Shift + Enter for new lines
          </span>

          <button
            type="submit"
            disabled={isFormEmpty || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Processing AI Pipeline...</span>
              </>
            ) : (
              <>
                <span>Generate Project Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromptInput;