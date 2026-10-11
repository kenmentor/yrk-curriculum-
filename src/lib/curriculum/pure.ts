import { NODE_DEPTH, type NodeKind } from './constants';

/** Normalise subject/alias text: lowercase, trim, collapse spaces. */
export function normaliseName(value: string): string {
	return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

const TYPO_MAP: Record<string, string> = {
	mathemathics: 'mathematics',
	maths: 'mathematics',
	'christian religious knowledge': 'christian religious studies',
	'fine arts': 'creative arts',
	'visual arts': 'creative arts',
	'computer science': 'computer studies'
};

export function resolveCanonicalSubject(input: string): string {
	const key = normaliseName(input);
	return TYPO_MAP[key] ?? key;
}

/** Semantic version helpers: vMAJOR.MINOR */
export function parseVersion(v: string): { major: number; minor: number } | null {
	const m = /^v(\d+)\.(\d+)$/.exec(v.trim());
	if (!m) return null;
	return { major: Number(m[1]), minor: Number(m[2]) };
}

export function requiresMajorBump(change: 'subject-or-lo' | 'wording-or-delivery'): boolean {
	return change === 'subject-or-lo';
}

/** Depth guard: max 4 levels Module(0)→Sub-topic(3). */
export function canNestChild(parent: NodeKind): boolean {
	return NODE_DEPTH[parent] < 3;
}

export function childKind(parent: NodeKind): NodeKind | null {
	const order: NodeKind[] = ['module', 'unit', 'topic', 'sub-topic'];
	const next = NODE_DEPTH[parent] + 1;
	return order[next] ?? null;
}

/** BFS cycle guard for prerequisite DAG. edges: from → to (from requires to). */
export function wouldCreateCycle(
	edges: Array<{ from: string; to: string }>,
	from: string,
	to: string
): boolean {
	if (from === to) return true;
	const adj = new Map<string, string[]>();
	for (const e of edges) {
		if (!adj.has(e.from)) adj.set(e.from, []);
		adj.get(e.from)!.push(e.to);
	}
	// DFS from `to` — if we reach `from`, adding from→to closes a cycle.
	const stack = [to];
	const seen = new Set<string>([to]);
	while (stack.length) {
		const cur = stack.pop()!;
		if (cur === from) return true;
		for (const nxt of adj.get(cur) ?? []) {
			if (!seen.has(nxt)) {
				seen.add(nxt);
				stack.push(nxt);
			}
		}
	}
	return false;
}

/** Session label e.g. 2026/2027. */
export function isValidSession(session: string): boolean {
	return /^\d{4}\/\d{4}$/.test(session.trim());
}
