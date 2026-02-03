import { nanoid } from 'nanoid';

/**
 * 고유 ID 생성
 */
export function generateId(): string {
	return nanoid();
}
