<template>
<div class="my-10 grid grid-cols-5 gap-5 mx-auto max-w-7xl">
    <AnimeCapsule
        v-if="onngoingAnimes" v-for="anime in onngoingAnimes"
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
import AnimeCapsule from '../components/capsule/AnimeCapsule.vue';

const { data: onngoingAnimes } = await useLazyAsyncData('anime', () => $fetch('/api/v1/anime/season/ongoing', { method: 'GET', query: { count: 20 } }));
</script>