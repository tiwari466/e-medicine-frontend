import { useTheme } from "../../context/ThemeContext";

export default function AppearanceTab() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div>
      <h2>Appearance</h2>

      <label>
        Dark Mode
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(p => !p)}
        />
      </label>
    </div>
  );
}