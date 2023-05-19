import { defineStore } from 'pinia'
import { ToastType } from './ToastType';

export const useToastStore = defineStore('toast', {
    state: () => ({
        toast: <ToastType[]>[]
    }),
    persist: true,
    actions: {
        addToast(data: ToastType) {
            this.toast.push(data);
        },
        rmToast(index: number) {
            this.toast.splice(index, 1);
        }
    }
});