<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

const login = async (prov) => {
	const { data, error } = await client.auth.signInWithOAuth({
		provider: prov,
	})
}

watchEffect(() => {
	if (user.value) {
		return navigateTo('/')
	}
})
</script>

<template>
	<div id="auth" class="w-full h-screen bg-white">
		<div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
			<NuxtLink to="/" class="min-w-[170px]">
				<img width="170" src="/img/AliExpress-logo.png">
			</NuxtLink>
		</div>
		<div class="max-w-[400px] mx-auto px-2">
			<p class="text-center my-6">Login / Register</p>
			<button @click="login('google')"
				class="flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold">
				<img class="w-full max-w-[30px]" src="/img/google-logo.png">
				<p>Google</p>
			</button>
			<button @click="login('github')"
				class="flex items-center justify-center mt-4 gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold">
				<img class="w-full max-w-[30px]" src="/img/github-logo.png">
				<p>Github</p>
			</button>
		</div>
	</div>
</template>

