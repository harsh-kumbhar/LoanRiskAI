import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AlertTriangle, CheckCircle2, FileDown, Info, X,
    Check, Ban, RefreshCw, Shield, Users, TrendingUp, Clock
} from 'lucide-react';

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
    --orange:       #F59E0B;
    --orange-light: #FFFBEB;
    --orange-border:#FCD34D;
    --indigo:       #6366F1;
    --indigo-light: #EEF2FF;
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
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.93) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ── Root ── */
  .bd-root {
    font-family: var(--font-body);
    animation: fadeSlideUp 0.45s ease both;
  }

  /* ── Top bar ── */
  .bd-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .bd-topbar-left {}
  .bd-topbar-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--blue);
    background: var(--blue-light);
    border: 1px solid var(--border);
    padding: 3px 12px;
    border-radius: 999px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .bd-topbar-title {
    font-family: var(--font-head);
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.4px;
    margin-bottom: 4px;
  }
  .bd-topbar-sub {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .bd-refresh-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--blue);
    background: var(--blue-light);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 10px 18px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .bd-refresh-btn:hover {
    background: var(--blue);
    color: #fff;
    border-color: var(--blue);
    box-shadow: 0 4px 14px var(--blue-glow);
  }
  .bd-refresh-btn:hover .bd-spin { animation: spin 0.6s linear; }

  /* ── Summary cards ── */
  .bd-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }
  @media (max-width: 860px) { .bd-summary { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 500px) { .bd-summary { grid-template-columns: 1fr; } }

  .bd-stat-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    animation: fadeSlideUp 0.4s ease both;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  .bd-stat-card:nth-child(1) { animation-delay: 0.05s; }
  .bd-stat-card:nth-child(2) { animation-delay: 0.10s; }
  .bd-stat-card:nth-child(3) { animation-delay: 0.15s; }
  .bd-stat-card:nth-child(4) { animation-delay: 0.20s; }

  .bd-stat-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .bd-stat-icon.blue   { background: var(--blue-light);   color: var(--blue);   border: 1px solid var(--border); }
  .bd-stat-icon.green  { background: var(--green-light);  color: var(--green);  border: 1px solid var(--green-border); }
  .bd-stat-icon.red    { background: var(--red-light);    color: var(--red);    border: 1px solid var(--red-border); }
  .bd-stat-icon.orange { background: var(--orange-light); color: var(--orange); border: 1px solid var(--orange-border); }

  .bd-stat-val {
    font-family: var(--font-head);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.3px;
    line-height: 1;
    margin-bottom: 3px;
  }
  .bd-stat-label {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* ── Table card ── */
  .bd-table-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  /* ── Table ── */
  .bd-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  .bd-table thead {
    background: var(--bg);
    border-bottom: 1.5px solid var(--border);
  }
  .bd-table th {
    padding: 14px 20px;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }
  .bd-table th:last-child { text-align: right; }

  .bd-table tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s ease;
    animation: rowIn 0.35s ease both;
  }
  .bd-table tbody tr:last-child { border-bottom: none; }
  .bd-table tbody tr:hover { background: var(--bg); }
  .bd-table tbody tr.row-approved { background: rgba(16,185,129,0.04); }
  .bd-table tbody tr.row-rejected { background: rgba(239,68,68,0.04); }

  .bd-table td { padding: 16px 20px; vertical-align: middle; }
  .bd-table td:last-child { text-align: right; }

  /* ── Cell: applicant ── */
  .td-name {
    font-family: var(--font-head);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 3px;
  }
  .td-product {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-light);
    letter-spacing: 0.04em;
  }

  /* ── Cell: AI risk ── */
  .td-ai-status {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .td-ai-status.approved { color: var(--green); }
  .td-ai-status.declined { color: var(--red); }
  .td-rate {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* ── Cell: integrity badge ── */
  .integrity-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .integrity-badge.warn   { background: var(--orange-light); color: var(--orange); border: 1px solid var(--orange-border); }
  .integrity-badge.clean  { background: var(--green-light);  color: var(--green);  border: 1px solid var(--green-border); }

  /* ── Action buttons ── */
  .bd-actions { display: flex; align-items: center; justify-content: flex-end; gap: 6px; flex-wrap: wrap; }

  .bd-icon-btn {
    width: 34px; height: 34px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    border: 1.5px solid var(--border);
    background: var(--surface);
    transition: all 0.18s ease;
  }
  .bd-icon-btn.info-btn   { color: var(--indigo); }
  .bd-icon-btn.info-btn:hover   { background: var(--indigo-light); border-color: var(--indigo); }
  .bd-icon-btn.dl-btn     { color: var(--text-muted); }
  .bd-icon-btn.dl-btn:hover     { background: var(--blue-light); border-color: var(--blue); color: var(--blue); }
  .bd-icon-btn.approve-btn { color: var(--green); border-color: var(--green-border); background: var(--green-light); }
  .bd-icon-btn.approve-btn:hover { background: var(--green); color: #fff; box-shadow: 0 4px 12px rgba(16,185,129,0.35); }
  .bd-icon-btn.reject-btn  { color: var(--red); border-color: var(--red-border); background: var(--red-light); }
  .bd-icon-btn.reject-btn:hover  { background: var(--red); color: #fff; box-shadow: 0 4px 12px rgba(239,68,68,0.3); }

  .bd-decision-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 8px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .bd-decision-badge.approved { background: var(--green); color: #fff; }
  .bd-decision-badge.rejected { background: var(--red);   color: #fff; }

  /* ── Empty state ── */
  .bd-empty {
    padding: 60px 20px;
    text-align: center;
    color: var(--text-light);
  }
  .bd-empty-icon {
    width: 56px; height: 56px;
    background: var(--surface-2);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px;
    color: var(--text-light);
  }
  .bd-empty-title {
    font-family: var(--font-head);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .bd-empty-sub {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-light);
    letter-spacing: 0.04em;
  }

  /* ── MODAL ── */
  .bd-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.65);
    backdrop-filter: blur(8px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.2s ease both;
  }
  .bd-modal {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    width: 100%;
    max-width: 520px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    animation: modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  .bd-modal-header {
    padding: 22px 24px 18px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .bd-modal-header-left { display: flex; align-items: center; gap: 12px; }
  .bd-modal-icon {
    width: 40px; height: 40px;
    background: var(--indigo-light);
    border: 1.5px solid #C7D2FE;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--indigo);
    flex-shrink: 0;
  }
  .bd-modal-title {
    font-family: var(--font-head);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 2px;
  }
  .bd-modal-sub {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }
  .bd-modal-close {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    background: transparent;
    border: 1.5px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.18s;
    flex-shrink: 0;
  }
  .bd-modal-close:hover { background: var(--red-light); border-color: var(--red-border); color: var(--red); }

  .bd-modal-body {
    padding: 20px 24px;
    max-height: 50vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }
  .bd-modal-body::-webkit-scrollbar { width: 4px; }
  .bd-modal-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  .bd-ev-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 0;
    border-bottom: 1px solid var(--border);
  }
  .bd-ev-row:last-child { border-bottom: none; }
  .bd-ev-key {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .bd-ev-val {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--blue);
    background: var(--blue-light);
    border: 1px solid var(--border);
    padding: 3px 10px;
    border-radius: 6px;
  }

  .bd-modal-footer {
    padding: 14px 24px;
    border-top: 1px solid var(--border);
    background: var(--bg);
    display: flex;
    justify-content: flex-end;
  }
  .bd-modal-close-btn {
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-muted);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 9px 18px;
    cursor: pointer;
    transition: all 0.18s;
  }
  .bd-modal-close-btn:hover { background: var(--blue-light); color: var(--blue); border-color: var(--blue); }
`;

const BankerDashboard = () => {
    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => { fetchApps(); }, []);

    const fetchApps = () => {
        setRefreshing(true);
        axios.get('http://127.0.0.1:5000/api/admin/applications')
            .then(res => setApps(res.data))
            .finally(() => setTimeout(() => setRefreshing(false), 600));
    };

    const updateStatus = (id, newStatus) => {
        setApps(apps.map(app => app.id === id ? { ...app, final_decision: newStatus } : app));
        alert(`Application #${id} has been ${newStatus} by the Banker.`);
    };

    const downloadReport = (app) => {
        const reportContent = `
LOAN RISK ANALYSIS REPORT
--------------------------
Application ID : ${app.id}
Status         : ${app.final_decision || 'PENDING REVIEW'}
Applicant      : ${app.applicant_name}
Product        : ${app.loan_product}
AI VERDICT     : ${app.ai_status} (${app.ai_confidence}%)
INTEGRITY      : ${app.integrity_flag}
    `.trim();
        const el = document.createElement('a');
        el.href = URL.createObjectURL(new Blob([reportContent], { type: 'text/plain' }));
        el.download = `Audit_Report_${app.applicant_name}.txt`;
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    };

    // Summary counts
    const total = apps.length;
    const approved = apps.filter(a => a.final_decision === 'Approved').length;
    const rejected = apps.filter(a => a.final_decision === 'Rejected').length;
    const pending = apps.filter(a => !a.final_decision).length;

    return (
        <>
            <style>{styles}</style>
            <div className="bd-root">

                {/* ── Top bar ── */}
                <div className="bd-topbar">
                    <div className="bd-topbar-left">
                        <div className="bd-topbar-tag"><Shield size={10} /> Banker Audit Console</div>
                        <div className="bd-topbar-title">Application Queue</div>
                        <div className="bd-topbar-sub">Review AI recommendations and provide final authorization.</div>
                    </div>
                    <button className="bd-refresh-btn" onClick={fetchApps}>
                        <RefreshCw size={14} className="bd-spin" style={refreshing ? { animation: 'spin 0.6s linear infinite' } : {}} />
                        Refresh Queue
                    </button>
                </div>

                {/* ── Summary cards ── */}
                <div className="bd-summary">
                    <div className="bd-stat-card">
                        <div className="bd-stat-icon blue"><Users size={16} /></div>
                        <div>
                            <div className="bd-stat-val">{total}</div>
                            <div className="bd-stat-label">Total Apps</div>
                        </div>
                    </div>
                    <div className="bd-stat-card">
                        <div className="bd-stat-icon green"><Check size={16} /></div>
                        <div>
                            <div className="bd-stat-val">{approved}</div>
                            <div className="bd-stat-label">Approved</div>
                        </div>
                    </div>
                    <div className="bd-stat-card">
                        <div className="bd-stat-icon red"><Ban size={16} /></div>
                        <div>
                            <div className="bd-stat-val">{rejected}</div>
                            <div className="bd-stat-label">Rejected</div>
                        </div>
                    </div>
                    <div className="bd-stat-card">
                        <div className="bd-stat-icon orange"><Clock size={16} /></div>
                        <div>
                            <div className="bd-stat-val">{pending}</div>
                            <div className="bd-stat-label">Pending</div>
                        </div>
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="bd-table-card">
                    <table className="bd-table">
                        <thead>
                            <tr>
                                <th>Applicant Info</th>
                                <th>AI Risk Assessment</th>
                                <th>Integrity Check</th>
                                <th>Executive Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apps.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>
                                        <div className="bd-empty">
                                            <div className="bd-empty-icon"><TrendingUp size={22} /></div>
                                            <div className="bd-empty-title">No Applications Yet</div>
                                            <div className="bd-empty-sub">Applications will appear here once submitted.</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                apps.map((app, i) => (
                                    <tr
                                        key={app.id}
                                        style={{ animationDelay: `${i * 0.06}s` }}
                                        className={
                                            app.final_decision === 'Approved' ? 'row-approved' :
                                                app.final_decision === 'Rejected' ? 'row-rejected' : ''
                                        }
                                    >
                                        {/* Applicant */}
                                        <td>
                                            <div className="td-name">{app.applicant_name}</div>
                                            <div className="td-product">{app.loan_product}</div>
                                        </td>

                                        {/* AI Risk */}
                                        <td>
                                            <div className={`td-ai-status ${app.ai_status === 'Approved' ? 'approved' : 'declined'}`}>
                                                {app.ai_status} · {app.ai_confidence}%
                                            </div>
                                            <div className="td-rate">Rate: {app.offered_rate}</div>
                                        </td>

                                        {/* Integrity */}
                                        <td>
                                            {app.integrity_flag === 'User Edited' ? (
                                                <span className="integrity-badge warn">
                                                    <AlertTriangle size={11} /> Manually Edited
                                                </span>
                                            ) : (
                                                <span className="integrity-badge clean">
                                                    <CheckCircle2 size={11} /> Verified Scan
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div className="bd-actions">
                                                <button
                                                    className="bd-icon-btn info-btn"
                                                    title="View Bayesian Evidence"
                                                    onClick={() => setSelectedApp(app)}
                                                >
                                                    <Info size={15} />
                                                </button>
                                                <button
                                                    className="bd-icon-btn dl-btn"
                                                    title="Download Audit Report"
                                                    onClick={() => downloadReport(app)}
                                                >
                                                    <FileDown size={15} />
                                                </button>

                                                {!app.final_decision ? (
                                                    <>
                                                        <button
                                                            className="bd-icon-btn approve-btn"
                                                            title="Approve"
                                                            onClick={() => updateStatus(app.id, 'Approved')}
                                                        >
                                                            <Check size={15} />
                                                        </button>
                                                        <button
                                                            className="bd-icon-btn reject-btn"
                                                            title="Reject"
                                                            onClick={() => updateStatus(app.id, 'Rejected')}
                                                        >
                                                            <Ban size={15} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className={`bd-decision-badge ${app.final_decision === 'Approved' ? 'approved' : 'rejected'}`}>
                                                        {app.final_decision === 'Approved' ? <Check size={11} /> : <Ban size={11} />}
                                                        {app.final_decision}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Evidence Modal ── */}
                {selectedApp && (
                    <div className="bd-modal-overlay" onClick={() => setSelectedApp(null)}>
                        <div className="bd-modal" onClick={(e) => e.stopPropagation()}>

                            <div className="bd-modal-header">
                                <div className="bd-modal-header-left">
                                    <div className="bd-modal-icon"><Info size={18} /></div>
                                    <div>
                                        <div className="bd-modal-title">Evidence Analysis</div>
                                        <div className="bd-modal-sub">Applicant · {selectedApp.applicant_name}</div>
                                    </div>
                                </div>
                                <button className="bd-modal-close" onClick={() => setSelectedApp(null)}>
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="bd-modal-body">
                                {Object.entries(selectedApp.full_details).map(([key, value]) => (
                                    <div key={key} className="bd-ev-row">
                                        <span className="bd-ev-key">{key.replace(/_/g, ' ')}</span>
                                        <span className="bd-ev-val">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bd-modal-footer">
                                <button className="bd-modal-close-btn" onClick={() => setSelectedApp(null)}>
                                    Close Panel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};

export default BankerDashboard;