import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);

    // Remove any existing theme classes
    document.documentElement.classList.remove('light', 'dark');

    // Determine if dark mode should be applied
    let isDarkMode = false;
    if (theme === 'system') {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDarkMode = theme === 'dark';
    }

    // Apply the appropriate theme class
    document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
    setIsDark(isDarkMode);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(e.matches ? 'dark' : 'light');
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};