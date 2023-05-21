<template>
    <div>
        <div
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
            :class="[
                score! >= 7 ? 'to-emerald-900 hover:to-emerald-500' : 
                score! >= 5 ? 'to-amber-900 hover:to-amber-500' : 
                score! < 5 && score! >= 1 ? 'to-rose-900 hover:to-rose-500' : 'to-zinc-900 hover:to-zinc-700', 
                isAnimeEditMenuOpen ? 'rounded-t-md' : 'rounded-md']"
            class="relative from-zinc-900 bg-gradient-to-r flex flex-row justify-between items-center transition-all duration-200 ease-in-out">
            <div v-if="isLoading" class="w-full h-full absolute backdrop-blur-sm backdrop-brightness-75">
                <p class="text-sm flex flex-row items-center gap-3 justify-center mt-16 ml-24"><Icon class="animate-spin text-3xl" name="ri:loader-5-line"/></p>
            </div>
            <div class="flex flex-row items-center h-36 w-full ">
                <nuxt-img 
                    :src="imageUrl" 
                    :class="isHovered && !isLoading ? 'scale-110 rounded-md shadow-xl' : 'scale-100 rounded-l-md'"
                    class="h-full transition-all duration-200 ease-in-out z-10"
                />
                <div 
                    :class="score == 0 || score == -1 ? 'px-5' : 'pl-5'"
                    class="flex flex-col gap-1 justify-center w-full">
                    <div class="flex flex-row justify-between gap-5 items-center">
                        <NuxtLink :to="{name: 'anime-id', params: { id: animeId }}" class="flex flex-row gap-1 items-center hover:bg-zinc-700/50 rounded-md w-fit">
                            <p class="text-base font-bold line-clamp-1">{{ title }}</p>
                            <Icon name="ri:arrow-right-up-line" class="text-xl min-w-max"/>
                        </NuxtLink>
                        <button v-if="user_id == authorizedUser.user.user_id" @click="isAnimeEditMenuOpen = !isAnimeEditMenuOpen"><Icon name="ri:edit-2-fill" class="text-xl"/></button>
                    </div>
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
                        <div 
                            class="flex flex-col gap-1">
                            <div class="bg-zinc-800 rounded-sm">
                                <div
                                    :style="'width: ' + watchedEpisodes / (totalEpisodes == null || totalEpisodes == 0 ? 24 : totalEpisodes) * 100 + '%'" 
                                    class="bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-200 ease-in-out rounded-sm p-1">
                                </div>
                            </div>
                            <p class="text-zinc-400 text-sm flex flex-row justify-between">Episodes watched <span class="text-zinc-50">{{ watchedEpisodes }} / {{ totalEpisodes == 0 || totalEpisodes == null ? '?' : totalEpisodes }}</span></p>
                            <p class="text-zinc-400 text-sm flex flex-row justify-between">Added at<span class="text-zinc-50">{{ addedAt }}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 v-if="score == 0 || score == -1 ? false : true" class="w-36 flex flex-row justify-center">{{ score }}</h1>
        </div>
        <div v-if="isAnimeEditMenuOpen && user_id == authorizedUser.user.user_id" class="relative">
            <div v-if="isLoading" class="w-full h-full absolute backdrop-blur-sm backdrop-brightness-75 z-30"></div>
            <div class="grid grid-cols-8 gap-3 p-3 bg-zinc-900 rounded-b-md">
                <!-- favorite -->
                <button 
                    @click="markFavorited()" 
                    :class="isFavorited ? 'bg-rose-500 text-zinc-800' : 'hover:bg-zinc-600/50 bg-zinc-800'" 
                    class=" p-2 px-4 rounded-md transition duration-300 easy-in-out">
                    <Icon name="ri:heart-fill" class="text-2xl"/>
                </button>

                <!-- episodes -->
                <div class="relative w-full col-span-7">
                    <div class="w-full z-50 flex items-center flex-row gap-2 p-3 px-5 justify-between bg-zinc-800 transition duration-300 easy-in-out rounded-md">
                        <div class="flex flex-row items-center gap-2">
                            <Icon name="ri:movie-2-fill" class="text-xl"/>
                            <p class="text-sm font-bold">Watched episodes</p>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <input 
                                type="number" 
                                min="0" 
                                :max="totalEpisodes != undefined ? totalEpisodes : 999" 
                                :value="watchedEpisodes" 
                                readonly
                                class="bg-transparent outline-none border-none w-12 text-right text-base font-bold hide-arrows">
                            <p class="text-sm text-zinc-400">/ {{ totalEpisodes != undefined ? totalEpisodes : '?' }}</p>
                            <button @click="selectWatchedEpisodes()"><Icon name="ri:add-fill" class="hover:scale-125 transition-all duration-100 ease-in-out"/></button>
                        </div>
                    </div>
                </div>

                <!-- list -->
                <div 
                    class="relative w-full col-span-4" 
                    @mouseover="isListMenuOpen = true" 
                    @mouseleave="isListMenuOpen = false">
                    <button 
                        :class="isListMenuOpen ? 'bg-zinc-600/50 rounded-t-md' : 'bg-zinc-800 rounded-md'" 
                        class=" w-full z-50 flex flex-row gap-2 p-3 px-5 justify-between items-center transition duration-300 easy-in-out ">
                        <div class="flex flex-row items-center gap-2">
                            <Icon name="ri:add-box-fill" class="text-xl"/>
                            <p class="text-sm font-bold">List</p>
                        </div>
                        <p v-if="watchingStatus == 'select' || watchingStatus == undefined || watchingStatus == ''" class="text-sm text-zinc-400">Select</p>
                        <p 
                            v-else
                            :class="watchingStatus == 'watched' ? 'text-emerald-400' : watchingStatus == 'watching' ? 'text-amber-400' : watchingStatus == 'planned' ? 'text-violet-400' : 'text-rose-400'"
                            class="text-sm font-bold">{{ watchingStatus.charAt(0).toUpperCase() + watchingStatus.slice(1) }}</p>
                    </button>
                    <div v-if="isListMenuOpen" class="absolute mt-11 z-10 w-full top-0 right-0 text-left p-2 origin-top bg-zinc-800/75 items-center backdrop-blur-3xl rounded-b-md justify-between flex flex-col">
                        <button 
                            @click="selectList('select')" 
                            class="flex flex-row items-center hover:bg-zinc-700/50 justify-between transition duration-300 easy-in-out rounded-md w-full">
                            <p class="text-xs p-2">Select</p>
                        </button>
                        
                        <button 
                            @click="selectList('watched')" 
                            :class="watchingStatus == 'watched' ? 'bg-emerald-500/50' : 'hover:bg-zinc-700/50'"  
                            class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                            <p class="text-xs p-2">Watched</p>
                            <Icon name="ri:check-line" class="mr-2"></Icon>
                        </button>
                        
                        <button 
                            @click="selectList('watching')" 
                            :class="watchingStatus == 'watching' ? 'bg-amber-500/50' : 'hover:bg-zinc-700/50'"  
                            class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                            <p class="text-xs p-2">Watching</p>
                            <Icon name="ri:eye-fill" class="mr-2"></Icon>
                        </button>

                        <button 
                            @click="selectList('planned')" 
                            :class="watchingStatus == 'planned' ? 'bg-blue-500/50' : 'hover:bg-zinc-700/50'"  
                            class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                            <p class="text-xs p-2">Planned</p>
                            <Icon name="ri:time-fill" class="mr-2"></Icon>
                        </button>

                        <button 
                            @click="selectList('dropped')" 
                            :class="watchingStatus == 'dropped' ? 'bg-red-500/50' : 'hover:bg-zinc-700/50'" 
                            class="flex flex-row items-center justify-between transition duration-300 easy-in-out rounded-md w-full">
                            <p class="text-xs p-2">Dropped</p>
                            <Icon name="ri:eye-off-fill" class="mr-2"></Icon>
                        </button>
                    </div>
                </div>

                <!-- score -->
                <div 
                    class="relative w-full col-span-3"
                    @mouseover="isScoreMenuOpen = true" 
                    @mouseleave="isScoreMenuOpen = false">
                    <button 
                        :class="isScoreMenuOpen ? 'bg-zinc-600/50 rounded-t-md' : 'bg-zinc-800 rounded-md'" 
                        class="items-center w-full z-50 flex flex-row gap-2 p-3 px-5 justify-between transition duration-300 easy-in-out ">
                        <div class="flex flex-row items-center gap-2">
                            <Icon name="material-symbols:star-rounded" class="text-xl"/>
                            <p class="text-sm font-bold">Score</p>
                        </div>
                        <p 
                            :class="score == -1 || score == 0 || score == undefined ? 'text-zinc-400' : 'text-zinc-50 font-bold'"
                            class="text-sm">{{ score == -1 || score == 0 || score == undefined ? 'Select' : score }}</p>
                    </button>
                    <div v-if="isScoreMenuOpen" class="absolute z-10 mt-11 w-full top-0 right-0 text-left p-2 origin-top bg-zinc-800/75 backdrop-blur-3xl rounded-b-md justify-between flex flex-col">
                        <button :class="score == -1 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(-1)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">Select</button>
                        <button :class="score == 10 ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(10)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">10 - Masterpiece</button>
                        <button :class="score == 9 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(9)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">9 - Great</button>
                        <button :class="score == 8 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(8)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">8 - Very Good</button>
                        <button :class="score == 7 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(7)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">7 - Good</button>
                        <button :class="score == 6 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(6)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">6 - Fine</button>
                        <button :class="score == 5 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(5)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">5 - Average</button>
                        <button :class="score == 4 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(4)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">4 - Bad</button>
                        <button :class="score == 3 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(3)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">3 - Very Bad</button>
                        <button :class="score == 2 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(2)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">2 - Horrible</button>
                        <button :class="score == 1 ?  'bg-zinc-700' : 'hover:bg-zinc-700/50'" @click="selectScore(1)" class="text-xs p-2 text-left duration-300 easy-in-out rounded-md">1 - Appaling</button>
                    </div> 
                </div>

                <!-- delete -->
                <button 
                    @click="" 
                    class=" p-2 px-4 rounded-md transition duration-300 easy-in-out hover:bg-rose-500 bg-zinc-800">
                    <Icon name="ri:delete-bin-2-fill" class="text-2xl"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/store/ToastStore';
import { useUserStore } from '@/store/UserStore';

const isHovered = ref(false);
const isAnimeEditMenuOpen = ref(false);
const isListMenuOpen = ref(false);
const isScoreMenuOpen = ref(false);
const isLoading = ref(false);

const authorizedUser = useUserStore()
const user = useSupabaseUser();
const toasts = useToastStore();

const props = defineProps({
    animeId: { type: Number, required: true},
    watchingStatus: { type: String, required: true},
    watchedEpisodes: { type: Number, required: true},
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
    airingStatus: { type: String, required: true},
    entryId: { type: String, required: true},
    user_id: { type: String, required: true}
})

const emits = defineEmits(['update:entry'])

const editAnimeEnty = ref();

onMounted(() => {
    if (props) {
        editAnimeEnty.value = {
            score: props.score,
            isFavorited: props.isFavorited,
            watchedEpisodes: props.watchedEpisodes,
            watchingStatus: props.watchingStatus
        }
    }
})

watch(props, (newValue) => {
    isLoading.value = false;
    editAnimeEnty.value = {
        score: newValue.score,
        isFavorited: newValue.isFavorited,
        watchedEpisodes: newValue.watchedEpisodes,
        watchingStatus: newValue.watchingStatus
    }
})

const selectList = (list: string) => {
    if (list != 'select') {
        if (list == 'watched' && props.totalEpisodes != undefined) {
            editAnimeEnty.value.watchedEpisodes = props.totalEpisodes!;
        }

        editAnimeEnty.value.watchingStatus = list;
        updateAnimeEntry();
        toasts.addToast({title: 'Added to list ➝ ' + list, description: props.title, icon: 'list', status: 'base'})
    }
}

const selectScore = (score: number) => {
    editAnimeEnty.value.score = score;
    updateAnimeEntry();
    toasts.addToast({title: 'Set score to anime ⭐' + score, description: props.title, icon: 'score', status: 'base'})
}

const markFavorited = () => {
    editAnimeEnty.value.isFavorited = !editAnimeEnty.value.isFavorited;
    updateAnimeEntry();

    if (editAnimeEnty.value.isFavorited) {
        toasts.addToast({title: 'Anime marked Favorite', description: props.title, icon: 'favorite', status: 'base'})
    } else {
        toasts.addToast({title: 'Anime unmarked Favorite', description: props.title, icon: 'favorite', status: 'base'})
    }
}

const selectWatchedEpisodes = () => {
    editAnimeEnty.value.watchedEpisodes < (props.totalEpisodes != undefined ? props.totalEpisodes : 999) ? editAnimeEnty.value.watchedEpisodes++ : props.totalEpisodes;
    updateAnimeEntry();
    toasts.addToast({title: 'Episodes watched ' + editAnimeEnty.value.watchedEpisodes, description: props.title, icon: 'episodes', status: 'base'})
}

const updateAnimeEntry = async () => {
    isLoading.value = true;

    const updatedEntryData = {
        watching_status: editAnimeEnty.value.watchingStatus,
        score: editAnimeEnty.value.score,
        is_favorited: editAnimeEnty.value.isFavorited,
        wathed_episodes: editAnimeEnty.value.watchedEpisodes,
        updated_at: new Date(),
        entry_id: props.entryId
    }; 

    const { error } = await useAsyncData('updateEntry', () => $fetch('/api/v1/user/animelist/updateEntry', { method: 'POST', body: { animeList: updatedEntryData }}));
    
    if (error.value) {
        toasts.addToast({title: 'Error', description: error.value.message, icon: 'error', status: 'error'})
    } else {
        emits('update:entry', props.entryId);
    }
}
</script>