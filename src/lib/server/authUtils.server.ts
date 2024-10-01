// $lib/server/authUtils.server.ts
import type { Cookies } from '@sveltejs/kit';
import type { Lucia } from 'lucia';

interface UserData {
	id: string;
	provider: string;
	provider_user_id: string;
	name: string;
	email: string;
	avatar_url: string;
	admin: boolean;
}

export const GOOGLE_OAUTH_STATE_COOKIE_NAME = 'googleOauthState';
export const GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME = 'googleOauthCodeVerifier';

export const createSessionCookie = async (lucia: Lucia, userData: UserData, cookies: Cookies) => {
	const session = await lucia.createSession(userData.id, {});

	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
};

export const deleteSessionCookie = async (lucia: Lucia, cookies: Cookies) => {
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
};
