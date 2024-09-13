<script lang="ts">
	import loginPage from '$lib/img/loginPage.png';
	import { Button } from '$lib/components/ui/button';
	import googleIcon from '$lib/img/googleIcon.svg';
	import facebookIcon from '$lib/img/facebookIcon.svg';
	import logoCookiesMo from '$lib/img/logoCookiesMo.png';
</script>

<div class="relative flex h-full w-full justify-center md:justify-end">
	<img class="absolute h-screen w-full blur-sm md:blur-none" src={loginPage} alt="" />
	<div
		class="absolute flex h-screen w-full flex-col items-center justify-center gap-7 md:w-1/2 md:items-start"
	>
		<img class="w-32 md:hidden" src={logoCookiesMo} alt="" />
		<div class="flex flex-col items-center md:items-start">
			<h1 class=" text-2xl font-semibold">Login</h1>
			<p class=" text-xs text-zinc-500">Acesse sua conta para continuar</p>
		</div>
		<div class="flex w-full flex-col items-center gap-4 md:w-2/3 md:flex-row md:items-start">
			<Button class="h-11 w-3/4 gap-2 bg-white text-black hover:text-white">
				<img class="w-8" src={googleIcon} alt="Google" />
				Faça login com o Google</Button
			>
			<Button class="h-12 w-3/4 gap-2 bg-white text-black hover:text-white md:h-11">
				<img class="w-8" src={facebookIcon} alt="Google" />
				Faça login com o Google</Button
			>
		</div>
	</div>
</div>
