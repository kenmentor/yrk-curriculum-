import { describe, expect, test } from 'vitest';
import { coursesDonut, programsDonut, oldestCourses } from '$lib/data/seed';

describe('dashboard numbers', () => {
	test('splits total 100 and counts match totals', () => {
		for (const d of [coursesDonut, programsDonut]) {
			expect(d.splits.reduce((a, s) => a + s.pct, 0)).toBe(100);
			expect(d.splits.reduce((a, s) => a + s.count, 0)).toBe(d.total);
		}
	});
	test('oldest strictly descending by days', () => {
		const days = oldestCourses.map((r) => r.days);
		const sorted = [...days].sort((a, b) => b - a);
		expect(days).toEqual(sorted);
		expect(oldestCourses[0].label).toBe('2 months');
	});
});
