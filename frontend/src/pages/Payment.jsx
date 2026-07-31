import { useState, useEffect } from "react";
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Building, 
  QrCode, 
  Cpu, 
  Lock,
  UserCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Payment({ onBackToDashboard, onBackToHome }) {
  const [hireDetails, setHireDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("teamforge_selected_hire");
      if (stored) {
        setHireDetails(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read hire details from localStorage", e);
    }
  }, []);

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const details = hireDetails || {
    projectId: `proj_${Date.now()}`,
    projectTitle: "AI Project Analysis Platform",
    freelancerId: 1,
    freelancerName: "Rahul Sharma",
    freelancerRole: "Frontend Developer",
    matchScore: 92,
    estimatedBudget: "$28,500"
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 selection:bg-indigo-500/30">
      <Navbar status="completed" onBack={onBackToDashboard} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Navigation Top Action */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to AI Report Dashboard</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Escrow Security</span>
          </div>
        </div>

        {isSuccess ? (
          /* Payment Success View */
          <div className="bg-[#111827] border border-emerald-500/30 rounded-xl p-8 text-center space-y-4 max-w-lg mx-auto my-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-white">Freelancer Engagement Confirmed!</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your engagement request for <strong className="text-white">{details.freelancerName}</strong> ({details.freelancerRole}) has been successfully funded and initiated under project ID <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300 font-mono">{details.projectId}</code>.
            </p>
            <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-4 text-xs text-slate-400 space-y-1 text-left">
              <div className="flex justify-between">
                <span>Escrow Deposit Amount:</span>
                <strong className="text-emerald-400">{details.estimatedBudget}</strong>
              </div>
              <div className="flex justify-between">
                <span>Match Score:</span>
                <strong className="text-indigo-300">{details.matchScore}% Match</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">Active Milestone</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3 justify-center">
              <button
                onClick={onBackToDashboard}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
              >
                Back to Dashboard
              </button>
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              >
                Start New Project
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form & Order Summary */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Checkout Form */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-5 shadow-xl">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-400" />
                    Hire & Fund Specialist Milestone
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Select payment option to fund escrow for <strong className="text-slate-200">{details.freelancerName}</strong>.
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "card"
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "upi"
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>UPI / NetBanking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wire")}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "wire"
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>Bank Wire</span>
                    </button>
                  </div>
                </div>

                {/* Payment Form Details */}
                <form onSubmit={handleConfirmPayment} className="space-y-4 pt-2">
                  {paymentMethod === "card" && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          defaultValue={details.freelancerName ? "Client Account" : ""}
                          placeholder="Full Name on Card"
                          className="w-full bg-[#0B1120] border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="4532 •••• •••• 8921"
                          maxLength={19}
                          className="w-full bg-[#0B1120] border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-400 block mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            required
                            placeholder="12/28"
                            className="w-full bg-[#0B1120] border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">CVC / CVV</label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={4}
                            className="w-full bg-[#0B1120] border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-4 text-xs space-y-2">
                      <span className="text-slate-300 font-semibold block">VPA / UPI ID</span>
                      <input
                        type="text"
                        required
                        placeholder="client@upi"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                      />
                      <span className="text-[11px] text-slate-500 block">
                        Approval request will be sent to your UPI app.
                      </span>
                    </div>
                  )}

                  {paymentMethod === "wire" && (
                    <div className="bg-[#0B1120] border border-slate-800 rounded-lg p-4 text-xs space-y-2 text-slate-300">
                      <span className="font-semibold text-white block">Escrow Bank Details</span>
                      <p>Bank: Silicon Valley Bank / HDFC Enterprise Escrow</p>
                      <p>Account Name: TeamForge Escrow Inc</p>
                      <p>Account No: 8849-0021-9921</p>
                      <p>IFSC / SWIFT: HDFC0000240 / SVBKUS33</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Processing Escrow Authorization...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm Hire & Authorize {details.estimatedBudget}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  Engagement Summary
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Project Title</span>
                    <span className="font-semibold text-white truncate block">{details.projectTitle}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Selected Specialist</span>
                    <div className="flex justify-between items-center mt-0.5">
                      <strong className="text-slate-200">{details.freelancerName}</strong>
                      <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded">
                        {details.matchScore}% Match
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">{details.freelancerRole}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-slate-400">
                      <span>Milestone Estimate:</span>
                      <span className="font-mono text-slate-200">{details.estimatedBudget}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Escrow Service Fee:</span>
                      <span className="font-mono text-emerald-400">Included ($0)</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                      <span>Total Deposit:</span>
                      <span className="text-emerald-400 font-mono">{details.estimatedBudget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Payment;
