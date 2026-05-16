import React from 'react';
import { FiCheckSquare, FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '../../hooks/useDarkMode';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-20 bg-amber-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-amber-100 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 dark:bg-amber-600 flex items-center justify-center shadow-sm shadow-amber-400/40">
            <FiCheckSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Taskify
          </span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-500 dark:text-stone-400
                     hover:bg-stone-100 dark:hover:bg-stone-800
                     hover:text-stone-800 dark:hover:text-stone-200
                     transition-all duration-200 cursor-pointer"
        >
          {isDarkMode
            ? <FiSun className="w-[18px] h-[18px]" />
            : <FiMoon className="w-[18px] h-[18px]" />
          }
        </button>

      </div>
    </header>
  );
};
