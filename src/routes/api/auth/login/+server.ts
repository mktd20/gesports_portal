import { json, type RequestHandler } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/auth/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { emailOrNickname, password } = await request.json();

		// 입력 검증
		if (!emailOrNickname || !password) {
			return json({ error: '이메일/닉네임과 비밀번호를 입력해주세요.' }, { status: 400 });
		}

		// 사용자 인증
		const user = await authenticateUser(emailOrNickname, password);
		if (!user) {
			return json({ error: '이메일/닉네임 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
		}

		// 세션 생성
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie({ cookies } as any, sessionToken, session.expiresAt);

		return json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				nickname: user.nickname,
				role: user.role
			}
		});
	} catch (error) {
		return json({ error: '로그인 중 오류가 발생했습니다.' }, { status: 500 });
	}
};
