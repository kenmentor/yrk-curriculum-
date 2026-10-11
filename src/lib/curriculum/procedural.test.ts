import { describe, expect, test } from 'vitest';
import { EMPTY_INTAKE, setFramework, validateGovernance, validateProvenance } from '$lib/curriculum/intake';

describe('procedural intake', () => {
	test('governance blocks empty title', () => {
		expect(validateGovernance({ ...EMPTY_INTAKE, band: '', title: '' })).toBeTruthy();
		expect(validateGovernance({ ...EMPTY_INTAKE, band: 'upper-basic', title: 'Maths', country: 'NG' })).toBeNull();
	});
	test('provenance requires single framework + version', () => {
		const base = { ...EMPTY_INTAKE, band: 'upper-basic' as const, title: 'Maths', country: 'NG', framework: '' as const, adoptionPath: '' as const };
		expect(validateProvenance(base)).toBeTruthy();
		const ok = { ...base, framework: 'NERDC' as const, adoptionPath: 'domesticated' as const, version: 'v1.0', year: '2026' };
		expect(validateProvenance(ok)).toBeNull();
		const badUrl = { ...ok, guidelineUrl: 'not-a-url' };
		expect(validateProvenance(badUrl)).toBeTruthy();
	});
	test('single framework replaces, not adds', () => {
		const d = setFramework({ ...EMPTY_INTAKE, framework: 'NERDC' as const }, 'WAEC');
		expect(d.framework).toBe('WAEC');
	});
});
