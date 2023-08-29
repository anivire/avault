<template>
    <ToastWrapper/>
    <NuxtLoadingIndicator />
    <!-- <div class="bg-rose-600 flex flex-row gap-2 p-3 items-center justify-center">
        <Icon name="ri:bug-fill" class="text-base"/>
        <p class="text-sm font-bold">Anime search temporarily not working.</p>
    </div> -->
    <div class="flex flex-col relative min-h-screen">
        <div class="absolute z-10 w-full"><AppHeader/></div> 
        <div class="mb-28 grow"><NuxtPage/></div>
        <div><AppFooter/></div>
    </div>
</template>

<script setup lang="ts">
import AppFooter from '../components/nav/AppFooter.vue';
import AppHeader from '../components/nav/AppHeader.vue';
import ToastWrapper from '../components/ToastWrapper.vue';
</script>