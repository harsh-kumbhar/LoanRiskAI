import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Cpu, User, DollarSign, CreditCard, Calendar, Users, GraduationCap, Briefcase } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

  :root {
    --bg:           #F0F4FF;
    --surface:      #FFFFFF;
    --surface-2:    #E8EEFF;
    --border:       #D1DAFF;
    --blue:         #2563EB;
    --blue-dark:    #1D4ED8;
    --blue-light:   #EFF3FF;
    --blue-glow:    rgba(37,99,235,0.15);
    --green:        #10B981;
    --green-light:  #ECFDF5;
    --orange:       #F59E0B;
    --orange-light: #FFFBEB;
    --red:          #EF4444;
    --text:         #0F172A;
    --text-muted:   #64748B;
    --text-light:   #94A3B8;
    --font-head:    'Plus Jakarta Sans', sans-serif;
    --font-body:    'IBM Plex Sans', sans-serif;
    --font-mono:    'IBM Plex Mono', monospace;
    --shadow:       0 4px 24px rgba(37,99,235,0.08);
    --shadow-lg:    0 12px 40px rgba(37,99,235,0.14);
    --radius:       16px;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
    50%       { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
  }

  /* ── Wrapper ── */
  .rf-root {
    font-family: var(--font-body);
    animation: fadeSlideUp 0.45s ease both;
  }

  /* ── Card ── */
  .rf-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  /* ── Card Header ── */
  .rf-header {
    padding: 24px 28px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .rf-header-left { display: flex; align-items: center; gap: 14px; }
  .rf-header-icon {
    width: 44px; height: 44px;
    background: var(--blue-light);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue);
    flex-shrink: 0;
  }
  .rf-header-title {
    font-family: var(--font-head);
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.2px;
    margin-bottom: 3px;
  }
  .rf-header-sub {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }

  /* ── Scan status pill ── */
  .rf-scan-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .rf-scan-pill.ok  { background: var(--green-light); color: var(--green); border: 1px solid #A7F3D0; }
  .rf-scan-pill.warn { background: var(--orange-light); color: var(--orange); border: 1px solid #FCD34D; }
  .scan-dot { width: 6px; height: 6px; border-radius: 50%; }
  .ok   .scan-dot { background: var(--green); }
  .warn .scan-dot { background: var(--orange); }

  /* ── Body ── */
  .rf-body { padding: 24px 28px; }

  /* ── Section label ── */
  .rf-section-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .rf-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── Grid ── */
  .rf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .rf-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  @media (max-width: 640px) {
    .rf-grid, .rf-grid-3 { grid-template-columns: 1fr; }
  }

  /* ── Field ── */
  .rf-field { display: flex; flex-direction: column; gap: 6px; }

  .rf-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .rf-label-icon { color: var(--blue); opacity: 0.7; }

  /* ── Input wrapper ── */
  .rf-input-wrap {
    position: relative;
  }
  .rf-input {
    width: 100%;
    font-family: var(--font-mono);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    -moz-appearance: textfield;
  }
  .rf-input::-webkit-inner-spin-button,
  .rf-input::-webkit-outer-spin-button { -webkit-appearance: none; }
  .rf-input::placeholder { color: var(--text-light); font-weight: 400; }
  .rf-input:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px var(--blue-glow);
    background: var(--blue-light);
  }
  .rf-input.missing {
    border-color: var(--orange);
    background: var(--orange-light);
  }
  .rf-input.missing:focus {
    border-color: var(--orange);
    box-shadow: 0 0 0 3px rgba(245,158,11,0.15);
  }

  /* ── Select ── */
  .rf-select {
    width: 100%;
    font-family: var(--font-mono);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 11px 14px;
    outline: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .rf-select:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px var(--blue-glow);
    background-color: var(--blue-light);
  }

  /* ── Warning note ── */
  .rf-warn-note {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    color: var(--orange);
    letter-spacing: 0.03em;
    margin-top: 4px;
  }

  /* ── Detected note ── */
  .rf-ok-note {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--green);
    margin-top: 4px;
  }

  /* ── Footer ── */
  .rf-footer {
    padding: 0 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ── Disclaimer strip ── */
  .rf-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: var(--blue-light);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    font-family: var(--font-mono);
    font-size: 0.67rem;
    color: var(--text-muted);
    line-height: 1.5;
    letter-spacing: 0.02em;
  }
  .rf-disclaimer-icon { color: var(--blue); flex-shrink: 0; margin-top: 1px; }

  /* ── Submit button ── */
  .rf-submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: var(--font-head);
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    background: var(--blue);
    border: none;
    border-radius: 12px;
    padding: 16px 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: -0.1px;
    box-shadow: 0 4px 16px rgba(37,99,235,0.35);
    animation: pulseGlow 3s infinite;
  }
  .rf-submit:hover:not(:disabled) {
    background: var(--blue-dark);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(37,99,235,0.45);
  }
  .rf-submit:disabled {
    background: var(--text-muted);
    box-shadow: none;
    cursor: not-allowed;
    animation: none;
    transform: none;
  }

  /* ── Spinner ── */
  .rf-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
`;

const FIELDS_NUM = [
    { key: 'income', label: 'Monthly Income', icon: <DollarSign size={11} />, placeholder: 'e.g. 75000' },
    { key: 'cibil', label: 'CIBIL Score', icon: <CreditCard size={11} />, placeholder: 'e.g. 720' },
    { key: 'loan_amount', label: 'Loan Amount (₹)', icon: <DollarSign size={11} />, placeholder: 'e.g. 500000' },
    { key: 'term', label: 'Loan Term (Months)', icon: <Calendar size={11} />, placeholder: 'e.g. 24' },
];

const ReviewForm = ({ initialData = {}, onSubmit, loading }) => {
    const [form, setForm] = useState({
        name: 'Harsh Kumbhar',
        income: initialData?.income || '',
        cibil: initialData?.cibil || '',
        loan_amount: initialData?.loan_amount || '',
        term: initialData?.term || 12,
        dependents: initialData?.dependents || 0,
        education: initialData?.education || 'Graduate',
        self_employed: initialData?.self_employed || 'No',
    });

    const missingCount = FIELDS_NUM.filter(f => !initialData?.[f.key]).length;

    return (
        <>
            <style>{styles}</style>
            <div className="rf-root">
                <div className="rf-card">

                    {/* ── Header ── */}
                    <div className="rf-header">
                        <div className="rf-header-left">
                            <div className="rf-header-icon"><FileText size={20} /></div>
                            <div>
                                <div className="rf-header-title">Review Extracted Data</div>
                                <div className="rf-header-sub">Step 03 · Verify & Confirm before AI analysis</div>
                            </div>
                        </div>
                        <span className={`rf-scan-pill ${missingCount > 0 ? 'warn' : 'ok'}`}>
                            <span className="scan-dot" />
                            {missingCount > 0 ? `${missingCount} Field${missingCount > 1 ? 's' : ''} Missing` : 'All Fields Detected'}
                        </span>
                    </div>

                    {/* ── Body ── */}
                    <div className="rf-body">

                        {/* Applicant */}
                        <div className="rf-section-label">Applicant Identity</div>
                        <div style={{ marginBottom: '24px' }}>
                            <div className="rf-field">
                                <label className="rf-label">
                                    <span className="rf-label-icon"><User size={11} /></span>
                                    Full Name
                                </label>
                                <input
                                    className="rf-input"
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                <div className="rf-ok-note"><CheckCircle size={10} /> Auto-filled from document</div>
                            </div>
                        </div>

                        {/* Financial Fields */}
                        <div className="rf-section-label">Financial Information</div>
                        <div className="rf-grid">
                            {FIELDS_NUM.map((f) => {
                                const isMissing = !initialData?.[f.key];
                                return (
                                    <div key={f.key} className="rf-field">
                                        <label className="rf-label">
                                            <span className="rf-label-icon">{f.icon}</span>
                                            {f.label}
                                        </label>
                                        <div className="rf-input-wrap">
                                            <input
                                                className={`rf-input${isMissing ? ' missing' : ''}`}
                                                type="number"
                                                value={form[f.key]}
                                                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                                placeholder={isMissing ? 'Enter manually…' : f.placeholder}
                                            />
                                        </div>
                                        {isMissing
                                            ? <div className="rf-warn-note"><AlertTriangle size={10} /> Not detected in PDF — please enter</div>
                                            : <div className="rf-ok-note"><CheckCircle size={10} /> Extracted from document</div>
                                        }
                                    </div>
                                );
                            })}
                        </div>

                        {/* Profile Fields */}
                        <div className="rf-section-label">Applicant Profile</div>
                        <div className="rf-grid-3">
                            <div className="rf-field">
                                <label className="rf-label">
                                    <span className="rf-label-icon"><Users size={11} /></span>
                                    Dependents
                                </label>
                                <input
                                    className="rf-input"
                                    type="number"
                                    min={0}
                                    value={form.dependents}
                                    onChange={(e) => setForm({ ...form, dependents: e.target.value })}
                                />
                            </div>
                            <div className="rf-field">
                                <label className="rf-label">
                                    <span className="rf-label-icon"><GraduationCap size={11} /></span>
                                    Education
                                </label>
                                <select
                                    className="rf-select"
                                    value={form.education}
                                    onChange={(e) => setForm({ ...form, education: e.target.value })}
                                >
                                    <option>Graduate</option>
                                    <option>Not Graduate</option>
                                </select>
                            </div>
                            <div className="rf-field">
                                <label className="rf-label">
                                    <span className="rf-label-icon"><Briefcase size={11} /></span>
                                    Self Employed
                                </label>
                                <select
                                    className="rf-select"
                                    value={form.self_employed}
                                    onChange={(e) => setForm({ ...form, self_employed: e.target.value })}
                                >
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="rf-footer">
                        <div className="rf-disclaimer">
                            <span className="rf-disclaimer-icon"><Cpu size={12} /></span>
                            All extracted fields are pre-filled from your uploaded PDF. Review carefully before submitting — the AI model uses these values for Bayesian inference and fuzzy logic scoring.
                        </div>
                        <button
                            className="rf-submit"
                            onClick={() => onSubmit(form)}
                            disabled={loading}
                        >
                            {loading
                                ? <><div className="rf-spinner" /> AI is Reasoning…</>
                                : <><Cpu size={16} /> Confirm & Run Analysis</>
                            }
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ReviewForm;