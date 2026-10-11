import type { CurriculumRole, ReleaseStatus } from '$lib/curriculum/constants';

const ORDER: ReleaseStatus[] = ['draft', 'build', 'review', 'approve', 'published'];

export function canTransition(from: ReleaseStatus, to: ReleaseStatus): boolean {
	const fi = ORDER.indexOf(from);
	const ti = ORDER.indexOf(to);
	if (fi === -1 || ti === -1) return false;
	// forward one step, or back one step (return with comment)
	return ti === fi + 1 || ti === fi - 1;
}

export function mayApprove(role: CurriculumRole): boolean {
	return role === 'approver' || role === 'owner';
}

export function mayPublish(role: CurriculumRole): boolean {
	return role === 'approver' || role === 'owner';
}

/** Separation of duties: builder cannot approve own release without owner override. */
export function selfApprovalBlocked(actorRole: CurriculumRole, isOwnWork: boolean, ownerOverride: boolean): boolean {
	if (!isOwnWork) return false;
	if (ownerOverride && actorRole === 'owner') return false;
	return actorRole === 'builder';
}
