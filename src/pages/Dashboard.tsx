import React, { useState, useMemo } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { TaskForm } from '../components/task/TaskForm';
import { TaskList } from '../components/task/TaskList';
import { TaskStats } from '../components/task/TaskStats';
import { TaskFilter } from '../components/task/TaskFilter';
import { useTasks } from '../context/TaskContext';
import debounce from 'lodash/debounce';

export const Dashboard: React.FC = () => {
  const { tasks } = useTasks();

  // Arama ve Filtreleme State'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  // Performans Optimizasyonu: Kullanıcı yazmayı bıraktıktan 300ms sonra arama tetiklenir
  const debouncedSetQuery = useMemo(
    () => debounce((q: string) => setDebouncedQuery(q), 300),
    []
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSetQuery(query);
  };

  // Kategorilerin Türkçe karşılıkları (Arama için)
  const categoryLabels: Record<string, string> = {
    work: 'iş',
    personal: 'kişisel',
    health: 'sağlık',
    education: 'eğitim',
    other: 'diğer',
  };

  // Filtreleme Mantığı
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterStatus === 'pending' && task.completed) return false;

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(q);
      const matchesDesc = task.description ? task.description.toLowerCase().includes(q) : false;
      const matchesCategory = categoryLabels[task.category].includes(q);
      if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-5">

      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Bugün Neler Yapacaksın?
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Görevlerini yönet, hedeflerine ulaş.
          </p>
        </div>
        {tasks.length > 0 && (
          <span className="shrink-0 text-sm font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full mt-1">
            {tasks.length} Görev
          </span>
        )}
      </div>

      {/* İstatistik Kartları */}
      <TaskStats />

      {/* Görev Ekleme Formu */}
      <TaskForm />

      {/* Arama ve Filtreleme */}
      {tasks.length > 0 && (
        <TaskFilter
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      )}

      {/* Görev Listesi */}
      <TaskList tasks={filteredTasks} />

      {/* Boş durum — hiç görev yok */}
      {tasks.length === 0 && (
        <div className="text-center py-16 rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/30 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <FiClipboard className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-stone-700 dark:text-stone-300 font-semibold">Henüz hiç görev eklemedin.</p>
          <p className="text-stone-400 dark:text-stone-600 text-sm mt-1">Yukarıdaki formu kullanarak başla.</p>
        </div>
      )}

      {/* Boş durum — filtre sonucu */}
      {tasks.length > 0 && filteredTasks.length === 0 && (
        <div className="text-center py-10 rounded-2xl bg-white/50 dark:bg-stone-900/30 border border-stone-100 dark:border-stone-800 animate-fade-in">
          <p className="text-stone-500 dark:text-stone-400 font-medium text-sm">
            Aradığın kriterlere uygun görev bulunamadı.
          </p>
        </div>
      )}

    </div>
  );
};
