import { useState, lazy, Suspense } from "react";
import Profile from "../pages/user/Profile";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const NotificationTab = lazy(() => import("./tabs/NotificationTab"));
const SecurityTab = lazy(() => import("./tabs/SecurityTab"));
const AppearanceTab = lazy(() => import("./tabs/AppearanceTab"));
const HelpTab = lazy(() => import("./tabs/HelpTab"));

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "notification":
        return <NotificationTab />;
      case "security":
        return <SecurityTab />;
      case "appearance":
        return <AppearanceTab />;
      case "help":
        return <HelpTab />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="settingsLayout">

      {/* SIDEBAR */}
      <div className={`settingsMenu ${collapsed ? "collapsed" : ""}`}>
        <div className="menuHeader">
          {!collapsed && <h3>Settings</h3>}
          <button onClick={() => setCollapsed(!collapsed)}>☰</button>
        </div>

        {[
          { key: "profile", icon: "👤", label: "Edit Profile" },
          { key: "notification", icon: "🔔", label: "Notification" },
          { key: "security", icon: "🔐", label: "Security" },
          { key: "appearance", icon: "🎨", label: "Appearance" },
          { key: "help", icon: "❓", label: "Help" },
        ].map(item => (
          <div
            key={item.key}
            className={`settingsItem ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="settingsContent">

        <div className="settingsTopBar">
          <button className="homeBtn" onClick={() => navigate("/medicines")}>
            🏠 Back to Dashboard
          </button>
        </div>

        <Suspense fallback={<div className="loader">Loading...</div>}>
          <div className="fadeAnimation">
            {renderTab()}
          </div>
        </Suspense>

      </div>
    </div>
  );
}