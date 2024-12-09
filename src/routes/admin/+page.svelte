<script lang="ts">
	import type { PageData } from './$types';
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Painel Administrativo</h1>

	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<a
			href="/admin/produtos"
			class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
		>
			<h2 class="text-xl font-semibold">Produtos</h2>
			<p class="text-gray-600">Gerenciar produtos da loja</p>
		</a>

		<a
			href="/admin/promocoes"
			class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
		>
			<h2 class="text-xl font-semibold">Promoções</h2>
			<p class="text-gray-600">Gerenciar promoções ativas</p>
		</a>
	</div>
</div>
