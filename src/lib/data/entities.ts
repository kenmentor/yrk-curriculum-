export type EntityKey =
	| 'experiences'
	| 'competencies' | 'badges' | 'policies' | 'agendas'
	| 'proposal-groups' | 'program-review' | 'outcomes' | 'inbox';

export interface EntityItem {
	id: string; code: string; title: string;
	type: string; status: 'complete' | 'in-progress' | 'draft' | 'error';
	owner: string; updated: string; credits?: number; step?: string;
}

export const ENTITY_META: Record<EntityKey, { title: string; blurb: string; codePrefix: string }> = {
	experiences: { title: 'Experiences', blurb: 'Practical, lab, and field work.', codePrefix: 'EXP' },
	competencies: { title: 'Competencies', blurb: 'Skills every graduate must show.', codePrefix: 'CMP' },
	badges: { title: 'Badges', blurb: 'Micro-credentials awarded on mastery.', codePrefix: 'BDG' },
	policies: { title: 'Policies', blurb: 'Governance rules every curriculum follows.', codePrefix: 'POL' },
	agendas: { title: 'Agendas', blurb: 'Committee meeting plans with attached items.', codePrefix: 'AGD' },
	'proposal-groups': { title: 'Proposal Groups', blurb: 'Batched changes reviewed together.', codePrefix: 'PGRP' },
	'program-review': { title: 'Program Review', blurb: 'Periodic quality reviews with votes.', codePrefix: 'REV' },
	outcomes: { title: 'Outcomes', blurb: 'Learning outcomes mapped across courses.', codePrefix: 'OUT' },
	inbox: { title: 'Inbox', blurb: 'Your approvals and tasks. Oldest first.', codePrefix: 'TSK' }
};

const OWNERS = ['Dept. of Sciences', 'Arts & Sciences', 'Registrar', 'Senate Committee'];
const STEPS = ['Department Review', 'Committee Review', 'Registrar Approval'];

function items(key: EntityKey, titles: string[]): EntityItem[] {
	const meta = ENTITY_META[key];
	const statuses = ['in-progress', 'complete', 'draft', 'in-progress', 'complete'] as const;
	return titles.map((t, i) => ({
		id: `${key}-${i + 1}`,
		code: `${meta.codePrefix}-${100 + i}`,
		title: t,
		type: meta.title.slice(0, -1),
		status: statuses[i % statuses.length],
		owner: OWNERS[i % OWNERS.length],
		updated: `2026-10-${String(1 + (i % 9)).padStart(2, '0')}`,
		credits: undefined,
		step: statuses[i % statuses.length] === 'in-progress' ? STEPS[i % STEPS.length] : undefined
	}));
}

export const ENTITY_SEED: Record<EntityKey, EntityItem[]> = {
	experiences: items('experiences', ['Teaching Practice', 'Lab Attachment', 'Field Survey']),
	competencies: items('competencies', ['Critical Thinking', 'Quantitative Reasoning', 'Communication']),
	badges: items('badges', ['Python Foundations', 'Research Ethics', 'First Aid']),
	policies: items('policies', ['Assessment Policy', 'Credit Transfer Policy', 'Catalog Publication Rule']),
	agendas: items('agendas', ['October Senate Agenda', 'Curriculum Committee — Week 42']),
	'proposal-groups': items('proposal-groups', ['2026/2027 Batch A', 'Transfer Credit Requests']),
	'program-review': items('program-review', ['Computer Science 5-Year Review', 'Business Admin Mini-Review']),
	outcomes: items('outcomes', ['Analyze Big-O', 'Interpret Balance Sheets', 'Write Argumentative Essays']),
	inbox: items('inbox', ['Approve Microeconomics', 'Review Data Structures', 'Sign off US History', 'Vote Batch A'])
};
