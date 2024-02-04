<template>
    <ToastWrapper/>
    <NuxtLoadingIndicator />
    <div class="bg-rose-600 flex flex-row gap-2 p-3 items-center justify-center">
        <Icon name="ri:info-i" class="text-base"/>
        <p class="text-sm font-bold">AVAULT support has been temporarily suspended due to a complete reorganization and update of the project. Some functions are currently unavailable, but all your data will be saved in its current form as soon as the project is updated.</p>
    </div>
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