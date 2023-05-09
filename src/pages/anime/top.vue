<template>
    <div class="mt-28 grid grid-cols-5 mx-auto max-w-7xl place-items-center gap-10">
        <AnimeCapsule
            v-if="topAnimes" v-for="anime in topAnimes"
            :aired-from="anime.aired.from"
            :airing-status="anime.status"
            :anime-id="anime.mal_id"
            :image-url="anime.images.jpg.image_url"
            :score="anime.score"
            :studio="anime.studios[0].name"
            :title="anime.title_english != undefined ? anime.title_english : anime.titles[0].title"
            :type="anime.type"
        />
    </div>
</template>

<script setup lang="ts">
import AnimeCapsule from '@/src/components/capsule/AnimeCapsule.vue';


const { data: topAnimes } = await useLazyAsyncData('top', () => $fetch('/api/v1/anime/search/top', { method: 'GET', query: { count: 25 } }));
</script>