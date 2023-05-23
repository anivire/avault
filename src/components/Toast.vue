<template>
    <div @click="emit('remove')">
        <div
            :class="true ? 'from-zinc-900 to-zinc-900 hover:to-zinc-700' : ''" 
            class="flex flex-row gap-2 bg-gradient-to-r w-96 rounded-t-lg p-4 transition-all duration-200 ease-in-out cursor-pointer border-2 border-zinc-800 shadow-xl">
            <Icon v-if="icon == 'score'" name="material-symbols:star-rounded" class="text-xl"/>
            <Icon v-if="icon == 'list'" name="ri:book-3-fill" class="text-xl"/>
            <Icon v-if="icon == 'episodes'" name="ri:movie-2-fill" class="text-xl"/>
            <Icon v-if="icon == 'favorite'" name="ri:heart-fill" class="text-xl"/>
            <Icon v-if="icon == 'settings'" name="ri:settings-4-fill" class="text-xl"/>
            <Icon v-if="icon == 'delete-entry'" name="ri:file-list-3-fill" class="text-xl"/>
            <Icon v-if="icon == 'error'" name="ri:bug-fill" class="text-xl"/>
            <div class="flex flex-col">
                <p class="font-bold">{{ title }}</p>
                <p class="text-sm text-zinc-400">{{ description }}</p>
            </div>
        </div>
        <div class="bg-zinc-800 rounded-sm w-96 h-1">
            <div
                :style="'width: ' + liveTime / 50 * 100 + '%'" 
                class="bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-200 ease-in-out h-1">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const liveTime = ref(50);
const timerId = ref();

const props = defineProps({
    title: { type: String, required: true},
    description: { type: String, required: true},
    icon: { type: String, required: true},
    status: { type: String, required: true},
    key: { type: String, required: true},
})

const emit = defineEmits(['remove']);

onMounted(() => {
    timerId.value = setInterval(() => {
        if (liveTime.value >= 1 ) {
            liveTime.value--;
        } else {
            emit('remove');
        }
    }, 100);
})

onUnmounted(() => {
    clearInterval(timerId.value);
})
</script>