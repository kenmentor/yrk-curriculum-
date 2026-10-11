import type { AdoptionPath, Framework, LevelBand } from './constants';
import { parseVersion, isValidSession } from './pure';

export interface IntakeDraft {
	country: string; // ISO 2-letter
	band: LevelBand | '';
	title: string;
	framework: Framework | ''; // SINGLE in v1
	adoptionPath: AdoptionPath | '';
	guidelineDoc: string;
	guidelineRef: string;
	guidelineUrl: string;
	version: string;
	year: string;
}

export const EMPTY_INTAKE: IntakeDraft = {
	country: 'NG',
	band: '',
	title: '',
	framework: '',
	adoptionPath: '',
	guidelineDoc: '',
	guidelineRef: '',
	guidelineUrl: '',
	version: 'v1.0',
	year: String(new Date().getFullYear())
};

export function validateGovernance(d: IntakeDraft): string | null {
	if (!d.band) return 'Choose a level band.';
	if (!d.title.trim()) return 'Title (program) is required.';
	if (!/^[A-Za-z]{2}$/.test(d.country.trim())) return 'Country must be 2-letter ISO (e.g. NG).';
	return null;
}

export function validateProvenance(d: IntakeDraft): string | null {
	if (!d.framework) return 'Choose one framework (single in v1).';
	if (!d.adoptionPath) return 'Choose an adoption path.';
	if (d.guidelineUrl.trim() && !/^https?:\/\//.test(d.guidelineUrl.trim()))
		return 'Guideline URL must start with http(s).';
	if (!parseVersion(d.version)) return 'Version must be vMAJOR.MINOR (e.g. v1.0).';
	if (!/^\d{4}$/.test(d.year.trim())) return 'Year must be 4 digits.';
	return null;
}

/** Single-framework replace (not add). */
export function setFramework(d: IntakeDraft, f: Framework): IntakeDraft {
	return { ...d, framework: f };
}
