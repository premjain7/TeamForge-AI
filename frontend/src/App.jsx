import { useState } from "react";
import useProject from "./hooks/useProject";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import Landing from "./pages/Landing";
import FreelancerPortal from "./pages/FreelancerPortal";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./styles/globals.css";

function App() {
  const [userType, setUserType] = useState(null);

  const {
    prompt,
    setPrompt,
    loading,
    status,
    analysisData,
    analyzeProject,
    resetAnalysis,
  } = useProject();

  // First screen
  if (!userType) {
    return (
      <Landing
        onSelectClient={() => setUserType("client")}
        onSelectFreelancer={() => setUserType("freelancer")}
      />
    );
  }

  // Freelancer flow
  if (userType === "freelancer") {
    return (
      <FreelancerPortal
        onBack={() => setUserType(null)}
      />
    );
  }

  // Existing client flow (UNCHANGED)

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100">
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