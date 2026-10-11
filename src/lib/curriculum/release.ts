import type { AdoptionPath, Framework } from './constants';

export interface AlignmentRow {
	framework: Framework;
	path: AdoptionPath;
	guidelineDoc: string;
	guidelineRef: string;
	guidelineUrl: string;
	status: 'draft' | 'approved';
}

export function validateAlignment(row: AlignmentRow): string | null {
	if (!row.framework) return 'Framework required';
	if (!row.path) return 'Adoption path required';
	if (row.guidelineUrl && !/^https?:\/\//.test(row.guidelineUrl)) return 'Guideline URL must be http(s)';
	return null;
}

export interface Instance {
	session: string;
	term: '1st' | '2nd' | '3rd';
	releaseId: string;
	school: string;
}

export function instanceKey(i: Instance): string {
	return `${i.session}-${i.term}-${i.releaseId}`;
}

/** Shallow diff of Release LO sets for v2.4→v2.5 view. */
export function diffLoSets(oldLos: string[], newLos: string[]): { added: string[]; removed: string[] } {
	const o = new Set(oldLos);
	const n = new Set(newLos);
	return {
		added: newLos.filter((x) => !o.has(x)),
		removed: oldLos.filter((x) => !n.has(x))
	};
}
