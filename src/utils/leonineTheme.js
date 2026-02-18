// Shared Leonine dark/gold admin theme
// Place this at: src/utils/leonineTheme.js
// Then import in each sub-panel: import { LEONINE_CSS } from "../../utils/leonineTheme";

export const LEONINE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --gold:#c9a84c; --saffron:#d4891a; --gold-light:#f0d080;
    --jungle-deep:#060e07; --jungle-dark:#0d1f0f; --jungle-mid:#1a3a1e;
  }

  .ln-page {
    min-height:100%;
    background:linear-gradient(160deg,#060e07 0%,#0a1a0c 50%,#081005 100%);
    font-family:'Jost',sans-serif; color:#d8d0c0;
    display:flex; flex-direction:column;
  }

  /* Header */
  .ln-header {
    background:rgba(6,14,7,0.95); border-bottom:1px solid rgba(201,168,76,0.15);
    padding:15px 22px; display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:12px; backdrop-filter:blur(12px);
    position:sticky; top:0; z-index:10;
  }
  .ln-header-icon {
    width:36px; height:36px; border-radius:11px; flex-shrink:0;
    background:linear-gradient(135deg,rgba(201,168,76,0.12),rgba(26,58,30,0.5));
    border:1px solid rgba(201,168,76,0.25);
    display:flex; align-items:center; justify-content:center;
    color:#c9a84c; font-size:14px;
  }
  .ln-header-title {
    font-family:'Playfair Display',serif; font-size:1.05rem;
    font-weight:500; color:#f0d080; letter-spacing:0.03em;
  }
  .ln-header-sub {
    font-size:9px; letter-spacing:0.22em; text-transform:uppercase;
    color:rgba(201,168,76,0.4); margin-top:1px;
  }
  .ln-stat-pill {
    display:flex; align-items:center; gap:8px;
    background:rgba(201,168,76,0.06); border:1px solid rgba(201,168,76,0.18);
    border-radius:12px; padding:7px 15px;
  }
  .ln-stat-pill-label { font-size:9px; color:rgba(201,168,76,0.5); letter-spacing:0.2em; text-transform:uppercase; }
  .ln-stat-pill-value {
    font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:600; line-height:1;
    background:linear-gradient(135deg,#c9a84c,#f0d080,#d4891a);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }

  /* Primary button */
  .ln-btn-primary {
    display:inline-flex; align-items:center; gap:7px;
    padding:8px 16px; border-radius:10px; cursor:pointer;
    background:linear-gradient(135deg,#c9a84c,#d4891a);
    border:none; color:#0d1f0f;
    font-family:'Jost',sans-serif; font-size:9px; font-weight:600;
    letter-spacing:0.18em; text-transform:uppercase;
    transition:all 0.2s ease; box-shadow:0 4px 14px rgba(201,168,76,0.25);
  }
  .ln-btn-primary:hover { transform:translateY(-1px); box-shadow:0 7px 22px rgba(201,168,76,0.35); filter:brightness(1.05); }

  /* Table */
  .ln-table-card {
    background:linear-gradient(135deg,rgba(13,31,15,0.97),rgba(10,22,12,0.99));
    border:1px solid rgba(201,168,76,0.1); border-radius:16px; overflow:hidden;
  }
  .ln-table { width:100%; border-collapse:collapse; }
  .ln-thead tr { background:rgba(201,168,76,0.03); border-bottom:1px solid rgba(201,168,76,0.1); }
  .ln-thead th {
    padding:11px 15px; text-align:left;
    font-size:8.5px; font-weight:600; letter-spacing:0.3em; text-transform:uppercase;
    color:rgba(201,168,76,0.45); white-space:nowrap;
  }
  .ln-thead th.center { text-align:center; }
  .ln-tbody tr { border-bottom:1px solid rgba(201,168,76,0.05); transition:background 0.18s; }
  .ln-tbody tr:last-child { border-bottom:none; }
  .ln-tbody tr:hover { background:rgba(201,168,76,0.035); }
  .ln-tbody td { padding:11px 15px; font-size:12px; color:#c8bfaf; vertical-align:middle; }
  .ln-tbody td.center { text-align:center; }
  .ln-mono { font-family:monospace; }

  /* ID badge */
  .ln-id-badge {
    display:inline-block; font-family:monospace; font-size:11px; font-weight:600;
    color:#c9a84c; background:rgba(201,168,76,0.07);
    border:1px solid rgba(201,168,76,0.18); padding:3px 8px; border-radius:6px;
  }

  /* Status badges */
  .ln-badge {
    display:inline-flex; align-items:center; gap:4px;
    font-size:8.5px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase;
    padding:3px 9px; border-radius:999px;
  }
  .ln-badge-confirmed  { background:rgba(74,124,82,0.14);  border:1px solid rgba(74,124,82,0.3);    color:#7cad7a; }
  .ln-badge-pending    { background:rgba(201,168,76,0.09);  border:1px solid rgba(201,168,76,0.28);  color:#c9a84c; }
  .ln-badge-cancelled  { background:rgba(229,115,115,0.09); border:1px solid rgba(229,115,115,0.28); color:#e57373; }
  .ln-badge-visible    { background:rgba(74,124,82,0.14);   border:1px solid rgba(74,124,82,0.28);   color:#7cad7a; }
  .ln-badge-hidden     { background:rgba(100,100,100,0.12); border:1px solid rgba(100,100,100,0.25); color:#888; }
  .ln-badge-active     { background:rgba(74,124,82,0.14);   border:1px solid rgba(74,124,82,0.28);   color:#7cad7a; }
  .ln-badge-disabled   { background:rgba(229,115,115,0.09); border:1px solid rgba(229,115,115,0.28); color:#e57373; }
  .ln-badge-admin      { background:rgba(167,139,250,0.1);  border:1px solid rgba(167,139,250,0.28); color:#a78bfa; }
  .ln-badge-user       { background:rgba(201,168,76,0.07);  border:1px solid rgba(201,168,76,0.2);   color:rgba(201,168,76,0.65); }
  .ln-badge-customer   { background:rgba(96,165,250,0.1);   border:1px solid rgba(96,165,250,0.28);  color:#60a5fa; }
  .ln-badge-available  { background:rgba(74,124,82,0.14);   border:1px solid rgba(74,124,82,0.3);    color:#7cad7a; }
  .ln-badge-unavailable{ background:rgba(229,115,115,0.09); border:1px solid rgba(229,115,115,0.28); color:#e57373; }

  /* Action buttons */
  .ln-action-btn {
    width:28px; height:28px; border-radius:8px; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    font-size:11px; transition:all 0.18s; border:1px solid transparent;
  }
  .ln-action-edit    { background:rgba(201,168,76,0.07);  color:rgba(201,168,76,0.6);    border-color:rgba(201,168,76,0.18); }
  .ln-action-edit:hover { background:rgba(201,168,76,0.16); color:#c9a84c; border-color:rgba(201,168,76,0.4); }
  .ln-action-delete  { background:rgba(229,115,115,0.07); color:rgba(229,115,115,0.55); border-color:rgba(229,115,115,0.18); }
  .ln-action-delete:hover { background:rgba(229,115,115,0.16); color:#e57373; border-color:rgba(229,115,115,0.4); }
  .ln-action-eye     { background:rgba(96,165,250,0.07);  color:rgba(96,165,250,0.55);  border-color:rgba(96,165,250,0.18); }
  .ln-action-eye:hover { background:rgba(96,165,250,0.16); color:#60a5fa; border-color:rgba(96,165,250,0.4); }
  .ln-action-role    { background:rgba(167,139,250,0.07); color:rgba(167,139,250,0.55); border-color:rgba(167,139,250,0.18); }
  .ln-action-role:hover { background:rgba(167,139,250,0.16); color:#a78bfa; border-color:rgba(167,139,250,0.4); }
  .ln-action-disable { background:rgba(251,191,36,0.07);  color:rgba(251,191,36,0.55);  border-color:rgba(251,191,36,0.18); }
  .ln-action-disable:hover { background:rgba(251,191,36,0.16); color:#fbbf24; border-color:rgba(251,191,36,0.4); }
  .ln-action-enable  { background:rgba(74,124,82,0.09);   color:rgba(124,173,122,0.6);  border-color:rgba(74,124,82,0.22); }
  .ln-action-enable:hover { background:rgba(74,124,82,0.18); color:#7cad7a; }

  /* Empty & loading */
  .ln-empty { padding:56px 20px; text-align:center; }
  .ln-empty-icon  { font-size:2.2rem; color:rgba(201,168,76,0.12); margin-bottom:12px; }
  .ln-empty-title { font-family:'Playfair Display',serif; font-size:0.95rem; color:rgba(245,240,232,0.4); margin-bottom:5px; }
  .ln-empty-sub   { font-size:10px; color:rgba(200,190,175,0.25); letter-spacing:0.1em; }
  .ln-loading { padding:56px 20px; text-align:center; }
  .ln-spinner { width:26px; height:26px; border-radius:50%; border:2px solid rgba(201,168,76,0.12); border-top-color:#c9a84c; animation:ln-spin 0.8s linear infinite; margin:0 auto 12px; }
  @keyframes ln-spin { to { transform:rotate(360deg); } }
  .ln-loading-text { font-size:9px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(201,168,76,0.35); }

  /* Pagination */
  .ln-pagination {
    background:rgba(6,14,7,0.92); border-top:1px solid rgba(201,168,76,0.1);
    padding:11px 22px; display:flex; align-items:center; justify-content:space-between; gap:12px;
    backdrop-filter:blur(12px);
  }
  .ln-page-info { font-size:9px; color:rgba(201,168,76,0.35); letter-spacing:0.18em; text-transform:uppercase; }
  .ln-page-btn {
    width:30px; height:30px; border-radius:8px; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:600; font-family:'Jost',sans-serif;
    background:rgba(201,168,76,0.04); border:1px solid rgba(201,168,76,0.12);
    color:rgba(201,168,76,0.45); transition:all 0.18s;
  }
  .ln-page-btn:hover:not(:disabled) { background:rgba(201,168,76,0.1); color:#c9a84c; border-color:rgba(201,168,76,0.3); }
  .ln-page-btn:disabled { opacity:0.2; cursor:not-allowed; }
  .ln-page-btn.active { background:linear-gradient(135deg,#c9a84c,#d4891a); color:#0d1f0f; border-color:transparent; box-shadow:0 2px 10px rgba(201,168,76,0.3); }

  /* Filter tabs */
  .ln-filter-bar {
    background:rgba(6,14,7,0.85); border-bottom:1px solid rgba(201,168,76,0.08);
    padding:9px 22px; display:flex; align-items:center; gap:7px; flex-wrap:wrap;
  }
  .ln-filter-btn {
    font-size:8.5px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase;
    padding:5px 12px; border-radius:8px; cursor:pointer;
    border:1px solid rgba(201,168,76,0.12); background:transparent;
    color:rgba(201,168,76,0.35); font-family:'Jost',sans-serif; transition:all 0.18s;
  }
  .ln-filter-btn:hover { border-color:rgba(201,168,76,0.3); color:rgba(201,168,76,0.65); background:rgba(201,168,76,0.04); }
  .ln-filter-btn.active { background:rgba(201,168,76,0.1); border-color:rgba(201,168,76,0.4); color:#c9a84c; }

  /* Search */
  .ln-search-wrap { position:relative; }
  .ln-search-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:rgba(201,168,76,0.3); font-size:10px; pointer-events:none; }
  .ln-search-input {
    background:rgba(201,168,76,0.05); border:1px solid rgba(201,168,76,0.15);
    color:#d8d0c0; font-family:'Jost',sans-serif; font-size:12px;
    border-radius:10px; padding:8px 12px 8px 30px; width:210px;
    outline:none; transition:all 0.2s;
  }
  .ln-search-input::placeholder { color:rgba(201,168,76,0.25); }
  .ln-search-input:focus { border-color:rgba(201,168,76,0.38); background:rgba(201,168,76,0.07); box-shadow:0 0 0 3px rgba(201,168,76,0.07); }

  /* Category cards */
  .ln-cat-card {
    background:linear-gradient(135deg,rgba(13,31,15,0.97),rgba(10,22,12,0.99));
    border:1px solid rgba(201,168,76,0.1); border-radius:14px;
    overflow:hidden; transition:all 0.28s cubic-bezier(0.4,0,0.2,1);
  }
  .ln-cat-card:hover { border-color:rgba(201,168,76,0.26); box-shadow:0 10px 36px rgba(0,0,0,0.4); transform:translateY(-2px); }

  /* Gallery cards */
  .ln-gallery-card {
    background:linear-gradient(135deg,rgba(13,31,15,0.97),rgba(10,22,12,0.99));
    border:1px solid rgba(201,168,76,0.1); border-radius:14px;
    overflow:hidden; transition:all 0.28s cubic-bezier(0.4,0,0.2,1);
  }
  .ln-gallery-card:hover { border-color:rgba(201,168,76,0.26); box-shadow:0 10px 36px rgba(0,0,0,0.4); transform:translateY(-2px); }

  /* FAB */
  .ln-fab {
    position:fixed; bottom:28px; right:28px; z-index:50;
    width:48px; height:48px; border-radius:50%; cursor:pointer;
    background:linear-gradient(135deg,#c9a84c,#d4891a);
    border:none; color:#0d1f0f; font-size:16px;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 7px 24px rgba(201,168,76,0.38);
    transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ln-fab:hover { transform:scale(1.1) translateY(-2px); box-shadow:0 12px 32px rgba(201,168,76,0.48); }

  /* Modal */
  .ln-modal-overlay {
    position:fixed; inset:0; z-index:100;
    background:rgba(6,14,7,0.75); backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center;
  }
  .ln-modal {
    background:linear-gradient(135deg,#0d1f0f,#162b18);
    border:1px solid rgba(201,168,76,0.2); border-radius:18px;
    padding:26px; width:100%; max-width:310px; margin:16px;
    box-shadow:0 40px 80px rgba(0,0,0,0.6);
  }
  .ln-modal-title { font-family:'Playfair Display',serif; font-size:1rem; color:#f0d080; margin-bottom:5px; }
  .ln-modal-sub   { font-size:10px; color:rgba(200,190,175,0.45); letter-spacing:0.06em; margin-bottom:18px; }
  .ln-radio-option {
    display:flex; align-items:center; gap:10px; padding:9px 13px;
    border-radius:9px; cursor:pointer; border:1px solid rgba(201,168,76,0.1);
    background:transparent; transition:all 0.18s; margin-bottom:7px;
  }
  .ln-radio-option.selected { border-color:rgba(201,168,76,0.38); background:rgba(201,168,76,0.07); }
  .ln-radio-option:hover:not(.selected) { border-color:rgba(201,168,76,0.22); background:rgba(201,168,76,0.04); }
  .ln-radio-label { font-size:12px; font-weight:500; color:#d8d0c0; text-transform:capitalize; }
  .ln-gold-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent); margin:14px 0; }

  /* Scrollbar */
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:#060e07; }
  ::-webkit-scrollbar-thumb { background:rgba(201,168,76,0.22); border-radius:2px; }

  /* Animation */
  @keyframes ln-fadeUp { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
  .ln-fade-up { animation:ln-fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }
`;