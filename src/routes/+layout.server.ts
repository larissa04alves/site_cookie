import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user
			? {
					admin: locals.user.admin,
					name: locals.user.name,
					email: locals.user.email
				}
			: null
	};
};
