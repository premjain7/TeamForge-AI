function FeatureCard({ icon: Icon, title, description, badge }) {
  return (
    <article className="bg-[#111827] border border-slate-800/80 rounded-xl p-4.5 hover:border-slate-700/80 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
            {Icon && <Icon className="w-4 h-4" />}
          </div>
          {badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
    </article>
  );
}

export default FeatureCard;
