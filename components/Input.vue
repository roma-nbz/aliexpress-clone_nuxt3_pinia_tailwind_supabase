<script setup>
const isFocused = ref(false)

const props = defineProps({
	input: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		required: true
	},
	max: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	error: {
		type: String,
		required: true
	},
})

const { input, placeholder, max, type, error } = toRefs(props)

const emit = defineEmits(['update:input'])

const inputComputed = computed({
	get: () => input.value,
	set: (val) => emit('update:input', val)
})
</script>

<template>
	<div>
		<input
			class="w-full bg-white text-gray-800 border text-sm border-[#eff0eb] rounded-lg p-3 placeholder-gray-500 focus:outline-none"
			:placeholder="placeholder" :maxlength="max" @focus="isFocused = true" @blur="isFocused = false"
			:class="{ 'border-gray-900': isFocused }, { 'border-red-500': error }" :type="type" v-model="inputComputed"
			autocomplete="off" />
		<span v-if="error" class="text-red-500 text-[14px] font-semibold">
			{{ error }}
		</span>
	</div>
</template>
