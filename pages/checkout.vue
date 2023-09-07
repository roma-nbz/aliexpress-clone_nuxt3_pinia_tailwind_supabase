<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user.js'

const userStore = useUserStore()
const user = useSupabaseUser()
const route = useRoute()

definePageMeta({ middleware: 'auth' })

const stripe = null
const elements = null
const card = null
const form = null
const total = ref(0)
const clientSecret = null
const currentAddress = ref(null)
const isProcessing = ref(false)

const stripeInit = async () => {
	const runtimeConfig = useRuntimeConfig()
	stripe = Stripe(runtimeConfig.stripePk)

	let res = await $fetch('/api/stripe/paymentintent', {
		method: 'POST',
		body: {
			amount: total.value
		}
	})

	clientSecret = res.client_secret

	elements = stripe.elements()
	const style = {
		base: {
			fontSize: '18px'
		},
		invalid: {
			fontFamily: 'Arial, sans-serif',
			color: "#ee4b2b",
			iconColor: "#ee4b2b"
		}
	}
	card = elements.create("card", {
		hidePostalCode: true,
		style: style
	})

	card.mount('#card-element')
	card.on("change", (e) => {
		document.querySelector('button').disabled = e.empty
		document.querySelector('#card-error').textContent = e.error ? e.error.message : ''
	})

	isProcessing.value = false
}

const createOrder = async (stripeId) => {
	await useFetch('/api/prisma/create-order', {
		method: 'POST',
		body: {
			userId: user.value.id,
			stripeId: stripeId,
			name: currentAddress.value.data.name,
			address: currentAddress.value.data.address,
			zipcode: currentAddress.value.data.zipcode,
			city: currentAddress.value.data.city,
			country: currentAddress.value.data.country,
			products: userStore.checkout
		}
	})
}

const showError = (errText) => {
	const errorMsg = document.querySelector('#card-error')

	errorMsg.textContent = errText
	setTimeout(() => { errorMsg.textContent = '' }, 4000)
}

const pay = async () => {
	if (currentAddress.value && currentAddress.value.data == '') {
		showError('Please add shipping address')
		return
	}
	isProcessing.value = true

	let result = await stripe.confirmCardPayment(clientSecret, {
		payment_method: { card: card }
	})

	if (result.error) {
		showError(result.error.message)
		isProcessing.value = false
	} else {
		await createOrder(result.paymentIntent.id)
		userStore.cart = []
		userStore.checkout = []
		setTimeout(() => {
			return navigateTo('/success')
		}, 500)
	}
}

watchEffect(() => {
	if (route.fullPath == '/checkout' && !user.value) {
		return navigateTo('/auth')
	}
})

watch(() => total.value, () => {
	if (total.value > 0) {
		stripeInit()
	}
})

onBeforeMount(async () => {
	if (userStore.checkout.length < 1) {
		return navigateTo('/cart')
	}

	total.value = 0.00

	if (user.value) {
		currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value.id}`)
		setTimeout(() => userStore.isLoading = false, 200)
	}
})

onMounted(() => {
	isProcessing.value = true

	userStore.checkout.forEach(item => {
		total.value += item.price
	})
})
</script>

<template>
	<MainLayout>
		<div id="Checkout" class="mt-4 max-w-[1200px] mx-auto px-2">
			<div class="md:flex gap-4 justify-between mx-auto w-full">
				<div class="md:w-[65%]">
					<div class="bg-white rounded-lg p-4">
						<p class="text-xl font-semibold mb-2">Shipping Address</p>
						<div v-if="currentAddress && currentAddress.data">
							<NuxtLink to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
								<Icon name="mdi:plus" size="18" class="mr-2" />
								Update Address
							</NuxtLink>
							<div class="pt-2 border-t">
								<p class="underline pb-1">Delivery Address</p>
								<ul class="text-xs">
									<li class="flex items-center gap-2">
										<p>Contact name:</p>
										<p class="font-bold">
											{{ currentAddress.data.name }}
										</p>
									</li>
									<li class="flex items-center gap-2">
										<p>Address:</p>
										<p class="font-bold">
											{{ currentAddress.data.address }}
										</p>
									</li>
									<li class="flex items-center gap-2">
										<p>Zip Code:</p>
										<p class="font-bold">
											{{ currentAddress.data.zipcode }}
										</p>
									</li>
									<li class="flex items-center gap-2">
										<p>City:</p>
										<p class="font-bold">
											{{ currentAddress.data.city }}
										</p>
									</li>
									<li class="flex items-center gap-2">
										<p>Country:</p>
										<p class="font-bold">
											{{ currentAddress.data.country }}
										</p>
									</li>
								</ul>
							</div>
						</div>
						<NuxtLink v-else to="/address" class="flex items-center text-blue-500 hover:text-red-400">
							<Icon name="mdi:plus" size="18" class="mr-2" />
							Add New Address
						</NuxtLink>
					</div>
					<div id="Items" class="bg-white rounded-lg p-4 mt-4">
						<div v-for="product in userStore.checkout">
							<CheckoutItem :product="product" />
						</div>
					</div>
				</div>
				<div class="md:hidden block my-4" />
				<div class="md:w-[35%]">
					<div id="Order" class="bg-white rounded-lg p-4">
						<p class="text-2xl font-extrabold mb-2">Summary</p>
						<div class="flex items-center justify-between my-4">
							<p>Total Shipping</p>
							<p>Free</p>
						</div>
						<div class="border-t" />
						<div class="flex items-center justify-between my-4">
							<p class="font-semibold">Total</p>
							<div class="text-2xl font-semibold">
								$ <span class="font-extrabold">{{ total / 100 }}</span>
							</div>
						</div>
						<form @submit.prevent="pay()">
							<div id="card-element" class="border border-gray-500 p-2 rounded-sm" />
							<p id="card-error" role="alert" class="text-red-700 text-center font-semibold" />
							<button type="submit" :disabled="isProcessing"
								class="mt-4 bg-gradient-to-r from-[#fe630c] to-[#ff3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
								:class="isProcessing ? 'opacity-70' : 'opacity-100'">
								<Icon v-if="isProcessing" name="eos-icons:loading" />
								<p v-else>Place order</p>
							</button>
						</form>
					</div>
					<div class="bg-white rounded-lg p-4 mt-4">
						<p class="text-lg font-semibold my-2">AliExpress</p>
						<p class="my-2">
							AliExpress keeps your information and payment safe
						</p>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>
