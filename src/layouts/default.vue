<template>
    <NuxtLoadingIndicator />
    <div class="flex flex-col">
        <div class="footer"><AppNavbar/></div> 
        <div class="page"><NuxtPage/></div>
        <div class="footer"><AppFooter/></div>
    </div>
</template>

<script setup lang="ts">
import AppFooter from '../components/nav/AppFooter.vue';
import AppNavbar from '../components/nav/AppNavbar.vue';
</script>