import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PromptInput from "../components/PromptInput";
import FeatureGrid from "../components/FeatureGrid";
import Footer from "../components/Footer";

function Home({ prompt, setPrompt, onSubmit, loading, status, onReset }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 selection:bg-indigo-500/30">
      <Navbar status={status} onReset={onReset} />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8">
        <Hero />
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={onSubmit}
          loading={loading}
        />
        <FeatureGrid />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
