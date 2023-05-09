<template>
    <div class="mt-28 max-w-7xl mx-auto">
       <div class="search-panel grid grid-flow-col gap-2">
            <div class="flex flex-col gap-2">
                <p class="text-sm font-bold uppercase">Search</p>
                <Input @update:input="searchInput = $event"/>
            </div>
            {{ searchInput }}
            
            <div class="flex flex-col gap-2 ">
                <p class="text-sm font-bold uppercase">Year</p>
                <Select 
                    :options="yearOptions"
                    @update:select="selectedYear = $event"
                />
            </div>

            {{ selectedYear.value }}
            {{ selectedYear.name }}
       </div>
    </div>
    
</template>

<script setup lang="ts">
import Select from '@/src/components/Select.vue';
import Input from '@/src/components/Input.vue';

const searchInput = ref('');
const selectedYear = ref({value: [Number], name: String})

const yearOptions = ref([
    { value: [-1], name: 'Any' },
    { value: [1980], name: '198X' },
    { value: [1990], name: '199X' },
    { value: [2000, 2010], name: '2000 - 2010' },
    { value: [2011, 2014], name: '2011 - 2014' },
    { value: [2015, 2019], name: '2015 - 2019' },
    { value: [2020, 2021], name: '2020 - 2021' },
    { value: [2022], name: '2022' },
    { value: [2023], name: '2023' },
])
</script>