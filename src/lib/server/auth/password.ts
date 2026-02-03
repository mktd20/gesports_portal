import { Argon2id } from 'oslo/password';

const argon2id = new Argon2id();

/**
 * 비밀번호를 해시화합니다.
 */
export async function hashPassword(password: string): Promise<string> {
	return await argon2id.hash(password);
}

/**
 * 비밀번호를 검증합니다.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return await argon2id.verify(hash, password);
}
