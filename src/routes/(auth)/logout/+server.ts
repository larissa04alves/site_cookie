// src/routes/logout/+server.ts
import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSessionCookie } from '$lib/server/authUtils.server';

export const GET: RequestHandler = async ({ cookies, locals }) => {
	// Verificar se o usuário está autenticado
	if (!locals.user) {
		throw redirect(302, '/');
	}

	// Obter o ID da sessão a partir do cookie
	const sessionId = cookies.get('auth_session'); // Substitua pelo nome do seu cookie de sessão, se diferente

	if (sessionId) {
		// Invalidar a sessão atual
		await lucia.invalidateSession(sessionId);
		await deleteSessionCookie(lucia, cookies);
		// Deletar o cookie de sessão
		cookies.delete('auth_session', { path: '/' }); // Certifique-se de que o caminho corresponde ao que foi definido
	}

	// Redirecionar para a página inicial
	throw redirect(302, '/');
};
