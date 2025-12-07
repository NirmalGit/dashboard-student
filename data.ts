import { Subject, DayPlan } from './types.ts';
export const SUBJECTS: Subject[] = [
  {
    name: "Discrete Structures",
    units: [
      "Set Theory, Relation, Function, Theorem Proving Techniques",
      "Algebraic Structures: Definition, Properties, types",
      "Propositional Logic",
      "Graph Theory",
      "Posets, Hasse Diagram and Lattices, Combinatorics, Recurrence Relation and Generating Function"
    ],
    totalUnits: 5
  },
  {
    name: "Digital Circuit & Design",
    units: [
      "Number systems & codes, Binary arithmetic, Boolean algebra and switching function",
      "Introduction to logic gates, Universal gate, Half adder, Half subtractor, Full adder, Full subtractor circuits",
      "Linear wave shaping circuits, Bi-stable, Mono stable & Astable multivibrator, Schmitt Trigger circuits",
      "Decoders, Encoders, Multiplexers, De-multiplexers, Introduction to various semiconductor memories",
      "Introduction of Analog to Digital & Digital to Analog converters, sample & hold circuits and V-F converters"
    ],
    totalUnits: 5
  },
  {
    name: "Introduction to AI, Machine Learning & Robotics",
    units: [
      "Introduction to Artificial Intelligence Fundamentals",
      "Problem Solving State space search",
      "Introduction to Machine Learning",
      "Models Based on Decision Trees, Bayesian Learning, Clustering",
      "Basics of Robotics Overview"
    ],
    totalUnits: 5
  },
  {
    name: "Computer System Organization",
    units: [
      "Computer Basics and CPU",
      "Control Unit Organization",
      "Input Output Organization",
      "Memory organization",
      "Multiprocessors"
    ],
    totalUnits: 5
  },
  {
    name: "Electronic Device & Circuits",
    units: [
      "Semiconductor device, theory of P-N junction, temperature dependence and break down characteristics",
      "Feedback amplifier, negative feedback, Sinusoidal oscillators, Power amplifiers",
      "Switching characteristics of diode and transistor, Multivibrators, Clippers and clampers",
      "Operational amplifier characteristics, slew rate, full power bandwidth",
      "Regulated power supplies, Series and shunt regulators, IC voltage regulators, SMPS, UPS"
    ],
    totalUnits: 5
  },
  {
    name: "Programming Lab–I (Java Technologies)",
    units: [
      "Basic Java Features",
      "Java Collective Frame Work",
      "Advance Java Features",
      "Advance Java Technologies",
      "Advance Web/Internet Programming"
    ],
    totalUnits: 5
  },
  {
    name: "Computer Engineering Workshop",
    units: [
      "Basic components",
      "Transformer, Function Generator, SMPS, LED, Voltage Regulator, Battery, IFT, Relay",
      "Testing & Measurement Tools",
      "Printed Circuit Board",
      "Personal Computer Assembling"
    ],
    totalUnits: 5
  }
];

export const EXAMS = [
  { date: "2025-12-17", subject: "Discrete Structures" },
  { date: "2025-12-22", subject: "Digital Circuit & Design" },
  { date: "2025-12-26", subject: "Introduction to AI, Machine Learning & Robotics" },
  { date: "2025-12-30", subject: "Computer System Organization" },
  { date: "2026-01-02", subject: "Electronic Device & Circuits" }
];

// PLAN dynamically generated for 8th Dec 2025 to 2nd Jan 2026 with exam and revision days
export const PLAN: DayPlan[] = [
  { day: "Monday", date: "2025-12-08", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "1", title: "Discrete Structures - Set Theory, Relation, Function, Theorem Proving Techniques (Unit 1)", type: "study", subject: "Discrete Structures", completed: false },
    { id: "2", title: "Digital Circuit & Design - Number systems & codes, Binary arithmetic, Boolean algebra and switching function (Unit 1)", type: "study", subject: "Digital Circuit & Design", completed: false },
    { id: "3", title: "Introduction to AI, Machine Learning & Robotics - Introduction to Artificial Intelligence Fundamentals (Unit 1)", type: "study", subject: "Introduction to AI, Machine Learning & Robotics", completed: false },
    { id: "4", title: "Computer System Organization - Computer Basics and CPU (Unit 1)", type: "study", subject: "Computer System Organization", completed: false },
    { id: "5", title: "Electronic Device & Circuits - Semiconductor device, theory of P-N junction, temperature dependence and break down characteristics (Unit 1)", type: "study", subject: "Electronic Device & Circuits", completed: false }
  ] },
  { day: "Tuesday", date: "2025-12-09", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "8", title: "Discrete Structures - Algebraic Structures: Definition, Properties, types (Unit 2)", type: "study", subject: "Discrete Structures", completed: false },
    { id: "9", title: "Digital Circuit & Design - Introduction to logic gates, Universal gate, Half adder, Half subtractor, Full adder, Full subtractor circuits (Unit 2)", type: "study", subject: "Digital Circuit & Design", completed: false },
    { id: "10", title: "Introduction to AI, Machine Learning & Robotics - Problem Solving State space search (Unit 2)", type: "study", subject: "Introduction to AI, Machine Learning & Robotics", completed: false },
    { id: "11", title: "Computer System Organization - Control Unit Organization (Unit 2)", type: "study", subject: "Computer System Organization", completed: false },
    { id: "12", title: "Electronic Device & Circuits - Feedback amplifier, negative feedback, Sinusoidal oscillators, Power amplifiers (Unit 2)", type: "study", subject: "Electronic Device & Circuits", completed: false }
  ] },
  { day: "Wednesday", date: "2025-12-10", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "15", title: "Discrete Structures - Propositional Logic (Unit 3)", type: "study", subject: "Discrete Structures", completed: false },
    { id: "16", title: "Digital Circuit & Design - Linear wave shaping circuits, Bi-stable, Mono stable & Astable multivibrator, Schmitt Trigger circuits (Unit 3)", type: "study", subject: "Digital Circuit & Design", completed: false },
    { id: "17", title: "Introduction to AI, Machine Learning & Robotics - Introduction to Machine Learning (Unit 3)", type: "study", subject: "Introduction to AI, Machine Learning & Robotics", completed: false },
    { id: "18", title: "Computer System Organization - Input Output Organization (Unit 3)", type: "study", subject: "Computer System Organization", completed: false },
    { id: "19", title: "Electronic Device & Circuits - Switching characteristics of diode and transistor, Multivibrators, Clippers and clampers (Unit 3)", type: "study", subject: "Electronic Device & Circuits", completed: false }
  ] },
  { day: "Thursday", date: "2025-12-11", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "22", title: "Discrete Structures - Graph Theory (Unit 4)", type: "study", subject: "Discrete Structures", completed: false },
    { id: "23", title: "Digital Circuit & Design - Decoders, Encoders, Multiplexers, De-multiplexers, Introduction to various semiconductor memories (Unit 4)", type: "study", subject: "Digital Circuit & Design", completed: false },
    { id: "24", title: "Introduction to AI, Machine Learning & Robotics - Models Based on Decision Trees, Bayesian Learning, Clustering (Unit 4)", type: "study", subject: "Introduction to AI, Machine Learning & Robotics", completed: false },
    { id: "25", title: "Computer System Organization - Memory organization (Unit 4)", type: "study", subject: "Computer System Organization", completed: false },
    { id: "26", title: "Electronic Device & Circuits - Operational amplifier characteristics, slew rate, full power bandwidth (Unit 4)", type: "study", subject: "Electronic Device & Circuits", completed: false }
  ] },
  { day: "Friday", date: "2025-12-12", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "29", title: "Discrete Structures - Posets, Hasse Diagram and Lattices, Combinatorics, Recurrence Relation and Generating Function (Unit 5)", type: "study", subject: "Discrete Structures", completed: false },
    { id: "30", title: "Digital Circuit & Design - Introduction of Analog to Digital & Digital to Analog converters, sample & hold circuits and V-F converters (Unit 5)", type: "study", subject: "Digital Circuit & Design", completed: false },
    { id: "31", title: "Introduction to AI, Machine Learning & Robotics - Basics of Robotics Overview (Unit 5)", type: "study", subject: "Introduction to AI, Machine Learning & Robotics", completed: false },
    { id: "32", title: "Computer System Organization - Multiprocessors (Unit 5)", type: "study", subject: "Computer System Organization", completed: false },
    { id: "33", title: "Electronic Device & Circuits - Regulated power supplies, Series and shunt regulators, IC voltage regulators, SMPS, UPS (Unit 5)", type: "study", subject: "Electronic Device & Circuits", completed: false }
  ] },
  { day: "Saturday", date: "2025-12-13", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "36", title: "Weekly Review - All Subjects", type: "study", completed: false },
    { id: "37", title: "Practice Exams", type: "exam", completed: false },
    { id: "38", title: "Project Work", type: "project", completed: false }
  ] },
  { day: "Sunday", date: "2025-12-14", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "39", title: "Weekly Review - All Subjects", type: "study", completed: false },
    { id: "40", title: "Practice Exams", type: "exam", completed: false },
    { id: "41", title: "Project Work", type: "project", completed: false }
  ] },
  { day: "Monday", date: "2025-12-15", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "42", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Tuesday", date: "2025-12-16", isExamDay: false, isRevisionDay: true, tasks: [
    { id: "43", title: "Full Revision Day - All Subjects", type: "study", completed: false },
    { id: "44", title: "Practice Previous Year Papers", type: "exam", completed: false },
    { id: "45", title: "Quick Review of Weak Topics", type: "study", completed: false }
  ] },
  { day: "Wednesday", date: "2025-12-17", isExamDay: true, isRevisionDay: false, tasks: [
    { id: "46", title: "Exam Day - Discrete Structures (CS301)", type: "exam", subject: "Discrete Structures", completed: false }
  ] },
  { day: "Thursday", date: "2025-12-18", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "47", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Friday", date: "2025-12-19", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "48", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Saturday", date: "2025-12-20", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "49", title: "Weekly Review - All Subjects", type: "study", completed: false },
    { id: "50", title: "Practice Exams", type: "exam", completed: false },
    { id: "51", title: "Project Work", type: "project", completed: false }
  ] },
  { day: "Sunday", date: "2025-12-21", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "52", title: "Weekly Review - All Subjects", type: "study", completed: false },
    { id: "53", title: "Practice Exams", type: "exam", completed: false },
    { id: "54", title: "Project Work", type: "project", completed: false }
  ] },
  { day: "Monday", date: "2025-12-22", isExamDay: true, isRevisionDay: false, tasks: [
    { id: "55", title: "Exam Day - Digital Circuit & Design (CS302)", type: "exam", subject: "Digital Circuit & Design", completed: false }
  ] },
  { day: "Tuesday", date: "2025-12-23", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "56", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Wednesday", date: "2025-12-24", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "57", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Thursday", date: "2025-12-25", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "58", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Friday", date: "2025-12-26", isExamDay: true, isRevisionDay: false, tasks: [
    { id: "59", title: "Exam Day - Introduction to AI, Machine Learning & Robotics (CS303)", type: "exam", subject: "Introduction to AI, Machine Learning & Robotics", completed: false }
  ] },
  { day: "Saturday", date: "2025-12-27", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "60", title: "Weekly Review - All Subjects", type: "study", completed: false },
    { id: "61", title: "Practice Exams", type: "exam", completed: false },
    { id: "62", title: "Project Work", type: "project", completed: false }
  ] },
  { day: "Sunday", date: "2025-12-28", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "63", title: "Weekly Review - All Subjects", type: "study", completed: false },
    { id: "64", title: "Practice Exams", type: "exam", completed: false },
    { id: "65", title: "Project Work", type: "project", completed: false }
  ] },
  { day: "Monday", date: "2025-12-29", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "66", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Tuesday", date: "2025-12-30", isExamDay: true, isRevisionDay: false, tasks: [
    { id: "67", title: "Exam Day - Computer System Organization (CS304)", type: "exam", subject: "Computer System Organization", completed: false }
  ] },
  { day: "Wednesday", date: "2025-12-31", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "68", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Thursday", date: "2026-01-01", isExamDay: false, isRevisionDay: false, tasks: [
    { id: "69", title: "Revision/Buffer Day", type: "study", completed: false }
  ] },
  { day: "Friday", date: "2026-01-02", isExamDay: true, isRevisionDay: false, tasks: [
    { id: "70", title: "Exam Day - Electronic Device & Circuits (CS305)", type: "exam", subject: "Electronic Device & Circuits", completed: false }
  ] }
];