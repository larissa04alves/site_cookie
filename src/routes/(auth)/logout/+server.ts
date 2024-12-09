import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	if (!event.locals.session) {
		throw redirect(302, '/');
	}

	try {
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
	} catch (error) {
		console.error('Erro ao fazer logout:', error);
	}

	throw redirect(302, '/');
};
