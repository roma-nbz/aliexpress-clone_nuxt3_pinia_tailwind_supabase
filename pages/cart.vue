<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user.js'

const userStore = useUserStore()
const user = useSupabaseUser()

const selectedArray = ref([])

const cards = ref([
	'img/visa.png',
	'img/mastercard.png',
	'img/paypal.png',
	'img/applepay.png',
])

const selectedRadioFunc = (e) => {
	if (!selectedArray.value.length) {
		selectedArray.value.push(e)
		return
	}

	selectedArray.value.forEach((item, idx) => {
		if (e.id !== item.id) {
			selectedArray.value.push(e)
		} else {
			selectedArray.value.splice(idx, 1)
		}
	})
}

const goToCheckout = () => {
	const ids = []
	userStore.checkout = []

	selectedArray.value.forEach(item => ids.push(item.id))

	const res = userStore.cart.filter((item) => {
		return ids.indexOf(item.id) != -1
	})

	res.forEach(item => userStore.checkout.push(toRaw(item)))

	return navigateTo('/checkout')
}

const totalPriceComputed = computed(() => {
	let price = 0
	userStore.cart.forEach(prod => {
		price += prod.price
	})
	return price / 100
})

onMounted(() => {
	setTimeout(() => userStore.isLoading = false, 200)
})
</script>

<template>
	<MainLayout>
		<div id="Cart" class="mt-4 max-w-[1200px] mx-auto px-2">
			<div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
				<div class="pt-20">
					<img class="mx-auto" width="250" src="/img/cart-empty.png">
					<p class="text-xl text-center mt-4">No items yet?</p>
					<div v-if="!user" class="flex text-center">
						<NuxtLink to="/auth" class="bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">
							Sign in
						</NuxtLink>
					</div>
				</div>
			</div>
			<div v-else class="md:flex gap-4 justify-between mx-auto w-full">
				<div class="md:w-[65%]">
					<div class="bg-white rounded-lg p-4">
						<p class="text-2xl font-bold mb-2">
							Shopping Cart ({{ userStore.cart.length }})
						</p>
					</div>
					<div class="bg-[#feeeef] rounded-lg p-4 mt-4">
						<p class="text-red-500 font-bold">Welcome Deal applicable on 1 item only</p>
					</div>
					<div id="Items" class="bg-white rounded-lg p-4 mt-4">
						<div v-for="product in userStore.cart" :key="product">
							<CartItem :product="product" :selectedArray="selectedArray" @selectedRadio="selectedRadioFunc" />
						</div>
					</div>
				</div>
				<div class="md:hidden block my-4" />
				<div class="md:w-[35%]">
					<div id="Summary" class="bg-white rounded-lg p-4">
						<p class="text-2xl font-extrabold mb-2">Summary</p>
						<div class="flex items-center justify-between my-4">
							<p class="font-semibold">Total</p>
							<div class="text-2xl font-semibold">
								$ <span class="font-extrabold">
									{{ totalPriceComputed }}
								</span>
							</div>
						</div>
						<button @click="goToCheckout"
							class="flex items-center justify-center bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">
							Checkout
						</button>
					</div>
					<div id="Payment" class="bg-white rounded-lg p-4 mt-4">
						<p class="text-lg font-semibold mb-2">Payment methods</p>
						<div class="flex items-center justify-start gap-8 my-4">
							<div v-for="card in cards" :key="card">
								<img class="h-6" :src="card">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

