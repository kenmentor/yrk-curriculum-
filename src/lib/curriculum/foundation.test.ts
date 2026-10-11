import { describe, expect, test } from 'vitest';
import {
	canNestChild,
	parseVersion,
	requiresMajorBump,
	resolveCanonicalSubject,
	wouldCreateCycle,
	isValidSession
} from '$lib/curriculum/pure';
import { isDeliveryAllowed } from '$lib/curriculum/constants';
import { canTransition, mayApprove, selfApprovalBlocked } from '$lib/curriculum/workflow';
import { validatePhone } from '$lib/identity/phone';

describe('versioning', () => {
	test('parses vMAJOR.MINOR', () => {
		expect(parseVersion('v2.4')).toEqual({ major: 2, minor: 4 });
		expect(parseVersion('2.4')).toBeNull();
	});
	test('subject/LO change requires major', () => {
		expect(requiresMajorBump('subject-or-lo')).toBe(true);
		expect(requiresMajorBump('wording-or-delivery')).toBe(false);
	});
});

describe('taxonomy', () => {
	test('typo map resolves', () => {
		expect(resolveCanonicalSubject('Mathemathics')).toBe('mathematics');
		expect(resolveCanonicalSubject('Fine Arts')).toBe('creative arts');
	});
});

describe('tree guards', () => {
	test('depth guard blocks 5th level', () => {
		expect(canNestChild('sub-topic')).toBe(false);
		expect(canNestChild('topic')).toBe(true);
	});
	test('cycle guard incl. cross-level', () => {
		const edges = [
			{ from: 'jss-fractions', to: 'p5-fractions' },
			{ from: 'p5-fractions', to: 'p3-counting' }
		];
		expect(wouldCreateCycle(edges, 'p3-counting', 'jss-fractions')).toBe(true);
		expect(wouldCreateCycle(edges, 'jss-ordering', 'jss-fractions')).toBe(false);
		expect(wouldCreateCycle([], 'a', 'a')).toBe(true);
	});
	test('ECCDE clinical blocked', () => {
		expect(isDeliveryAllowed('eccde', 'practical-clinical')).toBe(false);
		expect(isDeliveryAllowed('upper-basic', 'practical-lab')).toBe(true);
	});
	test('session format', () => {
		expect(isValidSession('2026/2027')).toBe(true);
		expect(isValidSession('2026')).toBe(false);
	});
});

describe('workflow', () => {
	test('forward/back one step only', () => {
		expect(canTransition('draft', 'build')).toBe(true);
		expect(canTransition('build', 'draft')).toBe(true);
		expect(canTransition('draft', 'review')).toBe(false);
		expect(canTransition('approve', 'published')).toBe(true);
	});
	test('approver-only + self-approval block', () => {
		expect(mayApprove('builder')).toBe(false);
		expect(mayApprove('approver')).toBe(true);
		expect(selfApprovalBlocked('builder', true, false)).toBe(true);
		expect(selfApprovalBlocked('owner', true, true)).toBe(false);
	});
});

describe('phone invite', () => {
	test('rejects short phones', () => {
		expect(validatePhone('123').ok).toBe(false);
		expect(validatePhone('+234 803 123 4567').ok).toBe(true);
	});
});
