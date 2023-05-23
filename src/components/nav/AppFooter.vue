<template>
    <div class="footer py-8 bg-[#0D0D0F] w-full">
        <div class="w-full max-w-7xl mx-auto flex flex-row justify-between">   
            <div class="flex flex-col justify-between">
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row items-center gap-1">
                        <h1 class="uppercase text-2xl font-black">avault</h1>
                        <Icon name="ri:safe-fill" class="text-2xl"/>
                    </div>
                    <p href="https://github.com/anivire/avault/issues/new" class="text-sm text-zinc-400 flex">Feel free to send any feedback to <Icon name="simple-icons:github" class="text-lg ml-2 mr-1"/> <a href="/" class="underline decoration-dotted hover:decoration-white hover:text-zinc-50 decoration-zinc-50 underline-offset-4 mr-1 duration-300 easy-in-out transition">Github</a></p>
                    <p class="text-sm text-zinc-400 flex">All anime data provided by unofficial My Anime List API <span class="bg-zinc-400 rounded-sm px-2 ml-2 text-zinc-950 font-bold">j</span> <a href="https://jikan.moe/" class="ml-1 underline decoration-dotted hover:decoration-white decoration-zinc-50 hover:text-zinc-50 underline-offset-4 duration-300 easy-in-out transition">jikan.moe</a></p>
                </div>
                <div class="flex flex-row gap-5">
                    <a href="https://myanimelist.net/"><Icon name="simple-icons:myanimelist" class="text-zinc-400 text-2xl hover:text-zinc-50 hover:scale-105 duration-300 easy-in-out transition"/></a>
                    <a href="https://github.com/anivire/avault/"><Icon name="simple-icons:github" class="text-zinc-400 text-2xl hover:text-zinc-50 hover:scale-105 duration-300 easy-in-out transition"/></a>
                    <a href="https://jikan.moe/"><span class="bg-zinc-400 px-2.5 py-1 text-zinc-950 font-bold rounded-sm hover:bg-zinc-50 hover:scale-105 duration-300 easy-in-out transition">j</span></a>
                </div>
            </div>
            <div class="flex flex-row">
                <div class="flex flex-col gap-1 mr-32">
                    <h1 class="uppercase text-lg">Pages</h1>
                    <NuxtLink to="/"><p class="text-sm text-zinc-400 hover:uderlined">Home</p></NuxtLink>
                    <!-- <NuxtLink to="/"><p class="text-sm text-zinc-400 hover:uderlined">Profiles</p></NuxtLink> -->
                    <NuxtLink to="/anime/search"><p class="text-sm text-zinc-400 hover:uderlined">Search</p></NuxtLink>
                    <NuxtLink to="/"><p class="text-sm text-zinc-400 hover:uderlined">Sign-up</p></NuxtLink>
                </div>
                
                <div class="flex flex-col gap-1">
                    <h1 class="uppercase text-lg">Search anime</h1>
                    <NuxtLink to="/anime/top" class="text-sm text-zinc-400 hover:uderlined">All anime</NuxtLink>
                    <NuxtLink to="/anime/upcoming" class="text-sm text-zinc-400 hover:uderlined">Upcoming</NuxtLink>
                    <NuxtLink to="/anime/ongoings" class="text-sm text-zinc-400 hover:uderlined">Ongoings</NuxtLink>
                    <NuxtLink to="/anime/top" class="text-sm text-zinc-400 hover:uderlined">Top 100</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>