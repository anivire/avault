<template>
    <div class="flex flex-row gap-4 py-3 px-5 items-center bg-zinc-900 rounded-md hover:bg-zinc-800 transition duration-300 easy-in-out">
        <Icon 
            name="ri:search-line" 
            class="text-xl"
        />
        <input 
            v-model="value"
            @input="$emit('update:input', value)"
            class="text-sm font-bold w-full bg-transparent outline-none border-none placeholder:text-zinc-500 placeholder:font-normal"
            placeholder="Input anime title...">
    </div>
</template>

<script setup lang="ts">
const value = ref('');

const emits = defineEmits([
    'update:input',
])
</script>