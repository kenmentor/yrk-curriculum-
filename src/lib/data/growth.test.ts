import { describe, expect, test } from 'vitest';
import { badgesFor, competenciesFor, experiencesFor } from '$lib/data/growth';

describe('per-class growth data', () => {
	test('competencies differ by band and name the class', () => {
		const nursery = competenciesFor('nursery-1');
		const sss = competenciesFor('sss-3');
		expect(nursery.map((c) => c.title)).not.toEqual(sss.map((c) => c.title));
		expect(nursery[0].title).toContain('nursery 1');
		expect(sss[0].title).toContain('sss 3');
	});
	test('experiences differ by band with class in title', () => {
		const basic = experiencesFor('basic-1');
		const jss = experiencesFor('jss-2');
		expect(basic.map((e) => e.title)).not.toEqual(jss.map((e) => e.title));
		expect(basic.every((e) => e.title.includes('basic 1'))).toBe(true);
	});
	test('badges carry class context with terms and steps', () => {
		const a = badgesFor('basic-1');
		const b = badgesFor('sss-3');
		expect(a[0].classId).toBe('basic-1');
		expect(b[0].classId).toBe('sss-3');
		expect(a[0].criteria).toContain('basic 1');
		expect(a[0].steps.length).toBeGreaterThan(0);
		expect(a[0].term).toBeTruthy();
		expect(a[0].earners).not.toBe(b[0].earners);
	});
});
