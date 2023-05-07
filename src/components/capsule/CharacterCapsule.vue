<template>
    <div class="character-capsule text-left bg-zinc-900 rounded-b-md transition duration-300 easy-in-out z-0 flex flex-col w-36 h-80">
        <nuxt-img 
            :src="imageUrl" 
            class="relative w-full h-full max-h-64 rounded-t-md object-cover"
            loading="lazy"
        />
        <p class="text-sm p-3 rounded-b-md ">{{ name.length >= 40 ? name.slice(0, 40) + '...' : name }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    characterId:    { type: Number, required: true},
    imageUrl:       { type: String, required: true},
    name:           { type: String, required: true},
})
</script>