import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;