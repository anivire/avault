<template>
    <div>
        <div
            @click="isOpen = !isOpen" 
            :class="[isOpen ? 'rounded-t-md' : 'rounded-md', props.isCurrent ? 'from-rose-900 to-rose-900/70 hover:from-rose-800 hover:to-rose-800/70' : 'from-zinc-900 to-zinc-900/70 hover:from-zinc-800 hover:to-zinc-800/70']"
            class="flex flex-col gap-2 bg-gradient-to-r p-1 h-12 w-full justify-center cursor-pointer">
            <div class="flex flex-row justify-between px-3 p-2 items-center">
                <p class="font-semibold capitalize">{{ day == SchedulesFilter.monday ? 'Monday' : day == SchedulesFilter.tuesday ? 'Tuesday' : day == SchedulesFilter.wednesday ? 'Wednesday' : day == SchedulesFilter.thursday ? 'Thursday' : day == SchedulesFilter.friday ? 'Friday' : day }}</p>
                <Icon 
                    :class="isOpen ? 'rotate-180' : 'rotate-0'"
                    class="transition duration-200 ease-in-out"
                    name="ri:arrow-down-line"
                />
            </div>
           
        </div> 
        <div 
            v-if="isOpen" 
            :class="isOpen && sheduledAnime ? 'h-96' : 'h-fit'"
            class="flex flex-col overflow-y-auto divide-y divide-zinc-800">
            <AnimeSheduleCapsule 
                v-if="sheduledAnime"
                v-for="anime in sheduledAnime"
                :mal-id="anime.mal_id"
                :image="anime.images.webp!.image_url!"
                :aired-from="anime.aired.from"
                :title="anime.title"
                :year="anime.year"
                :time="anime.broadcast.time"
                :timezone="anime.broadcast.timezone"
            />  
            <div v-else class="flex flex-col items-center my-8">
                <p class="text-sm text-zinc-400 flex flex-row items-center gap-3 justify-center">Loading shedule data <Icon class="animate-spin" name="ri:loader-5-line"/></p>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { Anime, SchedulesFilter } from '@tutkli/jikan-ts';
import AnimeSheduleCapsule from './capsule/AnimeSheduleCapsule.vue';

const props = defineProps({
    day: {type: String, required: true},
    isCurrent: {type: Boolean, required: true},
})

const isOpen = ref(false);
const isOpenedOnce = ref(1);
const sheduledAnime = ref<Anime[]>();

onMounted(() => {
    if (props.isCurrent) {
        isOpen.value = true;
    }
})

watch(isOpen, async (newValue) => {
    if (newValue && isOpenedOnce.value == 1) {
        loadData();
    }
})

const loadData = async () => {
    isOpenedOnce.value = 0;
    const { data } = await useAsyncData('shedule', () => $fetch('/api/v1/shedule', { method: 'GET', query: { day: props.day as SchedulesFilter } }));

    // data.value!.data.forEach(element => {
    //     if (element.approved == false || element.year == null || element.status != 'Currently Airing') {
    //         data.value!.data.splice(data.value!.data.indexOf(element), 1);
    //     }
    // });
    
    data.value!.sort((a, b) => a.popularity > b.popularity ? 1 : -1);

    sheduledAnime.value = data.value!;
}
</script>