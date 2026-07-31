export default function FreelancerPortal({ onBack }) {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold mb-4">
        Freelancer Portal
      </h1>

      <p className="text-slate-400 mb-8">
        AI Verification page coming next...
      </p>

      <button
        onClick={onBack}
        className="bg-indigo-600 px-6 py-3 rounded-xl"
      >
        Back
      </button>

    </div>
  );
}