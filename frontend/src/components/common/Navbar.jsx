import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const { logout } = useAuth();
  const { darkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">Task Manager</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;