<template>
    <TransitionGroup
        tag="div"
        enter-from-class="translate-x-full opacity-0"
        enter-active-class="duration-500"
        leave-active-class="uration-500"
        leave-to-class="translate-x-full opacity-0"
        class="toast-wrapper flex flex-col gap-5 fixed top-0 right-0 z-50 mt-5">
        <Toast 
            v-for="item, i in toasts.toast"
            :title="item.title"
            :description="item.description"
            :icon="item.icon"
            :status="item.status"
            :key="item.key!"
            @remove="remove(item.key!)"
        />
    </TransitionGroup>
</template>

<script setup lang="ts">
import Toast from './Toast.vue';
import { useToastStore } from '@/store/ToastStore';

const toasts = useToastStore();

const remove = (index: string) => {
    toasts.rmToast(index);
}
</script>