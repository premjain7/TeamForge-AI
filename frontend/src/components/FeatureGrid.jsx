import { Target, DollarSign, Calendar, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

function FeatureGrid() {
  const features = [
    {
      icon: Target,
      title: "Smart Role Breakdown",
      description: "Deconstructs complex project briefs into specific engineering, design, and security role requirements.",
      badge: "Requirements"
    },
    {
      icon: DollarSign,
      title: "Budget & Cost Forecasting",
      description: "Generates category-by-category cost breakdowns and total budget allocation tailored to project scale.",
      badge: "Financials"
    },
    {
      icon: Calendar,
      title: "Sprint Milestone Planning",
      description: "Establishes timeline phases, deliverable expectations, and deployment risk mitigations.",
      badge: "Timelines"
    },
    {
      icon: Users,
      title: "Curated Team Shortlist",
      description: "Matches role requirements against vetted specialist profiles with suitability rationale.",
      badge: "Team Fit"
    }
  ];

  return (
    <section id="features" className="w-full max-w-4xl mx-auto py-6">
      <div className="text-center mb-6">
        <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">
          Capabilities
        </h2>
        <p className="text-lg font-bold text-slate-100">
          Built for Founders & Engineering Leaders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feat, idx) => (
          <FeatureCard
            key={idx}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
            badge={feat.badge}
          />
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;
