export const kpis = [
	{ label: 'Draft Classes', value: 10, filter: 'draft', kind: 'classes' as const, delta: '+2 this week' },
	{ label: 'Classes in Progress', value: 17, filter: 'in-progress', kind: 'classes' as const, delta: '+3 this week' },
	{ label: 'Draft Subjects', value: 2, filter: 'draft', kind: 'subjects' as const, delta: '—' },
	{ label: 'Subjects in Progress', value: 3, filter: 'in-progress', kind: 'subjects' as const, delta: '+1 this week' }
];

export type Split = { key: 'complete' | 'in-progress' | 'draft' | 'error'; count: number; pct: number };
export const coursesDonut = { total: 65, splits: [
	{ key: 'complete', count: 29, pct: 45 },
	{ key: 'in-progress', count: 20, pct: 30 },
	{ key: 'draft', count: 16, pct: 25 }
] as Split[] };
export const programsDonut = { total: 43, splits: [
	{ key: 'complete', count: 15, pct: 35 },
	{ key: 'error', count: 15, pct: 35 },
	{ key: 'in-progress', count: 9, pct: 20 },
	{ key: 'draft', count: 4, pct: 10 }
] as Split[] };

export interface OldestRow { title: string; status: 'in-progress'; days: number; label: string; step: string; }
// Strict descending by days; screenshot order fixed here.
export const oldestCourses: OldestRow[] = [
	{ title: 'International Business', status: 'in-progress', days: 60, label: '2 months', step: 'Registrar Approval' },
	{ title: 'US History', status: 'in-progress', days: 13, label: '13 days', step: 'Registrar Approval' },
	{ title: 'Microeconomics', status: 'in-progress', days: 9, label: '9 days', step: 'Registrar Approval' },
	{ title: 'Data Structures and Algorithms', status: 'in-progress', days: 9, label: '9 days', step: 'Registrar Approval' },
	{ title: 'Introduction to Communications in the West', status: 'in-progress', days: 9, label: '9 days', step: 'Registrar Approval' }
];
export const OVERDUE_DAYS = 30;

export const assistantSeeds = [
	{ from: 'user' as const, text: 'Where is this curriculum proposal stalled?' },
	{ from: 'ai' as const, text: 'It’s waiting on committee review from the College of Arts & Sciences. Two approvals remain.' },
	{ from: 'user' as const, text: 'Create a transfer credit request form from this PDF.' },
	{ from: 'ai' as const, text: 'Transfer credit request form created with required fields, routing, and approvals.', action: 'View Form' },
	{ from: 'user' as const, text: 'Summarize catalog updates for a committee review.' },
	{ from: 'ai' as const, text: '7 course modifications and 2 program changes identified for the next committee review.', action: 'View Summary' }
];

export interface MapNode { id: string; parent: string | null; type: string; title: string; status: 'complete' | 'in-progress' | 'draft' | 'error'; credits: number; }
export const mapNodes: MapNode[] = [
	{ id: 'sci', parent: null, type: 'Subject', title: 'Sciences', status: 'in-progress', credits: 0 },
	{ id: 'cs-prog', parent: 'sci', type: 'Program', title: 'Computer Science', status: 'in-progress', credits: 120 },
	{ id: 'y2', parent: 'cs-prog', type: 'Year', title: 'Year 2', status: 'in-progress', credits: 30 },
	{ id: 't1', parent: 'y2', type: 'Term', title: 'Term 1', status: 'in-progress', credits: 15 },
	{ id: 'dsa', parent: 't1', type: 'Course', title: 'Data Structures and Algorithms', status: 'in-progress', credits: 3 },
	{ id: 'dsa-u1', parent: 'dsa', type: 'Unit', title: 'Complexity', status: 'complete', credits: 0 },
	{ id: 'dsa-lo1', parent: 'dsa-u1', type: 'Outcome', title: 'Analyze Big-O', status: 'complete', credits: 0 },
	{ id: 'micro', parent: 't1', type: 'Course', title: 'Microeconomics', status: 'in-progress', credits: 3 }
];
export const mapEdges = [
	{ from: 'dsa', to: 'micro', kind: 'prerequisite' as const },
	{ from: 'dsa', to: 'dsa-lo1', kind: 'outcome' as const }
];
