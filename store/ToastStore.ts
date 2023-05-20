import { defineStore } from 'pinia'
import { ToastType } from './ToastType';

export const useToastStore = defineStore('toast', {
    state: () => ({
        toast: <ToastType[]>[]
    }),
    persist: true,
    actions: {
        addToast(data: ToastType) {
            let newData: ToastType = {
                key: crypto.randomUUID(),
                description: data.description,
                icon: data.icon,
                status: data.status,
                title: data.title
            };

            this.toast.unshift(newData);
        },
        rmToast(index: string) {
            this.toast.forEach(element => {
                if (element.key == index) {
                    this.toast.splice(this.toast.indexOf(element), 1);
                }
            });
            
        }
    }
});