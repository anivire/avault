<template>
    <NuxtLink 
        :to="{name: 'anime-id', params: { id: malId }}"
        class="relative flex felx-row bg-zinc-900 items-center cursor-pointer gap-3 hover:bg-zinc-800 px-3">
        <NuxtImg :src="image" width="50" height="50" class="absolute w-12 h-12 object-cover rounded-full"/>
        <div class="flex flex-col gap-1 pl-16 py-3 w-full">
            <p class="font-semibold">{{ title }}</p>
            <div class="flex flex-row gap-3 text-xs justify-between">
                <p class="text-rose-400">{{ time }} <span class="text-400">({{ timezone }})</span></p> 
                <p class="text-zinc-400">Airing from {{ new Date(airedFrom).toLocaleDateString() }}</p> 
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang='ts'>
import moment from 'moment-timezone'

defineProps({
    malId: { type: Number, required: true },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    airedFrom: { type: String, required: true },
    time: { type: String, required: true },
    timezone: { type: String, required: true },
})

// const setTimeWithOffset = (time: string, timezone: string) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     const sourceTime = new Date(hours, minutes);

//     const jp = moment(sourceTime).tz(timezone)
//     const userTz = moment(sourceTime).tz(Intl.DateTimeFormat().resolvedOptions().timeZone)

//     console.log(jp.format())
//     console.log(userTz.format())

//     //const userOffset = new Date().getTimezoneOffset();

//     //const userLocalTime = new Date(sourceTime.getTime() - userOffset * 60000);

//     // sourceTime.toLocaleString('en-US', { timeZone: timezone });
//     // console.log(sourceTime.toLocaleString('en-US', { timeZone: timezone }));
//     // const userTime = sourceTime.toLocaleTimeString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
//     // console.log(userTime);
//     //sourceTime.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
//     //console.log(sourceTime)


//     return jp.format('h:mm a');

//     //new Date().toLocaleString("eu-Eu", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }) 
// }
</script>