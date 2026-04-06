import React from 'react';
import { CheckCircle, XCircle, RefreshCcw, Percent, BarChart3, Shield, Brain, TrendingUp, AlertCircle } from 'lucide-react';

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
    --green-border: #A7F3D0;
    --red:          #EF4444;
    --red-light:    #FEF2F2;
    --red-border:   #FECACA;
    --text:         #0F172A;
    --text-muted:   #64748B;
    --text-light:   #94A3B8;
    --font-head:    'Plus Jakarta Sans', sans-serif;
    --font-body:    'IBM Plex Sans', sans-serif;
    --font-mono:    'IBM Plex Mono', monospace;
    --shadow:       0 4px 24px rgba(37,99,235,0.08);
    --shadow-lg:    0 12px 40px rgba(37,99,235,0.14);
  }

  /* ── Keyframes ── */
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.88) translateY(24px); }
    70%  { transform: scale(1.02) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes drawBar {
    from { width: 0%; }
    to   { width: var(--bar-w); }
  }
  @keyframes iconBounce {
    0%   { transform: scale(0.5); opacity: 0; }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1);    opacity: 0.6; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes rotateFull {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmerBar {
    0%   { background-position: -300px 0; }
    100% { background-position: 300px 0; }
  }

  /* ── Root ── */
  .ar-root {
    font-family: var(--font-body);
    max-width: 680px;
    margin: 0 auto;
    animation: popIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  /* ── Outer border glow ── */
  .ar-outer {
    padding: 2px;
    border-radius: 22px;
  }
  .ar-outer.approved {
    background: linear-gradient(135deg, var(--green), #34D399, var(--blue));
    box-shadow: 0 0 40px rgba(16,185,129,0.2), 0 20px 60px rgba(16,185,129,0.12);
  }
  .ar-outer.declined {
    background: linear-gradient(135deg, var(--red), #F87171, #F59E0B);
    box-shadow: 0 0 40px rgba(239,68,68,0.18), 0 20px 60px rgba(239,68,68,0.1);
  }

  /* ── Inner card ── */
  .ar-card {
    background: var(--surface);
    border-radius: 20px;
    overflow: hidden;
  }

  /* ── Hero section ── */
  .ar-hero {
    padding: 48px 40px 36px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .ar-hero.approved {
    background: linear-gradient(160deg, var(--green-light) 0%, var(--surface) 60%);
  }
  .ar-hero.declined {
    background: linear-gradient(160deg, var(--red-light) 0%, var(--surface) 60%);
  }

  /* Decorative bg circles */
  .ar-hero::before {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    top: -100px; left: 50%;
    transform: translateX(-50%);
    opacity: 0.07;
    pointer-events: none;
  }
  .ar-hero.approved::before { background: var(--green); }
  .ar-hero.declined::before { background: var(--red); }

  /* ── Status icon ── */
  .ar-icon-wrap {
    position: relative;
    width: 96px; height: 96px;
    margin: 0 auto 24px;
    display: flex; align-items: center; justify-content: center;
  }
  .ar-icon-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: pulseRing 1.8s ease-out 0.3s both;
  }
  .ar-icon-ring-2 {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    animation: pulseRing 1.8s ease-out 0.6s both;
  }
  .approved .ar-icon-ring  { border: 2px solid var(--green); }
  .approved .ar-icon-ring-2{ border: 2px solid var(--green); }
  .declined .ar-icon-ring  { border: 2px solid var(--red); }
  .declined .ar-icon-ring-2{ border: 2px solid var(--red); }

  .ar-icon-bg {
    width: 80px; height: 80px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    animation: iconBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
    position: relative; z-index: 1;
  }
  .approved .ar-icon-bg { background: var(--green-light); border: 2px solid var(--green-border); color: var(--green); }
  .declined .ar-icon-bg { background: var(--red-light);   border: 2px solid var(--red-border);   color: var(--red); }

  /* ── Status text ── */
  .ar-status-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 999px;
    margin-bottom: 12px;
    animation: fadeSlideUp 0.4s 0.3s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .approved .ar-status-tag { background: var(--green-light); color: var(--green); border: 1px solid var(--green-border); }
  .declined .ar-status-tag { background: var(--red-light);   color: var(--red);   border: 1px solid var(--red-border); }

  .ar-hero-title {
    font-family: var(--font-head);
    font-size: 2rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
    margin-bottom: 10px;
    animation: fadeSlideUp 0.4s 0.4s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .ar-hero-sub {
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.6;
    animation: fadeSlideUp 0.4s 0.5s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .ar-hero-sub strong { color: var(--text); font-weight: 600; }

  /* ── Confidence bar ── */
  .ar-confidence {
    margin: 24px auto 0;
    max-width: 320px;
    animation: fadeSlideUp 0.4s 0.55s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .ar-conf-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .ar-conf-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .ar-conf-val {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text);
  }
  .ar-conf-track {
    height: 6px;
    background: var(--surface-2);
    border-radius: 99px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .ar-conf-fill {
    height: 100%;
    border-radius: 99px;
    animation: drawBar 1s cubic-bezier(0.4,0,0.2,1) 0.6s both;
    width: var(--bar-w);
    background-size: 300px 100%;
  }
  .approved .ar-conf-fill {
    background: linear-gradient(90deg, var(--green), #34D399);
  }
  .declined .ar-conf-fill {
    background: linear-gradient(90deg, var(--red), #F87171);
  }

  /* ── Stats strip ── */
  .ar-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .ar-stat {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 28px;
    animation: fadeSlideUp 0.4s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .ar-stat:nth-child(1) { animation-delay: 0.55s; border-right: 1px solid var(--border); }
  .ar-stat:nth-child(2) { animation-delay: 0.65s; }

  .ar-stat-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ar-stat-icon.green-ic { background: var(--green-light); color: var(--green); border: 1px solid var(--green-border); }
  .ar-stat-icon.blue-ic  { background: var(--blue-light);  color: var(--blue);  border: 1px solid var(--border); }

  .ar-stat-key {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }
  .ar-stat-val {
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.2px;
  }

  /* ── Evidence section ── */
  .ar-evidence {
    padding: 24px 28px;
    animation: fadeSlideUp 0.4s 0.7s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .ar-evidence-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
  }
  .ar-evidence-header-icon {
    width: 32px; height: 32px;
    background: var(--blue-light);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue);
  }
  .ar-evidence-title {
    font-family: var(--font-head);
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.1px;
  }
  .ar-evidence-sub {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--text-light);
    letter-spacing: 0.04em;
  }

  .ar-evidence-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 540px) {
    .ar-evidence-grid { grid-template-columns: 1fr; }
    .ar-stats { grid-template-columns: 1fr; }
    .ar-stat:nth-child(1) { border-right: none; border-bottom: 1px solid var(--border); }
  }

  .ar-ev-item {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ar-ev-item:hover {
    border-color: var(--blue);
    box-shadow: 0 2px 12px var(--blue-glow);
  }
  .ar-ev-key {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .ar-ev-val {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text);
  }

  /* ── Footer ── */
  .ar-footer {
    padding: 20px 28px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    border-top: 1px solid var(--border);
    background: var(--bg);
    animation: fadeSlideUp 0.4s 0.8s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  .ar-footer-note {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-light);
    text-align: center;
    letter-spacing: 0.03em;
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ar-reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-head);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 11px 22px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: -0.1px;
  }
  .ar-reset-btn:hover {
    color: var(--blue);
    border-color: var(--blue);
    background: var(--blue-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px var(--blue-glow);
  }
  .ar-reset-btn:hover .ar-reset-icon {
    animation: rotateFull 0.5s ease;
  }
  .ar-reset-icon { display: flex; align-items: center; }
`;

const AIResult = ({ result, onReset }) => {
    if (!result) return null;

    const isApproved = result.result.status === 'Approved';
    const confidence = result.result.probability;
    const barWidth = `${Math.min(confidence, 100)}%`;

    return (
        <>
            <style>{styles}</style>
            <div className="ar-root">
                <div className={`ar-outer ${isApproved ? 'approved' : 'declined'}`}>
                    <div className="ar-card">

                        {/* ── Hero ── */}
                        <div className={`ar-hero ${isApproved ? 'approved' : 'declined'}`}>

                            {/* Icon */}
                            <div className={`ar-icon-wrap ${isApproved ? 'approved' : 'declined'}`}>
                                <div className="ar-icon-ring" />
                                <div className="ar-icon-ring-2" />
                                <div className="ar-icon-bg">
                                    {isApproved
                                        ? <CheckCircle size={38} strokeWidth={2} />
                                        : <XCircle size={38} strokeWidth={2} />
                                    }
                                </div>
                            </div>

                            {/* Tag + title */}
                            <div className={isApproved ? 'approved' : 'declined'}>
                                <div className="ar-status-tag">
                                    {isApproved ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                                    {isApproved ? 'Application Approved' : 'Application Declined'}
                                </div>
                            </div>

                            <div className="ar-hero-title">
                                {isApproved ? 'Congratulations!' : 'Application Not Approved'}
                            </div>
                            <div className="ar-hero-sub">
                                Our Bayesian Network completed the assessment with{' '}
                                <strong>{confidence}% confidence</strong>. The decision is based on
                                your financial profile and risk model output.
                            </div>

                            {/* Confidence bar */}
                            <div className="ar-confidence">
                                <div className={isApproved ? 'approved' : 'declined'}>
                                    <div className="ar-conf-row">
                                        <span className="ar-conf-label">Model Confidence</span>
                                        <span className="ar-conf-val">{confidence}%</span>
                                    </div>
                                    <div className="ar-conf-track">
                                        <div className="ar-conf-fill" style={{ '--bar-w': barWidth }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Stats strip ── */}
                        <div className="ar-stats">
                            <div className="ar-stat">
                                <div className="ar-stat-icon green-ic"><Percent size={18} /></div>
                                <div>
                                    <div className="ar-stat-key">Offered Interest Rate</div>
                                    <div className="ar-stat-val">{result.result.suggested_rate}</div>
                                </div>
                            </div>
                            <div className="ar-stat">
                                <div className="ar-stat-icon blue-ic"><Shield size={18} /></div>
                                <div>
                                    <div className="ar-stat-key">Security Audit</div>
                                    <div className="ar-stat-val">Verified ✓</div>
                                </div>
                            </div>
                        </div>

                        {/* ── Evidence ── */}
                        <div className="ar-evidence">
                            <div className="ar-evidence-header">
                                <div className="ar-evidence-header-icon"><Brain size={16} /></div>
                                <div>
                                    <div className="ar-evidence-title">AI Reasoning Evidence</div>
                                    <div className="ar-evidence-sub">Factors used by the Bayesian inference engine</div>
                                </div>
                            </div>

                            <div className="ar-evidence-grid">
                                {Object.entries(result.result.evidence_used).map(([key, value]) => (
                                    <div key={key} className="ar-ev-item">
                                        <div className="ar-ev-key">{key.replace(/_bin$/, '').replace(/_/g, ' ')}</div>
                                        <div className="ar-ev-val">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Footer ── */}
                        <div className="ar-footer">
                            <div className="ar-footer-note">
                                <Shield size={11} />
                                This assessment is AI-generated and for informational purposes only.
                                Final approval is subject to bank verification.
                            </div>
                            <button className="ar-reset-btn" onClick={onReset}>
                                <span className="ar-reset-icon"><RefreshCcw size={15} /></span>
                                Start New Application
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AIResult;