import { DollarSign, CheckCircle2 } from "lucide-react";

function BudgetCard({ budget }) {
  if (!budget) return null;

  const {
    formattedTotal = budget.total || "Not Available",
    breakdown = [],
  } = budget;

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 hover:border-slate-700/80 transition-all h-full flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Estimated Investment
            </span>

            <div className="flex items-center gap-1 text-2xl font-bold text-emerald-400">
              <DollarSign className="w-6 h-6 -mr-1" />
              <span>{String(formattedTotal).replace("$", "")}</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Cost Optimized
          </span>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-200 block border-b border-slate-800/80 pb-2">
            Allocation Breakdown
          </span>

          {breakdown.length > 0 ? (
            breakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">
                    {item.category}
                  </span>

                  <span className="text-slate-400 font-mono">
                    ${Number(item.amount || 0).toLocaleString()} (
                    {item.percentage || 0}%)
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                    style={{ width: `${item.percentage || 0}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 italic">
              Budget breakdown will be available after the Budget AI agent is
              implemented.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;