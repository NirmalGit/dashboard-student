import React, { useState, useEffect } from 'react';
import { PLAN } from '../data';
import { DayPlan, UserRole } from '../types';
import { getCompletionKey } from '../utils';
import Login from '../Login';
import Dashboard from './Dashboard';
import Planner from './Planner';
import Syllabus from './Syllabus';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('Student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [plan, setPlan] = useState<DayPlan[]>(PLAN);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
      setCompletedTasks(new Set(JSON.parse(savedCompletedTasks)));
    }

    const savedPlan = localStorage.getItem('studyPlan');
    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    // Check for user authentication
    const user = localStorage.getItem('user');
    if (user) {
      const { role } = JSON.parse(user);
      setIsLoggedIn(true);
      setUserRole(role as UserRole);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify([...completedTasks]));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('studyPlan', JSON.stringify(plan));
  }, [plan]);

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('user', JSON.stringify({ username: 'anugrah', role }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('Student');
    localStorage.removeItem('user');
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">CSE Student Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Role: {userRole}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['dashboard', 'planner', 'syllabus'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'dashboard' && <Dashboard completedTasks={completedTasks} />}
        {activeTab === 'planner' && (
          <Planner
            plan={plan}
            setPlan={setPlan}
            completedTasks={completedTasks}
            toggleTask={toggleTask}
            userRole={userRole}
          />
        )}
        {activeTab === 'syllabus' && (
          <Syllabus completedTasks={completedTasks} toggleTask={toggleTask} />
        )}
      </main>
    </div>
  );
};

export default App;