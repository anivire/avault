<template>
    <div 
        :class="isItemsShow ? 'rounded-t-md' : 'rounded-md'"
        class="relative">
        <button 
            @click="isItemsShow = !isItemsShow"
            :class="isItemsShow ? 'bg-zinc-800 rounded-t-md' : 'bg-zinc-900 rounded-md'" 
            class="items-center w-full z-52 flex flex-row gap-2 py-3 px-5 justify-between hover:bg-zinc-700/50 transition duration-300 easy-in-out ">
            <p class="text-sm font-bold">{{ selectedName }}</p>
            <Icon 
                name="ri:arrow-down-s-line" 
                :class="isItemsShow ? 'rotate-180' : 'rotate-0'"
                class="text-xl transition-transform duration-200 ease-in-out"
            />
        </button>
        <div
            v-show="isItemsShow" 
            class="absolute w-full rounded-b-md overflow-x-hidden h-48 top-0 mt-11 z-10 p-2 origin-top bg-zinc-900/75 backdrop-blur-3x justify-between flex flex-col">
            <div 
                v-for="option in options" 
                @click="select({ value: option.value, name: option.name })"
                class="hover:bg-zinc-800 p-1 px-3 cursor-pointer rounded-md">
                <p class="text-xs">{{ option.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isItemsShow = ref(false);
const selectedValue = ref();
const selectedName = ref();

const emits = defineEmits([
    'update:select',
])
const props = defineProps({
    options: { type: Object, required: true}
})

onMounted(() =>  {
    selectedValue.value = props.options[0].value;
    selectedName.value = props.options[0].name;
})

function select(option: { value: [Number], name: string }) {
    isItemsShow.value = false;
    
    selectedValue.value = option.value;
    selectedName.value = option.name;

    emits('update:select', option);
}
</script>