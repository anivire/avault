<template>
    <div class="absolute overflow-hidden">
        <nuxt-img 
            v-if="anime"
            :src="anime.images.jpg.small_image_url" 
            class="w-screen md:h-52 h-36 object-cover blur-lg opacity-60"
        />
    </div> 

    <nuxt-img 
        v-if="anime"
        :src="anime?.images.jpg.small_image_url" 
        class="absolute w-screen h-96 object-cover blur-[164px] opacity-20 -z-10"
    />

    <div class="relative mx-auto max-w-7xl p-5">   
        <div v-if="anime != null" class="flex flex-col gap-8 md:mt-40 mt-24">
            <div class="md:grid md:grid-cols-3 flex flex-col gap-5">
                <div class="flex flex-col gap-3">
                    <nuxt-img 
                        v-if="anime"
                        :src="anime.images.jpg.large_image_url" 
                        class="object-cover rounded-xl w-full"
                    />
                    
                    <!-- User anime control panel -->
                    <div v-if="user != null" class="relative">
                        <div v-if="isLoading" class="z-50 w-full h-full absolute backdrop-blur-sm backdrop-brightness-75">
                            <p class="md:text-sm text-xs flex flex-row items-center gap-3 justify-center mt-8"><Icon class="animate-spin text-3xl" name="ri:loader-5-line"/></p>
                        </div>
                        <div class="grid grid-cols-6 gap-2">
                            <button 
                                @click="markFavorited()" 
                                :class="userIsAnimeFavorited ? 'bg-rose-500 text-zinc-900' : 'hover:bg-zinc-700/50 bg-zinc-900'" 
                                class="md:p-2 md:px-4 p-2 rounded-md transition duration-300 easy-in-out">
                                <Icon name="ri:heart-fill" class="md:text-2xl text-lg"/>
                            </button>
                            <div class="relative w-full col-span-5">
                                <div :class="isEpisodesMenuOpen ? 'bg-zinc-800 rounded-t-md' : 'bg-zinc-900 rounded-md'" class="w-full z-52 flex items-center flex-row gap-2 md:p-3 p-2 md:px-5 px-3 justify-between hover:bg-zinc-800 transition duration-300 easy-in-out ">
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon name="ri:movie-2-fill" class="md:text-xl text-lg"/>
                                        <p class="md:text-sm text-xs">Watched episodes</p>
                                    </div>
                                    <div class="flex flex-row items-center gap-2">
                                        <button @click="selectWatchedEpisodesSub()"><Icon name="ri:subtract-fill" class="hover:scale-125 transition-all duration-100 ease-in-out"/></button>
                                        <p class="md:text-base text-sm font-bold hide-arrows">{{ userWatchedEpisodes }}</p>
                                        <p class="md:text-sm text-xs text-zinc-400">/ {{ anime.episodes != undefined ? anime.episodes : '?' }}</p>
                                        <button @click="selectWatchedEpisodesAdd()"><Icon name="ri:add-fill" class="hover:scale-125 transition-all duration-100 ease-in-out"/></button>
                                    </div>
                                </div>
                            </div>
                            
                            <div 
                                class="relative w-full col-span-3" 
                                @mouseover="isListMenuOpen = true" 
                                @mouseleave="isListMenuOpen = false">
                                <button :class="isListMenuOpen ? 'bg-zinc-800 rounded-t-md' : 'bg-zinc-900 rounded-md'" class=" w-full z-52 flex flex-row gap-2 md:p-3 p-2 md:px-5 px-3 justify-between items-center hover:bg-zinc-800 transition duration-300 easy-in-out ">
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon name="ri:add-box-fill" class="md:text-xl text-lg"/>
                                        <p class="md:text-sm text-xs">List</p>
                                    </div>
                                    <p v-if="userAnimeList == 'select' || userAnimeList == undefined || userAnimeList == ''" class="md:text-sm text-xs text-zinc-400">Select</p>
                                    <p 
                                        v-else
                                        :class="userAnimeList == 'watched' ? 'text-emerald-400' : userAnimeList == 'watching' ? 'text-amber-400' : userAnimeList == 'planned' ? 'text-violet-400' : 'text-rose-400'"
                                        class="md:text-sm text-xs font-bold">{{ userAnimeList.charAt(0).toUpperCase() + userAnimeList.slice(1) }}</p>
                                </button>
                                <div v-if="isListMenuOpen" class="absolute md:mt-11 mt-8 z-10 w-full top-0 right-0 text-left p-2 origin-top bg-zinc-900/75 items-center backdrop-blur-3xl rounded-b-md justify-between flex flex-col">
                                    <button 
                                        @click="selectList('select')" 
                                        class="flex flex-row items-center hover:bg-zinc-700/50 justify-between transition duration-300 easy-in-out rounded-md w-full">
                                        <p class="text-xs p-2">Select</p>
                                    </button>
                                    
                                    <button 
                                        @click="selectList('watched')" 
                                        :class="userAnimeList == 'watched' ? 'bg-emerald-500/50' : 'hover:bg-zinc-700/50'"  
                                        class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                                        <p class="text-xs p-2">Watched</p>
                                        <Icon name="ri:check-line" class="mr-2"></Icon>
                                    </button>
                                    
                                    <button 
                                        @click="selectList('watching')" 
                                        :class="userAnimeList == 'watching' ? 'bg-amber-500/50' : 'hover:bg-zinc-700/50'"  
                                        class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                                        <p class="text-xs p-2">Watching</p>
                                        <Icon name="ri:eye-fill" class="mr-2"></Icon>
                                    </button>

                                    <button 
                                        @click="selectList('planned')" 
                                        :class="userAnimeList == 'planned' ? 'bg-blue-500/50' : 'hover:bg-zinc-700/50'"  
                                        class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                                        <p class="text-xs p-2">Planned</p>
                                        <Icon name="ri:time-fill" class="mr-2"></Icon>
                                    </button>

                                    <button 
                                        @click="selectList('dropped')" 
                                        :class="userAnimeList == 'dropped' ? 'bg-red-500/50' : 'hover:bg-zinc-700/50'" 
                                        class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                                        <p class="text-xs p-2">Dropped</p>
                                        <Icon name="ri:eye-off-fill" class="mr-2"></Icon>
                                    </button>
                                </div>
                            </div>

                            <div 
                                class="relative w-full col-span-3"
                                @mouseover="isScoreMenuOpen = true" 
                                @mouseleave="isScoreMenuOpen = false">
                                <button :class="isScoreMenuOpen ? 'bg-zinc-800 rounded-t-md' : 'bg-zinc-900 rounded-md'" class="items-center w-full z-52 flex flex-row gap-2 md:p-3 md:px-4 p-2 px-3 justify-between hover:bg-zinc-700/50 transition duration-300 easy-in-out ">
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon name="material-symbols:star-rounded" class="md:text-xl text-lg"/>
                                        <p class="md:text-sm text-xs">Score</p>
                                    </div>
                                    <p 
                                        :class="userAnimeScore == -1 || userAnimeScore == 0 || userAnimeScore == undefined ? 'text-zinc-400' : 'text-zinc-50 font-bold'"
                                        class="md:text-sm text-xs">{{ userAnimeScore == -1 || userAnimeScore == 0 || userAnimeScore == undefined ? 'Select' : userAnimeScore }}</p>
                                </button>
                                <div v-if="isScoreMenuOpen" class="absolute z-10 md:mt-11 mt-8 w-full top-0 right-0 text-left p-2 origin-top bg-zinc-900/75 backdrop-blur-3xl rounded-b-md justify-between flex flex-col">
                                    <button :class="userAnimeScore == -1 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(-1)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">Select</button>
                                    <button :class="userAnimeScore == 10 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(10)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">10 - Masterpiece</button>
                                    <button :class="userAnimeScore == 9 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(9)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">9 - Great</button>
                                    <button :class="userAnimeScore == 8 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(8)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">8 - Very Good</button>
                                    <button :class="userAnimeScore == 7 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(7)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">7 - Good</button>
                                    <button :class="userAnimeScore == 6 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(6)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">6 - Fine</button>
                                    <button :class="userAnimeScore == 5 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(5)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">5 - Average</button>
                                    <button :class="userAnimeScore == 4 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(4)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">4 - Bad</button>
                                    <button :class="userAnimeScore == 3 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(3)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">3 - Very Bad</button>
                                    <button :class="userAnimeScore == 2 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(2)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">2 - Horrible</button>
                                    <button :class="userAnimeScore == 1 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(1)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">1 - Appaling</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Anime info -->
                <div class="flex flex-col md:gap-4 gap-3 justify-start col-span-2 md:mt-16">
                    <h1 class="md:text-5xl text-xl">{{ anime.title != undefined ? anime.title : anime.titles[0].title }}</h1>
                    <div class="bg flex flex-row flex-wrap md:gap-3 gap-2 items-center">
                        <div
                            v-if="anime.type" 
                            class="md:px-4 md:p-2 px-3 p-2 flex flex-row justify-center items-center bg-zinc-800 rounded-md">
                            <h1 class="md:text-xl text-xs uppercase">{{ anime.type }}</h1> 
                        </div>
                        <div 
                            :class="parseAnimeAiringStatus(anime.status) == 'Ongoing' ? 'bg-amber-400' : parseAnimeAiringStatus(anime.status) == 'Upcoming' ? 'bg-rose-400' : 'bg-emerald-400'"
                            class="px-4 p-2 flex flex-row justify-center items-center rounded-md text-zinc-800">
                            <h1 class="md:text-xl text-xs uppercase">{{ parseAnimeAiringStatus(anime.status) }}</h1> 
                        </div>
                        <div 
                            v-if="anime.score"  
                            class="md:px-4 md:p-2 px-3 p-2 flex flex-row justify-center items-center bg-zinc-800 rounded-md gap-1">
                            <Icon name="material-symbols:star-rounded" class="text-xl"/>
                            <h1 class="md:text-xl text-xs uppercase">{{ anime.score == undefined ? 'n/a' : anime.score }}</h1> 
                        </div>
                        <div
                            v-if="anime.episodes"  
                            class="md:px-4 md:p-2 px-3 p-2 flex flex-row justify-center items-center bg-zinc-800 rounded-md">
                            <h1 v-if="anime.episodes" class="md:text-xl text-xs uppercase">{{ anime.episodes }} EP.</h1> 
                            <h1 v-else class="md:text-xl text-xs uppercase">n/a EP.</h1> 
                        </div>
                        <div 
                            v-if="anime.duration != 'Unknown'"  
                            class="justify-center items-center">
                            <h1 class="md:text-xl text-xs uppercase">x</h1>
                        </div>
                        <div
                            v-if="anime.duration != 'Unknown'"   
                            class="md:px-3 md:p-2 px-3 p-2 flex flex-row justify-center items-center bg-zinc-800 rounded-md">
                            <h1 v-if="anime!.duration != 'Unknown'" class="md:text-xl text-xs uppercase">{{ anime!.duration.indexOf('p') >= 0 ? anime!.duration.slice(0, anime!.duration.indexOf(' p')) + '.' : anime!.duration}}</h1> 
                            <h1 v-else class="md:text-xl text-xs uppercase">n/a min.</h1> 
                        </div>
                        <h1 v-for="genre, i in anime.genres" class="md:px-4 md:p-2 px-3 p-2 uppercase flex flex-row justify-center items-center bg-zinc-800 rounded-md md:text-xl text-xs">
                            {{ genre.name }}
                        </h1>
                    </div>
                    <div>
                        <button 
                            @click="isTitlesShowed = !isTitlesShowed" 
                            class="text-zinc-400 flex flex-row gap-1 items-center hover:text-zinc-50 transition duration-300 easy-in-out hover:underline decoration-dotted underline-offset-4 w-fit md:text-base text-xs">
                                <Icon name="ri:translate-2" class="md:text-xl text-sm"/>    
                                Show alternative titles
                        </button>
                        <div v-show="isTitlesShowed" class="alt-titles flex flex-col mt-2">
                            <div v-for="item in anime.titles" class="flex flex-row gap-1">
                                <p v-if="item.type != 'German' && item.type != 'Spanish' && item.type != 'French' && item.type != 'Synonym'" class="text-zinc-400 md:text-base text-sm">{{ item.type }}: <span class="text-zinc-50">{{ item.title }}</span></p>
                            </div>
                            <div v-if="anime.title_synonyms.length != 0" class="flex flex-row gap-1 md:text-base text-sm">
                                <p class="text-zinc-400">Synonyms:
                                    <span v-for="title, i in anime.title_synonyms" class="text-zinc-50">
                                        {{ (title) + (anime.title_synonyms.length != 1 && i + 1 != anime.title_synonyms.length ? ', ' : '') }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:text-base text-sm">
                        <p v-if="anime.rating" class="text-zinc-400">Rating: <span class="text-zinc-50">{{ anime.rating }}</span></p>
                        <p v-if="anime.source" class="text-zinc-400">Source: <span class="text-zinc-50">{{ anime.source }}</span></p>
                        <p v-if="anime.aired.from" class="text-zinc-400">Airing: <span class="text-zinc-50">{{ parseAnimeDate(anime.aired.from, anime.aired.to, anime.status) }}</span></p>
                        <p v-if="anime.season" class="text-zinc-400">Season: <span class="text-zinc-50 capitalize ">{{ anime.season }} {{ anime.year }}</span></p>
                        <div v-if="anime.studios.length != 0" class="flex flex-row gap-1">
                            <p class="text-zinc-400">Studios:
                                <span v-for="studio, i in anime.studios" class="text-zinc-50">
                                    {{ (studio.name) + (anime.studios.length != 1 && i + 1 != anime.studios.length ? ', ' : '') }}
                                </span>
                            </p> 
                        </div>
                        <div v-if="anime.producers.length != 0" class="flex flex-row gap-1">
                            <p class="text-zinc-400">Producers: 
                                <span v-for="producer, i in anime.producers" class="text-zinc-50">
                                    {{ (producer.name) + (anime.producers.length != 1 && i + 1 != anime.producers.length ? ', ' : '') }}
                                </span>
                            </p> 
                        </div>
                    </div>
                    <p v-if="anime.synopsis" class="text-zinc-400 md:text-base text-sm">Description: <span class="text-zinc-50">{{ anime.synopsis }}</span></p>
                </div>
            </div>

            <!-- Anime trailer & characters -->
            <div 
                v-if="anime"
                :class="!anime.trailer.embed_url ? 'grid-cols-1' : 'grid-cols-2'"
                class="md:grid gap-5 flex flex-col">
                <div v-if="anime && anime.trailer.embed_url" class="flex flex-col gap-3">
                    <h1 class="md:text-xl text-base uppercase">Trailer</h1>
                    <iframe 
                        :src="'https://www.youtube.com/embed/' + anime!.trailer.youtube_id + '?enablejsapi=1&wmode=opaque&autoplay=0'" 
                        class="relative w-full z-2 rounded-md md:h-[320px] h-[220px]">
                    </iframe>
                </div>
                
                <!-- <div v-if="characters && characters!.length > 0" class="flex flex-col gap-3">
                    <div class="flex flex-row justify-between items-center">
                        <h1 class="md:text-xl text-base uppercase">Characters</h1>
                        <div class="grid grid-cols-3 text-center items-center">
                            <button 
                                @click="prevCharactersPage()" 
                                class="text-zinc-400 hover:text-zinc-50 transition duration-300 easy-in-out hover:underline decoration-dotted underline-offset-4 w-fit md:text-base text-sm items-center flex">
                                <Icon name="ri:arrow-drop-left-line" class="text-xl"/> 
                                Prev
                            </button>
                            <p class="text-zinc-50 md:text-base text-xs">{{ currentCharacterPage + 1 }} / {{ totalPages(characters.length, anime.trailer.embed_url == undefined ? false : true) }}</p>
                            <button 
                                @click="nextCharactersPage(characters.length, anime.trailer.embed_url == undefined ? false : true)" 
                                class="text-zinc-400 hover:text-zinc-50 transition duration-300 easy-in-out hover:underline decoration-dotted underline-offset-4 w-fit md:text-base text-sm items-center flex">
                                Next 
                                <Icon name="ri:arrow-drop-right-line" 
                                class="text-xl"/>
                            </button>
                        </div>
                    </div>
                    <div 
                        :class="characters.length < 5 ? 'flex flex-row' : 'grid grid-flow-col'"
                        class="characters-carousel gap-4 h-full" 
                        style="overflow-y: hidden; overflow-x: hidden;">
                        <p v-show="characters!.length == 0">No characters was found</p>
                        <CharacterCapsule 
                            v-show="characters" 
                            v-for="character in characters" class="z-0"
                            :style="currentCharacterPage ? 'transform: translateX(-' + (anime.trailer.embed_url ? currentCharacterPage * 640 : currentCharacterPage * 1280) + 'px;' : ''"
                            :character-id="character.character.mal_id"
                            :image-url="character.character.images!.jpg.image_url"
                            :name="character.character.name" />
                    </div>
                </div> -->
                
                <!-- Anime relations -->
                <div class="flex flex-col gap-3">
                    <h1 class="md:text-xl text-base uppercase">Relations</h1>
                    <div class="flex flex-col gap-3">
                        <template v-for="item in anime.relations">
                            <div 
                                v-for="entry in item.entry">
                                <NuxtLink 
                                    :to="item.relation != 'Character' && entry.type != 'manga' ? { name: 'anime-id', params: { id: entry.mal_id }} : ''"
                                    class="justify-start bg-zinc-900 p-3 md:px-5 px-4 rounded-lg grid grid-flow-col items-center md:gap-5 gap-3 hover:bg-zinc-800 duration-300 ease-in-out transition-all">
                                    <Icon v-if="item.relation == 'Character'" name="ri:user-3-fill" class="text-2xl"/>
                                    <Icon v-else-if="entry.type == 'anime'" name="ri:movie-2-line" class="text-2xl"/>
                                    <Icon v-else-if="entry.type == 'manga'" name="ri:book-3-line" class="text-2xl"/>

                                    <div>
                                        <div v-if="item.relation != 'Character'" class="flex flex-row gap-1 items-center">
                                            <p class="text-xs uppercase text-zinc-400">{{ item.relation }}</p> 
                                            <p class="text-xs text-zinc-400">•</p>
                                            <p class="text-xs uppercase text-zinc-400">{{ entry.type }}</p> 
                                        </div>
                                        <div v-else class="flex flex-row gap-2 items-center">
                                            <p class="text-xs uppercase text-zinc-400">{{ item.relation }}</p> 
                                        </div>
                                        <p class="md:text-base text-sm font-bold">{{ entry.name }}</p>
                                    </div>
                                    <Icon v-if="item.relation != 'Character' && entry.type != 'manga'" name="ri:arrow-right-up-line" class="md:text-3xl text-xl"/>
                                </NuxtLink>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CharacterCapsule from '@/src/components/capsule/CharacterCapsule.vue';
import CharacterCapsuleSkeleton from '@/src/components/skeleton/AnimeCharacterSkeleton.vue';
import { Anime, AnimeStatus } from '@tutkli/jikan-ts';
import { useUserStore } from '@/store/UserStore';
import { useToastStore } from '@/store/ToastStore';
import { animeList } from '@prisma/client';

const user = useSupabaseUser();

const authorizedUser = useUserStore();
const toasts = useToastStore();
const route = useRoute();

const isTitlesShowed = ref(false);
const isListMenuOpen = ref(false);
const isEpisodesMenuOpen = ref(false);
const isScoreMenuOpen = ref(false);

const isLoading = ref(false);

const userAnimeScore = ref(0);
const userAnimeList = ref('');
const userWatchedEpisodes = ref(0);
const userIsAnimeFavorited = ref(false);

const currentCharacterPage = ref(0);

const anime = ref<Anime>();
const searchEntry = ref();

//const { data: characters } = await useAsyncData('characters', () => $fetch('/api/v1/anime/characters', {method: 'GET', query: { id: route.params.id }}));
const animePromise = useAsyncData('anime', () => $fetch('/api/v1/anime', {method: 'GET', query: { id: route.params.id }}));
const searchEntryPromise = useAsyncData('searchEntry', () => $fetch('/api/v1/user/animelist/searchEntry', {method: 'GET', query: { mal_id: route.params.id, user_id: user.value?.id }}));

Promise.all([animePromise, searchEntryPromise])
    .then(([animeResponse, searchEntryResponse]) => {
        if (animeResponse.data.value != undefined) {
            anime.value = animeResponse.data.value as Anime;
            searchEntry.value = searchEntryResponse.data.value;
        } else {
            navigateTo('/anime/search');
        }
    })
    .catch(error => {
        navigateTo('/anime/search');
    });

console.log(anime.value)

// If user authorized, check animeList entry
if (searchEntry.value?.mal_id != undefined && user.value != null) {
    userAnimeScore.value = searchEntry.value.score as number;
    userAnimeList.value = searchEntry.value.watching_status;
    userWatchedEpisodes.value = searchEntry.value.wathed_episodes as number;
    userIsAnimeFavorited.value = searchEntry.value.is_favorited;
}

if (anime.value) {
    useSeoMeta({
        title: anime.value.titles[0].title ? anime.value.titles[0].title + ' › AVAULT' : 'Anime › AVAULT',
        ogTitle: anime.value.titles[0].title ? anime.value.titles[0].title : 'Anime',
        description: anime.value.synopsis,
        ogDescription: anime.value.synopsis,
        ogImage: anime.value.images.jpg.image_url,
    })
}

function parseAnimeAiringStatus(status: string): string {
    return status == AnimeStatus.airing ? "Ongoing" : status == AnimeStatus.upcoming ? "Upcoming" : "Released";
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


async function createOrUpdateAnimeEntry() {
    isLoading.value = true;
    const { data } = await useAsyncData('searchEntry', () => $fetch('/api/v1/user/animelist/searchEntry', {method: 'GET', query: { mal_id: route.params.id, user_id: authorizedUser.user.user_id }}));

    if (data.value?.mal_id == undefined) {
        console.log('Created new entry');
        // If anime entry is not exists in user animelist, then create new one
        if (anime.value) {
            const newEntryData = {
                mal_id: route.params.id,
                total_episodes: anime.value.episodes,
                image_url: anime.value.images.webp?.image_url,
                title: anime.value.title != undefined ? anime.value.title : anime.value.titles[0].title,
                studios: 'test', // add correct studios property
                type: anime.value.type.toString(),
                airing_season: anime.value.season + ' ' + anime.value.year,
                airing_status: parseAnimeAiringStatus(anime.value.status),
                watching_status: userAnimeList.value,
                score: userAnimeScore.value,
                is_favorited: userIsAnimeFavorited.value,
                added_at: new Date(),
                updated_at: new Date(),
                user_id: authorizedUser.user.user_id,
                wathed_episodes: userWatchedEpisodes.value
            }; 

            const { error } = await useAsyncData('createEntry', () => $fetch('/api/v1/user/animelist/createEntry', { method: 'POST', body: { animeList: newEntryData }}));

            if (error.value) {
                toasts.addToast({title: 'Error', description: error.value.message, icon: 'error', status: 'error'})
            }
        }
        isLoading.value = false;
    } else {
        console.log('Updated exist');
        if (anime.value) {
            const updatedEntryData = {
                total_episodes: anime.value.episodes,
                image_url: anime.value.images.webp?.image_url,
                airing_season: anime.value.season + ' ' + anime.value.year,
                airing_status: parseAnimeAiringStatus(anime.value.status),
                watching_status: userAnimeList.value,
                score: userAnimeScore.value,
                is_favorited: userIsAnimeFavorited.value,
                updated_at: new Date(),
                wathed_episodes: userWatchedEpisodes.value,
                entry_id: data.value!.entry_id
            }; 

            const { error } = await useAsyncData('updateEntry', () => $fetch('/api/v1/user/animelist/updateEntry', { method: 'POST', body: { animeList: updatedEntryData }}));
            
            if (error.value) {
                toasts.addToast({title: 'Error', description: error.value.message, icon: 'error', status: 'error'})
            }
        }
        isLoading.value = false;
    }
}

function markFavorited() {
    userIsAnimeFavorited.value = !userIsAnimeFavorited.value;

    createOrUpdateAnimeEntry();

    if (userIsAnimeFavorited.value) {
        toasts.addToast({title: 'Anime marked Favorite', description: anime.value!.titles[0].title, icon: 'favorite', status: 'base'})
    } else {
        toasts.addToast({title: 'Anime unmarked Favorite', description: anime.value!.titles[0].title, icon: 'favorite', status: 'base'})
    }
}

const selectWatchedEpisodesSub = () => {
    userWatchedEpisodes.value >= 1 ? userWatchedEpisodes.value-- : anime.value!.episodes;
    selectWatchedEpisodes();
}

const selectWatchedEpisodesAdd = () => {
    userWatchedEpisodes.value < (anime.value!.episodes != undefined ? anime.value!.episodes : 999) ? userWatchedEpisodes.value++ : anime.value!.episodes;
    selectWatchedEpisodes();
}

const selectWatchedEpisodes = () => {
    createOrUpdateAnimeEntry();
    toasts.addToast({title: 'Episodes watched ➝ ' + userWatchedEpisodes.value, description: anime.value!.titles[0].title, icon: 'episodes', status: 'base'})
}

async function selectList(list: string) {
    if (list != 'select') {
        if (list == 'watched' && anime.value?.episodes != undefined) {
            userWatchedEpisodes.value = anime.value.episodes;
        }

        userAnimeList.value = list;
        createOrUpdateAnimeEntry();

        toasts.addToast({title: 'Added to list ➝ ' + userAnimeList.value, description: anime.value!.titles[0].title, icon: 'list', status: 'base'})
    }
}

function selectScore(score: number) {
    userAnimeScore.value = score;

    createOrUpdateAnimeEntry();

    toasts.addToast({title: 'Set score to anime ⭐' + userAnimeScore.value, description: anime.value!.titles[0].title, icon: 'score', status: 'base'})
}

function prevCharactersPage() {
    if (currentCharacterPage.value != 0) {
        currentCharacterPage.value--;
    }
}

function nextCharactersPage(totalCharacters: number, isTrailerExist: boolean) {
    if (isTrailerExist) {
        if (currentCharacterPage.value != Math.round(totalCharacters / 4 - 1)) {
            currentCharacterPage.value++;
        } else {
            currentCharacterPage.value = 0;
        }
    } else {
        if (currentCharacterPage.value != Math.round(totalCharacters / 8 - 1) && totalCharacters > 8) {
            currentCharacterPage.value++;
        } else {
            currentCharacterPage.value = 0;
        }
    }
}

function totalPages(totalCharacters: number, isTrailerExist: boolean): number {
    if (isTrailerExist) {
        if (totalCharacters > 4) {
            return Math.round(totalCharacters / 4);
        } else {
            return 1;
        }
    } else {
        if (totalCharacters > 8) {
            return Math.round(totalCharacters / 8);
        } else {
            return 1;
        }
        
    }
}
</script>

<style>
.hide-arrows { 
  appearance: textfield;
}
.hide-arrows::-webkit-inner-spin-button { 
  display: none;
}
</style>