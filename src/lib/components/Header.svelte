<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { user } = $props();

	async function handleLogout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			goto('/');
			// 페이지 새로고침하여 사용자 상태 업데이트
			window.location.reload();
		} catch (error) {
			console.error('로그아웃 실패:', error);
		}
	}
</script>

<header class="bg-white shadow-sm">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex">
				<div class="flex-shrink-0 flex items-center">
					<a href="/" class="text-xl font-bold text-indigo-600">eSports Portal</a>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<a
						href="/"
						class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium {page.url.pathname === '/'
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
					>
						홈
					</a>
					<a
						href="/boards"
						class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium {page.url.pathname.startsWith('/boards')
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
					>
						게시판
					</a>
					<a
						href="/news"
						class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium {page.url.pathname.startsWith('/news')
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
					>
						뉴스
					</a>
					<a
						href="/rankings"
						class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium {page.url.pathname.startsWith('/rankings')
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
					>
						랭킹
					</a>
				</div>
			</div>
			<div class="flex items-center">
				{@if user}
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-700">{user.nickname}</span>
						<a
							href="/profile"
							class="text-sm text-gray-500 hover:text-gray-700"
						>
							프로필
						</a>
						<button
							onclick={handleLogout}
							class="text-sm text-gray-500 hover:text-gray-700"
						>
							로그아웃
						</button>
					</div>
				{:else}
					<div class="flex items-center space-x-4">
						<a
							href="/login"
							class="text-sm text-gray-500 hover:text-gray-700"
						>
							로그인
						</a>
						<a
							href="/register"
							class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
						>
							회원가입
						</a>
					</div>
				{/if}
			</div>
		</div>
	</nav>
</header>
