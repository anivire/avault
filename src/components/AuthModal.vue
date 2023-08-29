<template>
    <div class="flex flex-col gap-10 max-w-xl mx-auto mt-40 mb-24 w-full z-50 fixed shadow-2xl md:border-4 border-y-4 md:rounded-md border-zinc-800">
        <div 
            v-if="!isRegister"
            class="input-anime-title flex flex-col gap-5 w-full bg-zinc-900 p-5 rounded-md">
            <div>
                <h1 class="text-base uppercase">Sign-in account</h1>
                <p class="text-sm text-zinc-500">Choose a service linked to your account </p>
            </div>
            <div class="grid grid-flow-col divide-x divide-zinc-800">
                <button @click="oAuth('discord')" class="gap-3 flex flex-row items-center rounded-l-md justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:discord-icon" class="text-5xl"/>
                </button>
                
                <button @click="oAuth('google')" class="gap-3 flex flex-row items-center justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:google-icon" class="text-5xl"/>
                </button>
                
                <button @click="oAuth('twitch')" class="gap-3 flex flex-row items-center rounded-r-md justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:twitch" class="text-5xl"/>
                </button>
            </div>
        </div>          
    </div>
    <div @click="$emit('close:auth')" class="bg-zinc-950/90 backdrop-blur-md w-full h-full z-40 fixed"/>
</template>

<script setup lang="ts">
import { Provider } from '@supabase/gotrue-js';

const isRegister = ref(false);

defineEmits([
    'close:auth',
])

const oAuth = async (oauthProvider: Provider) => {
    try {
        const {data, error} = await useAsyncData('auth', () => $fetch('/api/v1/user/auth/oauth', { method: 'POST', body: { provider: oauthProvider}}));

        if (data.value) { window.location.replace(data.value.url); } else { console.log(error) };
    } catch (error) {
        console.log(error)   
    }
}
</script>