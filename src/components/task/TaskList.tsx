import React from 'react';
import { TaskCard } from './TaskCard';
import { Task } from '../../interfaces';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Görevleri eklenme tarihine göre sondan başa sıralıyoruz
  const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);

  if (tasks.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {sortedTasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-slide-up"
          style={{
            animationDelay: `${index * 35}ms`,
            animationFillMode: 'both',
          }}
        >
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};
