import React, { useState, useMemo } from 'react';
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
    setSearchQuery(query); // Input anında güncellenir (hızlı UX)
    debouncedSetQuery(query); // Filtreleme işlemi gecikmeli çalışır (performans)
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
    // 1. Durum Filtresi
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterStatus === 'pending' && task.completed) return false;
    
    // 2. Gelişmiş Arama Filtresi (Başlık, Açıklama, Kategori içinde)
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      
      const matchesTitle = task.title.toLowerCase().includes(q);
      const matchesDesc = task.description ? task.description.toLowerCase().includes(q) : false;
      const matchesCategory = categoryLabels[task.category].includes(q);
      
      // Eğer üçünden birinde bile eşleşme yoksa görevi gizle
      if (!matchesTitle && !matchesDesc && !matchesCategory) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Bugün Neler Yapacaksın?
        </h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-3 py-1 rounded-full">
          {tasks.length} Görev
        </span>
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
      
      {/* Görev Listesi (Sadece filtrelenmiş olanlar gönderiliyor) */}
      <TaskList tasks={filteredTasks} />
      
      {tasks.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
          <p className="text-gray-500 dark:text-gray-400">Henüz hiç görev eklemedin.</p>
        </div>
      )}
      
      {tasks.length > 0 && filteredTasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Aradığın kriterlere uygun görev bulunamadı.</p>
        </div>
      )}
    </div>
  );
};
