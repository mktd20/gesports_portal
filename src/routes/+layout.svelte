<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>eSports Portal</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<Header />
	<main>
		{@render children()}
	</main>
	<footer class="bg-white border-t border-gray-200 mt-auto">
		<div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
			<p class="text-center text-sm text-gray-500">
				© 2024 eSports Portal. All rights reserved.
			</p>
		</div>
	</footer>
</div>
