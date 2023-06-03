import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: { user_id: '', username: '', tag: '', avatar_url: '' },
    }),
    persist: true,
    actions: {
        setData(data: { user_id: string, username: string, tag: string, avatar_url: string }) {
            this.user.user_id = data.user_id;
            this.user.username = data.username;
            this.user.tag = data.tag;
            this.user.avatar_url = data.avatar_url;
        },
        logout() {
            this.user.user_id = '';
            this.user.username = '';
            this.user.tag = '';
            this.user.avatar_url = '';
        }
    }
});