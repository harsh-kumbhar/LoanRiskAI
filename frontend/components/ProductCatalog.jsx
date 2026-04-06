import React from 'react';
import { Briefcase, Home, Rocket, ArrowRight, CheckCircle } from 'lucide-react';

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
    --green:      #10B981;
    --green-light:#ECFDF5;
    --indigo:     #6366F1;
    --indigo-light:#EEF2FF;
    --text:       #0F172A;
    --text-muted: #64748B;
    --text-light: #94A3B8;
    --font-head:  'Plus Jakarta Sans', sans-serif;
    --font-body:  'IBM Plex Sans', sans-serif;
    --font-mono:  'IBM Plex Mono', monospace;
    --shadow:     0 4px 24px rgba(37,99,235,0.08);
    --shadow-lg:  0 12px 40px rgba(37,99,235,0.14);
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cardPop {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .catalog-root {
    font-family: var(--font-body);
  }

  /* ── Section header ── */
  .catalog-header {
    text-align: center;
    margin-bottom: 36px;
    animation: fadeSlideUp 0.45s ease both;
  }
  .catalog-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--blue);
    background: var(--blue-light);
    border: 1px solid var(--border);
    padding: 4px 14px;
    border-radius: 999px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .catalog-header h2 {
    font-family: var(--font-head);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.3px;
    margin-bottom: 8px;
  }
  .catalog-header p {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* ── Grid ── */
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) {
    .catalog-grid { grid-template-columns: 1fr; }
  }

  /* ── Card ── */
  .plan-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    padding: 28px 24px 24px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease;
    animation: cardPop 0.45s ease both;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .plan-card:nth-child(1) { animation-delay: 0.05s; }
  .plan-card:nth-child(2) { animation-delay: 0.12s; }
  .plan-card:nth-child(3) { animation-delay: 0.19s; }

  .plan-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.25s ease;
    border-radius: inherit;
  }
  .plan-card.blue-card::before   { background: radial-gradient(ellipse at top left, rgba(37,99,235,0.06), transparent 70%); }
  .plan-card.green-card::before  { background: radial-gradient(ellipse at top left, rgba(16,185,129,0.07), transparent 70%); }
  .plan-card.indigo-card::before { background: radial-gradient(ellipse at top left, rgba(99,102,241,0.07), transparent 70%); }

  .plan-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
  .plan-card:hover::before { opacity: 1; }

  .plan-card.blue-card:hover   { border-color: var(--blue); }
  .plan-card.green-card:hover  { border-color: var(--green); }
  .plan-card.indigo-card:hover { border-color: var(--indigo); }

  /* ── Icon ── */
  .plan-icon-wrap {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    transition: all 0.22s ease;
    position: relative;
    z-index: 1;
  }
  .blue-card   .plan-icon-wrap { background: var(--blue-light);   color: var(--blue);   border: 1.5px solid var(--border); }
  .green-card  .plan-icon-wrap { background: var(--green-light);  color: var(--green);  border: 1.5px solid #A7F3D0; }
  .indigo-card .plan-icon-wrap { background: var(--indigo-light); color: var(--indigo); border: 1.5px solid #C7D2FE; }

  .blue-card:hover   .plan-icon-wrap { background: var(--blue);   color: #fff; border-color: var(--blue);   box-shadow: 0 6px 18px rgba(37,99,235,0.35); }
  .green-card:hover  .plan-icon-wrap { background: var(--green);  color: #fff; border-color: var(--green);  box-shadow: 0 6px 18px rgba(16,185,129,0.35); }
  .indigo-card:hover .plan-icon-wrap { background: var(--indigo); color: #fff; border-color: var(--indigo); box-shadow: 0 6px 18px rgba(99,102,241,0.35); }

  /* ── Body ── */
  .plan-name {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 6px;
    letter-spacing: -0.2px;
    position: relative; z-index: 1;
  }
  .plan-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 20px;
    position: relative; z-index: 1;
    flex: 1;
  }

  /* ── Features ── */
  .plan-features {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .plan-feature {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    letter-spacing: 0.02em;
  }
  .feat-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .blue-card   .feat-dot { background: var(--blue); }
  .green-card  .feat-dot { background: var(--green); }
  .indigo-card .feat-dot { background: var(--indigo); }

  /* ── CTA ── */
  .plan-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    position: relative; z-index: 1;
    transition: all 0.2s;
  }
  .plan-cta-text {
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 600;
    transition: color 0.2s;
  }
  .blue-card   .plan-cta-text { color: var(--blue); }
  .green-card  .plan-cta-text { color: var(--green); }
  .indigo-card .plan-cta-text { color: var(--indigo); }

  .plan-cta-arrow {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease;
  }
  .blue-card   .plan-cta-arrow { background: var(--blue-light);   color: var(--blue); }
  .green-card  .plan-cta-arrow { background: var(--green-light);  color: var(--green); }
  .indigo-card .plan-cta-arrow { background: var(--indigo-light); color: var(--indigo); }

  .plan-card:hover .plan-cta-arrow {
    transform: translateX(3px);
  }
  .blue-card:hover   .plan-cta-arrow { background: var(--blue);   color: #fff; }
  .green-card:hover  .plan-cta-arrow { background: var(--green);  color: #fff; }
  .indigo-card:hover .plan-cta-arrow { background: var(--indigo); color: #fff; }

  /* ── Popular badge ── */
  .popular-badge {
    position: absolute;
    top: 16px; right: 16px;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
    z-index: 2;
  }
  .blue-card   .popular-badge { background: var(--blue-light);   color: var(--blue);   border: 1px solid var(--border); }
  .green-card  .popular-badge { background: var(--green-light);  color: var(--green);  border: 1px solid #A7F3D0; }
  .indigo-card .popular-badge { background: var(--indigo-light); color: var(--indigo); border: 1px solid #C7D2FE; }
`;

const PLANS = [
    {
        id: 'sal',
        name: 'HDFC-Style Salary Plus',
        desc: 'Instant credit assessment for salaried corporate employees with low documentation.',
        icon: <Briefcase size={22} />,
        colorClass: 'blue-card',
        badge: 'Most Popular',
        features: ['Salary slip based', 'Quick approval', 'No collateral'],
    },
    {
        id: 'home',
        name: 'SBI-Style Asset-Backed',
        desc: 'Long-term funding secured against residential or commercial property.',
        icon: <Home size={22} />,
        colorClass: 'green-card',
        badge: 'Best Rates',
        features: ['Property backed', 'High loan limit', 'Flexible tenure'],
    },
    {
        id: 'biz',
        name: 'MUDRA-Style Growth',
        desc: 'Collateral-free business loans designed for MSMEs and emerging entrepreneurs.',
        icon: <Rocket size={22} />,
        colorClass: 'indigo-card',
        badge: 'MSME Focus',
        features: ['No collateral', 'Govt. scheme', 'Fast disbursement'],
    },
];

const ProductCatalog = ({ onSelect }) => {
    return (
        <>
            <style>{styles}</style>
            <div className="catalog-root">

                <div className="catalog-header">
                    <div className="catalog-tag">Step 01 · Select Loan Product</div>
                    <h2>Choose Your Loan Program</h2>
                    <p>Select the product that best fits your financial profile.<br />Our AI will tailor the risk assessment accordingly.</p>
                </div>

                <div className="catalog-grid">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`plan-card ${plan.colorClass}`}
                            onClick={() => onSelect(plan)}
                        >
                            {plan.badge && <span className="popular-badge">{plan.badge}</span>}

                            <div className="plan-icon-wrap">{plan.icon}</div>

                            <div className="plan-name">{plan.name}</div>
                            <div className="plan-desc">{plan.desc}</div>

                            <div className="plan-features">
                                {plan.features.map((f) => (
                                    <div key={f} className="plan-feature">
                                        <span className="feat-dot" />
                                        {f}
                                    </div>
                                ))}
                            </div>

                            <div className="plan-cta">
                                <span className="plan-cta-text">Apply Now</span>
                                <span className="plan-cta-arrow">
                                    <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductCatalog;