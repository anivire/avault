<template>
<div class="absolute overflow-hidden">
    <nuxt-img 
        v-if="user != null" 
        :src="user.avatar_url!" 
        class="w-screen h-52 object-cover blur-lg opacity-60"
    />
</div> 

<div 
    v-if="user != null"
    class="relative mx-auto max-w-7xl mt-36 flex flex-col gap-5">   
    <div class="flex flex-row gap-3 mb-5">  
        <nuxt-img 
            :src="user.avatar_url!" 
            class="object-cover rounded-full w-36"
        />

        <div class="flex flex-col gap-1 justify-end">
            <div class="flex flex-row gap-2 items-center">
                <h1 class="text-4xl">{{ user.username }}</h1>
                <div 
                    v-if="user.badges"
                    v-for="entry, i in (user.badges as any)" 
                    class="mt-2 flex flex-row gap-1">
                    <Icon v-if="entry.badge == 'admin'" name="ri:code-box-fill" class="text-xl text-emerald-400"/>
                    <Icon v-if="entry.badge == 'early-member'" name="ri:seedling-fill" class="text-xl text-emerald-400"/>
                    <Icon v-if="entry.badge == 'supporter'" name="ri:vip-diamond-fill" class="text-lg text-amber-400"/>
                </div>
            </div>
            <div class="flex flex-row gap-5">
                <p class="text-zinc-400 flex flex-row items-center text-sm">
                    <Icon name="ri:at-line" class="text-lg"/>
                    <span class="text-zinc-400 text-base">{{ user.tag }}</span> 
                </p>
                <p class="text-zinc-400 flex flex-row gap-1.5 items-center text-sm">
                    <Icon name="ri:calendar-line" class="text-lg"/>
                    Member since 
                    <span class="text-zinc-50 font-bold text-base">{{ new Date(user.created_at as unknown as string).toLocaleDateString() }}</span> 
                </p>
                <p class="text-zinc-400 flex flex-row gap-1.5 items-center text-sm">
                    <Icon name="ri:book-3-line" class="text-lg"/>
                    <span class="text-zinc-50 font-bold text-base">
                    {{ anime?.length }}
                    </span> 
                    entries 
                </p>
            </div>
        </div>
    </div>
    <div class="search-panel grid grid-cols-6 gap-3">
        <div class="flex flex-col gap-2">
            <p class="text-sm font-bold uppercase">List</p>
            <Select 
                :options="listOptions"
                :default="selectedList"
                @update:select="selectedList = $event"
            />
        </div>

        <div class="flex flex-col gap-2 col-span-3">
            <p class="text-sm font-bold uppercase">Search</p>
            <Input @update:input="q = $event"/>
        </div>
        
        <div class="flex flex-col gap-2">
            <p class="text-sm font-bold uppercase">Format</p>
            <Select 
                :options="formatOptions"
                :default="selectedFormat"
                @update:select="selectedFormat = $event"
            />
        </div>
        
        <div class="flex flex-col gap-2">
            <p class="text-sm font-bold uppercase">Status</p>
            <Select 
                :options="statusOptions"
                :default="selectedStatus"
                @update:select="selectedStatus = $event"
            />
        </div>
    </div>
    <div class="flex flex-row gap-3 items-center">
        <Icon name="ri:price-tag-3-fill"/>
        <div class="flex flex-row gap-2 items-center grow">            
            <p 
                v-show="selectedList.value[0] != -1 && selectedList.value[0] != null"
                class="py-1 px-3 bg-zinc-50 rounded-xl text-sm text-zinc-900 font-black">
                {{ selectedList.name }}
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
        </div>

        <!-- Sort button -->
        <div class="flex flex-row gap-1">
            <Icon 
                @click="viewMode = 'grid'"
                :class="viewMode == 'grid' ? 'text-zinc-50' : 'text-zinc-400'"
                name="ri:layout-grid-fill" 
                class="text-xl cursor-pointer"
            />  
            <Icon 
                @click="viewMode = 'flex'"
                :class="viewMode == 'flex' ? 'text-zinc-50' : 'text-zinc-400'"
                name="ri:menu-fill" 
                class="text-xl cursor-pointer"
            /> 
        </div>
        
        <div class="flex flex-row gap-1">
            <Icon 
                @click="selectedSort = sort[0]"
                :class="selectedSort.value[0] == 'asc' ? 'text-zinc-50' : 'text-zinc-400'"
                name="ri:sort-asc" 
                class="text-xl cursor-pointer"
            />    
            <Icon 
                @click="selectedSort = sort[1]"
                :class="selectedSort.value[0] == 'desc' ? 'text-zinc-50' : 'text-zinc-400'"
                name="ri:sort-desc" 
                class="text-xl cursor-pointer"
            />    
        </div>
        <SmallSelect 
            :options="order"
            @update:select-small="selectedOrder = $event"
        />
        
        <!-- <SmallSelect 
            :options="animePerPage"
            @update:select-small="selectedAnimePerPage = $event"
        /> -->
    </div>
    <div 
        v-if="sortedAnime && sortedAnime.length != 0">
        <div v-if="selectedList.value[0] == null" class="mt-16">
            <p class="text-xs text-zinc-400 flex flex-row items-center gap-3 justify-center">Anime loading <Icon class="animate-spin" name="ri:loader-5-line"/></p>
        </div>
        <div 
            v-else
            :class="viewMode == 'grid' ? 'grid grid-cols-2' : viewMode == 'flex' ? 'flex flex-col' : ''"
            class="anime gap-5">
            <AnimeProfileCapsule 
                v-for="entry in sortedAnime" 
                :key="entry.entry_id"
                :added-at="(new Date(entry.added_at).toLocaleDateString())"
                :airing-season="entry.airing_season"
                :airing-status="entry.airing_status"
                :anime-id="(Number(entry.mal_id))"
                :image-url="entry.image_url"
                :is-favorited="entry.is_favorited"
                :score="(entry.score as number)"
                :title="entry.title"
                :total-episodes="(entry.total_episodes as number)"
                :studios="entry.studios"
                :type="entry.type"
                :updated-at="(new Date(entry.updated_at).toLocaleDateString())"
                :watching-status="entry.watching_status"
                :watched-episodes="(entry.wathed_episodes as number)"
                :entry-id="entry.entry_id"
                :user_id="user.user_id"
                @update:entry="updateEntry($event)"
                @delete:entry="deleteEntry($event)"
            />
        </div>
    </div>
    <div 
        v-else
        class="flex flex-col items-center mt-16">
        <p class="text-base text-zinc-400 flex flex-row items-center gap-2 justify-center"><Icon name="ri:book-3-line"/> No results</p>
    </div>
</div>
</template>

<script setup lang="ts">
import { animeList, profile } from '.prisma/client';
import AnimeProfileCapsule from '@/src/components/capsule/AnimeProfileCapsule.vue';
import Input from '@/src/components/Input.vue';
import Select from '@/src/components/Select.vue';
import SmallSelect from '@/src/components/SmallSelect.vue';

const order = ref([
    { value: ['title'], name: 'Alphabet'},
    { value: ['score'], name: 'Score'},
    { value: ['update'], name: 'Last update'},
    { value: ['add_date'], name: 'Adding date'},
]);

const sort = ref([
    { value: ['asc'], name: 'Asc'},
    { value: ['desc'], name: 'Desc'},
]);

const listOptions = ref([
    { value: [-1], name: 'Any' },
    { value: ['watched'], name: 'Watched' },
    { value: ['watching'], name: 'Watching' },
    { value: ['planned'], name: 'Planned' },
    { value: ['dropped'], name: 'Dropped' },
    { value: ['favorited'], name: 'Favorited' },
]);

const formatOptions = ref([
    { value: [-1], name: 'Any' },
    { value: ['TV'], name: 'TV' },
    { value: ['Movie'], name: 'Movie' },
    { value: ['Special'], name: 'Special' },
    { value: ['OVA'], name: 'OVA' },
    { value: ['ONA'], name: 'ONA' },
    { value: ['Music'], name: 'Music' },
]);

const statusOptions = ref([
    { value: [-1], name: 'Any' },
    { value: ['Released'], name: 'Released' },
    { value: ['Ongoing'], name: 'Ongoing' },
    { value: ['Upcoming'], name: 'Upcoming' },
]);

const q = ref('');
const selectedFormat = ref({value: [], name: ''});
const selectedStatus = ref({value: [], name: ''});
const selectedList = ref({value: [], name: ''});
const selectedOrder = ref(order.value[0]);
const selectedSort = ref(sort.value[0]);
const selectedFavorite = ref('');

const anime = ref<animeList[]>();
const isEntriesPending = ref(true);
const sortedAnime = ref<animeList[]>();
const viewMode = ref('grid');

const route = useRoute();

watch(selectedList, (newValue) => {
    if (newValue.value[0] == "favorited") {
        selectedFavorite.value = 'set';
    } else {
        selectedFavorite.value = '';
    }

    setSearchQuery();
})

watch(q, (newValue) => {
    setSearchQuery();
})

watch(selectedFormat, (newValue) => {
    setSearchQuery();
})

watch(selectedStatus, (newValue) => {
    setSearchQuery();
})

watch(selectedOrder, (newValue) => {
    setSearchQuery();
})

watch(selectedSort, (newValue) => {
    setSearchQuery();
})


const { data: user } = await useAsyncData<profile>('profile', () => $fetch('/api/v1/user/profile', {method: 'GET', query: { tag: route.params.tag }}));

if (user.value) {
    const { data, pending } = await useAsyncData('animelist', () => $fetch('/api/v1/user/animelist', {method: 'GET', query: { user_id: user.value!.user_id}}));
    isEntriesPending.value = pending.value;

    if (data.value) {
        anime.value = data.value as unknown as animeList[];
        sortedAnime.value = data.value as unknown as animeList[];
    }
}

const updateEntry = async (entryId: string) => {   
    const { data } = await useAsyncData<animeList>('searchEntryById', () => $fetch('/api/v1/user/animelist/searchEntryById', {method: 'GET', query: { user_id: user.value!.user_id, entry_id: entryId}}));
    
    if (data.value) {
        sortedAnime.value!.forEach(entry => {
            if (entry.entry_id == entryId) {
                sortedAnime.value![sortedAnime.value!.indexOf(entry)].is_favorited = data.value!.is_favorited;
                sortedAnime.value![sortedAnime.value!.indexOf(entry)].watching_status = data.value!.watching_status;
                sortedAnime.value![sortedAnime.value!.indexOf(entry)].score = data.value!.score;
                sortedAnime.value![sortedAnime.value!.indexOf(entry)].wathed_episodes = data.value!.wathed_episodes;
            }
        });
    }
}

const deleteEntry = async (entryId: string) => {   
    sortedAnime.value!.forEach(entry => {
        if (entry.entry_id == entryId) {
            sortedAnime.value!.splice(sortedAnime.value!.indexOf(entry), 1);
            anime.value!.splice(sortedAnime.value!.indexOf(entry), 1);
        }
    });
}


const setSearchQuery = () => {
    sortedAnime.value = anime.value!.filter(x => 
        (selectedList.value.value[0] != 'favorited' ? (selectedList.value.value[0] == -1 || x.watching_status == selectedList.value.value[0]) :
        (selectedFavorite.value == '' || x.is_favorited == true))
        && (q.value == '' || x.title.toLowerCase().indexOf(q.value.toLowerCase()) >= 0)
        && (selectedFormat.value.value[0] == -1 || x.type == selectedFormat.value.value[0])
        && (selectedStatus.value.value[0] == -1 || x.airing_status == selectedStatus.value.value[0])
    );

    if (selectedOrder.value.value[0] == 'score') {
        sortedAnime.value.sort((a, b) => b.score!  - a.score!);
    } else if (selectedOrder.value.value[0] == 'title') {
        sortedAnime.value.sort((a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1);
    } else if (selectedOrder.value.value[0] == 'update') {
        sortedAnime.value.sort((a, b) => new Date(a.updated_at).setHours(0, 0, 0, 0) - new Date(b.updated_at).setHours(0, 0, 0, 0));
    } else if (selectedOrder.value.value[0] == 'add_date') {
        sortedAnime.value.sort((a, b) => new Date(a.added_at).setHours(0, 0, 0, 0) - new Date(b.added_at).setHours(0, 0, 0, 0));
    }

    
    if (selectedSort.value.value[0] == 'desc') {
        sortedAnime.value.reverse();
    }
    
}

useSeoMeta({
    title: user.value != undefined ? user.value.tag + '\'s Profile › AVAULT' : 'Profile › AVAULT',
    ogTitle: user.value != undefined ? user.value.tag : 'Profile',
    description: `${user.value!.username} profile (@${user.value!.tag}). \nMember since ${user.value!.created_at} / total entries ${anime.value!.length}`,
    ogDescription: 'User profile page',
    ogImage: user.value?.avatar_url
})
</script>