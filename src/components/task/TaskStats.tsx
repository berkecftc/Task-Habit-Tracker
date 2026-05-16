import React from 'react';
import { FiList, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import { useTasks } from '../../context/TaskContext';

export const TaskStats: React.FC = () => {
  const { tasks } = useTasks();

  // İstatistik hesaplamaları
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      title: 'Toplam',
      value: totalTasks,
      icon: <FiList className="w-[18px] h-[18px]" />,
      iconClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      valueClass: 'text-stone-900 dark:text-stone-50',
    },
    {
      title: 'Tamamlanan',
      value: completedTasks,
      icon: <FiCheckCircle className="w-[18px] h-[18px]" />,
      iconClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      valueClass: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      title: 'Bekleyen',
      value: pendingTasks,
      icon: <FiClock className="w-[18px] h-[18px]" />,
      iconClass: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      valueClass: 'text-stone-900 dark:text-stone-50',
    },
    {
      title: 'Başarı Oranı',
      value: `%${completionRate}`,
      icon: <FiTrendingUp className="w-[18px] h-[18px]" />,
      iconClass: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
      valueClass: completionRate >= 50
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-stone-900 dark:text-stone-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl p-4
                     flex flex-col gap-3 cursor-default
                     hover:shadow-md hover:shadow-stone-200/60 dark:hover:shadow-stone-900/60
                     hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.iconClass}`}>
            {stat.icon}
          </div>
          <div>
            <p className={`text-2xl font-bold tracking-tight tabular-nums ${stat.valueClass}`}>
              {stat.value}
            </p>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-0.5">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
