import { describe, expect, test } from 'vitest';
import { mergeWeeks } from '$lib/curriculum/weeks-store';
import type { WeekRow } from '$lib/data/classes';

const seed: WeekRow[] = [
	{ week: 1, topic: 'A', content: 'a', outcome: 'oa' },
	{ week: 2, topic: 'B', content: 'b', outcome: 'ob' }
];

describe('week overrides', () => {
	test('override wins per week, seed fills the rest', () => {
		const out = mergeWeeks(seed, [{ week: 2, topic: 'B*', content: 'b*', outcome: 'ob*' }]);
		expect(out[0].topic).toBe('A');
		expect(out[1].topic).toBe('B*');
	});
	test('empty overrides return seed', () => {
		expect(mergeWeeks(seed, [])).toEqual(seed);
	});
});
