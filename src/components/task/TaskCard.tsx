import React from 'react';
import {
  FiTrash2, FiCheck, FiClock,
  FiBriefcase, FiUser, FiHeart, FiBook, FiMoreHorizontal,
} from 'react-icons/fi';
import { Task } from '../../interfaces';
import { useTasks } from '../../context/TaskContext';

interface TaskCardProps {
  task: Task;
}

// Öncelik → görsel config
const PRIORITY_CONFIG = {
  low: {
    borderClass: 'border-l-emerald-400',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    label: 'Düşük',
  },
  medium: {
    borderClass: 'border-l-amber-400',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    label: 'Orta',
  },
  high: {
    borderClass: 'border-l-red-400',
    badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    label: 'Yüksek',
  },
} as const;

// Kategori → görsel config
const CATEGORY_CONFIG: Record<string, { label: string; icon: React.ReactNode }> = {
  work:      { label: 'İş',      icon: <FiBriefcase    className="w-3 h-3" /> },
  personal:  { label: 'Kişisel', icon: <FiUser         className="w-3 h-3" /> },
  health:    { label: 'Sağlık',  icon: <FiHeart        className="w-3 h-3" /> },
  education: { label: 'Eğitim',  icon: <FiBook         className="w-3 h-3" /> },
  other:     { label: 'Diğer',   icon: <FiMoreHorizontal className="w-3 h-3" /> },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskComplete, deleteTask } = useTasks();

  const priority = PRIORITY_CONFIG[task.priority];
  const category = CATEGORY_CONFIG[task.category];

  return (
    <div
      className={[
        'group relative bg-white dark:bg-stone-900',
        'border border-stone-100 dark:border-stone-800 border-l-4',
        priority.borderClass,
        'rounded-xl p-4 flex items-start gap-3.5',
        'transition-all duration-200',
        task.completed
          ? 'opacity-55'
          : 'hover:shadow-md hover:shadow-stone-200/70 dark:hover:shadow-stone-900/70 hover:-translate-y-0.5',
      ].join(' ')}
    >

      {/* Checkbox */}
      <button
        onClick={() => toggleTaskComplete(task.id)}
        aria-label={task.completed ? 'Tamamlandıyı geri al' : 'Tamamlandı olarak işaretle'}
        className={[
          'mt-0.5 w-5 h-5 shrink-0 rounded-full border-2',
          'flex items-center justify-center',
          'transition-all duration-200 cursor-pointer',
          task.completed
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-stone-300 dark:border-stone-600 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
        ].join(' ')}
      >
        {task.completed && (
          <FiCheck className="w-3 h-3 check-animate" strokeWidth={3} />
        )}
      </button>

      {/* İçerik */}
      <div className="flex-1 min-w-0">

        {/* Başlık + Öncelik Rozeti */}
        <div className="flex items-start flex-wrap gap-2 mb-1">
          <h3
            className={[
              'text-sm font-semibold leading-snug transition-colors',
              task.completed
                ? 'text-stone-400 dark:text-stone-500 line-through'
                : 'text-stone-900 dark:text-stone-50',
            ].join(' ')}
          >
            {task.title}
          </h3>
          <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${priority.badge}`}>
            {priority.label}
          </span>
        </div>

        {/* Açıklama */}
        {task.description && (
          <p
            className={[
              'text-xs leading-relaxed line-clamp-2 mb-2',
              task.completed
                ? 'text-stone-400 dark:text-stone-600'
                : 'text-stone-500 dark:text-stone-400',
            ].join(' ')}
          >
            {task.description}
          </p>
        )}

        {/* Meta: Kategori + Tarih */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
            {category.icon}
            {category.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500">
            <FiClock className="w-3 h-3" />
            {new Date(task.createdAt).toLocaleDateString('tr-TR')}
          </span>
        </div>

      </div>

      {/* Silme Butonu — hover'da görünür */}
      <button
        onClick={() => deleteTask(task.id)}
        aria-label="Görevi sil"
        title="Görevi Sil"
        className="shrink-0 p-1.5 rounded-lg cursor-pointer
                   opacity-0 group-hover:opacity-100
                   text-stone-300 dark:text-stone-600
                   hover:text-red-500 dark:hover:text-red-400
                   hover:bg-red-50 dark:hover:bg-red-900/20
                   transition-all duration-200"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>

    </div>
  );
};
