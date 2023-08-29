<template>
    <ToastWrapper/>
    <NuxtLoadingIndicator />
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