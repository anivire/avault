<template>
    <div 
        @mouseleave="isItemsShow = false"
        :class="isItemsShow ? 'rounded-t-md' : 'rounded-md'"
        class="relative">
        <button 
            @click="isItemsShow = !isItemsShow"
            :class="isItemsShow ? 'bg-zinc-800 rounded-t-md' : 'bg-zinc-900 rounded-md'" 
            class="items-center w-full z-52 flex flex-row gap-2 py-3 px-5 justify-between hover:bg-zinc-800 transition duration-300 easy-in-out">
            <p 
                :class="selectedOption.value[0] == -1 ? 'text-zinc-500' : 'font-bold'"
                class="text-sm">
                {{ selectedOption.name }}
            </p>
            <Icon 
                name="ri:arrow-down-s-line" 
                :class="isItemsShow ? 'rotate-180' : 'rotate-0'"
                class="text-xl transition-transform duration-200 ease-in-out"
            />
        </button>
        <div
            v-show="isItemsShow" 
            class="absolute w-full rounded-b-md overflow-x-hidden top-0 mt-11 z-10 p-2 origin-top bg-zinc-900/75 backdrop-blur-3x justify-between flex flex-col backdrop-blur-3xl">
            <div 
                v-for="option in options" 
                @click="select({ value: option.value, name: option.name })"
                class="hover:bg-blue-900 p-1 px-3 cursor-pointer rounded-md">
                <p class="text-xs">{{ option.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isItemsShow = ref(false);
const selectedOption = ref({value: [], name: ''})

const emits = defineEmits([
    'update:select',
])
const props = defineProps({
    options: { type: Object, required: true}
})

onMounted(() =>  {
    selectedOption.value.value = props.options[0].value;
    selectedOption.value.name = props.options[0].name;

    emits('update:select', props.options[0]);
})

function select(option: { value: [], name: string }) {
    isItemsShow.value = false;
    
    selectedOption.value = option;

    emits('update:select', option);
}
</script>