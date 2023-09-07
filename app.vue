<script setup>
import { useUserStore } from '~/stores/user.js'
const userStore = useUserStore()

const route = useRoute()

let windowWidth = ref(process.client ? window.innerWidth : '')

watch(() => route.fullPath, () => {
  userStore.isLoading = true
})

watch(() => windowWidth.value, () => {
  if (windowWidth.value >= 767) {
    userStore.isMenuOverlay = false
  }
})

onMounted(() => {
  userStore.isLoading = false
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth
  })
})
</script>

<template>
  <div class="fixed z-[-1] bg-[#f2f2f2] w-full h-screen" />
  <NuxtPage />
  <MenuOverlay :class="[
    { 'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
    { 'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
  ]" />
</template>
