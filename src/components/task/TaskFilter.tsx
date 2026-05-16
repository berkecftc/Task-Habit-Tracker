import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface TaskFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: 'all' | 'completed' | 'pending';
  setFilterStatus: (status: 'all' | 'completed' | 'pending') => void;
}

const FILTERS: { value: 'all' | 'completed' | 'pending'; label: string }[] = [
  { value: 'all',       label: 'Tümü' },
  { value: 'pending',   label: 'Bekleyenler' },
  { value: 'completed', label: 'Tamamlananlar' },
];

export const TaskFilter: React.FC<TaskFilterProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* Arama Çubuğu */}
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Görevlerde ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700
                     bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100
                     placeholder:text-stone-400 dark:placeholder:text-stone-500
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     transition-all duration-200 text-sm font-medium"
        />
      </div>

      {/* Durum Filtresi — Pill Butonlar */}
      <div className="flex gap-1 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterStatus(f.value)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              filterStatus === f.value
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-400/30'
                : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

    </div>
  );
};
