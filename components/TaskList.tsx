
import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { CalendarIcon, CheckCircleIcon } from './icons';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  const upcomingTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <section>
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-teal-300">
            <CalendarIcon />
            <span className="ml-2">Upcoming Tasks</span>
        </h2>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-3">
            {upcomingTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 bg-gray-800 p-4 rounded-lg">No upcoming tasks. Add one above!</p>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-500">
            <CheckCircleIcon />
            <span className="ml-2">Completed</span>
          </h2>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskList;
