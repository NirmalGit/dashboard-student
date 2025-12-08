import React from 'react';
// import { SUBJECTS } from '../data';
import { calculateSubjectProgress } from '../utils';
import ProgressBar from './ProgressBar';

interface DashboardProps {
  completedTasks: Set<string>;
  subjects: Array<{ name: string; units: string[]; totalUnits: number }>;
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ completedTasks, subjects, username }) => {
  const totalProgress = subjects.reduce((acc, subject) =>
    acc + calculateSubjectProgress(subject, completedTasks), 0) / subjects.length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="mb-4 text-lg text-blue-700 font-semibold">Student: {username}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
          <ProgressBar progress={totalProgress} />
        </div>

        {subjects.map(subject => {
          const progress = calculateSubjectProgress(subject, completedTasks);
          return (
            <div key={subject.name} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">{subject.name}</h3>
              <ProgressBar progress={progress} />
              <div className="mt-4 text-sm text-gray-600">
                {subject.units.filter(unit =>
                  completedTasks.has(`task_${subject.name}_${unit}_completed`)
                ).length} / {subject.totalUnits} units completed
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;