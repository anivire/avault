<template>
    <div class="absolute overflow-hidden">
    <nuxt-img 
        :src="user?.avatar_url ? user.avatar_url : ''" 
        class="w-screen h-52 object-cover blur-lg opacity-60"
    />
    </div> 
    <nuxt-img  
        :src="user?.avatar_url ? user.avatar_url : ''" 
        class="absolute w-screen h-96 object-cover blur-[164px] opacity-20 -z-10"
    />
    <div class="flex flex-col gap-5 justify-start relative mx-auto max-w-7xl mt-36">
        <div 
            v-if="user != null"
            class="flex flex-col gap-5">   
            <div class="flex flex-row gap-3 mb-5">  
                <nuxt-img 
                :src="user?.avatar_url ? user.avatar_url : ''" 
                    class="object-cover rounded-full w-36"
                />

                <div class="flex flex-col gap-1 justify-end">
                    <h1 class="text-4xl">{{ user.username }}</h1>
                    <div class="flex flex-row gap-5">
                        <p class="text-zinc-400 flex flex-row gap-1.5 items-center text-sm">
                            <Icon name="ri:calendar-line" class="text-lg"/>
                            Member since 
                            <span class="text-zinc-50 font-bold text-base">{{ new Date(user.created_at as unknown as string).toLocaleDateString() }}</span> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-3">
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
                    <input type="text" class="bg-zinc-800 text-sm placeholder-zinc-500 p-2 outline-0 rounded-md w-full" placeholder="New username">   
                    <button class="bg-zinc-800 p-2 px-3 rounded-md text-sm hover:bg-zinc-700 transition-all duration-200 ease-in-out">Change</button>
                </div>
            </div>

            <div class="flex flex-col gap-3 w-full bg-gradient-to-r from-rose-700/20 to-rose-900/20 border-2 border-rose-900 from-30% p-3 px-5 rounded-md col-span-2" >
                <div>
                    <h1 class="text-base uppercase">Danger zone</h1>
                    <p class="text-sm text-zinc-500">Delete account with all related data</p>
                </div>
                <div class="flex flex-row gap-2 items-center justify-between">
                    <Icon name="ri:delete-bin-2-fill" class="text-2xl w-8"/>
                    <input type="text" class="bg-zinc-800 text-sm placeholder-zinc-500 p-2 outline-0 rounded-md w-full" placeholder="Write your tag here to confirm delete account">   
                    <button class="bg-zinc-800 p-2 px-3 rounded-md text-sm hover:bg-rose-700/50 transition-all duration-200 ease-in-out">Delete</button>
                </div>
            </div>
            
            <div class="flex flex-col gap-3 w-full bg-zinc-900 p-3 px-5 rounded-md">
                <div>
                    <h1 class="text-base uppercase">Export</h1>
                    <p class="text-sm text-zinc-500">Export all list's data to JSON</p>
                </div>
                <div class="flex flex-row gap-2 items-center">
                    <Icon name="ri:file-code-fill" class="text-2xl"/>
                    <button class="bg-zinc-800 p-2 px-3 rounded-md text-sm hover:bg-zinc-700 transition-all duration-200 ease-in-out w-full">Request data</button>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const { data: session } = await client.auth.getSession();
const { data: user } = await useAsyncData('me', () => $fetch('/api/v1/user/profile/me', {method: 'GET', query: { id: session.session?.user.id }}));
const isCopied = ref(false);

definePageMeta({
    middleware: ['auth']
})

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
</script>
