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
import SheduleWrapper from './SheduleWrapper.vue';

const daysArray = ref([
    {day: "monday", isCurrent: true},
    {day: "tuesday", isCurrent: false},
    {day: "wednesday", isCurrent: false},
    {day: "thursday", isCurrent: false},
    {day: "friday", isCurrent: false},
    {day: "saturday", isCurrent: false},
    {day: "sunday", isCurrent: false},
])
const currentDayOfWeek = ref();

currentDayOfWeek.value = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
daysArray.value.forEach(element => {
    if (element.day == currentDayOfWeek.value) {
        element.isCurrent = true;
    } else {
        element.isCurrent = false;
    }
});

console.log(currentDayOfWeek.value)
console.log(new Date().getDay())

</script>