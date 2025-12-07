import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Edit, Download, CheckCircle, Circle, BookOpen, FileText, ClipboardList, Briefcase } from 'lucide-react';
import { PLAN } from '../data';
import { DayPlan, Task, UserRole } from '../types';
import { calculateProgress, exportToCSV } from '../utils';

interface PlannerProps {
  plan: DayPlan[];
  setPlan: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  completedTasks: Set<string>;
  toggleTask: (taskId: string) => void;
  userRole: UserRole;
}

const Planner: React.FC<PlannerProps> = ({ plan, setPlan, completedTasks, toggleTask, userRole }) => {
  const [editingDay, setEditingDay] = useState<DayPlan | null>(null);
  const [editTasks, setEditTasks] = useState<Task[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same day
      const dayIndex = plan.findIndex(day => day.day === source.droppableId);
      const newTasks = Array.from(plan[dayIndex].tasks);
      const [reorderedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedTask);

      const newPlan = [...plan];
      newPlan[dayIndex] = { ...newPlan[dayIndex], tasks: newTasks };
      setPlan(newPlan);
    } else {
      // Moving between days
      const sourceDayIndex = plan.findIndex(day => day.day === source.droppableId);
      const destDayIndex = plan.findIndex(day => day.day === destination.droppableId);

      const sourceTasks = Array.from(plan[sourceDayIndex].tasks);
      const destTasks = Array.from(plan[destDayIndex].tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      const newPlan = [...plan];
      newPlan[sourceDayIndex] = { ...newPlan[sourceDayIndex], tasks: sourceTasks };
      newPlan[destDayIndex] = { ...newPlan[destDayIndex], tasks: destTasks };
      setPlan(newPlan);
    }
  };

  const handleEditDay = (dayPlan: DayPlan) => {
    setEditingDay(dayPlan);
    setEditTasks([...dayPlan.tasks]);
  };

  const handleSaveEdit = () => {
    if (editingDay) {
      const newPlan = plan.map(day =>
        day.day === editingDay.day ? { ...day, tasks: editTasks } : day
      );
      setPlan(newPlan);
      setEditingDay(null);
    }
  };

  const handleAddTask = () => {
    setEditTasks([...editTasks, {
      id: Date.now().toString(),
      title: '',
      type: 'study',
      completed: false
    }]);
  };

  const handleUpdateTask = (index: number, field: keyof Task, value: any) => {
    const newTasks = [...editTasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setEditTasks(newTasks);
  };

  const handleRemoveTask = (index: number) => {
    setEditTasks(editTasks.filter((_, i) => i !== index));
  };

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'exam': return <FileText className="w-4 h-4" />;
      case 'assignment': return <ClipboardList className="w-4 h-4" />;
      case 'project': return <Briefcase className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const totalTasks = plan.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedCount = plan.reduce((acc, day) => acc + day.tasks.filter(task => task.completed).length, 0);
  const overallProgress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Weekly Planner</h2>
        <button
          onClick={() => exportToCSV(plan)}
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Overall Preparation Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{completedCount} / {totalTasks} tasks completed ({overallProgress.toFixed(1)}%)</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plan.map(day => (
            <div key={day.day} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-4 ${day.isExamDay ? 'bg-red-500' : day.isRevisionDay ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                <h3 className="text-lg font-semibold">{day.day}</h3>
                <p className="text-sm opacity-90">{day.date}</p>
                <div className="mt-2">
                  <div className="text-xs">Progress: {calculateProgress(day.tasks).toFixed(1)}%</div>
                  <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${calculateProgress(day.tasks)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <Droppable droppableId={day.day}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-4 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                  >
                    {day.tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        isDragDisabled={userRole === 'Admin'}
                      >
                        {(provided, snapshot) => (
                          <div
                            key={task.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center space-x-2 p-2 mb-2 rounded border ${
                              snapshot.isDragging ? 'shadow-lg bg-white' : 'bg-gray-50'
                            } ${userRole === 'Admin' ? '' : 'cursor-move'}`}
                          >
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(task.id)}
                              className="accent-green-500 w-5 h-5 cursor-pointer"
                              aria-label={task.title}
                            />
                            <div className="flex-1">
                              <div className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                {getTaskIcon(task.type)}
                                <span>{task.type}</span>
                                {task.subject && <span>• {task.subject}</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {userRole === 'Admin' && (
                <div className="p-4 border-t">
                  <button
                    onClick={() => handleEditDay(day)}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Tasks</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>

      {editingDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Tasks for {editingDay.day}</h3>
            <div className="space-y-4">
              {editTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleUpdateTask(index, 'title', e.target.value)}
                    className="flex-1 p-1 border rounded"
                    placeholder="Task title"
                  />
                  <select
                    value={task.type}
                    onChange={(e) => handleUpdateTask(index, 'type', e.target.value as Task['type'])}
                    className="p-1 border rounded"
                  >
                    <option value="study">Study</option>
                    <option value="exam">Exam</option>
                    <option value="assignment">Assignment</option>
                    <option value="project">Project</option>
                  </select>
                  <button
                    onClick={() => handleRemoveTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleAddTask}
                disabled={editingDay?.isExamDay}
                className={`px-4 py-2 rounded hover:opacity-80 ${editingDay?.isExamDay ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Add Task
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingDay(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;