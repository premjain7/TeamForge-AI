import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Circle, Cpu } from "lucide-react";

function LoadingSpinner() {
  const pipelineSteps = [
    { label: "Understanding project scope & intent" },
    { label: "Extracting core technical requirements" },
    { label: "Matching specialist role profiles" },
    { label: "Estimating budget breakdown" },
    { label: "Planning sprint milestone timeline" },
    { label: "Generating executive report" }
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < pipelineSteps.length - 1 ? prev + 1 : prev));
    }, 350);

    return () => clearInterval(interval);
  }, [pipelineSteps.length]);

  return (
    <div className="w-full max-w-md mx-auto my-8 bg-[#111827] border border-slate-800 rounded-xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">AI Planning Pipeline</h3>
          <p className="text-xs text-slate-400">Synthesizing project requirements...</p>
        </div>
      </div>

      {/* Pipeline Steps List */}
      <div className="space-y-3">
        {pipelineSteps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                isCurrent
                  ? "text-indigo-300 font-medium translate-x-1"
                  : isDone
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-700" />
                )}
              </div>
              <span className="truncate">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span>Step {Math.min(activeStep + 1, pipelineSteps.length)} of {pipelineSteps.length}</span>
        <span className="font-mono">{Math.round(((activeStep + 1) / pipelineSteps.length) * 100)}%</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
