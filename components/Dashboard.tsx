import React from 'react';
import { SUBJECTS } from '../data';
import { calculateSubjectProgress } from '../utils';
import ProgressBar from './ProgressBar';

interface DashboardProps {
  completedTasks: Set<string>;
}

const Dashboard: React.FC<DashboardProps> = ({ completedTasks }) => {
  const totalProgress = SUBJECTS.reduce((acc, subject) =>
    acc + calculateSubjectProgress(subject, completedTasks), 0) / SUBJECTS.length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
          <ProgressBar progress={totalProgress} />
        </div>

        {SUBJECTS.map(subject => {
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