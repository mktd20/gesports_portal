import { json, type RequestHandler } from '@sveltejs/kit';
import { createUser } from '$lib/server/auth/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password, nickname } = await request.json();

		// 입력 검증
		if (!email || !password || !nickname) {
			return json({ error: '이메일, 비밀번호, 닉네임을 모두 입력해주세요.' }, { status: 400 });
		}

		// 이메일 형식 검증
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 });
		}

		// 비밀번호 길이 검증 (최소 8자)
		if (password.length < 8) {
			return json({ error: '비밀번호는 최소 8자 이상이어야 합니다.' }, { status: 400 });
		}

		// 닉네임 길이 검증 (2-20자)
		if (nickname.length < 2 || nickname.length > 20) {
			return json({ error: '닉네임은 2자 이상 20자 이하여야 합니다.' }, { status: 400 });
		}

		// 사용자 생성
		const user = await createUser({ email, password, nickname });

		// 세션 생성
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie({ cookies } as any, sessionToken, session.expiresAt);

		return json(
			{
				success: true,
				user: {
					id: user.id,
					email: user.email,
					nickname: user.nickname
				}
			},
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 400 });
		}
		return json({ error: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
	}
};
