<template>
    <div class="mt-28 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 mx-auto max-w-7xl place-items-center gap-3.5">
        <AnimeCapsule
            v-if="topAnimes" v-for="anime in topAnimes"
            :aired-from="anime.aired.from"
            :airing-status="anime.status"
            :anime-id="anime.mal_id"
            :image-url="anime.images.jpg.image_url"
            :score="anime.score"
            :studio="anime.studios[0].name"
            :title="anime.title != undefined ? anime.title : anime.titles[0].title"
            :type="anime.type"
        />
    </div>
</template>

<script setup lang="ts">
import AnimeCapsule from '@/src/components/capsule/AnimeCapsule.vue';


const { data: topAnimes } = await useLazyAsyncData('top', () => $fetch('/api/v1/anime/search/top', { method: 'GET', query: { count: 25 } }));
</script>