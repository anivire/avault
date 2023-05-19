<template>
    <div class="flex flex-col gap-5 fixed top-4 right-4 z-50">
        <Toast 
            v-for="item, i in toasts.toast"
            :title="item.title"
            :description="item.description"
            :icon="item.icon"
            :status="item.status"
            @remove="remove(i)"
        />
    </div>
</template>

<script setup lang="ts">
import Toast from './Toast.vue';
import { useToastStore } from '@/store/ToastStore';

const toasts = useToastStore();

const remove = (index: number) => {
    toasts.rmToast(index);
}
</script>