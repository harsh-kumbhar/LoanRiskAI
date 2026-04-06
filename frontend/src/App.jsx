import React, { useState } from 'react';
import axios from 'axios';
import { Landmark, Lock, Upload, ShieldCheck, BarChart3, FileText, User } from 'lucide-react';

import ProductCatalog from "../components/ProductCatalog";
import ReviewForm from "../components/ReviewForm";
import AIResult from "../components/AIResult";
import BankerDashboard from "../components/BankerDashboard";

/* ─────────────────────────────────────────────
   INTERNAL STYLES
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

  :root {
    --bg:         #F0F4FF;
    --surface:    #FFFFFF;
    --surface-2:  #E8EEFF;
    --border:     #D1DAFF;
    --blue:       #2563EB;
    --blue-dark:  #1D4ED8;
    --blue-light: #EFF3FF;
    --blue-glow:  rgba(37,99,235,0.15);
    --green:      #10B981;
    --red:        #EF4444;
    --text:       #0F172A;
    --text-muted: #64748B;
    --text-light: #94A3B8;
    --font-head:  'Plus Jakarta Sans', sans-serif;
    --font-body:  'IBM Plex Sans', sans-serif;
    --font-mono:  'IBM Plex Mono', monospace;
    --radius:     14px;
    --shadow:     0 4px 24px rgba(37,99,235,0.10);
    --shadow-lg:  0 8px 40px rgba(37,99,235,0.16);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  /* ── Keyframes ── */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
    70%  { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes scanLine {
    0%   { top: 0%; }
    100% { top: 100%; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  /* ── Grid bg pattern ── */
  .app-root {
    min-height: 100vh;
    background-color: var(--bg);
    background-image:
      linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    font-family: var(--font-body);
  }

  /* ── NAV ── */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1.5px solid var(--border);
    box-shadow: 0 1px 16px rgba(37,99,235,0.07);
  }
  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
  }
  .nav-icon-wrap {
    width: 42px; height: 42px;
    background: var(--blue);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(37,99,235,0.4);
    animation: pulseRing 3s infinite;
  }
  .nav-title {
    font-family: var(--font-head);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.3px;
  }
  .nav-title span { color: var(--blue); }

  .nav-badge {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    background: var(--blue-light);
    color: var(--blue);
    border: 1px solid var(--border);
    padding: 2px 8px;
    border-radius: 999px;
    letter-spacing: 0.05em;
    margin-left: 4px;
  }

  .nav-actions { display: flex; gap: 10px; align-items: center; }

  .btn-nav {
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 500;
    padding: 8px 18px;
    border-radius: 999px;
    border: 1.5px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex; align-items: center; gap: 6px;
    background: transparent;
    color: var(--text-muted);
  }
  .btn-nav:hover { background: var(--blue-light); color: var(--blue); border-color: var(--border); }
  .btn-nav.active-user { background: var(--blue); color: #fff; border-color: var(--blue); box-shadow: 0 4px 14px rgba(37,99,235,0.3); }
  .btn-nav.active-admin { background: #0F172A; color: #fff; border-color: #0F172A; }

  /* ── MAIN ── */
  .main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 32px;
  }
  .content-wrap {
    max-width: 820px;
    margin: 0 auto;
  }

  /* ── PAGE HEADER ── */
  .page-header {
    text-align: center;
    margin-bottom: 48px;
    animation: fadeSlideUp 0.5s ease both;
  }
  .page-header-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--blue);
    background: var(--blue-light);
    border: 1px solid var(--border);
    padding: 4px 14px;
    border-radius: 999px;
    margin-bottom: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .page-header h1 {
    font-family: var(--font-head);
    font-size: 2rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.4px;
    line-height: 1.25;
  }
  .page-header h1 span { color: var(--blue); }
  .page-header p {
    font-size: 1rem;
    color: var(--text-muted);
    margin-top: 10px;
    font-weight: 400;
    line-height: 1.6;
  }

  /* ── STEPPER ── */
  .stepper {
    display: flex;
    align-items: center;
    margin-bottom: 44px;
    animation: fadeSlideUp 0.5s 0.1s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    position: relative;
  }
  .step-item:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 18px;
    left: 60%;
    width: 80%;
    height: 2px;
    background: var(--border);
    z-index: 0;
  }
  .step-item.done:not(:last-child)::after,
  .step-item.active:not(:last-child)::after {
    background: linear-gradient(90deg, var(--blue), var(--border));
  }
  .step-circle {
    width: 36px; height: 36px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    z-index: 1;
    transition: all 0.3s ease;
    background: var(--surface);
    border: 2px solid var(--border);
    color: var(--text-light);
  }
  .step-item.done .step-circle {
    background: var(--blue);
    border-color: var(--blue);
    color: #fff;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35);
  }
  .step-item.active .step-circle {
    background: var(--surface);
    border-color: var(--blue);
    color: var(--blue);
    box-shadow: 0 0 0 4px var(--blue-glow);
  }
  .step-label {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    color: var(--text-light);
    text-align: center;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .step-item.active .step-label { color: var(--blue); }
  .step-item.done .step-label { color: var(--text-muted); }

  /* ── STEP PANEL ── */
  .step-panel {
    animation: fadeSlideUp 0.45s ease both;
  }

  /* ── UPLOAD ZONE ── */
  .upload-zone {
    background: var(--surface);
    border: 2px dashed var(--border);
    border-radius: 20px;
    padding: 72px 40px;
    text-align: center;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  .upload-zone:hover {
    border-color: var(--blue);
    background: var(--blue-light);
    box-shadow: var(--shadow-lg);
  }
  .upload-zone::before {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--blue), transparent);
    animation: scanLine 2s linear infinite;
    opacity: 0.5;
  }

  .upload-icon-wrap {
    width: 80px; height: 80px;
    background: var(--blue-light);
    border: 2px solid var(--border);
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    color: var(--blue);
    transition: all 0.2s;
  }
  .upload-zone:hover .upload-icon-wrap {
    background: var(--blue);
    color: #fff;
    border-color: var(--blue);
    box-shadow: 0 8px 24px rgba(37,99,235,0.35);
  }

  .upload-title {
    font-family: var(--font-head);
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
    letter-spacing: -0.2px;
  }
  .upload-sub {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 32px;
    line-height: 1.6;
  }
  .upload-sub code {
    font-family: var(--font-mono);
    background: var(--surface-2);
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.82rem;
    color: var(--blue);
    border: 1px solid var(--border);
  }

  .btn-upload {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    background: var(--blue);
    border: none;
    padding: 14px 32px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(37,99,235,0.35);
    letter-spacing: 0.01em;
  }
  .btn-upload:hover {
    background: var(--blue-dark);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.45);
  }
  .btn-upload.loading {
    background: var(--text-muted);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  /* ── LOADING SHIMMER ── */
  .loading-bar {
    height: 3px;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--blue-light) 25%, var(--blue) 50%, var(--blue-light) 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite;
    margin-top: 24px;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  /* ── CHIP STRIP under upload ── */
  .chip-strip {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    flex-wrap: wrap;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--text-muted);
    background: var(--surface-2);
    border: 1px solid var(--border);
    padding: 4px 12px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }
  .chip-dot { width: 6px; height: 6px; border-radius: 50%; }
  .chip-dot.green { background: var(--green); }
  .chip-dot.blue  { background: var(--blue); }
`;

/* ─────────────────────────────────────────────
   STEP META
───────────────────────────────────────────── */
const STEPS = [
    { label: 'Select Plan', icon: <BarChart3 size={14} /> },
    { label: 'Upload Docs', icon: <Upload size={14} /> },
    { label: 'Review', icon: <FileText size={14} /> },
    { label: 'AI Result', icon: <ShieldCheck size={14} /> },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const App = () => {
    const [view, setView] = useState('USER');
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [finalResult, setFinalResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAdminLogin = () => {
        const pass = prompt("Enter Banker Security Key:");
        if (pass === "admin123") setView('ADMIN');
        else alert("Access Denied");
    };

    const handleUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/analyze_pdf', formData);
            setExtractedData(res.data);
            setStep(3);
        } catch {
            alert("PDF Parsing failed. Check backend.");
        } finally {
            setLoading(false);
        }
    };

    const handleFinalSubmit = async (formData) => {
        setLoading(true);
        try {
            const payload = { ...formData, product_name: selectedPlan.name, original_extracted: extractedData };
            const res = await axios.post('http://127.0.0.1:5000/api/submit_application', payload);
            setFinalResult(res.data);
            setStep(4);
        } catch {
            alert("Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{styles}</style>
            <div className="app-root">

                {/* ── NAV ── */}
                <nav className="nav">
                    <div className="nav-inner">
                        <div className="nav-brand" onClick={() => { setStep(1); setView('USER'); }}>
                            <div className="nav-icon-wrap">
                                <Landmark color="#fff" size={22} />
                            </div>
                            <span className="nav-title">
                                BayesLoan<span>AI</span>
                            </span>
                            <span className="nav-badge">v2.0 · Neural Credit</span>
                        </div>

                        <div className="nav-actions">
                            <button
                                className={`btn-nav ${view === 'USER' ? 'active-user' : ''}`}
                                onClick={() => setView('USER')}
                            >
                                <User size={14} /> Applicant Portal
                            </button>
                            <button
                                className={`btn-nav ${view === 'ADMIN' ? 'active-admin' : ''}`}
                                onClick={handleAdminLogin}
                            >
                                <Lock size={14} /> Banker Login
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ── MAIN ── */}
                <main className="main">
                    {view === 'ADMIN' ? (
                        <BankerDashboard />
                    ) : (
                        <div className="content-wrap">

                            {/* Page Header */}
                            <div className="page-header">
                                <div className="page-header-tag">
                                    <ShieldCheck size={11} /> AI-Powered Risk Assessment
                                </div>
                                <h1>Intelligent <span>Loan</span> Evaluation</h1>
                                <p>Upload your financial documents and receive a real-time AI credit risk assessment<br />powered by Bayesian inference and fuzzy logic models.</p>
                            </div>

                            {/* Stepper */}
                            <div className="stepper">
                                {STEPS.map((s, i) => {
                                    const idx = i + 1;
                                    const cls = idx < step ? 'done' : idx === step ? 'active' : '';
                                    return (
                                        <div key={idx} className={`step-item ${cls}`}>
                                            <div className="step-circle">{idx < step ? '✓' : idx}</div>
                                            <div className="step-label">{s.label}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Step Panels — CSS-animated, no framer-motion */}
                            <div key={step} className="step-panel">

                                {step === 1 && (
                                    <ProductCatalog onSelect={(plan) => { setSelectedPlan(plan); setStep(2); }} />
                                )}

                                {step === 2 && (
                                    <div className="upload-zone">
                                        <div className="upload-icon-wrap">
                                            <Upload size={32} />
                                        </div>
                                        <div className="upload-title">Upload Financial Evidence</div>
                                        <div className="upload-sub">
                                            Drop your <code>Salary Slip</code> or <code>CIBIL Report</code> PDF here.<br />
                                            Our AI will extract and pre-fill your application fields.
                                        </div>

                                        <input
                                            type="file"
                                            id="pdf-up"
                                            accept=".pdf"
                                            onChange={(e) => handleUpload(e.target.files[0])}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="pdf-up">
                                            <span className={`btn-upload ${loading ? 'loading' : ''}`}>
                                                <Upload size={16} />
                                                {loading ? 'Analyzing Document…' : 'Select Document'}
                                            </span>
                                        </label>

                                        {loading && <div className="loading-bar" />}

                                        <div className="chip-strip">
                                            <span className="chip"><span className="chip-dot green" /> PDF Supported</span>
                                            <span className="chip"><span className="chip-dot blue" /> AI Extraction</span>
                                            <span className="chip"><span className="chip-dot green" /> Secure Upload</span>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <ReviewForm
                                        initialData={extractedData}
                                        onSubmit={handleFinalSubmit}
                                        loading={loading}
                                    />
                                )}

                                {step === 4 && (
                                    <AIResult result={finalResult} onReset={() => setStep(1)} />
                                )}
                            </div>

                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default App;