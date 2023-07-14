<template>
    <div class="flex flex-col gap-3">
        <SheduleWrapper 
            v-for="day in daysArray" 
            :isCurrent="day.isCurrent" 
            :day=day.day
        />     
    </div>           
</template>

<script setup lang="ts">

import { SchedulesFilter } from '@tutkli/jikan-ts';
import SheduleWrapper from './SheduleWrapper.vue';

const daysArray = ref([
    {day: SchedulesFilter.monday, isCurrent: true},
    {day: SchedulesFilter.tuesday, isCurrent: false},
    {day: SchedulesFilter.wednesday, isCurrent: false},
    {day: SchedulesFilter.thursday, isCurrent: false},
    {day: SchedulesFilter.friday, isCurrent: false},
    {day: 'saturday', isCurrent: false},
    {day: 'sunday', isCurrent: false},
])
const currentDayOfWeek = ref();

currentDayOfWeek.value = ['sunday', SchedulesFilter.monday, SchedulesFilter.tuesday, SchedulesFilter.wednesday, SchedulesFilter.thursday, SchedulesFilter.friday, 'saturday'][new Date().getDay()];
daysArray.value.forEach(element => {
    if (element.day == currentDayOfWeek.value) {
        element.isCurrent = true;
    } else {
        element.isCurrent = false;
    }
});
</script>