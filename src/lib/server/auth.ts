// auth.ts

import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';
import pg from 'pg';
import { Google } from 'arctic';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_REDIRECT_URL,
	URL_DATABASE
} from '$env/static/private';

const pool = new pg.Pool({
	connectionString: URL_DATABASE
});

const adapter = new NodePostgresAdapter(pool, {
	user: 'users', // Your 'users' table
	session: 'user_session' // Your 'user_session' table
});

// Initialize Google OAuth
export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_REDIRECT_URL
);

// Initialize Lucia authentication
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	// Fields to access via cookies
	getUserAttributes: (user) => ({
		id: user.id,
		provider: user.provider,
		provider_user_id: user.provider_user_id,
		name: user.name,
		email: user.email,
		avatar_url: user.avatar_url,
		admin: user.admin,
		created_at: user.created_at,
		birth_date: user.birth_date
	})
});

// Extend Lucia module to include custom user attributes
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;

		DatabaseUserAttributes: {
			id: string;
			provider: string;
			provider_user_id: string;
			name: string;
			email: string;
			avatar_url: string;
			admin: boolean;
			created_at: Date;
			birth_date: Date | null;
		};
	}
}
