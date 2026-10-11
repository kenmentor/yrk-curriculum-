import { resolveCanonicalSubject } from './pure';

// Canonical subjects seeded from Google Form lists (deduplicated).
export const CANONICAL_SUBJECTS = [
	{ slug: 'mathematics', name: 'Mathematics', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic', 'senior-secondary'] },
	{ slug: 'english-language', name: 'English Language', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic', 'senior-secondary'] },
	{ slug: 'basic-science', name: 'Basic Science', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic'] },
	{ slug: 'social-studies', name: 'Social Studies', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic'] },
	{ slug: 'civic-education', name: 'Civic Education', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic', 'senior-secondary'] },
	{ slug: 'computer-studies', name: 'Computer Studies', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic', 'senior-secondary'] },
	{ slug: 'creative-arts', name: 'Creative Arts', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic'] },
	{ slug: 'christian-religious-studies', name: 'Christian Religious Studies', type: 'academic', tracks: ['lower-basic', 'middle-basic', 'upper-basic', 'senior-secondary'] }
] as unknown as Array<{ slug: string; name: string; type: string; tracks: string[] }>;

export const SUBJECT_ALIASES: Array<{ alias: string; subject: string }> = [
	{ alias: 'mathemathics', subject: 'mathematics' },
	{ alias: 'maths', subject: 'mathematics' },
	{ alias: 'integrated science', subject: 'basic-science' },
	{ alias: 'fine arts', subject: 'creative-arts' },
	{ alias: 'visual arts', subject: 'creative-arts' },
	{ alias: 'music', subject: 'creative-arts' },
	{ alias: 'christian religious knowledge', subject: 'christian-religious-studies' },
	{ alias: 'computer science', subject: 'computer-studies' }
];

export function seedCheck(): boolean {
	return CANONICAL_SUBJECTS.every((s) => resolveCanonicalSubject(s.name) === s.name.toLowerCase());
}
