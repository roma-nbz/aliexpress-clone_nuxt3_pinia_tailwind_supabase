import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
	const isMenuOverlay = ref(false)
	const isLoading = ref(false)
	const cart = ref([])
	const checkout = ref([])

	return { isMenuOverlay, isLoading, cart, checkout }
})
