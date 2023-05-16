<template>
    <div
        :class="score! >= 7 ? 'to-emerald-900' : score! >= 5 ? 'to-amber-900' : score! < 5 && score! != 0 ? 'to-rose-900' : 'to-zinc-900'"
        class="w-full from-zinc-900 bg-gradient-to-r rounded-md flex flex-row justify-between items-center">
        <div class="flex flex-row gap-5 overflow-hidden relative items-center h-36">
            <nuxt-img :src="imageUrl" class="h-full rounded-l-md"/>
            <div class="info flex flex-col gap-2 justify-center">
                <NuxtLink :to="{name: 'anime-id', params: { id: animeId }}"><h1 class="text-xl">{{ title }}</h1></NuxtLink>
                <div class="flex flex-row gap-1.5">
                    <p 
                        v-if="isFavorited"
                        class="text-zinc-900 font-extrabold text-xs p-0.5 px-3 rounded-full bg-zinc-50">
                        <Icon name="ri:heart-fill"/>
                    </p>
                    <p 
                        class="text-zinc-900 font-extrabold text-xs p-0.5 px-3 rounded-full bg-zinc-50">
                        {{ type }}
                    </p>
                    <p 
                        :class="watchingStatus == 'watching' ? 'bg-amber-400' : watchingStatus == 'watched' ? 'bg-emerald-400' : watchingStatus == 'planned' ? 'bg-violet-400' : 'bg-rose-400'"
                        class="text-zinc-900 font-extrabold text-xs p-0.5 px-3 rounded-full">
                        {{ watchingStatus == 'watching' ? 'Watching' : watchingStatus == 'watched' ? 'Watched' : watchingStatus == 'planned' ? 'Planned' : 'Dropped' }}
                    </p>
                    <p 
                        :class="airingStatus == 'Ongoing' ? 'bg-amber-400' : watchingStatus == 'Upcoming' ? 'bg-rose-400' : 'bg-emerald-400'"
                        class="text-zinc-900 font-extrabold text-xs p-0.5 px-3 rounded-full">
                        {{ airingStatus }}
                    </p>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row gap-3">
                        <p class="text-zinc-400">Added <span class="text-zinc-50">{{ addedAt }}</span></p>
                        <p class="text-zinc-400">Updated <span class="text-zinc-50">{{ updatedAt }}</span></p>
                    </div>
                    <p class="text-zinc-400">Episodes watched <span class="text-zinc-50">{{ wathedEpisodes }} / {{ totalEpisodes == 0 || totalEpisodes == null ? '?' : totalEpisodes }}</span></p>
                </div>
            </div>
        </div>
        <h1 class="mr-10">{{ score == 0 || score == -1 ? '' : score }}</h1>
    </div>
</template>

<script setup lang="ts">

defineProps({
    animeId: { type: Number, required: true},
    watchingStatus: { type: String, required: true},
    wathedEpisodes: { type: Number, required: true},
    score: { type: Number, required: false},
    isFavorited: { type: Boolean, required: true},
    addedAt: { type: String, required: true},
    updatedAt: { type: String, required: true},
    imageUrl: { type: String, required: true},
    title: { type: String, required: true},
    studios: { type: String, required: true},
    type: { type: String, required: true},
    totalEpisodes: { type: Number, required: true},
    airingSeason: { type: String, required: true},
    airingStatus: { type: String, required: true},
})

</script>