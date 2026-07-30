import useProject from "./hooks/useProject";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/globals.css";

function App() {
  const {
    prompt,
    setPrompt,
    loading,
    status,
    analysisData,
    analyzeProject,
    resetAnalysis
  } = useProject();

  // App view routing driven by hook state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 selection:bg-indigo-500/30">
        <Navbar status={status} onReset={resetAnalysis} />
        <main className="flex-1 flex items-center justify-center p-4">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (status === "completed" && analysisData) {
    return <Dashboard data={analysisData} onReset={resetAnalysis} />;
  }

  return (
    <Home
      prompt={prompt}
      setPrompt={setPrompt}
      onSubmit={analyzeProject}
      loading={loading}
      status={status}
      onReset={resetAnalysis}
    />
  );
}

export default App;
