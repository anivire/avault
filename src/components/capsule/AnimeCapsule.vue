<template>
<div class="relative text-left rounded-lg transition duration-300 easy-in-out z-0 flex flex-col justify-between w-56 h-96 overflow-hidden">
    <div 
        :class="isPosterHovered ? '-translate-x-24' : ''"
        class="flex flex-row absolute p-1 pl-2 pr-3.5 mt-2 justify-center bg-zinc-900 rounded-r-lg duration-200 easy-in-out transition-all">
        <Icon name="material-symbols:star-rounded" class="text-xl mr-1 mt-0.5"/>
        <h1 class="text-lg uppercase">{{ score == undefined ? 'n/a' : score }}</h1> 
    </div>
    <NuxtLink :to="'/anime/' + animeId">
        <img 
            :src="imageUrl" 
            :class="isPosterHovered ? 'h-96' : 'h-full'"
            class="rounded-lg transition-all duration-200 ease-in-out object-cover" 
            @mouseenter="isPosterHovered = true"
            @mouseleave="isPosterHovered = false"
        />
    </NuxtLink>
    <div 
        :class="isPosterHovered ? 'translate-y-24' : 'translate-y'"
        class="transition-all duration-200 ease-in-out">
        <div 
            :class="isInfoHovered ? 'translate-y-0' : 'translate-y-10'"
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
                <p>{{ new Date(airedFrom).getFullYear() }}</p>
            </div>
            <!-- <NuxtLink :to="'/anime/' + animeId"> -->
                <p 
                    :class="!isInfoHovered ? 'line-clamp-1' : ''" 
                    class="text-sm grow font-bold">
                    {{ title }}
                </p>
            <!-- </NuxtLink> -->
            <p class="text-zinc-400 text-xs">{{ studio }}</p> 
            <div 
                class="grid grid-cols-5 items-center">
                <button class="hover:bg-rose-600/90 rounded-md p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:heart-line" class=""/>
                </button>
                <button class="flex flex-row items-center gap-1 col-span-2 hover:bg-zinc-600/50 rounded-md justify-center p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:star-line"/>
                    <p class="text-sm">Score</p>
                </button>
                <button class="flex flex-row items-center gap-1 hover:bg-zinc-600/50 rounded-md col-span-2 justify-center p-2 duration-200 easy-in-out transition-colors">
                    <Icon name="ri:add-box-line"/>
                    <p class="text-sm">List</p>
                </button>
            </div>      
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
const isPosterHovered = ref(false);
const isInfoHovered = ref(false);

const props = defineProps({
    animeId:        { type: Number, required: true},
    imageUrl:       { type: String, required: true},
    title:          { type: String, required: true},
    studio:         { type: String, required: true},
    score:          { type: Number, required: true},
    airedFrom:      { type: String, required: true},
    type:           { type: String, required: true},
    airingStatus:   { type: String, required: true},
})
</script>