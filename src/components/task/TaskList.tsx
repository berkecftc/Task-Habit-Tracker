import React from 'react';
import { Task } from '../../interfaces';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Görevleri eklenme tarihine göre sondan başa sıralıyoruz
  const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
