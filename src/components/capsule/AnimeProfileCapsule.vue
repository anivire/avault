<template>
    <div
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        :class="score! >= 7 ? 'to-emerald-900 hover:to-emerald-500' : score! >= 5 ? 'to-amber-900 hover:to-amber-500' : score! < 5 && score! != 0 ? 'to-rose-900 hover:to-rose-500' : 'to-zinc-900 hover:to-zinc-700'"
        class="from-zinc-900 bg-gradient-to-r rounded-md flex flex-row justify-between items-center transition-all duration-200 ease-in-out">
        <div class="flex flex-row relative items-center h-36 w-full">
            <nuxt-img 
                :src="imageUrl" 
                :class="isHovered ? 'scale-110 rounded-md shadow-xl' : 'scale-100 rounded-l-md'"
                class="h-full transition-all duration-200 ease-in-out"
            />
            <div class="flex flex-col gap-1 justify-center w-full px-5">
                <NuxtLink :to="{name: 'anime-id', params: { id: animeId }}" class="flex flex-row gap-1 items-center hover:bg-zinc-700/50 rounded-md w-fit">
                    <p class="text-base font-bold line-clamp-1">{{ title }}</p>
                    <Icon name="ri:arrow-right-up-line" class="text-xl"/>
                </NuxtLink>
                <div class="flex flex-row gap-1.5 mb-1">
                    <p 
                        v-if="isFavorited"
                        class="text-zinc-900 font-extrabold text-xs p-1 px-2 rounded-full bg-zinc-50">
                        <Icon name="ri:heart-fill"/>
                    </p>
                    <p 
                        class="text-zinc-900 font-extrabold text-xs p-1 px-3 rounded-full bg-zinc-50">
                        {{ type }}
                    </p>
                    <p 
                        :class="watchingStatus == 'watching' ? 'bg-amber-400' : watchingStatus == 'watched' ? 'bg-emerald-400' : watchingStatus == 'planned' ? 'bg-violet-400' : 'bg-rose-400'"
                        class="text-zinc-900 font-extrabold text-xs p-1 px-3 rounded-full">
                        {{ watchingStatus == 'watching' ? 'Watching' : watchingStatus == 'watched' ? 'Watched' : watchingStatus == 'planned' ? 'Planned' : 'Dropped' }}
                    </p>
                    <p 
                        :class="airingStatus == 'Ongoing' ? 'bg-amber-400' : airingStatus == 'Upcoming' ? 'bg-rose-400' : 'bg-emerald-400'"
                        class="text-zinc-900 font-extrabold text-xs p-1 px-3 rounded-full">
                        {{ airingStatus }}
                    </p>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row gap-3">
                        <!-- <p class="text-zinc-400 text-sm">Updated <span class="text-zinc-50">{{ updatedAt }}</span></p> -->
                    </div>
                    <div 
                        class="flex flex-col gap-1">
                        <div class="bg-zinc-800 rounded-sm">
                            <div
                                :style="'width: ' + wathedEpisodes / (totalEpisodes == null || totalEpisodes == 0 ? 24 : totalEpisodes) * 100 + '%'" 
                                class="bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-200 ease-in-out rounded-sm p-1">
                            </div>
                        </div>
                        <p class="text-zinc-400 text-sm flex flex-row justify-between">Episodes watched <span class="text-zinc-50">{{ wathedEpisodes }} / {{ totalEpisodes == 0 || totalEpisodes == null ? '?' : totalEpisodes }}</span></p>
                        <p class="text-zinc-400 text-sm flex flex-row justify-between">Added at<span class="text-zinc-50">{{ addedAt }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <h1 v-if="score" class="w-48 flex flex-row justify-center">{{ score == 0 || score == -1 ? '' : score }}</h1>
    </div>
</template>

<script setup lang="ts">
const isHovered = ref(false);

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
    totalEpisodes: { type: Number, required: false},
    airingSeason: { type: String, required: true},
    airingStatus: { type: String, required: true}
})

</script>