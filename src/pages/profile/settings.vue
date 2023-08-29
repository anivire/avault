<template>
<div class="absolute overflow-hidden">
<nuxt-img 
    v-if="user != null"     
    :src="user.avatar_url ? user.avatar_url : ''" 
    class="w-screen md:h-52 h-28 object-cover blur-lg opacity-60"
/>
</div> 

<div v-if="supabaseUser">
    <div class="flex flex-col gap-5 justify-start relative mx-auto max-w-7xl md:mt-36 mt-32 px-5">
        <div 
            v-if="user != null"
            class="flex flex-col gap-5">   
            <div class="flex flex-row gap-3 md:mb-5 mb-3">  
                <nuxt-img 
                :src="user?.avatar_url ? user.avatar_url : ''" 
                    class="object-cover rounded-full md:w-36 md:h-36 h-16 w-16"
                />

                <div class="flex flex-col gap-1 justify-end">
                    <div class="flex flex-row gap-2 items-center">
                        <h1 class="md:text-4xl text-2xl">{{ user.username }}</h1>
                        <div 
                            v-if="user.badges"
                            v-for="entry, i in (user.badges as any)" 
                            class="mt-2 flex flex-row gap-1">
                            <Icon v-if="entry.badge == 'admin'" name="ri:code-box-fill" class="md:text-xl text-lg text-emerald-400"/>
                            <Icon v-if="entry.badge == 'early-member'" name="ri:seedling-fill" class="md:text-xl text-lg text-emerald-400"/>
                            <Icon v-if="entry.badge == 'supporter'" name="ri:vip-diamond-fill" class="md:text-xl text-lg text-amber-400"/>
                        </div>
                    </div>
                    <div class="flex md:flex-row flex-col md:gap-5 gap-1.5">
                        <p class="text-zinc-400 flex flex-row gap-1.5 items-center md:text-base text-sm">
                            <Icon name="ri:at-line" class="md:text-lg text-sm"/>
                            <span class="text-zinc-400 md:text-base text-sm">{{ user.tag }}</span> 
                        </p>
                        <p class="text-zinc-400 flex flex-row gap-1.5 items-center md:text-base text-sm">
                            <Icon name="ri:calendar-line" class="md:text-lg text-sm"/>
                            Member since 
                            <span class="text-zinc-50 font-bold md:text-base text-sm">{{ new Date(user.created_at as unknown as string).toLocaleDateString() }}</span> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:grid md:grid-cols-4 flex flex-col gap-3">
            <div class="flex flex-col gap-3 w-full bg-zinc-900 p-3 px-5 rounded-md">
                <div>
                    <h1 class="text-base uppercase">Profile tag</h1>
                    <p class="text-sm text-zinc-500">Used to identify user</p>
                </div>
                <div class="flex flex-row gap-2 items-center justify-between">
                    <Icon name="ri:at-line" class="text-2xl w-8"/>
                    <input type="text" class="bg-zinc-800 text-sm placeholder-zinc-500 p-2 outline-0 rounded-md w-full" :value="isCopied ? 'Tag copied!' : user?.tag" readonly>
                    <button @click="copyTag()" class="bg-zinc-800 p-1.5 rounded-md hover:bg-zinc-700 transition-all duration-200 ease-in-out"><Icon name="ri:file-copy-2-fill" class="text-xl w-8"/></button>
                </div>
            </div>
            
            <div class="flex flex-col gap-3 w-full bg-zinc-900 p-3 px-5 rounded-md">
                <div>
                    <h1 class="text-base uppercase">Change username</h1>
                    <p class="text-sm text-zinc-500">Choose a new username to change</p>
                </div>
                <div class="flex flex-row gap-2 items-center justify-between">
                    <Icon name="ri:font-size" class="text-2xl w-8"/>
                    <input type="text" class="bg-zinc-800 text-sm placeholder-zinc-500 p-2 outline-0 rounded-md w-full" v-model="newUsername" placeholder="New username">   
                    <button @click="changeUsername()" class="bg-zinc-800 p-2 px-3 rounded-md text-sm hover:bg-zinc-700 transition-all duration-200 ease-in-out">Change</button>
                </div>
            </div>

            <div class="flex flex-col gap-3 w-full bg-gradient-to-r from-rose-700/20 to-rose-900/20 border-2 border-rose-900 from-30% p-3 px-5 rounded-md col-span-2" >
                <div>
                    <h1 class="text-base uppercase">Danger zone</h1>
                    <p class="text-sm text-zinc-500">Delete account with all related data</p>
                </div>
                <div class="flex flex-row gap-2 items-center justify-between">
                    <Icon name="ri:delete-bin-2-fill" class="text-2xl w-8"/>
                    <input type="text" class="bg-zinc-800 text-sm placeholder-zinc-500 p-2 outline-0 rounded-md w-full" v-model="deleteTagConfirm" placeholder="Write your tag here to confirm delete account">   
                    <button @click="deleteMe()" class="bg-zinc-800 p-2 px-3 rounded-md text-sm hover:bg-rose-700/50 transition-all duration-200 ease-in-out">Delete</button>
                </div>
            </div>
            
            <!-- <div class="flex flex-col gap-3 w-full bg-zinc-900 p-3 px-5 rounded-md">
                <div>
                    <h1 class="text-base uppercase">Export</h1>
                    <p class="text-sm text-zinc-500">Export all list's data to JSON</p>
                </div>
                <div class="flex flex-row gap-2 items-center">
                    <Icon name="ri:file-code-fill" class="text-2xl"/>
                    <button class="bg-zinc-800 p-2 px-3 rounded-md text-sm hover:bg-zinc-700 transition-all duration-200 ease-in-out w-full">Request data</button>
                </div>
            </div> -->
            
            
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { profile } from '.prisma/client';
import { useToastStore } from '@/store/ToastStore';
import { useUserStore } from '@/store/UserStore';

const toasts = useToastStore();
const supabaseUser = useSupabaseUser();
const storedUser = useUserStore();
const client = useSupabaseClient();
const router = useRouter();

const isCopied = ref(false);
const user = ref<profile>();
const newUsername = ref('');
const deleteTagConfirm = ref('');

definePageMeta({
    middleware: ['auth']
})

if (supabaseUser.value) {
    const { data } = await useAsyncData<profile>('me', () => $fetch('/api/v1/user/profile/me', {method: 'GET', query: { id: supabaseUser.value?.id }}));

    if (data.value) { user.value = data.value; }
}

useSeoMeta({
    title: 'Settings › AVAULT',
    ogTitle: 'Settings',
    description: 'User settings',
    ogDescription: 'User settings',
})

const copyTag = () => {
    navigator.clipboard.writeText(user.value!.tag);
    isCopied.value = true;

    setTimeout(() => {
        isCopied.value = false;
    }, 1000);
}

const changeUsername = async () => {
    try {
        if (newUsername.value.length >= 3) {
            await useAsyncData<profile>('me', () => $fetch('/api/v1/user/profile/updateUsername', {method: 'POST', body: { user_id: supabaseUser.value?.id, username: newUsername.value }}));
            const { data } = await useAsyncData<profile>('me', () => $fetch('/api/v1/user/profile/me', {method: 'GET', query: { id: supabaseUser.value?.id }}));
            
            if (data.value) { user.value = data.value; }

            toasts.addToast({title: 'Username successfully updated', description: newUsername.value.toString(), icon: 'settings', status: 'base'})
        } else {
            toasts.addToast({title: 'Error', description: 'Minimum length of the username must be more than 3 characters', icon: 'error', status: 'error'})
        }
    } catch(e: any) {
        toasts.addToast({title: 'Error', description: e.message, icon: 'error', status: 'error'})
    }   
}

const deleteMe = async () => {
    try {
        if (deleteTagConfirm.value == user.value!.tag) {
            await useAsyncData('deleteMe', () => $fetch('/api/v1/user/profile/deleteMe', {method: 'GET', query: { user_id: supabaseUser.value?.id }}));

            await client.auth.signOut().finally(() => { 
                storedUser.logout(); 
                router.push('/')
            });
        } else {
            toasts.addToast({title: 'Error', description: 'Entered user tag does not match', icon: 'error', status: 'error'});
        }
    } catch(e: any) {
        toasts.addToast({title: 'Error', description: e.message, icon: 'error', status: 'error'})
    }
}
</script>
