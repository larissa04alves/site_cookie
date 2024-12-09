import { fail, redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/session';
import type { Actions, PageServerLoad } from './$types';

interface SerializableUser {
	id: string;
	name: string;
	email: string;
	username: string;
	admin: boolean;
}

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return {
			user: null
		};
	}

	const serializableUser: SerializableUser = {
		id: locals.user.id,
		name: locals.user.name,
		email: locals.user.email,
		username: locals.user.username,
		admin: locals.user.admin ?? false
	};

	return {
		user: serializableUser
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}

		try {
			await invalidateSession(event.locals.session.id);
			deleteSessionTokenCookie(event);
			return redirect(302, '/login');
		} catch (error) {
			console.error('Erro ao fazer logout:', error);
			return fail(500, { message: 'Erro ao fazer logout' });
		}
	}
};
