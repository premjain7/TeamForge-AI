import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing({
  onSelectClient,
  onSelectFreelancer,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center">

          <h1 className="text-5xl font-bold mb-4">
            Welcome to TeamForge AI
          </h1>

          <p className="text-slate-400 mb-12 text-lg">
            Choose how you want to use TeamForge AI
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold mb-4">
                Client
              </h2>

              <p className="text-slate-400 mb-8">
                Build your project with AI and receive the perfect freelancer team.
              </p>

              <button
                onClick={onSelectClient}
                className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 font-semibold"
              >
                Continue as Client
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold mb-4">
                Freelancer
              </h2>

              <p className="text-slate-400 mb-8">
                Verify your technical profile using AI and get matched with projects.
              </p>

              <button
                onClick={onSelectFreelancer}
                className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-3 font-semibold"
              >
                Continue as Freelancer
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}