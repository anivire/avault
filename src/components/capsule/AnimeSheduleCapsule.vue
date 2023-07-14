<template>
    <NuxtLink 
        :to="{name: 'anime-id', params: { id: malId }}"
        class="relative flex felx-row bg-zinc-900 items-center cursor-pointer gap-3 hover:bg-zinc-800 px-3">
        <NuxtImg :src="image" width="50" height="50" class="absolute w-12 h-12 object-cover rounded-full"/>
        <div class="flex flex-col gap-1 pl-16 py-3 w-full">
            <p class="font-semibold text-sm">{{ title }}</p>
            <div class="flex flex-row gap-3 text-xs justify-between">
                <p v-if="time" class="text-rose-400">{{ time }} <span class="text-400">({{ timezone }})</span></p> 
                <p class="text-zinc-400">Airing from {{ new Date(airedFrom).toLocaleDateString() }}</p> 
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang='ts'>
defineProps({
    malId: { type: Number, required: true },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    airedFrom: { type: String, required: true },
    time: { type: String, required: true },
    timezone: { type: String, required: true },
})
</script>