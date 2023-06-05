<template>
<!-- ToDo: fix squared and rectangled anime posters -->
<div class="relative text-left rounded-lg transition duration-300 easy-in-out z-0 flex flex-col justify-between h-[22rem] overflow-hidden">
    <div 
        v-if="airingStatus != 'Not yet aired' && score != null"
        :class="isPosterHovered ? '-translate-x-24' : 'translate-x-0'"
        class="flex flex-row absolute p-1 pl-2 pr-3.5 mt-2 justify-center bg-zinc-900 rounded-r-lg duration-200 easy-in-out transition-all">
        <Icon name="material-symbols:star-rounded" class="text-xl mr-1 mt-1"/>
        <h1 class="text-lg uppercase">{{ score == undefined ? 'n/a' : score }}</h1> 
    </div>
    <div 
        v-if="isTop"
        :class="isPosterHovered ? '-translate-x-24' : 'translate-x-0'"
        class="flex flex-row absolute p-1 pl-2 pr-3.5 mt-12 justify-center bg-zinc-900 rounded-r-lg duration-200 easy-in-out transition-all">
        <Icon name="ri:trophy-fill" class="text-xl mr-1 mt-1"/>
        <h1 class="text-lg uppercase">{{ topNumber }}</h1> 
    </div>
    <NuxtLink :to="{name: 'anime-id', params: { id: animeId }}">
        <nuxt-img 
            :src="imageUrl" 
            width="200"
            height="500"
            :class="isPosterHovered ? 'h-[22rem] rounded-lg' : 'h-full rounded-t-lg'"
            class="transition-all duration-200 ease-in-out object-cover" 
            loading="lazy"
            @mouseenter="isPosterHovered = true"
            @mouseleave="isPosterHovered = false"
        />
    </NuxtLink>
    <div 
        :class="isPosterHovered ? 'translate-y-24' : 'translate-y'"
        class="transition-all duration-200 ease-in-out">
        <div 
            :class="isInfoHovered ? 'translate-y-0' : 'translate-y-0'"
            class="absolute bottom-0 p-3 flex flex-col grow gap-1 bg-zinc-900 hover:bg-zinc-800 rounded-b-md w-full transition-all duration-200 ease-in-out" 
            @mouseenter="isInfoHovered = true"
            @mouseleave="isInfoHovered = false">
            <div class="flex flex-row items-center gap-1 text-zinc-400 text-xs">
                <p>
                    {{ airingStatus == "Not yet aired" ? "Upcoming" 
                    : airingStatus == "Currently Airing" ? "Ongoing" 
                    : "Released" }}
                </p>
                <p>•</p>
                <p>{{ type }}</p>
                <p>•</p>
                <p>{{ airedFrom == null ? 'Unannounced' : new Date(airedFrom).getFullYear() }}</p>
            </div>
            <p 
                :class="!isInfoHovered ? 'line-clamp-1' : ''" 
                class="text-sm grow font-bold">
                {{ title }}
            </p>
            <p class="text-zinc-400 text-xs">{{ studio }}</p> 
            <!-- <div 
                class="flex flex-row gap-3 justify-center items-center">
                <button class="flex flex-row items-center gap-1 hover:bg-rose-600/90 rounded-md justify-center p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:heart-fill"/>
                </button>
                <button class="flex flex-row items-center gap-1 hover:bg-zinc-600/50 rounded-md justify-center p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:star-fill"/>
                </button>
                <button class="flex flex-row items-center gap-1 hover:bg-zinc-600/50 rounded-md col-span-2 justify-center p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:add-box-fill"/>
                </button>
                <button class="flex flex-row items-center gap-1 hover:bg-zinc-600/50 rounded-md col-span-2 justify-center p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:movie-2-fill"/>
                </button>
            </div>       -->
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
const isPosterHovered = ref(false);
const isInfoHovered = ref(false);

defineProps({
    animeId:        { type: Number, required: true},
    imageUrl:       { type: String, required: true},
    title:          { type: String, required: true},
    studio:         { type: String, required: true},
    score:          { type: Number, required: false},
    airedFrom:      { type: String, required: false},
    type:           { type: String, required: true},
    airingStatus:   { type: String, required: true},
    isTop:          { type: Boolean, required: false},
    topNumber:      { type: Number, required: false},
})


</script>