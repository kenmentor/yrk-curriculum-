import { browser } from '$app/environment';

export interface PreviewSettings {
	school: string;
	headline: string;
	sub: string;
	accent: string;
	bannerImages: string[];
	bannerDim: number;
	showStats: boolean;
	showClasses: boolean;
	showWhy: boolean;
	showPolicy: boolean;
	showTeam: boolean;
	why: Array<{ title: string; desc: string }>;
}

export const DEFAULT_PREVIEW: PreviewSettings = {
	school: '1School Lagos',
	headline: 'Every class. Every term. Every week.',
	sub: 'Nursery 1 to SSS 3 — open your class, pick the term, teach the week. NERDC-aligned, WAEC-ready.',
	accent: '#7853da',
	bannerImages: [],
	bannerDim: 72,
	showStats: true,
	showClasses: true,
	showWhy: true,
	showPolicy: true,
	showTeam: true,
	why: [
		{ title: 'Know what week it is', desc: 'Every subject runs Weeks 1–12 with topics and content. Never wonder what to teach.' },
		{ title: 'See how to win', desc: 'Badges name their term and steps. Competencies name their level.' },
		{ title: 'Trust the process', desc: 'Builder → Reviewer → Approver. Published weeks never change silently.' }
	]
};

const KEY = 'curriculumiq-preview-v1';

export function loadPreview(): PreviewSettings {
	if (!browser) return DEFAULT_PREVIEW;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return DEFAULT_PREVIEW;
		const saved = JSON.parse(raw) as Partial<PreviewSettings> & { bannerImage?: string };
		const merged: PreviewSettings = { ...DEFAULT_PREVIEW, ...saved, why: saved.why ?? DEFAULT_PREVIEW.why };
		// Migrate single-image era → gallery.
		if (!merged.bannerImages?.length && saved.bannerImage) merged.bannerImages = [saved.bannerImage];
		return merged;
	} catch { return DEFAULT_PREVIEW; }
}

export function savePreview(s: PreviewSettings): void {
	if (browser) localStorage.setItem(KEY, JSON.stringify(s));
}
