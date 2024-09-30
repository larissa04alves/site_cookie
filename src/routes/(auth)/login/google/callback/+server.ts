// src/routes/auth/google/callback/+server.ts
import type { RequestHandler } from './$types';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';

import {
	GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME,
	GOOGLE_OAUTH_STATE_COOKIE_NAME,
	createSessionCookie
} from '$lib/server/authUtils.server';
import { connectDB } from '$lib/database/connectdb';
import { google, lucia } from '$lib/server/auth';

type GoogleUser = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
};

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get(GOOGLE_OAUTH_STATE_COOKIE_NAME);
	const storedCodeVerifier = event.cookies.get(GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME);

	// Validar o estado OAuth e o code verifier
	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		return new Response('Invalid OAuth state or code verifier', {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

		const googleUserResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const googleUser = (await googleUserResponse.json()) as GoogleUser;

		if (!googleUser.email) {
			return new Response('No primary email address', {
				status: 400
			});
		}

		if (!googleUser.email_verified) {
			return new Response('Email não verificado', {
				status: 400
			});
		}

		// Conectar ao banco de dados
		const client = await connectDB();

		try {
			// Verificar se o usuário já existe
			const queryText = 'SELECT id FROM users WHERE email = $1';
			const res = await client.query(queryText, [googleUser.email]);

			let userId: string;

			if (res.rows.length > 0) {
				// Usuário existe, usar o ID existente
				userId = res.rows[0].id;
			} else {
				// Criar um novo usuário
				userId = generateId(10);
				const insertText = `
                    INSERT INTO users (id, provider, provider_user_id, name, email, avatar_url, admin)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                `;
				const insertValues = [
					userId,
					'google',
					googleUser.sub,
					googleUser.name,
					googleUser.email,
					googleUser.picture,
					false // admin será false por padrão
				];

				await client.query(insertText, insertValues);
			}

			// Criar sessão
			await createSessionCookie(lucia, userId, event.cookies);

			return new Response(null, {
				status: 302,
				headers: {
					location: '/'
				}
			});
		} finally {
			// Liberar o cliente de volta ao pool
			client.release();
		}
	} catch (error) {
		console.error(error);

		if (error instanceof OAuth2RequestError) {
			return new Response('Invalid OAuth request', {
				status: 400
			});
		}

		return new Response('Internal Server Error', {
			status: 500
		});
	}
};
