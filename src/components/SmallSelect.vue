<template>
    <div 
        @mouseleave="isItemsShow = false"
        class="flex flex-row gap-2 items-center relative">
        <button 
            @click="isItemsShow = !isItemsShow" 
            :class="isItemsShow ? 'rounded-t-md' : 'rounded-md'"
            class="flex flex-row md:text-sm text-xs gap-1 py-2 bg-zinc-900 hover:bg-zinc-800 md:px-5 px-3 items-center transition duration-300 easy-in-out">
                {{ selectedOption.name }}
                <Icon 
                    name="ri:arrow-down-s-line" 
                    :class="isItemsShow ? 'rotate-180' : 'rotate-0'"
                    class="md:text-xl text-lg transition-transform duration-200 ease-in-out"
                />
        </button>
        <div
            v-show="isItemsShow" 
            class="absolute w-full rounded-b-md overflow-x-hidden top-0 md:mt-9 mt-8 z-10 p-2 origin-top bg-zinc-900/75 backdrop-blur-3xl justify-between flex flex-col">
            <div 
                v-for="option in options" 
                @click="select({ value: option.value, name: option.name })"
                class="hover:bg-blue-900 md:p-1 p-0.5 md:px-3 px-2 cursor-pointer rounded-md">
                <p class="text-xs">{{ option.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isItemsShow = ref(false);
const selectedOption = ref({value: [], name: ''})

const emits = defineEmits([
    'update:select-small',
])
const props = defineProps({
    options: { type: Object, required: true}
})

onMounted(() =>  {
    selectedOption.value = props.options[0];

    emits('update:select-small', props.options[0]);
})

function select(option: { value: [], name: string }) {
    isItemsShow.value = false;
    
    selectedOption.value = option;

    emits('update:select-small', option);
}
</script>