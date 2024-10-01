// Example: src/routes/admin/+page.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	// console.log('Loooocals', locals.user);
	// console.log('Sessiooon', locals.session);
	// console.log('coooookies', cookies.getAll());

	if (!locals.user) {
		throw redirect(302, '/login'); // Redirect if user is not logged in
	}

	if (locals.user.admin !== true) {
		throw redirect(302, '/login'); // Redirect non-admin users to the login page
	}

	// Load data for admin page
	return {
		user: locals.user
	};
};
