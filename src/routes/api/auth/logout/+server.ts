import { json, type RequestHandler } from '@sveltejs/kit';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/auth';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.session) {
		return json({ error: '로그인되어 있지 않습니다.' }, { status: 401 });
	}

	await invalidateSession(locals.session.id);
	deleteSessionTokenCookie({ cookies } as any);

	return json({ success: true });
};
