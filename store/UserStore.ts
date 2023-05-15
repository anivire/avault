import { defineStore } from 'pinia'

// export const useUserStore = defineStore('user', () => {
//     const user = ref();
    
//     const userStorage = localStorage.getItem("user");

//     if (userStorage != undefined) {
//         user.value = JSON.parse(userStorage);
//     }
    
//     const setUserData = (data: { user_id: string, username: string, tag: string, avatar_url: string }) => {
//         user.value = data;
//     } 
    
//     const logout = () => {
//         user.value = undefined;
//     }

//     // watch(() => user, (state) => {
//     //     localStorage.setItem("user", JSON.stringify(state));
//     // }, { deep: true })

//     return {
//         user,
//         setUserData,
//         logout
//     }
// })

export const useUserStore = defineStore('user', {
    state: () => ({
        user: { user_id: '', username: '', tag: '', avatar_url: '' }
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