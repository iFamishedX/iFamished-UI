import { useTheme } from "./ThemeProvider";
import { GlassButton } from "./GlassButton";

const THEME_CATEGORIES = {
  "cold-blue": ["arc", "glacier", "tundra"],
  "fire": ["ember", "flare"],
  "premium": ["aurora", "dream", "galaxy", "nebula", "plasma"],
  "solid": ["aqua", "emerald", "obsidian", "violet"]
};

export default function ThemeSwitcher() {
  const { category, theme, setCategory, setTheme } = useTheme();

  return (
    <div className="ifu-theme-switcher">
      <select
        className="glass-btn"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {Object.keys(THEME_CATEGORIES).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="glass-btn"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {THEME_CATEGORIES[category].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
