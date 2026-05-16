import React from 'react';
import { FiTrash2, FiCheck, FiClock } from 'react-icons/fi';
import { Task } from '../../interfaces';
import { useTasks } from '../../context/TaskContext';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskComplete, deleteTask } = useTasks();

  // Öncelik durumlarına göre CSS renk haritası
  const priorityColors = {
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  // Kategorilerin Türkçe isim karşılıkları
  const categoryLabels: Record<string, string> = {
    work: 'İş',
    personal: 'Kişisel',
    health: 'Sağlık',
    education: 'Eğitim',
    other: 'Diğer',
  };

  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
      task.completed 
        ? 'bg-gray-50 border-gray-200 dark:bg-slate-800/40 dark:border-slate-700/50 opacity-60' 
        : 'bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/50'
    }`}>
      
      {/* Checkbox (Tamamlandı İşareti) */}
      <button 
        onClick={() => toggleTaskComplete(task.id)}
        className={`mt-1 w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed 
            ? 'bg-primary-500 border-primary-500 text-white' 
            : 'border-gray-300 dark:border-slate-600 hover:border-primary-400'
        }`}
      >
        {task.completed && <FiCheck className="w-4 h-4" />}
      </button>

      {/* İçerik Alanı */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <h3 className={`text-lg font-semibold truncate transition-colors ${
            task.completed ? 'text-gray-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-white'
          }`}>
            {task.title}
          </h3>
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${priorityColors[task.priority]}`}>
            {task.priority === 'low' ? 'DÜŞÜK' : task.priority === 'medium' ? 'ORTA' : 'YÜKSEK'}
          </span>
        </div>
        
        {task.description && (
          <p className={`text-sm mb-3 line-clamp-2 ${
            task.completed ? 'text-gray-400 dark:text-slate-500' : 'text-gray-600 dark:text-slate-300'
          }`}>
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-slate-400 mt-2">
          <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
            {categoryLabels[task.category]}
          </span>
          <div className="flex items-center gap-1.5">
            <FiClock className="w-3.5 h-3.5" />
            {new Date(task.createdAt).toLocaleDateString('tr-TR')}
          </div>
        </div>
      </div>

      {/* Silme Butonu */}
      <button 
        onClick={() => deleteTask(task.id)}
        className="p-2 shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
        title="Görevi Sil"
      >
        <FiTrash2 className="w-5 h-5" />
      </button>
    </div>
  );
};
