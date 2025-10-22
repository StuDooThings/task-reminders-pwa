import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import NotificationPermission from './components/NotificationPermission';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage', error);
      return [];
    }
  });
  
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage', error);
    }
  }, [tasks]);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const checkDueTasks = useCallback(() => {
    const now = new Date().getTime();
    tasks.forEach(task => {
      if (!task.isCompleted && !task.notified && new Date(task.dueDate).getTime() <= now) {
        if (notificationPermission === 'granted') {
          new Notification('Reminder!', {
            body: task.text,
            icon: '/favicon.ico'
          });
          // Mark as notified to prevent repeated notifications
          setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? { ...t, notified: true } : t));
        }
      }
    });
  }, [tasks, notificationPermission]);

  useEffect(() => {
    if (notificationPermission === 'granted') {
      const interval = setInterval(checkDueTasks, 10000); // Check every 10 seconds
      return () => clearInterval(interval);
    }
  }, [checkDueTasks, notificationPermission]);

  const addTask = (task: Omit<Task, 'id' | 'isCompleted' | 'notified'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...task,
      isCompleted: false,
      notified: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto max-w-2xl p-4 md:p-8">
        <Header />
        <main>
          {notificationPermission !== 'granted' && (
             <NotificationPermission 
                permission={notificationPermission} 
                requestPermission={requestNotificationPermission} 
              />
          )}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
             <TaskForm onAddTask={addTask} />
          </div>
          <TaskList 
            tasks={tasks} 
            onToggleComplete={toggleTaskCompletion} 
            onDelete={deleteTask} 
          />
        </main>
      </div>
    </div>
  );
};

export default App;
