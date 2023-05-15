<template>
    <div class="absolute overflow-hidden">
        <nuxt-img 
            :src="'https://cdn.discordapp.com/avatars/207839349209956352/bf40f8b85728493f896fc5d4845148ab.png'" 
            class="w-screen h-52 object-cover blur-lg opacity-60"
        />
    </div> 

    <nuxt-img 
        :src="'https://cdn.discordapp.com/avatars/207839349209956352/bf40f8b85728493f896fc5d4845148ab.png'" 
        class="absolute w-screen h-96 object-cover blur-[164px] opacity-20 -z-10"
    />
    <div class="relative mx-auto max-w-7xl mt-36 flex flex-col gap-10">   
        <div class="flex flex-row gap-3">  
            <nuxt-img 
            :src="'https://cdn.discordapp.com/avatars/207839349209956352/bf40f8b85728493f896fc5d4845148ab.png'" 
                class="object-cover rounded-full w-36"
            />

            <div class="flex flex-col gap-1 justify-end">
                <h1 class="text-4xl">{{ route.params!.username }}</h1>
                <div class="flex flex-row gap-5">
                    <p class="text-zinc-400 flex flex-row gap-1.5 items-center text-sm"><Icon name="ri:calendar-line" class="text-lg"/>Member since <span class="text-zinc-50 font-bold text-base">09.04.2023</span> </p>
                    <p class="text-zinc-400 flex flex-row gap-1.5 items-center text-sm"><Icon name="ri:book-3-line" class="text-lg"/><span class="text-zinc-50 font-bold text-base">24</span> entries </p>
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

                <div class="flex flex-col gap-2 col-span-2">
                    <p class="text-sm font-bold uppercase">Search</p>
                    <Input @update:input="q = $event"/>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-sm font-bold uppercase">Year</p>
                    <Select 
                        :options="yearOptions"
                        :default="selectedYear"
                        @update:select="selectedYear = $event"
                    />
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
    </div>
</template>

<script setup lang="ts">
import Input from '@/src/components/Input.vue';
import Select from '@/src/components/Select.vue';

const route = useRoute('profile-username');

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

const yearOptions = ref([
    { value: [-1], name: 'Any' },
    { value: [1980, 1990], name: '1980-1989' },
    { value: [1990, 2000], name: '1990-1999' },
    { value: [2000, 2011], name: '2000-2010' },
    { value: [2011, 2015], name: '2011-2014' },
    { value: [2015, 2020], name: '2015-2019' },
    { value: [2020, 2022], name: '2020-2021' },
    { value: [2022, 2023], name: '2022' },
    { value: [2023, 2024], name: '2023' },
]);

const listOptions = ref([
    { value: [-1], name: 'Any' },
    { value: ['watched'], name: 'Watched' },
    { value: ['watching'], name: 'Watching' },
    { value: ['planned'], name: 'Planned' },
    { value: ['dropped'], name: 'Dropped' },
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

const q = ref('');
const selectedYear = ref({value: [], name: ''});
const selectedFormat = ref({value: [], name: ''});
const selectedStatus = ref({value: [], name: ''});
const selectedList = ref({value: [], name: ''});
const selectedOrder = ref(order.value[0]);
const selectedSort = ref(sort.value[1]);
</script>