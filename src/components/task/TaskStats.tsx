import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { FiCheckCircle, FiClock, FiList, FiTrendingUp } from 'react-icons/fi';

export const TaskStats: React.FC = () => {
  const { tasks } = useTasks();

  // İstatistik hesaplamaları
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      title: 'Toplam Görev',
      value: totalTasks,
      icon: <FiList className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Tamamlanan',
      value: completedTasks,
      icon: <FiCheckCircle className="w-6 h-6 text-green-500" />,
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Bekleyen',
      value: pendingTasks,
      icon: <FiClock className="w-6 h-6 text-yellow-500" />,
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Başarı Oranı',
      value: `%${completionRate}`,
      icon: <FiTrendingUp className="w-6 h-6 text-purple-500" />,
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 flex items-center gap-4 transition-colors duration-300"
        >
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
