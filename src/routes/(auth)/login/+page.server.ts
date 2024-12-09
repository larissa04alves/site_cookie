import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Se o usuário já estiver logado
	if (locals.user) {
		// Se for admin, redireciona para área admin
		if (locals.user.admin) {
			throw redirect(302, '/admin');
		}
		// Se não for admin, redireciona para home
		throw redirect(302, '/');
	}

	// Se não estiver logado, retorna normalmente para mostrar a página de login
	return {};
};
