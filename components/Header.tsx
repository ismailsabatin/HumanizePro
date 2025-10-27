
import React from 'react';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="p-4 flex justify-end">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
      </button>
    </header>
  );
};

export default Header;
