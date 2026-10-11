import { parsePhoneNumberFromString } from 'libphonenumber-js';

/** Shared phone validation — mirrors one-school-chat identity rules (min 7 digits). */
export function validatePhone(value: string, defaultCountry = 'NG'): { ok: true; e164: string } | { ok: false; reason: string } {
	const v = value.trim();
	if (!v) return { ok: false, reason: 'Required' };
	const digits = v.replace(/\D/g, '');
	if (digits.length < 7) return { ok: false, reason: 'Phone must contain at least 7 digits' };
	try {
		const parsed = parsePhoneNumberFromString(v, defaultCountry as never);
		if (parsed && parsed.isValid()) return { ok: true, e164: parsed.number };
	} catch {
		// fall through to digit check
	}
	return { ok: true, e164: v };
}

export type InviteRole = 'builder' | 'reviewer' | 'approver' | 'inspector';

export interface PhoneInvite {
	phone: string;
	e164: string;
	role: InviteRole;
	token: string;
	expiresAt: string;
}

export function buildInviteToken(): string {
	return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
