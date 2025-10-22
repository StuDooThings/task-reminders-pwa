
import React, { useState } from 'react';
import { Task } from '../types';
import { PlusIcon } from './icons';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'isCompleted' | 'notified'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !date || !time) {
      alert('Please fill out all fields.');
      return;
    }

    const dueDate = new Date(`${date}T${time}`).toISOString();
    onAddTask({ text, dueDate });

    setText('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task-text" className="block text-sm font-medium text-gray-300 mb-1">
          Task
        </label>
        <input
          id="task-text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need to do?"
          className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-150"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="task-date" className="block text-sm font-medium text-gray-300 mb-1">
            Due Date
          </label>
          <input
            id="task-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-150"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="task-time" className="block text-sm font-medium text-gray-300 mb-1">
            Time
          </label>
          <input
            id="task-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-150"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50"
      >
        <PlusIcon />
        <span className="ml-2">Add Task</span>
      </button>
    </form>
  );
};

export default TaskForm;
