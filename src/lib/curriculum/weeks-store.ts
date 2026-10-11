import { browser } from '$app/environment';
import { weeksFor, type WeekRow } from '$lib/data/classes';
import type { Term } from '$lib/data/classes';

export const keyFor = (classId: string, subject: string, term: Term) =>
	`curriculumiq-weeks-${classId}-${subject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${term}`;

export const entryKeyFor = (entryId: string, subject: string, term: Term) =>
	`curriculumiq-weeks-entry-${entryId}-${subject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${term}`;

function readKey(key: string): WeekRow[] | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return null;
		const saved = JSON.parse(raw) as WeekRow[];
		return Array.isArray(saved) && saved.length ? saved : null;
	} catch { return null; }
}

/** Seed weeks merged with builder overrides (overrides win per week number). */
export function loadWeeks(classId: string, subject: string, term: Term): WeekRow[] {
	const seed = weeksFor(classId, subject, term);
	if (!browser) return seed;
	try {
		const raw = localStorage.getItem(keyFor(classId, subject, term));
		if (!raw) return seed;
		const saved = JSON.parse(raw) as WeekRow[];
		if (!Array.isArray(saved) || !saved.length) return seed;
		const byWeek = new Map(saved.map((w) => [w.week, w]));
		return seed.map((w) => byWeek.get(w.week) ?? w);
	} catch {
		return seed;
	}
}

export function saveWeeks(classId: string, subject: string, term: Term, rows: WeekRow[]): void {
	if (!browser) return;
	localStorage.setItem(keyFor(classId, subject, term), JSON.stringify(rows));
}

export function resetWeeks(classId: string, subject: string, term: Term): void {
	if (!browser) return;
	localStorage.removeItem(keyFor(classId, subject, term));
}

/** Seed weeks for a custom bank entry (generic scheme, merged with overrides). */
export function loadEntryWeeks(entryId: string, subject: string, term: Term): WeekRow[] {
	const seed = weeksFor('basic-1', subject, term);
	const saved = readKey(entryKeyFor(entryId, subject, term));
	if (!saved) return seed;
	return mergeWeeks(seed, saved);
}

export function saveEntryWeeks(entryId: string, subject: string, term: Term, rows: WeekRow[]): void {
	if (!browser) return;
	localStorage.setItem(entryKeyFor(entryId, subject, term), JSON.stringify(rows));
}

export function resetEntryWeeks(entryId: string, subject: string, term: Term): void {
	if (!browser) return;
	localStorage.removeItem(entryKeyFor(entryId, subject, term));
}

/** Pure merge used by tests (no localStorage). */
export function mergeWeeks(seed: WeekRow[], overrides: WeekRow[]): WeekRow[] {
	const byWeek = new Map(overrides.map((w) => [w.week, w]));
	return seed.map((w) => byWeek.get(w.week) ?? w);
}
