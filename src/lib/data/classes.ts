export type Band = 'Nursery' | 'Primary' | 'Junior Secondary' | 'Senior Secondary';
export type Term = '1st' | '2nd' | '3rd';

export interface ClassInfo {
	id: string; // e.g. nursery-1, basic-1, jss-1, sss-1
	label: string; // e.g. Nursery 1
	short: string; // e.g. NUR 1
	band: Band;
	order: number;
	framework: string;
}

const N = (n: number): ClassInfo[] =>
	[1, 2, 3].slice(0, n).map((i, k) => ({ id: '', label: '', short: '', band: 'Nursery', order: k, framework: 'NERDC' }));

export const CLASSES: ClassInfo[] = [
	...[1, 2, 3].map((i): ClassInfo => ({ id: `nursery-${i}`, label: `Nursery ${i}`, short: `NUR ${i}`, band: 'Nursery', order: i, framework: 'NERDC' })),
	...[1, 2, 3, 4, 5, 6].map((i): ClassInfo => ({ id: `basic-${i}`, label: `Basic ${i}`, short: `BAS ${i}`, band: 'Primary', order: 10 + i, framework: 'NERDC' })),
	...[1, 2, 3].map((i): ClassInfo => ({ id: `jss-${i}`, label: `JSS ${i}`, short: `JSS ${i}`, band: 'Junior Secondary', order: 20 + i, framework: 'NERDC' })),
	...[1, 2, 3].map((i): ClassInfo => ({ id: `sss-${i}`, label: `SSS ${i}`, short: `SSS ${i}`, band: 'Senior Secondary', order: 30 + i, framework: i === 3 ? 'WAEC' : 'NERDC' }))
];

export const BANDS: Band[] = ['Nursery', 'Primary', 'Junior Secondary', 'Senior Secondary'];

const NURSERY_SUBJECTS = ['Number Work', 'Word Work', 'Phonics', 'Social Skills', 'Colouring', 'Handwriting'];
const PRIMARY_SUBJECTS = ['Mathematics', 'English Language', 'Basic Science', 'Social Studies', 'Civic Education', 'Computer Studies', 'Christian Religious Studies', 'Yoruba'];
const JSS_SUBJECTS = ['Mathematics', 'English Language', 'Basic Science', 'Social Studies', 'Civic Education', 'Computer Studies', 'Business Studies', 'French', 'Yoruba'];
const SSS_SUBJECTS = ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Government', 'Literature in English', 'Computer Science'];

export function subjectsFor(classId: string): string[] {
	if (classId.startsWith('nursery')) return NURSERY_SUBJECTS;
	if (classId.startsWith('basic')) return PRIMARY_SUBJECTS;
	if (classId.startsWith('jss')) return JSS_SUBJECTS;
	return SSS_SUBJECTS;
}

export interface WeekRow { week: number; topic: string; content: string; outcome: string; }

const MATHS_T1 = ['Whole numbers & counting', 'Place value', 'Addition', 'Subtraction', 'Multiplication tables', 'Division', 'Fractions (intro)', 'Money', 'Time', 'Measurement', 'Shapes', 'Revision & assessment'];
const ENG_T1 = ['Phonics & sounds', 'Sight words', 'Nouns', 'Verbs', 'Tenses (intro)', 'Comprehension I', 'Composition I', 'Punctuation', 'Vocabulary', 'Listening & speaking', 'Handwriting', 'Revision & assessment'];
const SCI_T1 = ['Living vs non-living', 'Parts of the body', 'Plants around us', 'Animals around us', 'Water', 'Air', 'Soil', 'Food & nutrition', 'Hygiene', 'Safety', 'Simple machines', 'Revision & assessment'];
const GEN = (base: string[]) => (t: Term): WeekRow[] =>
	base.map((topic: string, i: number) => ({
	week: i + 1,
	topic: t === '1st' ? topic : t === '2nd' ? `${topic} — II` : `${topic} — III`,
	content: `Teacher introduces ${topic.toLowerCase()}; guided practice, class exercises, take-home.`,
	outcome: `Learner can demonstrate ${topic.toLowerCase()} at class level.`
}));

export function weeksFor(classId: string, subject: string, term: Term): WeekRow[] {
	const s = subject.toLowerCase();
	if (s.includes('math') || s.includes('number')) return GEN(MATHS_T1)(term);
	if (s.includes('english') || s.includes('word') || s.includes('phonics')) return GEN(ENG_T1)(term);
	if (s.includes('science')) return GEN(SCI_T1)(term);
	return GEN(MATHS_T1.map((t) => `${subject}: ${t}`))(term);
}
