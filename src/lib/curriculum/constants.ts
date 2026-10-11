export type LevelBand =
	| 'eccde'
	| 'lower-basic'
	| 'middle-basic'
	| 'upper-basic'
	| 'senior-secondary'
	| 'stme'
	| 'abec';

export const LEVEL_BAND_LABELS: Record<LevelBand, string> = {
	eccde: 'ECCDE / Pre-Primary',
	'lower-basic': 'Lower Basic (Primary 1–3)',
	'middle-basic': 'Middle Basic (Primary 4–6)',
	'upper-basic': 'Upper Basic (JSS 1–3)',
	'senior-secondary': 'Senior Secondary (SSS 1–3)',
	stme: 'Technical / Science Secondary (STME)',
	abec: 'Accelerated Basic Education (ABEC)'
};

/** Tertiary/professional reserved for post-v1 — never offered as creatable in v1. */
export const RESERVED_FUTURE_BANDS = ['tertiary', 'professional'] as const;

export const CREATABLE_BANDS: LevelBand[] = [
	'eccde',
	'lower-basic',
	'middle-basic',
	'upper-basic',
	'senior-secondary',
	'stme',
	'abec'
];

export type AdoptionPath = 'full' | 'revised' | 'domesticated' | 'native';

export const ADOPTION_PATH_LABELS: Record<AdoptionPath, string> = {
	full: 'Full (unmodified)',
	revised: 'Revised',
	domesticated: 'Domesticated',
	native: 'Native'
};

export const FRAMEWORKS = [
	'NERDC',
	'WAEC',
	'NECO',
	'JUPEB',
	'NUC',
	'Institutional',
	'IB',
	'British',
	'Cambridge-IGCSE',
	'Cambridge-Advanced',
	'AP',
	'ACT',
	'SAT'
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export type ReleaseStatus = 'draft' | 'build' | 'review' | 'approve' | 'published';
export type CurriculumRole = 'owner' | 'builder' | 'reviewer' | 'approver' | 'inspector';

export type NodeKind = 'module' | 'unit' | 'topic' | 'sub-topic';
export const NODE_DEPTH: Record<NodeKind, number> = {
	module: 0,
	unit: 1,
	topic: 2,
	'sub-topic': 3
};

export type DeliveryFormat =
	| 'instructional'
	| 'demonstration'
	| 'practical'
	| 'practical-lab'
	| 'practical-clinical'
	| 'seminar'
	| 'fieldwork'
	| 'blended-online';

/** Per-band allow matrix (enterprise pick, Step 3). */
export const DELIVERY_ALLOW_MATRIX: Record<LevelBand, DeliveryFormat[]> = {
	eccde: ['instructional', 'demonstration', 'practical', 'fieldwork'],
	'lower-basic': ['instructional', 'demonstration', 'practical', 'practical-lab', 'fieldwork', 'blended-online'],
	'middle-basic': ['instructional', 'demonstration', 'practical', 'practical-lab', 'fieldwork', 'blended-online'],
	'upper-basic': ['instructional', 'demonstration', 'practical', 'practical-lab', 'seminar', 'fieldwork', 'blended-online'],
	'senior-secondary': ['instructional', 'demonstration', 'practical', 'practical-lab', 'seminar', 'fieldwork', 'blended-online'],
	stme: ['instructional', 'demonstration', 'practical', 'practical-lab', 'practical-clinical', 'seminar', 'fieldwork', 'blended-online'],
	abec: ['instructional', 'demonstration', 'practical', 'fieldwork', 'blended-online']
};

export function isDeliveryAllowed(band: LevelBand, format: DeliveryFormat): boolean {
	return DELIVERY_ALLOW_MATRIX[band].includes(format);
}
