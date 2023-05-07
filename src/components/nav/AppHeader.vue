<template>
<!-- <div class="py-4 bg-[#09090b]/25"> -->
<div class="py-6">
    <div class="flex flex-row w-full items-center max-w-7xl mx-auto justify-between">
        <div class="flex flex-row items-center gap-8">
            <NuxtLink to="/"><button class="flex flex-row gap-1">
                <h1 class="uppercase text-2xl font-black text-zinc-400">アニメリスト</h1>
                <h1 class="uppercase text-2xl font-black">Animelist</h1>
            </button></NuxtLink>
            <NuxtLink to="/" class="text-sm items-center flex gap-1 font-bold">
                <Icon name="ri:trophy-line" class="text-base"/>
                Top 100
            </NuxtLink>
            <NuxtLink to="/anime/search" class="text-sm items-center flex gap-1 font-bold">
                <Icon name="ri:search-line" class="text-base"/>
                Search
            </NuxtLink>
        </div> 

        <NuxtLink to="/" class="text-sm items-center flex gap-2 font-bold transition-colors duration-200 ease-in-out">
            <Icon name="ri:login-box-line" class="text-base"/>
            Sign-in
        </NuxtLink>
    </div>
</div>
</template>