export interface Subject {
  name: string;
  units: string[];
  totalUnits: number;
}

export interface Task {
  id: string;
  title: string;
  type: 'study' | 'exam' | 'assignment' | 'project';
  subject?: string;
  completed: boolean;
}

export interface DayPlan {
  day: string;
  date: string;
  tasks: Task[];
  isExamDay: boolean;
  isRevisionDay: boolean;
}

export type UserRole = 'Student' | 'Teacher' | 'Admin';