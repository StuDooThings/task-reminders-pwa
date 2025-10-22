
import React from 'react';
import { Task } from '../types';
import { TrashIcon, CheckIcon, UndoIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);
};


const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const isPastDue = !task.isCompleted && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`
        flex items-center p-4 rounded-lg transition-all duration-300
        ${task.isCompleted ? 'bg-gray-800 opacity-60' : 'bg-gray-800 shadow-md'}
        ${isPastDue ? 'border-l-4 border-red-500' : 'border-l-4 border-teal-500'}
      `}
    >
      <div className="flex-grow">
        <p className={`font-medium text-lg ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-100'}`}>
          {task.text}
        </p>
        <p className={`text-sm ${task.isCompleted ? 'text-gray-600' : isPastDue ? 'text-red-400' : 'text-gray-400'}`}>
          {formatDate(task.dueDate)}
        </p>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`p-2 rounded-full transition-colors duration-200 
          ${task.isCompleted 
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'}`}
          aria-label={task.isCompleted ? 'Mark as not complete' : 'Mark as complete'}
        >
          {task.isCompleted ? <UndoIcon /> : <CheckIcon />}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
