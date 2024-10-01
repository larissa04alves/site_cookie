export type UserDataFromCookies = {
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
