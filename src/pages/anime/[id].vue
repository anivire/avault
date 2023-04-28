<template>
    <div class="relative mx-auto max-w-7xl">
        <div v-if="anime" class="grid grid-cols-3 gap-5 absolute z-10 mt-40">
            <img :src="anime?.images.jpg.large_image_url" class="object-cover rounded-xl w-full">
            <div class="flex flex-col gap-4 justify-start col-span-2 mt-28">
                <h1>{{ anime.title_english != undefined ? anime.title_english : anime.titles[0].title }}</h1>
                <div class="bg flex flex-row gap-3 items-center">
                    <!-- <div class="px-4 p-2 flex flex-row justify-center items-center border-2 border-zinc-900 rounded-md">
                       <h1 class="text-xl">{{ anime.rating }}</h1> 
                    </div> -->
                    <div class="px-4 p-2 flex flex-row justify-center items-center bg-zinc-900 rounded-md">
                       <h1 class="text-xl uppercase">{{ anime.type }}</h1> 
                    </div>
                    <div 
                        :class="parseAnimeAiringStatus(anime.status) == 'Ongoing' ? 'bg-rose-400' : parseAnimeAiringStatus(anime.status) == 'Upcoming' ? 'bg-amber-400' : 'bg-emerald-400'"
                        class="px-4 p-2 flex flex-row justify-center items-center rounded-md text-zinc-950">
                       <h1 class="text-xl uppercase">{{ parseAnimeAiringStatus(anime.status) }}</h1> 
                    </div>
                    <div class="px-4 p-2 flex flex-row justify-center items-center bg-zinc-900 rounded-md gap-1">
                        <Icon name="material-symbols:star-rounded" class="text-xl"/>
                        <h1 class="text-xl uppercase">{{ anime.score }}</h1> 
                    </div>
                    <div class="px-4 p-2 flex flex-row justify-center items-center bg-zinc-900 rounded-md">
                       <h1 v-if="anime.episodes" class="text-xl uppercase">{{ anime.episodes }} EP.</h1> 
                       <h1 v-else class="text-xl uppercase">n/a EP.</h1> 
                    </div>
                    <div class="justify-center items-center">
                        <h1 class="text-xl uppercase">x</h1>
                    </div>
                    <div class="px-3 p-2 flex flex-row justify-center items-center bg-zinc-900 rounded-md">
                        <h1 v-if="anime!.duration != 'Unknown'" class="text-xl uppercase">{{ anime!.duration.indexOf('p') >= 0 ? anime!.duration.slice(0, anime!.duration.indexOf(' p')) + '.' : anime!.duration}}</h1> 
                        <h1 v-else class="text-xl uppercase">n/a min.</h1> 
                    </div>
                </div>
                <div>
                    <button 
                        @click="isTitlesShowed = !isTitlesShowed" 
                        class="text-zinc-400 flex flex-row gap-1 items-center hover:text-zinc-50 transition duration-300 easy-in-out hover:underline decoration-dotted underline-offset-4 w-fit">
                            <Icon name="ri:translate-2" class="text-xl"/>    
                            Show alternative titles
                    </button>
                    <div v-show="isTitlesShowed" class="alt-titles flex flex-col">
                        <p v-if="anime.title_english != undefined" class="text-zinc-400">English: <span class="text-zinc-50">{{ anime!.title_english }}</span></p>
                        <p v-if="anime.title_japanese != undefined" class="text-zinc-400">Japanese: <span class="text-zinc-50 ">{{ anime!.title_japanese }}</span></p>
                        <div v-if="anime.title_synonyms.length != 0" class="flex flex-row gap-1">
                            <p class="text-zinc-400">Synonyms:</p>
                            <p v-for="title, i in anime.title_synonyms">
                                {{ (title) + (i / 2 == 0 && anime.title_synonyms.length != 1 ? ',' : '') }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <p class="text-zinc-400">Rating: <span class="text-zinc-50">{{ anime.rating }}</span></p>
                    <p class="text-zinc-400">Source: <span class="text-zinc-50">{{ anime.source }}</span></p>
                    <p class="text-zinc-400">Airing: <span class="text-zinc-50">{{ parseAnimeDate(anime.aired.from, anime.aired.to, anime.status) }}</span></p>
                    <div v-if="anime.studios.length != 0" class="flex flex-row gap-1">
                        <p class="text-zinc-400">Studios:</p> 
                        <p v-for="studio, i in anime.studios" class="text-zinc-50">
                            {{ (studio.name) + (i / 2 == 0 && anime.studios.length != 1 ? ',' : '') }}
                        </p>
                    </div>
                    <!-- <p v-if="anime.producers.length != 0" class="text-zinc-400">Producers: <span class="text-zinc-50">{{ animeProducers() }}</span></p>
                    <p v-if="anime.season" class="text-zinc-400">Season: <span class="text-zinc-50 capitalize ">{{ anime!.season }} {{ anime!.year }}</span></p> -->
                </div>
            </div>
        </div>
    </div>
    <div class="overflow-hidden h-64">
        <img :src="anime?.images.jpg.large_image_url" class="w-screen h-screen object-cover blur-xl opacity-75">
    </div>   
</template>

<script setup lang="ts">
import { Anime, AnimeCharacter, AnimeEpisode, AnimeRating, AnimeStatus } from '@tutkli/jikan-ts';

const anime = ref<Anime>();
const episodes = ref<AnimeEpisode[]>();
const characters = ref<AnimeCharacter[]>();

const isTitlesShowed = ref(false);

const route = useRoute();

// ToDo: add related anime data fetch and set episodes data to optional
// Recieve all anime data include characters and episodes info
onMounted(async () => {
    
}) 

await Promise.all([
    useAsyncData('anime', () => $fetch('/api/v1/anime', {method: 'GET', query: { id: route.params.id}})
        .then((data: Anime) => { anime.value = data })),
    useAsyncData('episodes', () => $fetch('/api/v1/anime/episodes', {method: 'GET', query: { id: route.params.id}})
        .then((data: AnimeEpisode[]) => { episodes.value = data })),
    useAsyncData('characters', () => $fetch('/api/v1/anime/characters', {method: 'GET', query: { id: route.params.id}})
        .then((data: AnimeCharacter[]) => { characters.value = data}))
])

function parseAnimeAiringStatus(status: string): string {
    return status == AnimeStatus.airing ? "Ongoing" : status == AnimeStatus.upcoming ? "Upcoming" : "Released";
}

function parseAnimeRating(rating: string): string {
    return rating == AnimeRating.g ? "G" : rating == AnimeRating.pg ? "PG" : rating == 'PG-13 - Teens 13 or older' ? 'PG-13' : rating == AnimeRating.r ? 'R' : rating == 'R - 17+ (violence & profanity)' ? 'R-17' : 'RX';
}

function parseAnimeDate(dateFrom: string, dateTo: string, status: AnimeStatus): string {
    if (status == AnimeStatus.complete || status == AnimeStatus.finished && dateTo == null) {
        return new Date(dateFrom).toLocaleDateString();
    } else if (anime.value?.status == AnimeStatus.airing || anime.value?.status == AnimeStatus.upcoming) {
        return new Date(dateFrom).toLocaleDateString() + " to n/a";
    }
    else {
        return new Date(dateFrom).toLocaleDateString() + " to " + new Date(dateTo).toLocaleDateString();
    }
}
</script>