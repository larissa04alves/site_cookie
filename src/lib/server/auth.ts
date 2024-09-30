// $lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';
import pg from 'pg';
import { Google } from 'arctic';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_REDIRECT_URL
} from '$env/static/private';

const pool = new pg.Pool();

const adapter = new NodePostgresAdapter(pool, {
	user: 'users', // Certifique-se de que este é o nome correto da sua tabela de usuários
	session: 'user_session'
});

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_REDIRECT_URL
);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
