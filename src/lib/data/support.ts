export interface Policy { id: string; title: string; scope: string; effective: string; tldr: string; body: string; }
export interface Agenda { id: string; title: string; date: string; items: string[]; minutes: string; status: 'Scheduled' | 'Held'; }
export interface ProposalGroup { id: string; title: string; items: string[]; approvals: number; needed: number; status: 'Voting' | 'Approved'; }
export interface Review { id: string; title: string; checklist: Array<{ label: string; done: boolean }>; }

export const POLICIES: Policy[] = [
	{ id: 'pol-assess', title: 'Assessment Policy', scope: 'All classes', effective: '2026-09-01', tldr: 'Every term ends with a Week 12 assessment on record.', body: 'Every term ends with revision in Week 12 and a recorded assessment. No learner repeats a week without a support note.' },
	{ id: 'pol-transfer', title: 'Credit Transfer Policy', scope: 'Basic 1 – SSS 3', effective: '2026-09-01', tldr: 'New pupils are placed at the right week within two weeks.', body: 'Transfer pupils join at the week matching their last school record. The receiving teacher confirms placement within 2 weeks.' },
	{ id: 'pol-publish', title: 'Catalog Publication Rule', scope: 'Whole school', effective: '2026-10-01', tldr: 'Three sign-offs to publish; published weeks never change silently.', body: 'A scheme publishes only after Builder → Reviewer → Approver sign-off. Published weeks are immutable; fixes go to the next release.' }
];

export const AGENDAS: Agenda[] = [
	{ id: 'agd-oct', title: 'October Senate Agenda', date: '2026-10-20', items: ['Approve Basic 1 Maths weeks', 'Transfer credit requests (3)', 'Badge criteria sign-off'], minutes: 'Approved weeks 1–6. Deferred badges to next sitting.', status: 'Held' },
	{ id: 'agd-nov', title: 'Curriculum Committee — November', date: '2026-11-10', items: ['JSS 1 Science practicals', 'Nursery phonics review'], minutes: '', status: 'Scheduled' }
];

export const PROPOSAL_GROUPS: ProposalGroup[] = [
	{ id: 'pg-a', title: '2026/2027 Batch A', items: ['Basic 1 Maths W7 topic fix', 'JSS 1 Science W5 lab note'], approvals: 2, needed: 3, status: 'Voting' },
	{ id: 'pg-t', title: 'Transfer Credit Requests', items: ['3 pupil placements'], approvals: 3, needed: 3, status: 'Approved' }
];

export const REVIEWS: Review[] = [
	{ id: 'rev-cs', title: 'Basic 1–3 Scheme Review', checklist: [
		{ label: 'All subjects have 12 weeks per term', done: true },
		{ label: 'Practical weeks have materials listed', done: false },
		{ label: 'Outcomes measurable per week', done: false }
	] }
];
