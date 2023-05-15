<template>
    <div class="flex flex-col gap-10 max-w-xl mx-auto mt-40 mb-24">
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
                    <!-- <p class="text-sm font-bold ">Discord</p> -->
                </button>
                
                <button @click="oAuth('google')" class="gap-3 flex flex-row items-center justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:google-icon" class="text-5xl"/>
                    <!-- <p class="text-sm font-bold ">Google</p> -->
                </button>
                
                <button @click="oAuth('twitch')" class="gap-3 flex flex-row items-center rounded-r-md justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:twitch" class="text-5xl"/>
                    <!-- <p class="text-sm font-bold ">Twitch</p> -->
                </button>
            </div>
            <p class="text-sm text-zinc-500 flex flex-row gap-1 items-center">
                Don't have an account?
                <button 
                    @click="isRegister = !isRegister"
                    class="text-zinc-50">
                    Sign-up now 
                    <Icon name="ri:arrow-right-up-line" class="text-lg"/>
                </button>
            </p>
        </div>  
        
        <div 
            v-else
            class="input-anime-title flex flex-col gap-5 w-full bg-zinc-900 p-5 rounded-md">
            <div>
                <h1 class="text-base uppercase">Create account</h1>
                <p class="text-sm text-zinc-500">Choose a service to create your account </p>
            </div>
            <div class="grid grid-flow-col divide-x divide-zinc-800">
                <button @click="oAuth('discord')" class="gap-3 flex flex-row items-center rounded-l-md justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:discord-icon" class="text-5xl"/>
                    <!-- <p class="text-sm font-bold ">Discord</p> -->
                </button>
                
                <button @click="oAuth('google')" class="gap-3 flex flex-row items-center justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:google-icon" class="text-5xl"/>
                    <!-- <p class="text-sm font-bold ">Google</p> -->
                </button>
                
                <button @click="oAuth('twitch')" class="gap-3 flex flex-row items-center rounded-r-md justify-center bg-zinc-900 p-5 hover:bg-zinc-800 transition duration-300 easy-in-out">
                    <Icon name="logos:twitch" class="text-5xl"/>
                    <!-- <p class="text-sm font-bold ">Twitch</p> -->
                </button>
            </div>
            <p class="text-sm text-zinc-500 flex flex-row gap-1 items-center">
                Already have an account?
                <button 
                    @click="isRegister = !isRegister"
                    class="text-zinc-50">
                    Sign-in now 
                    <Icon name="ri:arrow-right-up-line" class="text-lg"/>
                </button>
            </p>
        </div>     
    </div>
</template>

<script setup lang="ts">
import { Provider } from '@supabase/gotrue-js';

const client = useSupabaseClient();
const isRegister = ref(false);

const oAuth = async (oauthProvider: Provider) => {
    try {
        const {data, error} = await useAsyncData('auth', () => $fetch('/api/v1/user/auth/oauth', { method: 'POST', body: { provider: oauthProvider}}));

        if (data.value) { window.location.replace(data.value.url); } else { console.log(error) };
    } catch (error) {
        console.log(error)   
    }
}
</script>