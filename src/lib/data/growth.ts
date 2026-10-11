import { CLASSES } from './classes';
import { subjectsFor } from './classes';

export interface Competency { id: string; classId: string; title: string; desc: string; subjects: string[]; level: 'Introduced' | 'Reinforced' | 'Mastered'; }
export interface Experience { id: string; classId: string; kind: 'Practical' | 'Laboratory' | 'Fieldwork'; title: string; subject: string; term: string; week: number; }
export interface Badge { id: string; name: string; classId: string; criteria: string; icon: 'numbers' | 'book' | 'flask' | 'star'; term: '1st' | '2nd' | '3rd' | 'Any term'; subject: string; steps: string[]; earners: number; }

function bandOf(classId: string): string {
	return CLASSES.find((c) => c.id === classId)?.band ?? 'Primary';
}
function yearOf(classId: string): number {
	const m = /(\d+)/.exec(classId);
	return m ? Number(m[1]) : 1;
}

const COMP_BY_BAND: Record<string, Array<[string, string]>> = {
	Nursery: [
		['Count to 20 with objects', 'Number Work'],
		['Say letter sounds clearly', 'Phonics'],
		['Hold pencil and trace shapes', 'Handwriting'],
		['Greet, share and take turns', 'Social Skills'],
		['Name colours and sizes', 'Colouring']
	],
	Primary: [
		['Add and subtract within class range', 'Mathematics'],
		['Read passages with comprehension', 'English Language'],
		['Write sentences legibly', 'English Language'],
		['Explain everyday science observations', 'Basic Science'],
		['Practise civic habits daily', 'Civic Education']
	],
	'Junior Secondary': [
		['Solve multi-step number problems', 'Mathematics'],
		['Write structured compositions', 'English Language'],
		['Run simple experiments safely', 'Basic Science'],
		['Analyse community issues', 'Social Studies'],
		['Use spreadsheets for class business', 'Business Studies']
	],
	'Senior Secondary': [
		['Prove results algebraically', 'Mathematics'],
		['Argue from evidence in essays', 'English Language'],
		['Design and report an experiment', 'Physics'],
		['Interpret data and markets', 'Economics'],
		['Defend a civic position with sources', 'Government']
	]
};

const EXP_BY_BAND: Record<string, Array<[Experience['kind'], string, string, number]>> = {
	Nursery: [
		['Practical', 'Sorting beads by colour', 'Number Work', 4],
		['Practical', 'Clap-the-syllable game', 'Word Work', 3],
		['Fieldwork', 'Playground texture walk', 'Social Skills', 7]
	],
	Primary: [
		['Practical', 'Measuring desks with ruler', 'Mathematics', 6],
		['Laboratory', 'Floating and sinking test', 'Basic Science', 5],
		['Fieldwork', 'Market visit: money in use', 'Social Studies', 8]
	],
	'Junior Secondary': [
		['Laboratory', 'Acid–base indicator test', 'Basic Science', 5],
		['Practical', 'Business ledger for tuck shop', 'Business Studies', 6],
		['Fieldwork', 'Community map survey', 'Social Studies', 9]
	],
	'Senior Secondary': [
		['Laboratory', 'Titration I', 'Chemistry', 5],
		['Laboratory', 'Pendulum timing', 'Physics', 6],
		['Fieldwork', 'Local market price survey', 'Economics', 8]
	]
};

const BADGE_DEFS: Array<[string, string, Badge['icon'], Badge['term'], string, string[]]> = [
	['Number Whiz', 'Finish all Term 1 number weeks with ≥80% checks.', 'numbers', '1st', 'Mathematics', ['Open your class scheme, 1st Term', 'Complete every Mathematics week exercise', 'Score ≥80% on the Week 12 assessment']],
	['Bookworm', 'Read every Term 1 English week aloud.', 'book', '1st', 'English Language', ['Open English Language, 1st Term', 'Read each week passage aloud', 'Log 12 read-alouds with your teacher']],
	['Young Scientist', 'Complete all Term 1 science practicals.', 'flask', '2nd', 'Basic Science', ['Open Basic Science, 2nd Term', 'Run each practical and record results', 'Present one finding to the class']],
	['Star Citizen', 'Perfect civic habits for one full term.', 'star', 'Any term', 'Civic Education', ['Pick any term', 'Hit every civic habit check with your teacher', 'Hold it all term']]
];

export function competenciesFor(classId: string): Competency[] {
	const band = bandOf(classId);
	const pool = COMP_BY_BAND[band] ?? COMP_BY_BAND.Primary;
	const year = yearOf(classId);
	const subs = subjectsFor(classId);
	return pool.map(([title, anchor], i) => ({
		id: `${classId}-comp-${i}`,
		classId,
		title: `${title} (${classId.replace('-', ' ')})`,
		desc: `Year-${year} expectation anchored in ${anchor}.`,
		subjects: [anchor, ...subs.filter((s) => s !== anchor).slice(0, 1)],
		level: (['Introduced', 'Reinforced', 'Mastered'] as const)[(year + i) % 3]
	}));
}

export function experiencesFor(classId: string): Experience[] {
	const band = bandOf(classId);
	const pool = EXP_BY_BAND[band] ?? EXP_BY_BAND.Primary;
	const terms: Array<'1st' | '2nd' | '3rd'> = ['1st', '2nd', '3rd'];
	const idx = Math.max(0, CLASSES.findIndex((c) => c.id === classId));
	return pool.map(([kind, title, subject, week], i): Experience => ({
		id: `${classId}-exp-${i}`,
		classId,
		kind,
		title: `${title} — ${classId.replace('-', ' ')}`,
		subject,
		term: terms[(idx + i) % 3],
		week: Math.min(12, week + (idx % 3))
	}));
}

export function badgesFor(classId: string): Badge[] {
	const label = classId.replace('-', ' ');
	return BADGE_DEFS.map(([name, criteria, icon, term, subject, steps], i) => ({
		id: `${classId}-badge-${i}`,
		name: `${name}`,
		classId,
		criteria: `${criteria} (${label}).`,
		icon,
		term,
		subject,
		steps: steps.map((s) => s.replace('your class', label)),
		earners: (classId.length * 7 + i * 13 + yearOf(classId) * 11) % 180
	}));
}
