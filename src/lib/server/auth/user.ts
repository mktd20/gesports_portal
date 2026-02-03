import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { hashPassword, verifyPassword } from './password';
import { generateId } from '$lib/utils';

/**
 * 사용자 ID 생성
 */
export function generateUserId(): string {
	return generateId();
}

/**
 * 이메일로 사용자 찾기
 */
export async function getUserByEmail(email: string) {
	const [user] = await db.select().from(schema.user).where(eq(schema.user.email, email));
	return user || null;
}

/**
 * 닉네임으로 사용자 찾기
 */
export async function getUserByNickname(nickname: string) {
	const [user] = await db.select().from(schema.user).where(eq(schema.user.nickname, nickname));
	return user || null;
}

/**
 * ID로 사용자 찾기
 */
export async function getUserById(id: string) {
	const [user] = await db.select().from(schema.user).where(eq(schema.user.id, id));
	return user || null;
}

/**
 * 새 사용자 생성
 */
export async function createUser(data: {
	email: string;
	password: string;
	nickname: string;
}) {
	// 이메일 중복 확인
	const existingUserByEmail = await getUserByEmail(data.email);
	if (existingUserByEmail) {
		throw new Error('이미 사용 중인 이메일입니다.');
	}

	// 닉네임 중복 확인
	const existingUserByNickname = await getUserByNickname(data.nickname);
	if (existingUserByNickname) {
		throw new Error('이미 사용 중인 닉네임입니다.');
	}

	// 비밀번호 해시화
	const passwordHash = await hashPassword(data.password);

	// 사용자 생성
	const userId = generateUserId();
	const now = new Date();

	const [user] = await db
		.insert(schema.user)
		.values({
			id: userId,
			email: data.email,
			passwordHash,
			nickname: data.nickname,
			role: 'user',
			emailVerified: false,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return user;
}

/**
 * 이메일/닉네임과 비밀번호로 사용자 인증
 */
export async function authenticateUser(emailOrNickname: string, password: string) {
	// 이메일 또는 닉네임으로 사용자 찾기
	const user =
		(await getUserByEmail(emailOrNickname)) || (await getUserByNickname(emailOrNickname));

	if (!user) {
		return null;
	}

	// 비밀번호 검증
	const isValid = await verifyPassword(password, user.passwordHash);
	if (!isValid) {
		return null;
	}

	// 마지막 로그인 시간 업데이트
	await db
		.update(schema.user)
		.set({ lastLoginAt: new Date(), updatedAt: new Date() })
		.where(eq(schema.user.id, user.id));

	return user;
}
