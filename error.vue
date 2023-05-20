<template>
  <div class="flex flex-col mx-auto min-h-screen">
    <div class="w-full"><AppHeader></AppHeader></div>
    <div class="flex flex-col gap-5 items-center justify-center grow">
        <div class="flex flex-col items-center">
          <h1>4O4</h1>
          <p class="font-bold">Page not found</p>
        </div>
        <p class="bg-zinc-900 rounded-md px-3 text-xs p-1 text-zinc-400 max-w-xl">{{ error }}</p>
        <button @click="handleError" class="text-xs text-zinc-400 p-1 px-3 bg-zinc-900 rounded-md hover:bg-zinc-800 hover:text-zinc-50">Well, back to home... <Icon name="ri:arrow-right-up-line"/></button>
    </div>
    <div class="w-full"><AppFooter></AppFooter></div>
  </div>
</template>

<script setup>
import AppFooter from './src/components/nav/AppFooter.vue';
import AppHeader from './src/components/nav/AppHeader.vue';

  const props = defineProps({
    error: Object
  })
  
  const handleError = () => clearError({ redirect: '/' });
</script>