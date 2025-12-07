// This script generates a PLAN array from 8th Dec 2025 to 2nd Jan 2026 with exam and revision days.
import { DayPlan } from './types.ts';
import { SUBJECTS } from './data.ts';

const EXAMS = [
  { date: '2025-12-17', subject: 'Discrete Structures', code: 'CS301' },
  { date: '2025-12-22', subject: 'Digital Circuit & Design', code: 'CS302' },
  { date: '2025-12-26', subject: 'Introduction to AI, Machine Learning & Robotics', code: 'CS303' },
  { date: '2025-12-30', subject: 'Computer System Organization', code: 'CS304' },
  { date: '2026-01-02', subject: 'Electronic Device & Circuits', code: 'CS305' },
];

const revisionDay = '2025-12-16';
const startDate = new Date('2025-12-08');
const endDate = new Date('2026-01-02');

const getDayName = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long' });

const plan: DayPlan[] = [];
let unitIndex = [0, 0, 0, 0, 0, 0, 0]; // For each subject
let id = 1;

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const dateStr = d.toISOString().slice(0, 10);
  const dayName = getDayName(d);
  const exam = EXAMS.find(e => e.date === dateStr);
  const isRevisionDay = dateStr === revisionDay;
  const isExamDay = !!exam;

  let tasks = [];
  if (isExamDay) {
    tasks.push({
      id: String(id++),
      title: `Exam Day - ${exam.subject} (${exam.code})`,
      type: 'exam',
      subject: exam.subject,
      completed: false
    });
  } else if (isRevisionDay) {
    tasks.push(
      { id: String(id++), title: 'Full Revision Day - All Subjects', type: 'study', completed: false },
      { id: String(id++), title: 'Practice Previous Year Papers', type: 'exam', completed: false },
      { id: String(id++), title: 'Quick Review of Weak Topics', type: 'study', completed: false }
    );
  } else {
    // Assign one unit per subject per day, cycle through units
    for (let s = 0; s < SUBJECTS.length; s++) {
      const subj = SUBJECTS[s];
      if (unitIndex[s] < subj.units.length) {
        tasks.push({
          id: String(id++),
          title: `${subj.name} - ${subj.units[unitIndex[s]]} (Unit ${unitIndex[s] + 1})`,
          type: 'study',
          subject: subj.name,
          completed: false
        });
        unitIndex[s]++;
      }
    }
  }
  plan.push({
    day: dayName,
    date: dateStr,
    isExamDay,
    isRevisionDay,
    tasks
  });
}

console.log(JSON.stringify(plan, null, 2));
