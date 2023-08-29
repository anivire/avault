<template>
<!-- <div class="py-4 bg-[#09090b]/25"> -->
<div class="flex flex-row w-full justify-center">
    <AuthModal 
        v-if="showModal" 
        class="fixed w-full z-50" 
        @close:auth="showModal = false"
    />
</div>
<div>
    <div class="flex flex-row w-full items-center max-w-7xl py-6 px-5 mx-auto justify-between">
        <div class="flex flex-row items-center gap-8">
            <NuxtLink to="/"><button class="flex flex-row gap-1 py-2 items-center">
                <h1 class="uppercase md:text-2xl text-xl font-black">avault</h1>
                <Icon name="ri:safe-fill" class="text-2xl"/>
            </button></NuxtLink>
            <div class="hidden md:flex flex-row gap-10">
                <NuxtLink to="/anime/top" class="text-sm items-center flex gap-1 font-bold">
                    <Icon name="ri:trophy-line" class="text-base"/>
                    Top 100
                </NuxtLink>
                <NuxtLink to="/anime/search" class="text-sm items-center flex gap-1 font-bold">
                    <Icon name="ri:search-line" class="text-base"/>
                    Search
                </NuxtLink>
            </div>
        </div> 

        <div class="flex flex-row md:gap-3 gap-1 items-center relative">
            <div v-if="showMenu" class="grid grid-cols-2 gap-5 w-full z-50 fixed shadow-2xl border-b-4 border-zinc-800 bg-zinc-900 p-5 left-0 top-0">
                <h1 class="uppercase md:text-2xl text-xl font-black flex flex-row gap-1 items-center">avault<Icon name="ri:safe-fill" class="text-2xl"/></h1>
                <button 
                    @click="toggleMenu"
                    class="bg-zinc-800 w-fit p-2 rounded-md  place-self-end hover:bg-zinc-700 transition-colors ease-out"><Icon name="ri:close-fill" class="text-2xl"/></button>
                <NuxtLink to="/" class="text-sm items-center flex gap-1 font-bold col-span-2 ">
                    <Icon name="ri:home-2-line" class="text-base"/>
                    Home
                </NuxtLink>
                <NuxtLink to="/anime/top" class="text-sm items-center flex gap-1 font-bold col-span-2">
                    <Icon name="ri:trophy-line" class="text-base"/>
                    Top 100
                </NuxtLink>
                <NuxtLink to="/anime/search" class="text-sm items-center flex gap-1 font-bold col-span-">
                    <Icon name="ri:search-line" class="text-base"/>
                    Search
                </NuxtLink>
            </div>
            
            <div 
                @mouseenter="isUserMenuOpen = true" 
                @mouseleave="isUserMenuOpen = false" 
                v-if="storedUser.user.tag != ''"
                class="relative">
                <div 
                    @mouseleave="isUserMenuOpen = false"
                    class="">
                    <button 
                        :class="isUserMenuOpen ? 'rounded-t-md bg-zinc-800 ' : 'rounded-md bg-zinc-950'"
                        class="flex flex-row md:text-sm text-xs gap-2 py-2 md:px-5 px-2 items-center line-clamp-1 transition duration-300 easy-in-out font-bold">
                            <NuxtImg :src="storedUser.user.avatar_url" class="md:w-6 w-5 rounded-full"/>
                            @{{ storedUser.user.tag }}
                            <Icon 
                                name="ri:arrow-down-s-line" 
                                :class="isUserMenuOpen ? 'rotate-180' : 'rotate-0'"
                                class="text-xl transition-transform duration-200 ease-in-out -ml-1"
                            />
                    </button>
                    <div 
                        v-if="isLogout"
                        v-show="isUserMenuOpen" 
                        class="absolute w-full rounded-b-md overflow-x-hidden top-0 md:mt-10 mt-9 z-10 p-2 origin-top bg-zinc-900/75 backdrop-blur-3xl items-center flex flex-col">
                        <div class="p-1 px-3 cursor-pointer rounded-md text-rose-500">
                            <p class="items-center flex flex-row gap-2 text-sm"><Icon class="animate-spin" name="ri:loader-5-line"/> Logging out</p>
                        </div>
                    </div>
                    <div
                        v-else
                        v-show="isUserMenuOpen" 
                        class="absolute w-full rounded-b-md overflow-x-hidden top-0 z-10 md:mt-10 mt-9 md:p-2 p-1 gap-1 origin-top bg-zinc-900/75 backdrop-blur-3xl justify-between flex flex-col">
                        <NuxtLink 
                            :to="{ name: 'profile-tag', params: { tag: storedUser.user.tag } }"
                            class="hover:bg-zinc-800 p-1 px-3 cursor-pointer rounded-md">
                                <p class="items-center flex flex-row gap-2 md:text-sm text-xs"><Icon name="ri:book-3-line" class="md:text-base text-sm"/> Profile</p>
                        </NuxtLink>
                        <a 
                            href="/profile/settings"
                            class="hover:bg-zinc-800 p-1 px-3 cursor-pointer rounded-md">
                            <p class="items-center flex flex-row gap-2 md:text-sm text-xs"><Icon name="ri:settings-3-line" class="md:text-base text-sm"/> Settings</p>
                        </a>
                        <button 
                            @click="logOut()"
                            class="hover:bg-rose-600/50 p-1 px-3 cursor-pointer rounded-md">
                            <p class="items-center flex flex-row gap-2 md:text-sm text-xs"><Icon name="ri:logout-box-r-line" class="md:text-base text-sm"/> Log-out</p>
                        </button>
                    </div>
                </div>
            </div>
            <div
                v-else
                @click="showModal = true"
                class="cursor-pointer text-sm items-center bg-zinc-950 p-2 px-3 rounded-md hover:bg-zinc-800 justify-center flex gap-2 font-bold transition-colors duration-200 ease-in-out">
                <Icon name="ri:login-box-line" class="text-base"/>
                Sign-in
            </div>

            <button
                @click="toggleMenu"
                class="md:hidden bg-zinc-950 p-2 rounded-md hover:bg-zinc-800 justify-center flex">
                <Icon 
                    name="ri:menu-fill" 
                    class="text-xl"
                />
            </button>
        </div>
        
        
    </div>
</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/UserStore';
import AuthModal from '../AuthModal.vue';

const client = useSupabaseClient();
const storedUser = useUserStore();
const supabaseUser = useSupabaseUser();
const router = useRouter();

const isUserMenuOpen = ref(false);
const isUserLoaded = ref(false);
const isLogout = ref(false);
const showModal = ref(false);
const showMenu = ref(false);

client.auth.onAuthStateChange(async (event, session) => {
    if ((event == 'SIGNED_IN' || event == 'USER_UPDATED') && session) {
        const { data } = await useAsyncData('me', () => $fetch('/api/v1/user/profile/me', {method: 'GET', query: { id: session.user.id }}));
        
        // Updated stored user data after log-in
        if (data.value) {
                storedUser.setData({
                avatar_url: data.value.avatar_url!,
                tag: data.value.tag,
                user_id: data.value.user_id,
                username: data.value.username
            });

            // Checking  if user update profile picture on authorized social network - update it if is updated
            // Just because i'm too lazy for writing great storage avatar system
            if (supabaseUser.value!.user_metadata.avatar_url != storedUser.user.avatar_url) {
                await useAsyncData('updateImage', () => $fetch('/api/v1/user/profile/updateImage', {method: 'POST', body: { user_id: session.user.id, avatar_url: supabaseUser.value!.user_metadata.avatar_url }}));
            }
        }

        isUserLoaded.value = true;
    } 
    // else if (event == 'SIGNED_OUT') {
    //     isUserLoaded.value = false;
    // } else {
    //     isUserLoaded.value = false;
    //     storedUser.logout();
    // }
    
})

const logOut = async () => { 
    isLogout.value = true;
    await client.auth.signOut().finally(() => { 
        storedUser.logout(); 
        router.push('/')
    });
}

const toggleMenu = () => {
    if (showMenu.value) showMenu.value = false;
    else showMenu.value = true;
}
</script>