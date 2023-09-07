<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user.js'

const userStore = useUserStore()
const user = useSupabaseUser()

const contactName = ref('')
const address = ref('')
const zipCode = ref('')
const city = ref('')
const country = ref('')

const currentAddress = ref(null)
const isUpdate = ref(false)
const isWorking = ref(false)
const error = ref(null)

const submit = async () => {
	isWorking.value = true
	error.value = null

	if (!contactName.value) {
		error.value = {
			type: 'contactName',
			message: 'A contact name is required'
		}
	} else if (!address.value) {
		error.value = {
			type: 'address',
			message: 'An address is required'
		}
	} else if (!zipCode.value) {
		error.value = {
			type: 'zipCode',
			message: 'A zip code is required'
		}
	} else if (!city.value) {
		error.value = {
			type: 'city',
			message: 'A city is required'
		}
	} else if (!country.value) {
		error.value = {
			type: 'country',
			message: 'A country is required'
		}
	}
	if (error.value) {
		isWorking.value = false
		return
	}

	if (isUpdate.value) {
		await useFetch(`/api/prisma/update-address/${currentAddress.value.data.id}`, {
			method: 'PATCH',
			body: {
				userId: user.value.id,
				name: contactName.value,
				address: address.value,
				zipCode: zipCode.value,
				city: city.value,
				country: country.value,
			}
		})

		isWorking.value = false
		return navigateTo('/checkout')
	}
	await useFetch('/api/prisma/add-address/', {
		method: 'POST',
		body: {
			userId: user.value.id,
			name: contactName.value,
			address: address.value,
			zipCode: zipCode.value,
			city: city.value,
			country: country.value,
		}
	})

	isWorking.value = false
	return navigateTo('/checkout')
}

watchEffect(async () => {
	currentAddress.value = await useFetch(`api/prisma/get-address-by-user/${user.value.id}`)

	if (currentAddress.value.data) {
		contactName.value = currentAddress.value.data.name
		address.value = currentAddress.value.data.address
		zipCode.value = currentAddress.value.data.zipcode
		city.value = currentAddress.value.data.city
		country.value = currentAddress.value.data.country

		isUpdate.value = true
	}
	userStore.isLoading = false
})
</script>

<template>
	<MainLayout>
		<div id="Address" class="mt-4 max-w-[500px] mx-auto px-2">
			<div class="mx-auto bg-white rounded-lg p-3">
				<p class="text-xl text-bold mb-2">Address Details</p>
				<form @submit.prevent="submit()">
					<Input class="w-full" placeholder="Contact Name" v-model:input="contactName" type="text"
						:error="error && error.type === 'contactName' ? error.message : ''" />
					<Input class="w-full mt-2" placeholder="Address" v-model:input="address" type="text"
						:error="error && error.type === 'address' ? error.message : ''" />
					<Input class="w-full mt-2" placeholder="Zip Code" v-model:input="zipCode" type="text"
						:error="error && error.type === 'zipCode' ? error.message : ''" />
					<Input class="w-full mt-2" placeholder="City" v-model:input="city" type="text"
						:error="error && error.type === 'city' ? error.message : ''" />
					<Input class="w-full mt-2" placeholder="Country" v-model:input="country" type="text"
						:error="error && error.type === 'country' ? error.message : ''" />
					<button :disabled="isWorking" type="submit"
						class="mt-6 bg-gradient-to-r from-[#fe630c] to-[#ff3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full">
						<p v-if="!isWorking">Update Address</p>
						<Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
					</button>
				</form>
			</div>
		</div>
	</MainLayout>
</template>


