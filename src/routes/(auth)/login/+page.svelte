<script lang="ts">
	import loginPage from '$lib/img/loginPage.png';
	import loginMobile from '$lib/img/loginMobile.png';
	import { Button } from '$lib/components/ui/button';
	import googleIcon from '$lib/img/googleIcon.svg';
	import facebookIcon from '$lib/img/facebookIcon.svg';
	import logoCookiesMo from '$lib/img/logoCookiesMo.png';
</script>

<div class="relative flex h-screen w-full justify-center md:justify-end">
	<img class=" absolute h-screen w-full md:hidden" src={loginMobile} alt="Mobile Background" />
	<img class="absolute hidden h-screen w-full md:block" src={loginPage} alt="Desktop Background" />

	<div
		class="absolute flex h-screen w-full flex-col items-center justify-between gap-7 py-11 md:w-1/2 md:items-start md:justify-center md:py-0"
	>
		<img class="w-32 md:hidden" src={logoCookiesMo} alt="Logo Mobile" />

		<div class="flex w-full flex-col items-center gap-6 md:items-start">
			<div class="flex flex-col items-center md:items-start">
				<h1 class="text-2xl font-semibold">Login</h1>
				<p class="text-xs text-zinc-700">Acesse sua conta para continuar</p>
			</div>
			<div class="flex flex-col items-center gap-4 md:w-full md:flex-row">
				<Button
					href="/login/google"
					class="h-12 w-full gap-2 bg-white text-black hover:text-white md:w-2/6"
				>
					<img class="w-8" src={googleIcon} alt="Google" />
					Faça login com o Google
				</Button>
				<Button
					href="/login/google"
					class="h-12 gap-2 bg-white text-black hover:text-white md:h-11 md:w-2/6"
				>
					<img class="w-8" src={facebookIcon} alt="Facebook" />
					Faça login com o Facebook
				</Button>
			</div>
		</div>
	</div>
</div>
