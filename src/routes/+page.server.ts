import type { Actions } from '@sveltejs/kit';
import db from '$lib/database/connectdb';

export const actions: Actions = {
	teste: async () => {
		console.log('teste');

		const teste = await db.query('SELECT * FROM users').then((res) => res.rows);

		console.log('TESTE DO BACKEND', teste);

		return { teste };
	}
};
