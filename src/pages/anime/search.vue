<template>
    <div class="mt-28 max-w-7xl mx-auto px-5">
        <div class="flex flex-col md:gap-5 gap-3">
            <!-- Search panel -->
            <div class="search-panel grid md:grid-cols-6 grid-cols-3 gap-3">
                <div class="flex flex-col gap-2 col-span-2">
                    <p class="md:text-sm text-xs font-bold uppercase">Search</p>
                    <Input @update:input="q = $event"/>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="md:text-sm text-xs font-bold uppercase">Year</p>
                    <Select 
                        :options="yearOptions"
                        :default="selectedYear"
                        @update:select="selectedYear = $event"
                    />
                </div>
                
                <div class="flex flex-col gap-2">
                    <p class="md:text-sm text-xs font-bold uppercase">Format</p>
                    <Select 
                        :options="formatOptions"
                        :default="selectedFormat"
                        @update:select="selectedFormat = $event"
                    />
                </div>
                
                <div class="flex flex-col gap-2">
                    <p class="md:text-sm text-xs font-bold uppercase">Status</p>
                    <Select 
                        :options="statusOptions"
                        :default="selectedStatus"
                        @update:select="selectedStatus = $event"
                    />
                </div>
                
                <!-- <div class="flex flex-col gap-2">
                    <p class="text-sm font-bold uppercase">Genres</p>
                    <Select 
                        :options="genresOptions"
                        :default="selectedGenre"
                        @update:select="selectedGenre = $event"
                    />
                </div> -->
                
                <div class="flex flex-col gap-2">
                    <p class="md:text-sm text-xs font-bold uppercase">Starting at</p>
                    <Select 
                        :options="scoreOptions"
                        :default="selectedScore"
                        @update:select="selectedScore = $event"
                    />
                </div>
            </div>
            <!-- Tags -->
            <div class="flex flex-row gap-3 items-center">
                <div class="md:flex hidden flex-row gap-2 items-center grow">
                    <Icon name="ri:price-tag-3-fill"/>
                    <p 
                        v-show="selectedYear.value[0] != -1 && selectedYear.value[0] != null"
                        class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black">
                        {{ selectedYear.name }}
                    </p>
                    
                    <p 
                        v-show="selectedSeason.value[0] != -1 && selectedSeason.value[0] != null"
                        class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black">
                        {{ selectedSeason.name }}
                    </p>
                    
                    <p 
                        v-show="selectedFormat.value[0] != -1 && selectedFormat.value[0] != null"
                        class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black">
                        {{ selectedFormat.name }}
                    </p>
                    
                    <p 
                        v-show="selectedStatus.value[0] != -1 && selectedStatus.value[0] != null"
                        class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black">
                        {{ selectedStatus.name }}
                    </p>
                    
                    <p 
                        v-show="selectedGenre.value[0] != -1 && selectedGenre.value[0] != null"
                        class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black">
                        {{ selectedGenre.name }}
                    </p>
                    
                    <p 
                        v-show="selectedScore.value[0] != -1 && selectedScore.value[0] != null"
                        class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black flex flex-row gap-1 items-center">
                        <Icon name="material-symbols:star-rounded" class="text-xl text-zinc-900"/>
                        {{ selectedScore.name }}
                    </p>
                </div>

                <div class="flex flex-row items-center gap-3 md:justify-normal justify-between md:w-fit w-full">
                    <!-- Sort button -->
                    <div class="flex flex-row gap-1">
                        <Icon 
                            @click="selectedSort = sort[0]"
                            :class="selectedSort.value[0] == 'asc' ? 'text-zinc-50' : 'text-zinc-400'"
                            name="ri:sort-asc" 
                            class="text-xl cursor-pointer"/>    
                        <Icon 
                            @click="selectedSort = sort[1]"
                            :class="selectedSort.value[0] == 'desc' ? 'text-zinc-50' : 'text-zinc-400'"
                            name="ri:sort-desc" 
                            class="text-xl cursor-pointer"/>    
                    </div>
                    <SmallSelect 
                        :options="order"
                        @update:select-small="selectedOrder = $event"
                    />
                </div>
                
                <!-- <SmallSelect 
                    :options="animePerPage"
                    @update:select-small="selectedAnimePerPage = $event"
                /> -->
            </div>
            <!-- Animes -->
            <div v-if="!isSearching">
                <div 
                    v-if="searchAnimes?.length != 0" 
                    class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3.5">
                    <div v-for="anime in searchAnimes">
                        <AnimeCapsule
                            :aired-from="anime.aired.from"
                            :airing-status="anime.status"
                            :anime-id="anime.mal_id"
                            :image-url="anime.images.jpg.image_url"
                            :score="anime.score"
                            :studio="anime.studios[0] != undefined ? anime.studios[0].name : 'n/a'"
                            :title="anime.title != undefined ? anime.title : anime.titles[0].title"
                            :type="anime.type"
                        />
                    </div>
                </div>
                <div 
                    v-else
                    class="flex flex-col items-center mt-16">
                    <p class="font-bold">No results</p>
                    <p class="text-zinc-400">Yeah, it's very sad to hear, but try to change the search filter a little bit?</p>
                </div>
            </div>
            <!-- Skeleton -->
            <div 
                v-else
                class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3.5">
                <div v-for="i in 24">
                    <AnimeCapsuleSkeleton/>
                </div>
            </div>
            <!-- Pagination -->
            <div
                v-if="searchAnimes?.length != 0" 
                class="flex flex-row justify-between items-center gap-3">
                <button 
                    @click="prevPage()"
                    class="flex flex-row w-fit text-sm gap-1 py-2 bg-zinc-900 hover:bg-zinc-800 px-5 items-center transition duration-300 easy-in-out rounded-md">
                    <Icon name="ri:arrow-left-s-line" class="text-xl"/>    
                    Prev page  
                </button>
                <p>{{ currentPage }}</p>
                <button 
                    @click="nextPage()"
                    class="flex flex-row w-fit text-sm gap-1 py-2 bg-zinc-900 hover:bg-zinc-800 px-5 items-center transition duration-300 easy-in-out rounded-md">
                    Next page
                    <Icon name="ri:arrow-right-s-line" class="text-xl"/>
                </button>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import Select from '@/src/components/Select.vue';
import SmallSelect from '@/src/components/SmallSelect.vue';
import Input from '@/src/components/Input.vue';
import { Anime, AnimeSeason, AnimeStatus, AnimeType } from '@tutkli/jikan-ts';
import AnimeCapsule from '@/src/components/capsule/AnimeCapsule.vue';
import AnimeCapsuleSkeleton from '@/src/components/skeleton/AnimeCapsuleSkeleton.vue';

const route = useRoute();
const router = useRouter();

const updateRouteC = ref(0);
const isSearching = ref(false);

const order = ref([
    { value: ['score'], name: 'Score'},
    { value: ['title'], name: 'Title'},
    { value: ['popularity'], name: 'Popularity'},
    { value: ['start_date'], name: 'Release date'},
]);

const sort = ref([
    { value: ['asc'], name: 'Asc'},
    { value: ['desc'], name: 'Desc'},
]);

const animePerPage = ref([
    { value: [24], name: '24' },
    { value: [36], name: '36' },
    { value: [48], name: '48' },
]);

const yearOptions = ref([
    { value: [-1], name: 'Any' },
    { value: [1980, 1990], name: '1980-1990' },
    { value: [1990, 2000], name: '1990-2000' },
    { value: [2000, 2011], name: '2000-2011' },
    { value: [2011, 2015], name: '2011-2015' },
    { value: [2015, 2020], name: '2015-2020' },
    { value: [2020, 2022], name: '2020-2022' },
    { value: [2022, 2023], name: '2022-2023' },
    { value: [2023, 2024], name: '2023-2024' },
]);

const formatOptions = ref([
    { value: [-1], name: 'Any' },
    { value: ['tv'], name: 'TV' },
    { value: ['movie'], name: 'Movie' },
    { value: ['special'], name: 'Special' },
    { value: ['ova'], name: 'OVA' },
    { value: ['ona'], name: 'ONA' },
    { value: ['music'], name: 'Music' },
]);

const statusOptions = ref([
    { value: [-1], name: 'Any' },
    { value: ['complete'], name: 'Released' },
    { value: ['airing'], name: 'Ongoing' },
    { value: ['upcoming'], name: 'Upcoming' },
]);

const scoreOptions = ref([
    { value: [-1], name: 'Any' },
    { value: [9], name: '9' },
    { value: [8], name: '8' },
    { value: [7], name: '7' },
    { value: [6], name: '6' },
    { value: [5], name: '5' },
    { value: [4], name: '4' },
    { value: [3], name: '3' },
    { value: [2], name: '2' },
    { value: [1], name: '1' },
]);

const genresOptions = ref([
    { value: [-1], name: 'Any' },
]);

const q = ref('');
const selectedYear = ref({value: [], name: ''});
const selectedSeason = ref({value: [], name: ''});
const selectedFormat = ref({value: [], name: ''});
const selectedStatus = ref({value: [], name: ''});
const selectedGenre = ref({value: [], name: ''});
const searchAnimes = ref<Anime[]>();
const selectedOrder = ref(order.value[0]);
const selectedAnimePerPage = ref(animePerPage.value[0]);
const selectedSort = ref(sort.value[1]);
const selectedScore = ref({value: [], name: ''});
const currentPage = ref(1);

// Watchers
watch(q, async (newValue, oldValue) => {
    currentPage.value = 1;
    const searchTimeout = setTimeout(() => {
        updateRoute();
    }, 2000)
})

watch(selectedYear, async (newValue, oldValue) => {
    currentPage.value = 1;
    updateRoute();
})

watch(selectedFormat, async (newValue, oldValue) => {
    currentPage.value = 1;
    updateRoute();
})

watch(selectedStatus, async (newValue, oldValue) => {
    currentPage.value = 1;
    updateRoute();
})

watch(selectedOrder, async (newValue, oldValue) => {
    currentPage.value = 1;
    updateRoute();
})

watch(selectedSort, async (newValue, oldValue) => {
    currentPage.value = 1;
    updateRoute();
})

watch(selectedScore, async (newValue, oldValue) => {
    currentPage.value = 1;
    updateRoute();
})

watch(currentPage, async (newValue, oldValue) => {
    updateRoute();
})

async function updateRoute() {
    const params: Record<string, string | string[]> = {}

    params.page = currentPage.value.toString();
    params.limit = '24';

    if (selectedOrder.value.value[0]) {
        params.order_by = selectedOrder.value.value[0];
    }

    if (selectedSort.value.value[0]) {
        params.sort = selectedSort.value.value[0];
    }
    
    if (q.value != undefined && q.value != '') {
        params.q = q.value;
    }
    
    if (selectedYear.value.value[0] != -1) {
        params.start_date = selectedYear.value.value[0] + '-01-01';
        params.end_date = selectedYear.value.value[1] + '-01-01';
    }
    
    if (selectedFormat.value.value[0] != -1) {
        params.type = selectedFormat.value.value[0];
    }
    
    if (selectedStatus.value.value[0] != -1) {
        params.status = selectedStatus.value.value[0];
    }
    
    if (selectedScore.value.value[0] != -1) {
        params.score = selectedScore.value.value[0];
    }

    router.push({
        path: '/anime/search',
        query: params,
    });
    
    searchAnimes.value = undefined;
    isSearching.value = true;

    const {data} = await useFetch('/api/v1/anime/search', {
        method: 'GET', 
        query: {
                page:           params.page,
                limit:          params.limit,
                order_by:       params.order_by,
                sort:           params.sort,
                q:              params.q,
                start_date:     params.start_date,
                end_date:       params.end_date,
                format:         params.type,
                status:         params.status,
                score:          params.score
            }
        });
        
    if (data) { 
        searchAnimes.value = data.value!; 
        isSearching.value = false;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
}

function nextPage() {
    currentPage.value++;

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}

useSeoMeta({
    title: 'Search › AVAULT',
    ogTitle: 'Search',
    description: 'Search anime page',
    ogDescription: 'Search anime page',
    twitterCard: 'summary_large_image'
})


definePageMeta({
    layout: 'search'
})
</script>