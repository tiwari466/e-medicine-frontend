import { useEffect, useState } from "react";
import { getNotificationSettings, saveNotificationSettings } from "../services/settingsApi";

export default function NotificationTab() {

  const [settings, setSettings] = useState({
    email: false,
    sms: false,
    orderUpdates: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await getNotificationSettings();
    if (res.success) {
      setSettings(res.data);
    }
  };

  const handleSave = async () => {
    await saveNotificationSettings(settings);
    alert("Saved");
  };

  return (
    <div>
      <h2>Notifications</h2>

      <label>
        <input
          type="checkbox"
          checked={settings.email}
          onChange={() => setSettings({ ...settings, email: !settings.email })}
        />
        Email Notifications
      </label>

      <label>
        <input
          type="checkbox"
          checked={settings.sms}
          onChange={() => setSettings({ ...settings, sms: !settings.sms })}
        />
        SMS Notifications
      </label>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}