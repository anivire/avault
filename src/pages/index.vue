<template>
    <div class="mt-28 mx-auto max-w-7xl">
        <div class="flex flex-row gap-5">
            <!-- <div class="flex flex-row items-center justify-between px-1 py-3">
                <h1 class="text-lg uppercase">Shedule</h1>
                <NuxtLink to="/anime/ongoings"><Icon name="ri:arrow-right-up-line" class="text-2xl"/></NuxtLink>
            </div> -->
            <div class="w-1/3">
                <div class="flex flex-row items-center justify-between px-1 py-3">
                    <h1 class="text-lg uppercase">Shedule</h1>
                    <Icon name="ri:calendar-2-fill" class="text-2xl"/>
                </div>
                <SheduleModule/>
            </div>
            <div class="flex flex-col">
                <div class="col-span-2">
                    <div class="flex flex-row items-center justify-between px-1 py-3">
                        <h1 class="text-lg uppercase">Ongoings</h1>
                        <NuxtLink to="/anime/ongoings"><Icon name="ri:arrow-right-up-line" class="text-2xl"/></NuxtLink>
                    </div>
                    <div
                        v-if="ongoingAnimes" 
                        class="grid grid-cols-4 gap-3">
                        <AnimeCapsule
                            v-for="anime in ongoingAnimes"
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
                    <div v-else
                        class="grid grid-cols-4 gap-3">
                        <AnimeCapsuleSkeleton v-for="i in 4"/>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="flex flex-row items-center justify-between px-1 py-3">
                        <h1 class="text-lg uppercase">Upcoming</h1>
                        <NuxtLink to="/anime/ongoings"><Icon name="ri:arrow-right-up-line" class="text-2xl"/></NuxtLink>
                    </div>
                    <div 
                        v-if="upcomingAnimes"
                        class="grid grid-cols-4 gap-3">
                        <AnimeCapsule
                            v-for="anime in upcomingAnimes"
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
                    <div v-else
                        class="grid grid-cols-4 gap-3">
                        <AnimeCapsuleSkeleton v-for="i in 4"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="flex flex-col gap-3">
            <div class="flex flex-row items-center justify-between px-1 py-3">
                <h1 class="text-lg uppercase">Ongoing anime</h1>
                <NuxtLink to="/anime/ongoings"><Icon name="ri:arrow-right-up-line" class="text-2xl"/></NuxtLink>
            </div>
            
        </div> -->

        <!-- <div class="flex flex-col gap-3">
            <div class="flex flex-row items-center justify-between px-1 py-3">
                <h1 class="text-lg uppercase">Upcoming anime</h1>
                <NuxtLink to="/anime/upcoming"><Icon name="ri:arrow-right-up-line" class="text-2xl"/></NuxtLink>
            </div>
            
        </div> -->
    </div>
</template>

<script setup lang="ts">
import AnimeCapsule from '../components/capsule/AnimeCapsule.vue';
import SheduleModule from '../components/SheduleModule.vue';
import AnimeCapsuleSkeleton from '../components/skeleton/AnimeCapsuleSkeleton.vue';

const { data: ongoingAnimes, pending: ongoingPending } = await useLazyAsyncData('ongoing', () => $fetch('/api/v1/anime/season/ongoing', { method: 'GET', query: { count: 8 } }));
const { data: upcomingAnimes, pending: upcomingPending } = await useLazyAsyncData('upcoming', () => $fetch('/api/v1/anime/season/upcoming', { method: 'GET', query: { count: 4 } }));

useSeoMeta({
    title: 'Home › AVAULT',
    ogTitle: 'Home',
    description: 'Home page of AVAULT',
    ogDescription: 'Home page of AVAULT',
})

useSeoMeta({
    title: 'AVAULT',
    ogTitle: 'AVAULT',
    description: `Store all of your watched anime titles in one place!`,
    ogDescription: `Store all of your watched anime titles in one place!`,
    twitterCard: 'summary_large_image'
})
</script>