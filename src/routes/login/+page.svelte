<script lang="ts">
	import { navigate } from '$app/navigation';

	let emailOrNickname = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleSubmit() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ emailOrNickname, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || '로그인에 실패했습니다.';
				return;
			}

			// 로그인 성공 시 홈으로 이동
			navigate('/');
		} catch (err) {
			error = '로그인 중 오류가 발생했습니다.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
		</div>
		<form class="mt-8 space-y-6" onsubmit|preventDefault={handleSubmit}>
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="emailOrNickname" class="sr-only">이메일 또는 닉네임</label>
					<input
						id="emailOrNickname"
						name="emailOrNickname"
						type="text"
						required
						bind:value={emailOrNickname}
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="이메일 또는 닉네임"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">비밀번호</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						bind:value={password}
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="비밀번호"
					/>
				</div>
			</div>

			{@if error}
				<div class="rounded-md bg-red-50 p-4">
					<div class="text-sm text-red-800">{error}</div>
				</div>
			{/if}

			<div>
				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
				>
					{loading ? '처리 중...' : '로그인'}
				</button>
			</div>

			<div class="text-center">
				<a href="/register" class="text-sm text-indigo-600 hover:text-indigo-500">
					계정이 없으신가요? 회원가입
				</a>
			</div>
		</form>
	</div>
</div>
