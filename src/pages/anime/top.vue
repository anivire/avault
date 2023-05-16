<template>
    <div 
        v-if="topAnimes && topAnimes.length > 10"
        class="mt-28 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 mx-auto max-w-7xl place-items-center gap-3.5">
        <AnimeCapsule
            v-for="anime, i in topAnimes"
            :aired-from="anime.aired.from"
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
    </div>
    <div 
        v-else
        class="mt-28 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 mx-auto max-w-7xl place-items-center gap-3.5">
        <AnimeCapsuleSkeleton v-for="i in 24"/>
    </div>
</template>

<script setup lang="ts">
import AnimeCapsule from '@/src/components/capsule/AnimeCapsule.vue';
import AnimeCapsuleSkeleton from '@/src/components/skeleton/AnimeCapsuleSkeleton.vue';

const { data: topAnimes } = await useLazyAsyncData('top', () => $fetch('/api/v1/anime/search/top', { method: 'GET', query: { count: 25 } }));

useSeoMeta({
    title: 'Top 100 rated anime › AnimeList',
    ogTitle: 'Top 100',
    description: 'Top 100 rated anime of all time by MAL users',
    ogDescription: 'Top 100 rated anime of all time by MAL users',
})
</script>