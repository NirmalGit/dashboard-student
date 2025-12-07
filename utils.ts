import { Subject, Task, DayPlan } from './types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getCompletionKey = (taskId: string): string => `task_${taskId}_completed`;

export const calculateProgress = (tasks: Task[]): number => {
  const completed = tasks.filter(task => task.completed).length;
  return tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
};

export const calculateSubjectProgress = (subject: Subject, completedTasks: Set<string>): number => {
  const completedUnits = subject.units.filter(unit =>
    completedTasks.has(getCompletionKey(`${subject.name}_${unit}`))
  ).length;
  return subject.totalUnits > 0 ? (completedUnits / subject.totalUnits) * 100 : 0;
};

export const exportToCSV = (plan: DayPlan[]): void => {
  const headers = ['Day', 'Date', 'Task', 'Type', 'Subject', 'Completed'];
  const rows = plan.flatMap(day =>
    day.tasks.map(task => [
      day.day,
      day.date,
      task.title,
      task.type,
      task.subject || '',
      task.completed ? 'Yes' : 'No'
    ])
  );

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'study_plan.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};