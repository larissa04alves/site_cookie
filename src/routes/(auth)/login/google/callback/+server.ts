// src/routes/auth/google/callback/+server.ts
import type { RequestHandler } from './$types';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import {
	GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME,
	GOOGLE_OAUTH_STATE_COOKIE_NAME,
	createSessionCookie
} from '$lib/server/authUtils.server';
import db from '$lib/database/connectdb';
import { google, lucia } from '$lib/server/auth';
import type { UserDataFromCookies } from '$lib/database/typesUteis';

interface UserData {
	id: string;
	provider: string;
	provider_user_id: string;
	name: string;
	email: string;
	avatar_url: string;
	admin: boolean;
}

type GoogleUser = {
	sub: string;
	name: string;
	email: string;
	picture: string;
	email_verified: boolean;
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
			console.log('Sem email', googleUser);

			return new Response('No primary email address', {
				status: 400
			});
		}

		if (!googleUser.email_verified) {
			console.log('Sem email verificado', googleUser);

			return new Response('Email não verificado', {
				status: 400
			});
		}

		// Conectar ao banco de dados
		const client = await db.connect();

		try {
			// Verificar se o usuário já existe na tabela 'users'
			const queryText = 'SELECT * FROM users WHERE email = $1';
			const res = await client.query(queryText, [googleUser.email]);

			let userId: string;
			let userData: UserData;

			if (res.rows.length > 0) {
				// Usuário existe, usar o ID existente sem atualizar os dados
				userData = res.rows[0];
				userId = userData.id;
			} else {
				// Criar um novo usuário
				userId = generateId(15);
				const insertText = `
          INSERT INTO users (
            id,
            provider,
            provider_user_id,
            name,
            email,
            avatar_url,
            admin
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
        `;
				const insertValues = [
					userId,
					'google',
					googleUser.sub,
					googleUser.name,
					googleUser.email,
					googleUser.picture,
					false // admin é falso por padrão
				];

				const insertRes = await client.query(insertText, insertValues);
				userData = insertRes.rows[0];
			}

			// Criar sessão usando Lucia
			await createSessionCookie(lucia, userData, event.cookies);

			// console.log(userData);

			// Armazenar os dados do usuário em locals.user
			event.locals.user = userData as UserDataFromCookies;

			// Redirecionar com base no status de administrador
			const redirectUrl = userData.admin ? '/admin/produtos' : '/';

			return new Response(null, {
				status: 302,
				headers: {
					location: redirectUrl
				}
			});
		} finally {
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
