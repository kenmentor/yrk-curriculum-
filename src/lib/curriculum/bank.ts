import { browser } from '$app/environment';
import { CLASSES, subjectsFor } from '$lib/data/classes';

export type Visibility = 'public' | 'private';

export interface BankEntry {
	id: string;
	title: string;
	band: string;
	country: string;
	framework: string;
	version: string;
	year: string;
	subjects: string[];
	visibility: Visibility;
	createdAt: string;
	updatedAt: string;
	origin: 'seed' | 'custom';
}

const KEY = 'curriculumiq-bank-v1';

/** Default subject set for a band, borrowed from the closest seed class. */
export function defaultSubjectsForBand(band: string): string[] {
	const b = band.toLowerCase();
	let probe = 'basic-1';
	if (b.includes('nursery') || b.includes('eccde') || b.includes('pre')) probe = 'nursery-1';
	else if (b.includes('middle')) probe = 'basic-4';
	else if (b.includes('upper') || b.includes('jss') || b.includes('junior')) probe = 'jss-1';
	else if (b.includes('senior') || b.includes('sss') || b.includes('secondary')) probe = 'sss-1';
	else if (b.includes('lower')) probe = 'basic-1';
	return subjectsFor(probe);
}

export function listCustom(): BankEntry[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? (JSON.parse(raw) as BankEntry[]) : [];
	} catch { return []; }
}

export function getCustom(id: string): BankEntry | undefined {
	return listCustom().find((e) => e.id === id);
}

function persist(all: BankEntry[]): void {
	if (browser) localStorage.setItem(KEY, JSON.stringify(all));
}

export function addCustom(e: Omit<BankEntry, 'id' | 'createdAt' | 'updatedAt' | 'origin' | 'subjects' | 'visibility'> & { subjects?: string[]; visibility?: Visibility }): BankEntry {
	const entry: BankEntry = {
		...e,
		subjects: e.subjects?.length ? e.subjects : defaultSubjectsForBand(e.band),
		visibility: e.visibility ?? 'private',
		id: `custom-${Date.now()}`,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		origin: 'custom'
	};
	persist([entry, ...listCustom()]);
	return entry;
}

export function updateCustom(id: string, patch: Partial<BankEntry>): BankEntry | undefined {
	const all = listCustom().map((e) =>
		e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
	);
	persist(all);
	return all.find((e) => e.id === id);
}

export function removeCustom(id: string): void {
	if (!browser) return;
	persist(listCustom().filter((e) => e.id !== id));
	// Sweep its week overrides too.
	try {
		const dead: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i) ?? '';
			if (k.startsWith(`curriculumiq-weeks-entry-${id}-`)) dead.push(k);
		}
		dead.forEach((k) => localStorage.removeItem(k));
	} catch {}
}

const VIS_KEY = 'curriculumiq-visibility-v1';

/** Per-seed-class visibility overrides. Default is public. */
export function seedVisibility(): Record<string, Visibility> {
	if (!browser) return {};
	try {
		return JSON.parse(localStorage.getItem(VIS_KEY) ?? '{}') as Record<string, Visibility>;
	} catch { return {}; }
}

export function setSeedVisibility(classId: string, v: Visibility): void {
	if (!browser) return;
	localStorage.setItem(VIS_KEY, JSON.stringify({ ...seedVisibility(), [classId]: v }));
}

export function isPublicClass(classId: string): boolean {
	return (seedVisibility()[classId] ?? 'public') === 'public';
}

/** Seed classes with edited detection (any week override saved for that class). */
export function listSeedStatus(): Array<{ id: string; label: string; band: string; edited: boolean; subjects: number }> {
	if (!browser) return CLASSES.map((c) => ({ id: c.id, label: c.label, band: c.band, edited: false, subjects: 0 }));
	return CLASSES.map((c) => {
		let edited = false;
		try {
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i) ?? '';
				if (k.startsWith(`curriculumiq-weeks-${c.id}-`)) { edited = true; break; }
			}
		} catch {}
		return { id: c.id, label: c.label, band: c.band, edited, subjects: 0 };
	});
}
