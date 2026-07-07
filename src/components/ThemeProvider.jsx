import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({
  children,
  defaultCategory = "solid",
  defaultTheme = "violet",
}) {
  const [category, setCategory] = useState(defaultCategory);
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    let link = document.getElementById("ifamished-ui-theme");

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = "ifamished-ui-theme";
      document.head.appendChild(link);
    }

    link.href = `/themes/${category}/${theme}.css`;
  }, [category, theme]);

  return (
    <ThemeContext.Provider value={{ category, theme, setCategory, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
