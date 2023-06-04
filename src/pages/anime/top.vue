<template>
<div class="flex flex-col gap-3 mx-auto max-w-7xl mt-28">
    <div class="flex flex-row items-center justify-between px-1 py-3">
        <h1 class="text-lg uppercase">Top 100 anime</h1>
        <Icon name="ri:layout-grid-fill" class="text-2xl"/>
    </div>
    <div 
        v-if="topAnimes && topAnimes.length > 10"
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3.5">
        <AnimeCapsule
            v-for="anime, i in topAnimes"
            :aired-from="anime.aired == undefined ? 'n/a' : anime.aired.from"
            :airing-status="anime.status"
            :anime-id="anime.mal_id"
            :image-url="anime.images.jpg.image_url"
            :score="anime.score"
            :studio="anime.studios[0].name"
            :title="anime.title != undefined ? anime.title : anime.titles[0].title"
            :type="anime.type"
            :is-top="true"
            :top-number="i + 1"
        />
        <AnimeCapsuleSkeleton v-if="isLoadingScroll" v-for="i in 24"/>
    </div>
</div>
</template>

<script setup lang="ts">
import AnimeCapsule from '@/src/components/capsule/AnimeCapsule.vue';
import AnimeCapsuleSkeleton from '@/src/components/skeleton/AnimeCapsuleSkeleton.vue';
import { Anime } from '@tutkli/jikan-ts';

const topAnimes = ref<Anime[]>();
const page = ref(1);
const isLoadingScroll = ref(false);

const { data: animes } = await useAsyncData<Anime[]>('top', () => $fetch('/api/v1/anime/search/top', { method: 'GET', query: { count: 25, page: page.value } }));

if (animes) {
    topAnimes.value = animes.value!;
}

onMounted(() => {
    window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 350;

        if (bottomOfWindow && page.value < 4) {
            isLoadingScroll.value = true;
            page.value < 4 ? page.value++ : page.value;
            const { data: animes } = await useAsyncData<Anime[]>('top', () => $fetch('/api/v1/anime/search/top', { method: 'GET', query: { count: 25, page: page.value } }));
            
            if (animes) { topAnimes.value = topAnimes.value!.concat(animes.value!) }
            isLoadingScroll.value = false;
        }    
    };
})

useSeoMeta({
    title: 'Top 100 rated anime › AVAULT',
    ogTitle: 'Top 100',
    description: 'Top 100 rated anime of all time by MAL users',
    ogDescription: 'Top 100 rated anime of all time by MAL users',
    twitterCard: 'summary_large_image'
})
</script>