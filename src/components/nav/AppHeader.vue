<template>
<!-- <div class="py-4 bg-[#09090b]/25"> -->
<div class="py-6">
    <div class="flex flex-row w-full items-center max-w-7xl mx-auto justify-between">
        <div class="flex flex-row items-center gap-8">
            <NuxtLink to="/"><button class="flex flex-row gap-1 py-2 items-center">
                <h1 class="uppercase text-2xl font-black">avault</h1>
                <Icon name="ri:safe-fill" class="text-2xl"/>
            </button></NuxtLink>
            <NuxtLink to="/anime/top" class="text-sm items-center flex gap-1 font-bold">
                <Icon name="ri:trophy-line" class="text-base"/>
                Top 100
            </NuxtLink>
            <NuxtLink to="/anime/search" class="text-sm items-center flex gap-1 font-bold">
                <Icon name="ri:search-line" class="text-base"/>
                Search
            </NuxtLink>
        </div> 

        <div 
            @mouseenter="isUserMenuOpen = true" 
            @mouseleave="isUserMenuOpen = false" 
            v-if="authorizedUser.user.tag != ''"
            class="relative">
            <div 
                @mouseleave="isUserMenuOpen = false"
                class="flex flex-row gap-2 items-center relative">
                <button 
                    :class="isUserMenuOpen ? 'rounded-t-md bg-zinc-800 ' : 'rounded-md bg-zinc-950'"
                    class="flex flex-row text-sm gap-2 py-2 px-5 items-center transition duration-300 easy-in-out font-bold">
                        <NuxtImg :src="authorizedUser.user.avatar_url" class="w-6 rounded-full"/>
                        @{{ authorizedUser.user.tag }}
                        <Icon 
                            name="ri:arrow-down-s-line" 
                            :class="isUserMenuOpen ? 'rotate-180' : 'rotate-0'"
                            class="text-xl transition-transform duration-200 ease-in-out -ml-1"
                        />
                </button>
                <div 
                    v-if="isLogout"
                    v-show="isUserMenuOpen" 
                    class="absolute w-full rounded-b-md overflow-x-hidden top-0 mt-10 z-10 p-2 origin-top bg-zinc-900/75 backdrop-blur-3xl items-center flex flex-col">
                    <div class="p-1 px-3 cursor-pointer rounded-md text-rose-500">
                        <p class="items-center flex flex-row gap-2 text-sm"><Icon class="animate-spin" name="ri:loader-5-line"/> Logging out</p>
                    </div>
                </div>
                <div
                    v-else
                    v-show="isUserMenuOpen" 
                    class="absolute w-full rounded-b-md overflow-x-hidden top-0 mt-10 z-10 p-2 origin-top bg-zinc-900/75 backdrop-blur-3xl justify-between flex flex-col">
                    <NuxtLink 
                        :to="{ name: 'profile-tag', params: { tag: authorizedUser.user.tag } }"
                        class="hover:bg-zinc-800 p-1 px-3 cursor-pointer rounded-md">
                            <p class="items-center flex flex-row gap-2 text-sm"><Icon name="ri:book-3-line" class="text-base"/> Profile</p>
                    </NuxtLink>
                    <a 
                        href="/profile/settings"
                        class="hover:bg-zinc-800 p-1 px-3 cursor-pointer rounded-md">
                        <p class="items-center flex flex-row gap-2 text-sm"><Icon name="ri:settings-3-line" class="text-base"/> Settings</p>
                    </a>
                    <button 
                        @click="logOut()"
                        class="hover:bg-rose-600/50 p-1 px-3 cursor-pointer rounded-md">
                        <p class="items-center flex flex-row gap-2 text-sm"><Icon name="ri:logout-box-r-line" class="text-base"/> Log-out</p>
                    </button>
                </div>
            </div>
        </div>
        
    <NuxtLink
        v-else
        to="/auth" 
        class="text-sm items-center flex gap-2 font-bold transition-colors duration-200 ease-in-out">
        <Icon name="ri:login-box-line" class="text-base"/>
        Sign-in
    </NuxtLink>
    </div>
</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/UserStore';

const client = useSupabaseClient();
const authorizedUser = useUserStore();

const isUserMenuOpen = ref(false);
const isUserLoaded = ref(false);
const isLogout = ref(false);

client.auth.onAuthStateChange(async (event, session) => {
    if ((event == 'SIGNED_IN' || event == 'INITIAL_SESSION' || event == 'TOKEN_REFRESHED' || event == 'USER_UPDATED') && session) {
        console.log(event, session);
        const { data } = await useAsyncData('me', () => $fetch('/api/v1/user/profile/me', {method: 'GET', query: { id: session.user.id }}));
        
        if (data.value) {
            authorizedUser.setData({
                avatar_url: data.value.avatar_url!,
                tag: data.value.tag,
                user_id: data.value.user_id,
                username: data.value.username
            });
        }

        isUserLoaded.value = true;
    } else if (event == 'SIGNED_OUT' && session) {
        isUserLoaded.value = false;
        console.log('SIGNED_OUT', session);
    } else {
        isUserLoaded.value = false;
        authorizedUser.logout();
        console.log(event, session);
    }
    
})

const logOut = async () => {
    isLogout.value = true;
    const { error } = await client.auth.signOut().finally(() => authorizedUser.logout());
}
</script>