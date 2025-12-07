import React from 'react';
import { SUBJECTS } from '../data';

interface SyllabusProps {
  completedTasks: Set<string>;
  toggleTask: (taskId: string) => void;
}

const Syllabus: React.FC<SyllabusProps> = ({ completedTasks, toggleTask }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Syllabus</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUBJECTS.map(subject => (
          <div key={subject.name} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{subject.name}</h3>
            <ul className="space-y-2">
              {subject.units.map(unit => {
                const taskId = `task_${subject.name}_${unit}_completed`;
                const isCompleted = completedTasks.has(taskId);
                return (
                  <li key={unit} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleTask(taskId)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className={isCompleted ? 'line-through text-gray-500' : ''}>
                      {unit}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;