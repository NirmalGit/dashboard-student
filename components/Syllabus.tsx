import React, { useState } from 'react';
import { SUBJECTS } from '../data';


interface SyllabusProps {
  completedTasks: Set<string>;
  toggleTask: (taskId: string) => void;
}

const Syllabus: React.FC<SyllabusProps> = ({ completedTasks, toggleTask }) => {
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editUnits, setEditUnits] = useState<string[]>([]);

  const handleEdit = (subjectName: string, units: string[]) => {
    setEditingSubject(subjectName);
    setEditUnits(units);
  };

  const handleUnitChange = (index: number, value: string) => {
    const newUnits = [...editUnits];
    newUnits[index] = value;
    setEditUnits(newUnits);
  };

  const handleAddUnit = () => {
    setEditUnits([...editUnits, '']);
  };

  const handleRemoveUnit = (index: number) => {
    setEditUnits(editUnits.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (editingSubject) {
      const subjIdx = SUBJECTS.findIndex(s => s.name === editingSubject);
      if (subjIdx !== -1) {
        SUBJECTS[subjIdx].units = [...editUnits];
        SUBJECTS[subjIdx].totalUnits = editUnits.length;
      }
      setEditingSubject(null);
    }
  };

  const handleCancel = () => {
    setEditingSubject(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Syllabus</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUBJECTS.map(subject => (
          <div key={subject.name} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
              <span>{subject.name}</span>
              <button
                className="text-blue-500 hover:text-blue-700 text-sm border px-2 py-1 rounded"
                onClick={() => handleEdit(subject.name, subject.units)}
              >Edit</button>
            </h3>
            {editingSubject === subject.name ? (
              <div>
                {editUnits.map((unit, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={unit}
                      onChange={e => handleUnitChange(idx, e.target.value)}
                      className="flex-1 p-1 border rounded"
                    />
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveUnit(idx)}
                    >Remove</button>
                  </div>
                ))}
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={handleAddUnit}
                >Add Unit</button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={handleSave}
                >Save</button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={handleCancel}
                >Cancel</button>
              </div>
            ) : (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;