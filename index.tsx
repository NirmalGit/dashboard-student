import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Login from './Login';
import { createRoot } from 'react-dom/client';
import { 
  Calendar, 
  BookOpen, 
  LayoutDashboard, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Download, 
  ChevronDown, 
  ChevronUp,
  GraduationCap,
  User,
  Users
} from 'lucide-react';

// --- Data Definitions ---

const SUBJECTS = {
  'CS-301': {
    code: 'CS-301',
    name: 'Discrete Structures',
    units: [
      { id: 1, title: 'Set Theory, Relation, Function' },
      { id: 2, title: 'Algebraic Structures, Groups, Rings' },
      { id: 3, title: 'Propositional Logic, FSM' },
      { id: 4, title: 'Graph Theory, Trees' },
      { id: 5, title: 'Posets, Hasse Diagram, Combinatorics' },
    ]
  },
  'CS-302': {
    code: 'CS-302',
    name: 'Digital Circuit & Design',
    units: [
      { id: 1, title: 'Number systems, Boolean algebra' },
      { id: 2, title: 'Logic gates, Adders, Subtractors' },
      { id: 3, title: 'Multivibrators, Logic families' },
      { id: 4, title: 'MUX/DEMUX, Registers, Counters' },
      { id: 5, title: 'ADC/DAC, Sample & hold' },
    ]
  },
  'CS-310': {
    code: 'CS-310',
    name: 'AI, ML & Robotics',
    units: [
      { id: 1, title: 'Intro to AI, Logic' },
      { id: 2, title: 'Problem Solving, Search (BFS/DFS)' },
      { id: 3, title: 'Intro to ML, Types of Learning' },
      { id: 4, title: 'Decision Trees, Bayesian Learning' },
      { id: 5, title: 'Basics of Robotics, Kinematics' },
    ]
  },
  'CS-304': {
    code: 'CS-304',
    name: 'Computer System Org',
    units: [
      { id: 1, title: 'CPU, Von Neumann, Bus, RTL' },
      { id: 2, title: 'Control Unit, Microprogramming' },
      { id: 3, title: 'I/O Org, Interrupts, DMA' },
      { id: 4, title: 'Memory Org, Cache' },
      { id: 5, title: 'Multiprocessors, Pipelining' },
    ]
  },
  'CS-305': {
    code: 'CS-305',
    name: 'Electronic Devices',
    units: [
      { id: 1, title: 'Semiconductors, Transistors' },
      { id: 2, title: 'Feedback Amplifiers, Oscillators' },
      { id: 3, title: 'Switching, Multivibrators' },
      { id: 4, title: 'Op-amp, 555 Timer' },
      { id: 5, title: 'Regulated Power Supplies' },
    ]
  }
};

type Task = {
  subjectCode: string;
  unitId: number;
};

type DayPlan = {
  date: string;
  tasks?: Task[];
  type: 'study' | 'revision' | 'exam' | 'prep' | 'review';
  note?: string;
  subject?: string;
};

const PLAN: DayPlan[] = [
  { date: '2024-12-08', type: 'study', tasks: [{subjectCode: 'CS-301', unitId: 1}, {subjectCode: 'CS-302', unitId: 1}, {subjectCode: 'CS-310', unitId: 1}] },
  { date: '2024-12-09', type: 'study', tasks: [{subjectCode: 'CS-304', unitId: 1}, {subjectCode: 'CS-305', unitId: 1}, {subjectCode: 'CS-301', unitId: 2}] },
  { date: '2024-12-10', type: 'study', tasks: [{subjectCode: 'CS-302', unitId: 2}, {subjectCode: 'CS-310', unitId: 2}, {subjectCode: 'CS-304', unitId: 2}] },
  { date: '2024-12-11', type: 'study', tasks: [{subjectCode: 'CS-305', unitId: 2}, {subjectCode: 'CS-301', unitId: 3}, {subjectCode: 'CS-302', unitId: 3}] },
  { date: '2024-12-12', type: 'study', tasks: [{subjectCode: 'CS-310', unitId: 3}, {subjectCode: 'CS-304', unitId: 3}, {subjectCode: 'CS-305', unitId: 3}] },
  { date: '2024-12-13', type: 'study', tasks: [{subjectCode: 'CS-301', unitId: 4}, {subjectCode: 'CS-302', unitId: 4}, {subjectCode: 'CS-310', unitId: 4}] },
  { date: '2024-12-14', type: 'study', tasks: [{subjectCode: 'CS-304', unitId: 4}, {subjectCode: 'CS-305', unitId: 4}, {subjectCode: 'CS-301', unitId: 5}] },
  { date: '2024-12-15', type: 'study', tasks: [{subjectCode: 'CS-302', unitId: 5}, {subjectCode: 'CS-310', unitId: 5}, {subjectCode: 'CS-304', unitId: 5}, {subjectCode: 'CS-305', unitId: 5}] },
  { date: '2024-12-16', type: 'revision', note: 'FULL SYLLABUS REVISION DAY' },
  { date: '2024-12-17', type: 'exam', subject: 'CS-301', note: 'Exam: Discrete Structures' },
  { date: '2024-12-18', type: 'prep', subject: 'CS-302', note: 'Prep: Digital Circuits' },
  { date: '2024-12-19', type: 'prep', subject: 'CS-302', note: 'Prep: Digital Circuits' },
  { date: '2024-12-20', type: 'prep', subject: 'CS-302', note: 'Prep: Digital Circuits' },
  { date: '2024-12-21', type: 'review', subject: 'CS-302', note: 'FINAL REVIEW: Digital Circuits' },
  { date: '2024-12-22', type: 'exam', subject: 'CS-302', note: 'Exam: Digital Circuit & Design' },
  { date: '2024-12-23', type: 'prep', subject: 'CS-310', note: 'Prep: AI/ML/Robotics' },
  { date: '2024-12-24', type: 'prep', subject: 'CS-310', note: 'Prep: AI/ML/Robotics' },
  { date: '2024-12-25', type: 'review', subject: 'CS-310', note: 'FINAL REVIEW: AI/ML/Robotics' },
  { date: '2024-12-26', type: 'exam', subject: 'CS-310', note: 'Exam: AI/ML/Robotics' },
  { date: '2024-12-27', type: 'prep', subject: 'CS-304', note: 'Prep: Computer System Org' },
  { date: '2024-12-28', type: 'prep', subject: 'CS-304', note: 'Prep: Computer System Org' },
  { date: '2024-12-29', type: 'review', subject: 'CS-304', note: 'FINAL REVIEW: Computer System Org' },
  { date: '2024-12-30', type: 'exam', subject: 'CS-304', note: 'Exam: Computer System Org' },
  { date: '2024-12-31', type: 'prep', subject: 'CS-305', note: 'Prep: Electronic Devices' },
  { date: '2025-01-01', type: 'review', subject: 'CS-305', note: 'FINAL REVIEW: Electronic Devices' },
  { date: '2025-01-02', type: 'exam', subject: 'CS-305', note: 'Exam: Electronic Devices' },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', weekday: 'short' });
};

const getCompletionKey = (date: string, subject: string, unit: number) => `${date}_${subject}_${unit}`;

const ProgressBar = ({ percent, color = 'bg-blue-600' }: { percent: number, color?: string }) => (
  <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
    <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
  </div>
);

const App = ({ userRole }: { userRole: string }) => {
  const [planTasks, setPlanTasks] = useState(PLAN.map(day => day.tasks ? [...day.tasks] : []));
  const [activeTab, setActiveTab] = useState<'planner' | 'syllabus' | 'dashboard'>('planner');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [editDayIdx, setEditDayIdx] = useState<number | null>(null);
  const [editUnits, setEditUnits] = useState<Task[]>([]);
  const isAdmin = userRole === 'Admin';

  useEffect(() => {
    const saved = localStorage.getItem('cse_planner_completed');
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)));
    }
    const studentPlan = localStorage.getItem('cse_student_plan');
    if (studentPlan) {
      try {
        const parsed = JSON.parse(studentPlan);
        if (Array.isArray(parsed)) setPlanTasks(parsed);
      } catch {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cse_planner_completed', JSON.stringify(Array.from(completedTasks)));
      localStorage.setItem('cse_student_plan', JSON.stringify(planTasks));
    }
  }, [completedTasks, planTasks, mounted]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || userRole !== 'Student') return;
    const sourceDayIdx = parseInt(source.droppableId.replace('day-', ''));
    const destDayIdx = parseInt(destination.droppableId.replace('day-', ''));
    const sourceTasks = Array.from(planTasks[sourceDayIdx]);
    const [moved] = sourceTasks.splice(source.index, 1);
    const destTasks = Array.from(planTasks[destDayIdx]);
    destTasks.splice(destination.index, 0, moved);
    const newPlanTasks = [...planTasks];
    newPlanTasks[sourceDayIdx] = sourceTasks;
    newPlanTasks[destDayIdx] = destTasks;
    setPlanTasks(newPlanTasks);
  };

  const calculateProgress = () => {
    const totalTasks = PLAN.reduce((acc, day) => acc + (day.tasks?.length || 0), 0);
    const completedCount = PLAN.reduce((acc, day) => {
      return acc + (day.tasks?.reduce((dAcc, task) => {
        return dAcc + (completedTasks.has(getCompletionKey(day.date, task.subjectCode, task.unitId)) ? 1 : 0);
      }, 0) || 0);
    }, 0);
    return totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
  };

  const calculateSubjectProgress = (subjectCode: string) => {
    const subjectUnits = SUBJECTS[subjectCode as keyof typeof SUBJECTS].units.length;
    let completed = 0;
    PLAN.forEach(day => {
      day.tasks?.forEach(task => {
        if (task.subjectCode === subjectCode && completedTasks.has(getCompletionKey(day.date, task.subjectCode, task.unitId))) {
          completed++;
        }
      });
    });
    return Math.round((completed / subjectUnits) * 100);
  };

  const handleSaveEdit = () => {
    if (editDayIdx !== null) {
      PLAN[editDayIdx].tasks = [...editUnits];
      localStorage.setItem('cse_admin_plan', JSON.stringify(PLAN));
      setEditDayIdx(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen pb-20 bg-slate-50 md:pb-0">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl px-4 py-3 mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="text-blue-600 w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">CSE Exam Planner</h1>
              <p className="text-xs text-slate-500">Dec 8 - Jan 2</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-blue-50 text-blue-700 ring-1 ring-blue-200" disabled>
              <User size={14} />
              <span>Student View</span>
            </button>
            <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="flex items-center space-x-1 text-slate-600 hover:text-slate-900">
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-6">
          <button onClick={() => setActiveTab('planner')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'planner' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Planner</button>
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('syllabus')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'syllabus' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>Syllabus</button>
        </div>

        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Daily Schedule</h2>
              <div className="text-sm text-slate-500">{calculateProgress()}% Complete</div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="space-y-4">
                {PLAN.map((day, idx) => {
                  const isToday = new Date(day.date).toDateString() === new Date().toDateString();
                  const dayTasksTotal = planTasks[idx]?.length || 0;
                  const dayTasksDone = planTasks[idx]?.filter(t => completedTasks.has(getCompletionKey(day.date, t.subjectCode, t.unitId))).length || 0;
                  return (
                    <Droppable droppableId={`day-${idx}`} key={day.date} direction="vertical">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${isToday ? 'border-blue-400 ring-2 ring-blue-100 shadow-lg' : 'border-slate-200 shadow-sm'} ${day.type === 'exam' ? 'bg-red-50 border-red-200' : 'bg-white'} ${day.type === 'revision' ? 'bg-indigo-50 border-indigo-200' : ''}`}>
                          <div className={`px-4 py-3 border-b flex items-center justify-between ${day.type === 'exam' ? 'border-red-100 bg-red-100/50' : 'border-slate-100'} ${day.type === 'revision' ? 'border-indigo-100 bg-indigo-100/50' : ''}`}>
                            <div className="flex items-center space-x-3">
                              <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${day.type === 'exam' ? 'bg-red-200 text-red-800' : day.type === 'revision' ? 'bg-indigo-200 text-indigo-800' : isToday ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                <span className="text-xs font-semibold uppercase">{new Date(day.date).toLocaleDateString('en-US', {month: 'short'})}</span>
                                <span className="text-lg font-bold leading-none">{new Date(day.date).getDate()}</span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-slate-900">{formatDate(day.date)}</h3>
                                  {isToday && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">TODAY</span>}
                                </div>
                                <p className={`text-xs font-medium uppercase tracking-wide ${day.type === 'exam' ? 'text-red-600' : day.type === 'revision' ? 'text-indigo-600' : day.type === 'review' || day.type === 'prep' ? 'text-amber-600' : 'text-slate-500'}`}>{day.type === 'study' ? 'Study Day' : day.type.toUpperCase()}</p>
                              </div>
                            </div>
                            {day.type === 'study' && <div className="text-xs font-medium text-slate-400">{dayTasksDone}/{dayTasksTotal} Tasks</div>}
                            {isAdmin && day.type === 'study' && <button className="ml-4 px-2 py-1 text-xs bg-amber-200 text-amber-900 rounded" onClick={() => { setEditDayIdx(idx); setEditUnits(day.tasks ? [...day.tasks] : []); }}>Edit</button>}
                          </div>
                          <div className="p-4">
                            {editDayIdx === idx ? (
                              <div className="space-y-2">
                                <h4 className="font-semibold mb-2">Edit Units for {formatDate(day.date)}</h4>
                                {[0,1,2].map((unitIdx) => (
                                  <div key={unitIdx} className="flex space-x-2 items-center mb-2">
                                    <span className="text-xs">Unit {unitIdx+1}:</span>
                                    <select className="px-2 py-1 border rounded" value={editUnits[unitIdx]?.subjectCode || ''} onChange={e => { const newUnits = [...editUnits]; newUnits[unitIdx] = { subjectCode: e.target.value, unitId: 1 }; setEditUnits(newUnits); }}>
                                      <option value="">Select Subject</option>
                                      {Object.keys(SUBJECTS).map(code => <option key={code} value={code}>{code}</option>)}
                                    </select>
                                    {editUnits[unitIdx]?.subjectCode && (
                                      <select className="px-2 py-1 border rounded" value={editUnits[unitIdx]?.unitId || 1} onChange={e => { const newUnits = [...editUnits]; newUnits[unitIdx].unitId = Number(e.target.value); setEditUnits(newUnits); }}>
                                        {SUBJECTS[editUnits[unitIdx].subjectCode].units.map(u => <option key={u.id} value={u.id}>Unit {u.id}</option>)}
                                      </select>
                                    )}
                                  </div>
                                ))}
                                <div className="flex space-x-2 mt-4">
                                  <button className="px-4 py-1 bg-blue-600 text-white rounded" onClick={handleSaveEdit}>Save</button>
                                  <button className="px-4 py-1 bg-slate-300 text-slate-800 rounded" onClick={() => setEditDayIdx(null)}>Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {day.note && <div className={`mb-3 text-sm font-medium flex items-center ${day.type === 'exam' ? 'text-red-700' : 'text-slate-700'}`}>{day.type === 'exam' && <AlertCircle className="w-4 h-4 mr-2" />}{day.note}</div>}
                                {day.type === 'study' && (
                                  <div className="space-y-3">
                                    {planTasks[idx]?.map((task, tIdx) => {
                                      const key = getCompletionKey(day.date, task.subjectCode, task.unitId);
                                      const completed = completedTasks.has(key);
                                      const subject = SUBJECTS[task.subjectCode as keyof typeof SUBJECTS];
                                      const unit = subject.units.find(u => u.id === task.unitId);
                                      return (
                                        <React.Fragment key={key}>
                                          <Draggable draggableId={key} index={tIdx} isDragDisabled={userRole !== 'Student'}>
                                            {(provided, snapshot) => (
                                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`group flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${completed ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50 border-slate-100'} ${snapshot.isDragging ? 'bg-blue-100' : ''}`} style={provided.draggableProps.style} onClick={() => { const newSet = new Set(completedTasks); if (newSet.has(key)) newSet.delete(key); else newSet.add(key); setCompletedTasks(newSet); }}>
                                                <div className={`mt-0.5 transition-colors ${completed ? 'text-green-500' : 'text-slate-300 group-hover:text-blue-400'}`}>{completed ? <CheckCircle2 size={20} className="fill-current" /> : <Circle size={20} />}</div>
                                                <div className="flex-1">
                                                  <span className="text-xs font-bold px-2 py-0.5 rounded text-white inline-block bg-slate-500">{task.subjectCode}</span>
                                                  <p className={`text-sm font-medium mt-1 ${completed ? 'text-green-800 line-through opacity-75' : 'text-slate-800'}`}>Unit {task.unitId}: {unit?.title}</p>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        </React.Fragment>
                                      );
                                    })}
                                    {provided.placeholder}
                                  </div>
                                )}
                                {day.type !== 'study' && !planTasks[idx]?.length && <div className="text-sm text-slate-500 italic">No new syllabus tasks. Focus on {day.type === 'exam' ? 'performing well!' : 'revision.'}</div>}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            </DragDropContext>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">Performance Dashboard</h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 mb-2">Total Syllabus Completion</h3>
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-4xl font-bold text-slate-900">{calculateProgress()}%</span>
                <span className="text-sm text-slate-500 mb-1.5">of 25 Units</span>
              </div>
              <ProgressBar percent={calculateProgress()} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(SUBJECTS).map(subject => {
                const prog = calculateSubjectProgress(subject.code);
                return (
                  <div key={subject.code} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900">{subject.code}</h4>
                        <p className="text-xs text-slate-500 truncate">{subject.name}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${prog === 100 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>{prog}%</span>
                    </div>
                    <ProgressBar percent={prog} color={prog === 100 ? 'bg-green-500' : 'bg-blue-600'} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Full Syllabus</h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
              {Object.values(SUBJECTS).map((sub) => (
                <div key={sub.code} className="p-4">
                  <h3 className="font-bold text-slate-900 flex items-center justify-between mb-2">
                    <span>{sub.code} - {sub.name}</span>
                    <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{sub.units.length} Units</span>
                  </h3>
                  <ul className="space-y-2">
                    {sub.units.map((unit) => (
                      <li key={unit.id} className="text-sm text-slate-600 flex items-start space-x-2">
                        <span className="min-w-[4rem] font-medium text-slate-400 text-xs uppercase mt-0.5">Unit {unit.id}</span>
                        <span>{unit.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const rootContainer = document.getElementById('root');
if (rootContainer) {
  const root = createRoot(rootContainer);
  const user = localStorage.getItem('user');
  if (!user) {
    root.render(<Login />);
  } else {
    const { role } = JSON.parse(user);
    root.render(<App userRole={role} />);
  }
}
