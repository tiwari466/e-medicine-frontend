import "./SettingsLayout.css";

const NAV_ITEMS = [
  { icon: "👤", label: "Edit Profile", color: "#3b82f6" },
  { icon: "🔔", label: "Notification", color: "#f59e0b" },
  { icon: "🛡️", label: "Security",     color: "#10b981" },
  { icon: "🎨", label: "Appearance",   color: "#8b5cf6" },
  { icon: "❓", label: "Help & Support", color: "#f97316" },
];

export default function SettingsLayout({ children, activePage = "Edit Profile", onNavigate }) {
  return (
    <div className="settings-layout">

      {/* ── Sidebar ── */}
      <aside className="settings-sidebar">
        <h4>Settings</h4>

        {NAV_ITEMS.map(({ icon, label }) => (
          <button
            key={label}
            className={activePage === label ? "active" : ""}
            onClick={() => onNavigate?.(label)}
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </button>
        ))}

        {/* Doctor illustration card */}
        <div className="doctor-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
            alt="Doctor illustration"
          />
          <h3>We care about your health</h3>
          <p>Your health is our priority. Stay safe, stay healthy.</p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="settings-content">
        <div className="dashboard-link">
          ← 🏠 Back to Dashboard
        </div>

        {children}
      </div>

    </div>
  );
}
